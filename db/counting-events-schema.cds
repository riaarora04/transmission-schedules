namespace counting.events;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

/**
 * Main entity for Counting Events
 * Represents individual counting event instances
 */
entity CountingEvents : cuid, managed {
    eventID            : String(20) @title: 'Event ID';
    countingDate       : Date @title: 'Counting Date' @mandatory;
    startDate          : Date @title: 'Start Date';
    closingDate        : Date @title: 'Closing Date';
    status             : Association to EventStatus @title: 'Status';
    scheduleID         : Association to CountingSchedules @title: 'Schedule ID';
    eventType          : Association to EventType @title: 'Event Type' @mandatory;
    countingGroup      : String(100) @title: 'Counting Group';
    countingGroupDesc  : String(255) @title: 'Counting Group Description';
    externalReference  : String(100) @title: 'External Reference';
    description        : String(500) @title: 'Description';

    // Virtual fields for UI
    scheduleFrequency  : String(20) @title: 'Schedule Frequency';
    scheduleSequence   : String(20) @title: 'Schedule Sequence';
    statusCriticality  : Integer @title: 'Status Criticality';
}

/**
 * Counting Schedules
 * Defines recurring patterns for counting events
 */
entity CountingSchedules : cuid, managed {
    scheduleID         : String(20) @title: 'Schedule ID';
    description        : String(255) @title: 'Event Description' @mandatory;
    eventType          : Association to EventType @title: 'Event Type' @mandatory;
    countingGroup      : String(100) @title: 'Counting Group';
    countingGroupDesc  : String(255) @title: 'Counting Group Description';
    externalReference  : String(100) @title: 'External Reference';

    // Schedule pattern
    startDate          : Date @title: 'Start Date' @mandatory;
    endDate            : Date @title: 'End Date';
    closingDate        : Date @title: 'Closing Date' @mandatory;
    frequency          : Association to ScheduleFrequency @title: 'Frequency' @mandatory;
    repeatOn           : Integer @title: 'Repeat On (Day/Month)' @mandatory;
    repeatUnit         : String(20) @title: 'Repeat Unit'; // "Day", "Month"

    // Status and tracking
    status             : Association to ScheduleStatus @title: 'Status';
    isActive           : Boolean default true @title: 'Is Active';
    numberOfEvents     : Integer @title: 'Number of Counting Events';
}

/**
 * Counting Event Items
 * Line items within a counting event
 */
entity CountingEventItems : cuid {
    event              : Association to CountingEvents;
    material           : String(40) @title: 'Material';
    materialDesc       : String(100) @title: 'Material Description';
    plant              : String(4) @title: 'Plant';
    storageLocation    : String(4) @title: 'Storage Location';
    batch              : String(10) @title: 'Batch';
    expectedQuantity   : Decimal(13,3) @title: 'Expected Quantity';
    countedQuantity    : Decimal(13,3) @title: 'Counted Quantity';
    difference         : Decimal(13,3) @title: 'Difference';
    unit               : String(3) @title: 'Unit';
    comments           : String(500) @title: 'Comments';
}

/**
 * Code Lists
 */
entity EventStatus : CodeList {
    key code : String(20);
    criticality : Integer;
}

entity EventType : CodeList {
    key code : String(20);
}

entity ScheduleStatus : CodeList {
    key code : String(20);
}

entity ScheduleFrequency : CodeList {
    key code : String(20);
}
