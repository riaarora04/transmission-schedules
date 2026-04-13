using CountingEventsService as service from '../../srv/counting-events-service';

// List Report Header
annotate service.CountingEvents with @(
    UI.SelectionFields : [
        status_code,
        eventType_code,
        countingGroup,
        countingDate,
        scheduleID_ID
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : eventID,
            Label : 'Event ID'
        },
        {
            $Type : 'UI.DataField',
            Value : countingDate,
            Label : 'Counting Date'
        },
        {
            $Type : 'UI.DataField',
            Value : closingDate,
            Label : 'Closing Date'
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Label : 'Status',
            Target : '@UI.DataPoint#Status'
        },
        {
            $Type : 'UI.DataField',
            Value : scheduleID.scheduleID,
            Label : 'Schedule ID'
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Label : 'Schedule Frequency',
            Target : '@UI.DataPoint#ScheduleFrequency'
        },
        {
            $Type : 'UI.DataField',
            Value : scheduleSequence,
            Label : 'Schedule Sequence'
        },
        {
            $Type : 'UI.DataField',
            Value : eventType.name,
            Label : 'Event Type'
        },
        {
            $Type : 'UI.DataField',
            Value : countingGroup,
            Label : 'Counting Group'
        },
        {
            $Type : 'UI.DataField',
            Value : externalReference,
            Label : 'External Reference'
        }
    ]
);

// Data Points for criticality
annotate service.CountingEvents with @(
    UI.DataPoint #Status : {
        Value : status.name,
        Criticality : statusCriticality
    },
    UI.DataPoint #ScheduleFrequency : {
        Value : scheduleFrequency,
        Criticality : #Information
    }
);

// Object Page Header
annotate service.CountingEvents with @(
    UI.HeaderInfo : {
        TypeName : 'Counting Event',
        TypeNamePlural : 'Counting Events',
        Title : {
            $Type : 'UI.DataField',
            Value : eventID
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description
        }
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Status',
            ID : 'StatusHeader'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#HeaderDetails',
            ID : 'HeaderDetails'
        }
    ]
);

// Header Field Group
annotate service.CountingEvents with @(
    UI.FieldGroup #HeaderDetails : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : countingDate,
                Label : 'Counting Date'
            },
            {
                $Type : 'UI.DataField',
                Value : scheduleID.scheduleID,
                Label : 'Schedule ID'
            },
            {
                $Type : 'UI.DataField',
                Value : eventType.name,
                Label : 'Event Type'
            }
        ]
    }
);

// Object Page Facets
annotate service.CountingEvents with @(
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Information',
            ID : 'GeneralInfo',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Event Details',
                    Target : '@UI.FieldGroup#EventDetails',
                    ID : 'EventDetails'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Schedule Information',
                    Target : '@UI.FieldGroup#ScheduleInfo',
                    ID : 'ScheduleInfo'
                }
            ]
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Additional Details',
            Target : '@UI.FieldGroup#AdditionalDetails',
            ID : 'AdditionalDetails'
        }
    ]
);

// Object Page Actions
annotate service.CountingEvents with @(
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Complete',
            Action : 'CountingEventsService.complete',
            ![@UI.Hidden] : {$edmJson: {$If: [{$Eq: [{$Path: 'status_code'}, 'COMPLETED']}, true, {$If: [{$Eq: [{$Path: 'status_code'}, 'CANCELLED']}, true, false]}]}}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Cancel',
            Action : 'CountingEventsService.cancel',
            ![@UI.Hidden] : {$edmJson: {$If: [{$Eq: [{$Path: 'status_code'}, 'COMPLETED']}, true, {$If: [{$Eq: [{$Path: 'status_code'}, 'CANCELLED']}, true, false]}]}}
        }
    ]
);

// Field Groups
annotate service.CountingEvents with @(
    UI.FieldGroup #EventDetails : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : eventID,
                Label : 'Event ID'
            },
            {
                $Type : 'UI.DataField',
                Value : status_code,
                Label : 'Status'
            },
            {
                $Type : 'UI.DataField',
                Value : eventType_code,
                Label : 'Event Type'
            },
            {
                $Type : 'UI.DataField',
                Value : countingDate,
                Label : 'Counting Date'
            },
            {
                $Type : 'UI.DataField',
                Value : startDate,
                Label : 'Start Date'
            },
            {
                $Type : 'UI.DataField',
                Value : closingDate,
                Label : 'Closing Date'
            }
        ]
    },
    UI.FieldGroup #ScheduleInfo : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : scheduleID_ID,
                Label : 'Schedule'
            },
            {
                $Type : 'UI.DataField',
                Value : scheduleFrequency,
                Label : 'Schedule Frequency'
            },
            {
                $Type : 'UI.DataField',
                Value : scheduleSequence,
                Label : 'Schedule Sequence'
            }
        ]
    },
    UI.FieldGroup #AdditionalDetails : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : countingGroup,
                Label : 'Counting Group'
            },
            {
                $Type : 'UI.DataField',
                Value : countingGroupDesc,
                Label : 'Counting Group Description'
            },
            {
                $Type : 'UI.DataField',
                Value : externalReference,
                Label : 'External Reference'
            },
            {
                $Type : 'UI.DataField',
                Value : description,
                Label : 'Description',
                ![@UI.MultiLineText]
            }
        ]
    }
);

