const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { CountingEvents, CountingSchedules, CountingEventItems } = this.entities;

    // Before CREATE: Generate Event ID
    this.before('CREATE', CountingEvents, async (req) => {
        if (!req.data.eventID) {
            const lastEvent = await SELECT.one.from(CountingEvents).orderBy('eventID desc');
            const lastNum = lastEvent ? parseInt(lastEvent.eventID.substring(2)) : 10233;
            req.data.eventID = `CE${lastNum + 1}`;
        }

        // Set default status if not provided
        if (!req.data.status_code) {
            req.data.status_code = 'PLANNED';
        }
    });

    // Before CREATE: Generate Schedule ID
    this.before('CREATE', CountingSchedules, async (req) => {
        if (!req.data.scheduleID) {
            const lastSchedule = await SELECT.one.from(CountingSchedules).orderBy('scheduleID desc');
            const lastNum = lastSchedule ? parseInt(lastSchedule.scheduleID.substring(1)) : 34;
            req.data.scheduleID = `S${String(lastNum + 1).padStart(5, '0')}`;
        }

        // Set default status
        if (!req.data.status_code) {
            req.data.status_code = 'DRAFT';
        }
    });

    // After READ: Calculate virtual fields for CountingEvents
    this.after('READ', CountingEvents, (events) => {
        const eventsArray = Array.isArray(events) ? events : [events];
        eventsArray.forEach(event => {
            // Calculate status criticality
            if (event.status_code) {
                switch (event.status_code) {
                    case 'PLANNED':
                        event.statusCriticality = 2; // Information (blue)
                        break;
                    case 'IN_PROGRESS':
                        event.statusCriticality = 5; // Warning (orange)
                        break;
                    case 'COMPLETED':
                        event.statusCriticality = 3; // Success (green)
                        break;
                    case 'CANCELLED':
                        event.statusCriticality = 1; // Error (red)
                        break;
                    default:
                        event.statusCriticality = 0; // None
                }
            }

            // Calculate schedule frequency and sequence from schedule
            if (event.scheduleID) {
                // These would be calculated based on schedule relationship
                // For now, placeholder logic
                event.scheduleFrequency = event.scheduleID.frequency_code || 'SINGLE';
            } else {
                event.scheduleFrequency = 'SINGLE';
                event.scheduleSequence = '1 of 1';
            }
        });
    });

    // After READ: Calculate number of events for Schedules
    this.after('READ', CountingSchedules, async (schedules) => {
        const schedulesArray = Array.isArray(schedules) ? schedules : [schedules];
        for (const schedule of schedulesArray) {
            if (schedule.ID) {
                const events = await SELECT.from(CountingEvents).where({ scheduleID_ID: schedule.ID });
                schedule.numberOfEvents = events.length;
            }
        }
    });

    // Action: Complete Counting Event
    this.on('complete', CountingEvents, async (req) => {
        const { ID } = req.params[0];
        await UPDATE(CountingEvents, ID).set({ status_code: 'COMPLETED' });
        return SELECT.one.from(CountingEvents).where({ ID });
    });

    // Action: Cancel Counting Event
    this.on('cancel', CountingEvents, async (req) => {
        const { ID } = req.params[0];
        await UPDATE(CountingEvents, ID).set({ status_code: 'CANCELLED' });
        return SELECT.one.from(CountingEvents).where({ ID });
    });

    // Action: Activate Schedule
    this.on('activate', CountingSchedules, async (req) => {
        const { ID } = req.params[0];
        await UPDATE(CountingSchedules, ID).set({
            status_code: 'ACTIVE',
            isActive: true
        });
        return SELECT.one.from(CountingSchedules).where({ ID });
    });

    // Action: Deactivate Schedule
    this.on('deactivate', CountingSchedules, async (req) => {
        const { ID } = req.params[0];
        await UPDATE(CountingSchedules, ID).set({
            status_code: 'INACTIVE',
            isActive: false
        });
        return SELECT.one.from(CountingSchedules).where({ ID });
    });

    // Action: Generate Events from Schedule
    this.on('generateEvents', CountingSchedules, async (req) => {
        const { ID } = req.params[0];
        const schedule = await SELECT.one.from(CountingSchedules).where({ ID });

        if (!schedule) {
            req.error(404, 'Schedule not found');
            return;
        }

        const events = [];
        const startDate = new Date(schedule.startDate);
        const endDate = schedule.endDate ? new Date(schedule.endDate) : new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
        const closingDate = new Date(schedule.closingDate);

        let currentDate = new Date(startDate);
        let sequence = 1;

        // Calculate total events first
        let tempDate = new Date(startDate);
        let totalEvents = 0;
        while (tempDate <= endDate) {
            totalEvents++;
            // Increment based on frequency
            if (schedule.frequency_code === 'MONTHLY') {
                tempDate.setMonth(tempDate.getMonth() + 1);
            } else if (schedule.frequency_code === 'YEARLY') {
                tempDate.setFullYear(tempDate.getFullYear() + 1);
            } else {
                break; // Single event
            }
        }

        // Generate events
        while (currentDate <= endDate) {
            const event = {
                scheduleID_ID: schedule.ID,
                countingDate: currentDate.toISOString().split('T')[0],
                startDate: currentDate.toISOString().split('T')[0],
                closingDate: closingDate.toISOString().split('T')[0],
                status_code: 'PLANNED',
                eventType_code: schedule.eventType_code,
                countingGroup: schedule.countingGroup,
                countingGroupDesc: schedule.countingGroupDesc,
                externalReference: schedule.externalReference,
                description: schedule.description,
                scheduleFrequency: schedule.frequency_code,
                scheduleSequence: `${sequence} of ${totalEvents}`
            };

            events.push(event);
            sequence++;

            // Increment date based on frequency
            if (schedule.frequency_code === 'MONTHLY') {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else if (schedule.frequency_code === 'YEARLY') {
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            } else {
                break; // Single event only
            }
        }

        // Insert generated events
        if (events.length > 0) {
            await INSERT.into(CountingEvents).entries(events);
            await UPDATE(CountingSchedules, ID).set({ numberOfEvents: events.length });
        }

        return SELECT.one.from(CountingSchedules).where({ ID });
    });

    // Validation: Counting Date must be in the future for new events
    this.before('CREATE', CountingEvents, (req) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const countingDate = new Date(req.data.countingDate);

        if (countingDate < today) {
            req.warn(409, 'Counting date is in the past. Event will be marked as overdue.');
        }
    });

    // Validation: Schedule end date must be after start date
    this.before(['CREATE', 'UPDATE'], CountingSchedules, (req) => {
        if (req.data.endDate && req.data.startDate) {
            const startDate = new Date(req.data.startDate);
            const endDate = new Date(req.data.endDate);

            if (endDate <= startDate) {
                req.error(400, 'End date must be after start date');
            }
        }
    });
});
