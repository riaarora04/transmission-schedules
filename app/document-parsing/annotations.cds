using DocumentParsingService as service from '../../srv/document-parsing-service';

// List Report Page Configuration
annotate service.Documents with @(
    UI.SelectionFields : [
        status_code,
        uploadedBy,
        sender,
        documentType_code,
        uploadedDate
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : fileName,
            Label : 'File',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : status_code,
            Label : 'Status',
            Criticality : statusCriticality,
            CriticalityRepresentation : #WithIcon,
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : extractionSummary,
            Label : 'Extraction Summary',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : sender,
            Label : 'Sender'
        },
        {
            $Type : 'UI.DataField',
            Value : uploadedBy,
            Label : 'Uploaded By'
        },
        {
            $Type : 'UI.DataField',
            Value : uploadedDate,
            Label : 'Uploaded On/At'
        }
    ],
    UI.HeaderInfo : {
        TypeName : 'Document',
        TypeNamePlural : 'Documents',
        TypeImageUrl : 'sap-icon://pdf-attachment',
        Title : {
            $Type : 'UI.DataField',
            Value : documentID
        },
        Description : {
            $Type : 'UI.DataField',
            Value : status.name
        }
    }
);

// Object Page Header Facets
annotate service.Documents with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ProcessTypeInfo',
            Target : '@UI.FieldGroup#ProcessTypeInfo'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'Status',
            Label : 'Status',
            Target : '@UI.DataPoint#Status'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ReviewStatus',
            Label : 'Review Status',
            Target : '@UI.Chart#ReviewStatusRadial'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'Transmission',
            Label : 'Transmission',
            Target : '@UI.DataPoint#Transmission'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ProductItems',
            Label : 'Product Items',
            Target : '@UI.DataPoint#ProductItems'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'BillingDocuments',
            Label : 'Billing Documents',
            Target : '@UI.DataPoint#BillingDocuments'
        }
    ],
    UI.FieldGroup #ProcessTypeInfo : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : documentType.name,
                Label : 'Process Type'
            },
            {
                $Type : 'UI.DataField',
                Value : fileName,
                Label : 'File'
            },
            {
                $Type : 'UI.DataField',
                Value : uploadedBy,
                Label : 'Uploaded By'
            },
            {
                $Type : 'UI.DataField',
                Value : uploadedDate,
                Label : 'Uploaded At/On'
            }
        ]
    },
    UI.DataPoint #Status : {
        Value : status.name,
        Title : 'Status',
        Criticality : statusCriticality
    },
    UI.DataPoint #ReviewStatus : {
        Value : confidenceScore,
        Title : 'Review Status',
        TargetValue : 100,
        Visualization : #Rating,
        MinimumValue : 0,
        MaximumValue : 100
    },
    UI.DataPoint #Transmission : {
        Value : sender,
        Title : 'Transmission'
    },
    UI.DataPoint #ProductItems : {
        Value : productItemsTotal,
        Title : 'Product Items'
    },
    UI.DataPoint #BillingDocuments : {
        Value : billingDocsTotal,
        Title : 'Billing Documents'
    },
    UI.Chart #ReviewStatusRadial : {
        Title : 'Review Status',
        ChartType : #Donut,
        Measures : [confidenceScore],
        MeasureAttributes : [{
            DataPoint : '@UI.DataPoint#ReviewStatus',
            Role : #Axis1,
            Measure : confidenceScore
        }]
    }
);

// Object Page - General Information Section
annotate service.Documents with @(
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : documentType.name,
                Label : 'Process Type'
            },
            {
                $Type : 'UI.DataField',
                Value : sender,
                Label : 'Sold-to Party'
            },
            {
                $Type : 'UI.DataField',
                Value : uploadedBy,
                Label : 'Uploaded By'
            },
            {
                $Type : 'UI.DataField',
                Value : uploadedDate,
                Label : 'Uploaded At'
            }
        ]
    }
);

// Object Page - Extraction Summary Section
annotate service.Documents with @(
    UI.FieldGroup #ExtractionSummary : {
        $Type : 'UI.FieldGroupType',
        Label : 'Extraction Details',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : extractionSummary,
                Label : 'Summary'
            },
            {
                $Type : 'UI.DataField',
                Value : sender,
                Label : 'Sender'
            },
            {
                $Type : 'UI.DataField',
                Value : processingDate,
                Label : 'Extracted On/At'
            }
        ]
    }
);