annotate service.CountingEvents with {
    scheduleID @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'CountingSchedules',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : scheduleID_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'scheduleID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'eventType_code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'countingGroup',
            },
        ],
    }
};

//
// Counting Schedules Annotations
//

// List Report for Schedules
annotate service.CountingSchedules with @(
    UI.SelectionFields : [
        status_code,
        eventType_code,
        frequency_code,
        countingGroup,
        isActive
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : scheduleID,
            Label : 'Schedule ID'
        },
        {
            $Type : 'UI.DataField',
            Value : description,
            Label : 'Description'
        },
        {
            $Type : 'UI.DataField',
            Value : eventType.name,
            Label : 'Event Type'
        },
        {
            $Type : 'UI.DataField',
            Value : frequency.name,
            Label : 'Frequency'
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'Start Date'
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'End Date'
        },
        {
            $Type : 'UI.DataField',
            Value : numberOfEvents,
            Label : 'Number of Events'
        },
        {
            $Type : 'UI.DataField',
            Value : status.name,
            Label : 'Status',
            Criticality : {$edmJson: {$If: [{$Eq: [{$Path: 'isActive'}, true]}, 3, 0]}}
        },
        {
            $Type : 'UI.DataField',
            Value : countingGroup,
            Label : 'Counting Group'
        }
    ]
);

// Object Page for Schedules
annotate service.CountingSchedules with @(
    UI.HeaderInfo : {
        TypeName : 'Counting Schedule',
        TypeNamePlural : 'Counting Schedules',
        Title : {
            $Type : 'UI.DataField',
            Value : scheduleID
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description
        }
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#ScheduleHeader',
            ID : 'ScheduleHeader'
        }
    ]
);

annotate service.CountingSchedules with @(
    UI.FieldGroup #ScheduleHeader : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : frequency.name,
                Label : 'Frequency'
            },
            {
                $Type : 'UI.DataField',
                Value : numberOfEvents,
                Label : 'Generated Events'
            },
            {
                $Type : 'UI.DataField',
                Value : isActive,
                Label : 'Active',
                Criticality : {$edmJson: {$If: [{$Eq: [{$Path: 'isActive'}, true]}, 3, 0]}}
            }
        ]
    }
);

annotate service.CountingSchedules with @(
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Schedule Details',
            ID : 'ScheduleDetails',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Basic Information',
                    Target : '@UI.FieldGroup#BasicInfo',
                    ID : 'BasicInfo'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Schedule Pattern',
                    Target : '@UI.FieldGroup#SchedulePattern',
                    ID : 'SchedulePattern'
                }
            ]
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Additional Information',
            Target : '@UI.FieldGroup#AdditionalInfo',
            ID : 'AdditionalInfo'
        }
    ]
);

annotate service.CountingSchedules with @(
    UI.FieldGroup #BasicInfo : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : scheduleID,
                Label : 'Schedule ID'
            },
            {
                $Type : 'UI.DataField',
                Value : description,
                Label : 'Description'
            },
            {
                $Type : 'UI.DataField',
                Value : eventType_code,
                Label : 'Event Type'
            },
            {
                $Type : 'UI.DataField',
                Value : status_code,
                Label : 'Status'
            },
            {
                $Type : 'UI.DataField',
                Value : isActive,
                Label : 'Is Active'
            }
        ]
    },
    UI.FieldGroup #SchedulePattern : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : frequency_code,
                Label : 'Frequency'
            },
            {
                $Type : 'UI.DataField',
                Value : repeatOn,
                Label : 'Repeat On (Day)'
            },
            {
                $Type : 'UI.DataField',
                Value : repeatUnit,
                Label : 'Repeat Unit'
            },
            {
                $Type : 'UI.DataField',
                Value : startDate,
                Label : 'Start Date'
            },
            {
                $Type : 'UI.DataField',
                Value : endDate,
                Label : 'End Date'
            },
            {
                $Type : 'UI.DataField',
                Value : closingDate,
                Label : 'Closing Date'
            }
        ]
    },
    UI.FieldGroup #AdditionalInfo : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : countingGroup,
                Label : 'Counting Group'
            },
            {
                $Type : 'UI.DataField',
                Value : countingGroupDesc,
                Label : 'Counting Group Description'
            },
            {
                $Type : 'UI.DataField',
                Value : externalReference,
                Label : 'External Reference'
            }
        ]
    }
);

// Actions for Schedules
annotate service.CountingSchedules with @(
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Activate',
            Action : 'CountingEventsService.activate',
            ![@UI.Hidden] : {$edmJson: {$If: [{$Eq: [{$Path: 'isActive'}, true]}, true, false]}}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Deactivate',
            Action : 'CountingEventsService.deactivate',
            ![@UI.Hidden] : {$edmJson: {$If: [{$Eq: [{$Path: 'isActive'}, false]}, true, false]}}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Generate Events',
            Action : 'CountingEventsService.generateEvents'
        }
    ]
);

