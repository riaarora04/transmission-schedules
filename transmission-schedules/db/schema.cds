namespace transmissionjobs;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

entity Schedules : cuid, managed {
    scheduleID        : String(10) @title: 'Schedule ID';
    status            : Association to Statuses @title: 'Status';
    category          : Association to Categories @title: 'Category';
    issueType         : Association to IssueTypes @title: 'Issue Type';
    soldToParty       : String(10) @title: 'Sold-to Party';
    soldToPartyName   : String(100) @title: 'Sold-to Party Name';
    startDate         : Date @title: 'Start Date';
    endDate           : Date @title: 'End Date';
    frequency         : Association to Frequencies @title: 'Frequency';
    transmissionTime  : Time @title: 'Transmission Time';
    description       : String(500) @title: 'Description';
    priority          : Association to Priorities @title: 'Priority';
    contactPerson     : String(100) @title: 'Contact Person';
    contactEmail      : String(100) @title: 'Contact Email';
    lastTransmission  : DateTime @title: 'Last Transmission';
    nextTransmission  : DateTime @title: 'Next Transmission';
    executionCount    : Integer default 0 @title: 'Execution Count';
    successCount      : Integer default 0 @title: 'Success Count';
    failureCount      : Integer default 0 @title: 'Failure Count';
}

entity Statuses : CodeList {
    key code : String(10);
    criticality : Integer;
}

entity Categories : CodeList {
    key code : String(20);
}

entity IssueTypes : CodeList {
    key code : String(20);
}

entity Frequencies : CodeList {
    key code : String(10);
}

entity Priorities : CodeList {
    key code : String(10);
    criticality : Integer;
}
