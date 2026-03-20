const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Schedules } = this.entities;

    // Calculate criticality for status and priority on READ
    this.after('READ', Schedules, (schedules) => {
        const items = Array.isArray(schedules) ? schedules : [schedules];
        
        items.forEach(schedule => {
            if (schedule) {
                // Status criticality mapping
                // 1 = Negative (red), 2 = Critical (orange), 3 = Positive (green), 0 = Neutral (grey)
                const statusCriticalityMap = {
                    'ACTIVE': 3,      // Positive - green
                    'COMPLETED': 3,   // Positive - green
                    'DRAFT': 0,       // Neutral - grey
                    'PAUSED': 2,      // Critical - orange
                    'FAILED': 1,      // Negative - red
                    'CANCELLED': 0    // Neutral - grey
                };
                
                // Priority criticality mapping
                const priorityCriticalityMap = {
                    'LOW': 0,         // Neutral - grey
                    'MEDIUM': 0,      // Neutral - grey
                    'HIGH': 2,        // Critical - orange
                    'CRITICAL': 1     // Negative - red
                };
                
                schedule.statusCriticality = statusCriticalityMap[schedule.status_code] || 0;
                schedule.priorityCriticality = priorityCriticalityMap[schedule.priority_code] || 0;
            }
        });
    });

    // Validate schedule dates before CREATE
    this.before('CREATE', Schedules, async (req) => {
        const { startDate, endDate } = req.data;
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            req.error(400, 'Start Date cannot be after End Date');
        }
    });

    // Validate schedule dates before UPDATE
    this.before('UPDATE', Schedules, async (req) => {
        const { startDate, endDate } = req.data;
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            req.error(400, 'Start Date cannot be after End Date');
        }
    });
});