// Object Page Facets with Icon Tab Bar
annotate service.Documents with @(
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            ID : 'GeneralInformationTab',
            Label : 'General Information',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID : 'GeneralInformation',
                    Label : 'Contact Information',
                    Target : '@UI.FieldGroup#GeneralInformation'
                }
            ]
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AttachmentTab',
            Label : 'Attachment',
            Target : '@UI.FieldGroup#GeneralInformation'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ExtractedBillingDocumentsTab',
            Label : 'Extracted Billing Documents',
            Target : 'extractedDocuments/@UI.LineItem'
        }
    ]
);

// Status with criticality
annotate service.Documents with {
    status @(
        Common.Text : status.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueListWithFixedValues,
        Common.ValueList : {
            CollectionPath : 'DocumentStatus',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : status_code,
                    ValueListProperty : 'code'
                }
            ]
        },
        Common.Label : 'Status'
    );
    uploadedDate @(
        Common.Label : 'Uploaded On/At',
        Core.Immutable : true
    );
    uploadedBy @(
        Common.Label : 'Uploaded By',
        Core.Immutable : true
    );
    fileName @Common.Label : 'File';
    extractionSummary @Common.Label : 'Extraction Summary';
    sender @Common.Label : 'Sender';
    documentType @(
        Common.Label : 'Process Type'
    );
    statusCriticality @UI.Hidden;
    confidenceCriticality @UI.Hidden;
};

// Document Type with value help
annotate service.Documents with {
    documentType @(
        Common.Text : documentType.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueListWithFixedValues,
        Common.ValueList : {
            CollectionPath : 'DocumentType',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : documentType_code,
                    ValueListProperty : 'code'
                }
            ]
        }
    )
};

// Selection Variants for Icon Tab Bar
annotate service.Documents with @(
    UI.SelectionVariant #SelfBilling : {
        $Type : 'UI.SelectionVariantType',
        Text : 'Self Billing Invoice Creation',
        SelectOptions : [
            {
                PropertyName : documentType_code,
                Ranges : [
                    {
                        Sign : #I,
                        Option : #EQ,
                        Low : 'SELF_BILLING'
                    }
                ]
            }
        ]
    },
    UI.SelectionVariant #AutomaticPosting : {
        $Type : 'UI.SelectionVariantType',
        Text : 'Self Billing Automatic Posting',
        SelectOptions : [
            {
                PropertyName : documentType_code,
                Ranges : [
                    {
                        Sign : #I,
                        Option : #EQ,
                        Low : 'INVOICE'
                    }
                ]
            }
        ]
    }
);

// Extracted Billing Documents Table
annotate service.ExtractedBillingDocuments with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : markedAsReviewed,
            Label : 'Mark as Reviewed',
            ![@HTML5.CssDefaults] : {
                width : '10%'
            }
        },
        {
            $Type : 'UI.DataField',
            Value : externalBillingDoc,
            Label : 'External Billing Document',
            ![@HTML5.CssDefaults] : {
                width : '25%'
            }
        },
        {
            $Type : 'UI.DataField',
            Value : productItemsCount,
            Label : 'Product Items',
            ![@HTML5.CssDefaults] : {
                width : '15%'
            }
        },
        {
            $Type : 'UI.DataField',
            Value : billingDocsCount,
            Label : 'Billing Documents',
            ![@HTML5.CssDefaults] : {
                width : '15%'
            }
        },
        {
            $Type : 'UI.DataField',
            Value : reviewStatus.name,
            Label : 'Review Status',
            Criticality : reviewStatusCriticality,
            ![@HTML5.CssDefaults] : {
                width : '20%'
            }
        }
    ],
    UI.HeaderInfo : {
        TypeName : 'Extracted Billing Document',
        TypeNamePlural : 'Extracted Billing Documents',
        Title : {
            $Type : 'UI.DataField',
            Value : billingDocNumber
        }
    }
);

// Review Status with criticality
annotate service.ExtractedBillingDocuments with {
    reviewStatus @(
        Common.Text : reviewStatus.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueListWithFixedValues,
        Common.ValueList : {
            CollectionPath : 'ReviewStatus',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : reviewStatus_code,
                    ValueListProperty : 'code'
                }
            ]
        }
    );
    reviewStatusCriticality @UI.Hidden;
    markedAsReviewed @(
        Common.Label : 'Mark as Reviewed',
        UI.Hidden : false
    );
};

