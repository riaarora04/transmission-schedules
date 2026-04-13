using { counting.events as ce } from '../db/counting-events-schema';

service CountingEventsService @(path: '/odata/v4/counting-events') {

    @odata.draft.enabled
    entity CountingEvents as projection on ce.CountingEvents actions {
        action complete() returns CountingEvents;
        action cancel() returns CountingEvents;
    };

    @odata.draft.enabled
    entity CountingSchedules as projection on ce.CountingSchedules actions {
        action activate() returns CountingSchedules;
        action deactivate() returns CountingSchedules;
        action generateEvents() returns CountingSchedules;
    };

    entity CountingEventItems as projection on ce.CountingEventItems;

    // Code Lists
    @readonly entity EventStatus as projection on ce.EventStatus;
    @readonly entity EventType as projection on ce.EventType;
    @readonly entity ScheduleStatus as projection on ce.ScheduleStatus;
    @readonly entity ScheduleFrequency as projection on ce.ScheduleFrequency;
}
