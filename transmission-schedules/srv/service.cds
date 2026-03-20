using transmissionjobs from '../db/schema';

service TransmissionJobService {
    @odata.draft.enabled
    entity Schedules as projection on transmissionjobs.Schedules;

    entity Statuses as projection on transmissionjobs.Statuses;
    entity Categories as projection on transmissionjobs.Categories;
    entity IssueTypes as projection on transmissionjobs.IssueTypes;
    entity Frequencies as projection on transmissionjobs.Frequencies;
    entity Priorities as projection on transmissionjobs.Priorities;
}

annotate TransmissionJobService.Schedules with @(
    UI: {
        SelectionFields: [
            scheduleID,
            status_code,
            category_code,
            issueType_code,
            soldToParty,
            startDate,
            endDate
        ],
        LineItem: [
            {
                $Type: 'UI.DataField',
                Value: scheduleID,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: status.name,
                Criticality: status.criticality,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: category.name,
                ![@HTML5.CssDefaults]: { width: '12rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: issueType.name,
                ![@HTML5.CssDefaults]: { width: '12rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: soldToParty,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: soldToPartyName,
                ![@HTML5.CssDefaults]: { width: '15rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: startDate,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: endDate,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: frequency.name,
                ![@HTML5.CssDefaults]: { width: '10rem' }
            },
            {
                $Type: 'UI.DataField',
                Value: priority.name,
                Criticality: priority.criticality,
                ![@HTML5.CssDefaults]: { width: '8rem' }
            }
        ],
        HeaderInfo: {
            TypeName: 'Schedule',
            TypeNamePlural: 'Schedules',
            Title: { Value: scheduleID },
            Description: { Value: description }
        },
        HeaderFacets: [
            {
                $Type: 'UI.ReferenceFacet',
                Target: '@UI.DataPoint#Status'
            },
            {
                $Type: 'UI.ReferenceFacet',
                Target: '@UI.DataPoint#ExecutionCount'
            },
            {
                $Type: 'UI.ReferenceFacet',
                Target: '@UI.DataPoint#SuccessRate'
            }
        ],
        DataPoint#Status: {
            Value: status.name,
            Title: 'Status',
            Criticality: status.criticality
        },
        DataPoint#ExecutionCount: {
            Value: executionCount,
            Title: 'Total Executions'
        },
        DataPoint#SuccessRate: {
            Value: successCount,
            Title: 'Successful Executions',
            TargetValue: executionCount
        },
        Facets: [
            {
                $Type: 'UI.CollectionFacet',
                Label: 'General Information',
                ID: 'GeneralInfo',
                Facets: [
                    {
                        $Type: 'UI.ReferenceFacet',
                        Label: 'Schedule Details',
                        Target: '@UI.FieldGroup#ScheduleDetails'
                    },
                    {
                        $Type: 'UI.ReferenceFacet',
                        Label: 'Party Information',
                        Target: '@UI.FieldGroup#PartyInfo'
                    }
                ]
            },
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Transmission Settings',
                ID: 'TransmissionSettings',
                Facets: [
                    {
                        $Type: 'UI.ReferenceFacet',
                        Label: 'Schedule Configuration',
                        Target: '@UI.FieldGroup#TransmissionConfig'
                    }
                ]
            },
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Contact Information',
                ID: 'ContactInfo',
                Facets: [
                    {
                        $Type: 'UI.ReferenceFacet',
                        Label: 'Contact Details',
                        Target: '@UI.FieldGroup#ContactDetails'
                    }
                ]
            },
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Execution Statistics',
                ID: 'ExecutionStats',
                Facets: [
                    {
                        $Type: 'UI.ReferenceFacet',
                        Label: 'Transmission History',
                        Target: '@UI.FieldGroup#ExecutionHistory'
                    }
                ]
            }
        ],
        FieldGroup#ScheduleDetails: {
            Data: [
                { Value: scheduleID },
                { Value: status_code },
                { Value: priority_code },
                { Value: category_code },
                { Value: issueType_code },
                { Value: description }
            ]
        },
        FieldGroup#PartyInfo: {
            Data: [
                { Value: soldToParty },
                { Value: soldToPartyName }
            ]
        },
        FieldGroup#TransmissionConfig: {
            Data: [
                { Value: startDate },
                { Value: endDate },
                { Value: frequency_code },
                { Value: transmissionTime }
            ]
        },
        FieldGroup#ContactDetails: {
            Data: [
                { Value: contactPerson },
                { Value: contactEmail }
            ]
        },
        FieldGroup#ExecutionHistory: {
            Data: [
                { Value: lastTransmission },
                { Value: nextTransmission },
                { Value: executionCount },
                { Value: successCount },
                { Value: failureCount }
            ]
        }
    }
);

annotate TransmissionJobService.Schedules with {
    status @(
        Common: {
            Text: status.name,
            TextArrangement: #TextOnly,
            ValueList: {
                CollectionPath: 'Statuses',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        LocalDataProperty: status_code,
                        ValueListProperty: 'code'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'name'
                    }
                ]
            }
        }
    );
    category @(
        Common: {
            Text: category.name,
            TextArrangement: #TextOnly,
            ValueList: {
                CollectionPath: 'Categories',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        LocalDataProperty: category_code,
                        ValueListProperty: 'code'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'name'
                    }
                ]
            }
        }
    );
    issueType @(
        Common: {
            Text: issueType.name,
            TextArrangement: #TextOnly,
            ValueList: {
                CollectionPath: 'IssueTypes',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        LocalDataProperty: issueType_code,
                        ValueListProperty: 'code'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'name'
                    }
                ]
            }
        }
    );
    frequency @(
        Common: {
            Text: frequency.name,
            TextArrangement: #TextOnly,
            ValueList: {
                CollectionPath: 'Frequencies',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        LocalDataProperty: frequency_code,
                        ValueListProperty: 'code'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'name'
                    }
                ]
            }
        }
    );
    priority @(
        Common: {
            Text: priority.name,
            TextArrangement: #TextOnly,
            ValueList: {
                CollectionPath: 'Priorities',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        LocalDataProperty: priority_code,
                        ValueListProperty: 'code'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'name'
                    }
                ]
            }
        }
    );
}
