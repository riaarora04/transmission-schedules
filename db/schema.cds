namespace transmission.schedules;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

entity Schedules : cuid, managed {
    scheduleID       : String(20) @title: 'Schedule ID';
    status           : Association to ScheduleStatus @title: 'Status';
    category         : Association to ScheduleCategory @title: 'Category';
    issueType        : Association to IssueType @title: 'Issue Type';
    soldToParty      : String(10) @title: 'Sold-to Party';
    soldToPartyName  : String(100) @title: 'Sold-to Party Name';
    startDate        : Date @title: 'Start Date';
    endDate          : Date @title: 'End Date';
    frequency        : Association to Frequency @title: 'Frequency';
    executionTime    : Time @title: 'Execution Time';
    description      : String(255) @title: 'Description';
    priority         : Association to Priority @title: 'Priority';
    assignedTo       : String(100) @title: 'Assigned To';
    lastExecutedOn   : DateTime @title: 'Last Executed On';
    nextExecutionOn  : DateTime @title: 'Next Execution On';
    transmissionType : Association to TransmissionType @title: 'Transmission Type';
    recipientEmail   : String(100) @title: 'Recipient Email';
    isActive         : Boolean default true @title: 'Is Active';

    // Virtual fields for criticality
    statusCriticality : Integer @title: 'Status Criticality';
    priorityCriticality : Integer @title: 'Priority Criticality';
}

entity ScheduleStatus : CodeList {
    key code : String(20);
}

entity ScheduleCategory : CodeList {
    key code : String(20);
}

entity IssueType : CodeList {
    key code : String(20);
}

entity Frequency : CodeList {
    key code : String(20);
}

entity Priority : CodeList {
    key code : String(20);
}

entity TransmissionType : CodeList {
    key code : String(20);
}
