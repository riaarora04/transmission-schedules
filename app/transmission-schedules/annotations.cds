using ScheduleService as service from '../../srv/catalog-service';

annotate service.Schedules with @(
    UI.SelectionFields : [
        scheduleID,
        status_code,
        category_code,
        issueType_code,
        soldToParty,
        priority_code,
        startDate,
        endDate
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : scheduleID,
            Label : 'Schedule ID'
        },
        {
            $Type : 'UI.DataField',
            Value : status_code,
            Label : 'Status',
            Criticality : statusCriticality
        },
        {
            $Type : 'UI.DataField',
            Value : category_code,
            Label : 'Category'
        },
        {
            $Type : 'UI.DataField',
            Value : issueType_code,
            Label : 'Issue Type'
        },
        {
            $Type : 'UI.DataField',
            Value : soldToParty,
            Label : 'Sold-to Party'
        },
        {
            $Type : 'UI.DataField',
            Value : soldToPartyName,
            Label : 'Sold-to Party Name'
        },
        {
            $Type : 'UI.DataField',
            Value : priority_code,
            Label : 'Priority',
            Criticality : priorityCriticality
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
            Value : nextExecutionOn,
            Label : 'Next Execution'
        },
        {
            $Type : 'UI.DataField',
            Value : isActive,
            Label : 'Active'
        }
    ],
    UI.HeaderInfo : {
        TypeName : 'Schedule',
        TypeNamePlural : 'Schedules',
        Title : {
            $Type : 'UI.DataField',
            Value : scheduleID
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description
        }
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Information',
            ID : 'GeneralInfo',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Schedule Details',
                    Target : '@UI.FieldGroup#ScheduleDetails'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Timing Information',
                    Target : '@UI.FieldGroup#TimingInfo'
                }
            ]
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Transmission Details',
            ID : 'TransmissionDetails',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Configuration',
                    Target : '@UI.FieldGroup#TransmissionConfig'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Execution History',
                    Target : '@UI.FieldGroup#ExecutionHistory'
                }
            ]
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Administrative Data',
            Target : '@UI.FieldGroup#AdminData'
        }
    ],
    UI.FieldGroup #ScheduleDetails : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : scheduleID,
                Label : 'Schedule ID'
            },
            {
                $Type : 'UI.DataField',
                Value : status_code,
                Label : 'Status',
                Criticality : statusCriticality
            },
            {
                $Type : 'UI.DataField',
                Value : category_code,
                Label : 'Category'
            },
            {
                $Type : 'UI.DataField',
                Value : issueType_code,
                Label : 'Issue Type'
            },
            {
                $Type : 'UI.DataField',
                Value : priority_code,
                Label : 'Priority',
                Criticality : priorityCriticality
            },
            {
                $Type : 'UI.DataField',
                Value : soldToParty,
                Label : 'Sold-to Party'
            },
            {
                $Type : 'UI.DataField',
                Value : soldToPartyName,
                Label : 'Sold-to Party Name'
            },
            {
                $Type : 'UI.DataField',
                Value : assignedTo,
                Label : 'Assigned To'
            },
            {
                $Type : 'UI.DataField',
                Value : description,
                Label : 'Description'
            },
            {
                $Type : 'UI.DataField',
                Value : isActive,
                Label : 'Is Active'
            }
        ]
    },
    UI.FieldGroup #TimingInfo : {
        Data : [
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
                Value : frequency_code,
                Label : 'Frequency'
            },
            {
                $Type : 'UI.DataField',
                Value : executionTime,
                Label : 'Execution Time'
            },
            {
                $Type : 'UI.DataField',
                Value : lastExecutedOn,
                Label : 'Last Executed On'
            },
            {
                $Type : 'UI.DataField',
                Value : nextExecutionOn,
                Label : 'Next Execution On'
            }
        ]
    },
    UI.FieldGroup #TransmissionConfig : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : transmissionType_code,
                Label : 'Transmission Type'
            },
            {
                $Type : 'UI.DataField',
                Value : recipientEmail,
                Label : 'Recipient Email'
            }
        ]
    },
    UI.FieldGroup #ExecutionHistory : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : lastExecutedOn,
                Label : 'Last Executed On'
            },
            {
                $Type : 'UI.DataField',
                Value : nextExecutionOn,
                Label : 'Next Execution On'
            }
        ]
    },
    UI.FieldGroup #AdminData : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : createdBy,
                Label : 'Created By'
            },
            {
                $Type : 'UI.DataField',
                Value : createdAt,
                Label : 'Created At'
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy,
                Label : 'Modified By'
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
                Label : 'Modified At'
            }
        ]
    }
);

// Value Help Annotations
annotate service.Schedules with {
    status @(
        Common.Label : 'Status',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'ScheduleStatus',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : status_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
    category @(
        Common.Label : 'Category',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'ScheduleCategory',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : category_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
    issueType @(
        Common.Label : 'Issue Type',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'IssueType',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : issueType_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
    frequency @(
        Common.Label : 'Frequency',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Frequency',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : frequency_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
    priority @(
        Common.Label : 'Priority',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Priority',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : priority_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
    transmissionType @(
        Common.Label : 'Transmission Type',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'TransmissionType',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : transmissionType_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
};