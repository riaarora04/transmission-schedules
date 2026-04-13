using PackagingIssuesService as service from '../../srv/packaging-issues-service';

annotate service.PackagingIssues with @(
    UI.LineItem            : [
        {
            $Type: 'UI.DataField',
            Value: id,
            Label: 'ID'
        },
        {
            $Type: 'UI.DataField',
            Value: category,
            Label: 'Category'
        },
        {
            $Type            : 'UI.DataField',
            Value            : status,
            Label            : 'Status',
            Criticality      : criticality,
            CriticalityRepresentation: #WithIcon
        },
        {
            $Type            : 'UI.DataField',
            Value            : priority,
            Label            : 'Priority',
            Criticality      : priorityCriticality
        },
        {
            $Type: 'UI.DataField',
            Value: description,
            Label: 'Description'
        },
        {
            $Type: 'UI.DataFieldWithUrl',
            Value: summary,
            Label: 'Summary',
            Url: summaryFull
        },
        {
            $Type: 'UI.DataField',
            Value: materialCode,
            Label: 'Material Code'
        },
        {
            $Type: 'UI.DataField',
            Value: deliveryDate,
            Label: 'Delivery Date'
        },
        {
            $Type: 'UI.DataField',
            Value: plant,
            Label: 'Plant'
        },
        {
            $Type: 'UI.DataField',
            Value: quantity,
            Label: 'Quantity'
        }
    ],
    UI.SelectionFields     : [
        category,
        status,
        priority,
        materialCode,
        plant
    ],
    UI.HeaderInfo          : {
        TypeName      : 'Packaging Issue',
        TypeNamePlural: 'Packaging Issues',
        Title         : {Value: id},
        Description   : {Value: description}
    },
    UI.Facets              : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Inquiry Details',
            Target: '@UI.FieldGroup#InquiryDetails',
            ![@UI.Hidden]: {$edmJson: {$Ne: [{$Path: 'category'}, 'Inquiry']}}
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Posting Difference Details',
            Target: '@UI.FieldGroup#PostingDifferenceDetails',
            ![@UI.Hidden]: {$edmJson: {$Ne: [{$Path: 'category'}, 'Posting Difference']}}
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Posting Missing Details',
            Target: '@UI.FieldGroup#PostingMissingDetails',
            ![@UI.Hidden]: {$edmJson: {$Ne: [{$Path: 'category'}, 'Posting Missing']}}
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Issue Line Items',
            Target: 'issues/@UI.LineItem'
        }
    ],
    UI.FieldGroup #GeneralInfo: {Data: [
        {Value: id},
        {Value: category},
        {Value: status},
        {Value: priority},
        {Value: description},
        {Value: summaryFull},
        {Value: materialCode},
        {Value: deliveryDate},
        {Value: plant},
        {Value: quantity}
    ]},
    UI.FieldGroup #InquiryDetails: {Data: [
        {Value: inquirySubcategory},
        {Value: accountNumber},
        {Value: requestedAction}
    ]},
    UI.FieldGroup #PostingDifferenceDetails: {Data: [
        {Value: differenceType},
        {Value: expectedValue},
        {Value: actualValue},
        {Value: exchangePartner},
        {Value: postingDate},
        {Value: expectedPostingDate},
        {Value: deliveryNoteNumber},
        {Value: quantityExpected},
        {Value: quantityActual}
    ]},
    UI.FieldGroup #PostingMissingDetails: {Data: [
        {Value: missingDocumentType},
        {Value: referenceNumber},
        {Value: expectedDocuments}
    ]}
);

annotate service.PackagingIssues with {
    id                   @title: 'ID';

    category             @title: 'Category'
                         @Common.ValueList: {
                             CollectionPath: 'IssueCategories',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: category,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };

    status               @title: 'Status'
                         @Common.ValueList: {
                             CollectionPath: 'IssueStatuses',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: status,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };

    priority             @title: 'Priority'
                         @Common.ValueList: {
                             CollectionPath: 'IssuePriorities',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: priority,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };

    description          @title: 'Description';
    summary              @title: 'Summary'
                         @Common.FieldControl: #ReadOnly
                         @UI.MultiLineText: false;
    summaryFull          @title: 'Summary Details'
                         @UI.MultiLineText;
    materialCode         @title: 'Material Code';
    deliveryDate         @title: 'Delivery Date';
    plant                @title: 'Plant';
    quantity             @title: 'Quantity';

    // Inquiry fields
    inquirySubcategory   @title: 'Subcategory'
                         @Common.ValueList: {
                             CollectionPath: 'InquirySubcategories',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: inquirySubcategory,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };
    accountNumber        @title: 'Account Number';
    requestedAction      @title: 'Requested Action'  @UI.MultiLineText;

    // Posting Difference fields
    differenceType       @title: 'Difference Type'
                         @Common.ValueList: {
                             CollectionPath: 'DifferenceTypes',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: differenceType,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };
    expectedValue        @title: 'Expected Value';
    actualValue          @title: 'Actual Value';
    exchangePartner      @title: 'Exchange Partner';
    postingDate          @title: 'Posting Date';
    expectedPostingDate  @title: 'Expected Posting Date';
    deliveryNoteNumber   @title: 'Delivery Note';
    quantityExpected     @title: 'Expected Quantity';
    quantityActual       @title: 'Actual Quantity';

    // Posting Missing fields
    missingDocumentType  @title: 'Missing Document Type'
                         @Common.ValueList: {
                             CollectionPath: 'MissingDocumentTypes',
                             Parameters: [
                                 {
                                     $Type: 'Common.ValueListParameterInOut',
                                     LocalDataProperty: missingDocumentType,
                                     ValueListProperty: 'code'
                                 },
                                 {
                                     $Type: 'Common.ValueListParameterDisplayOnly',
                                     ValueListProperty: 'name'
                                 }
                             ]
                         };
    referenceNumber      @title: 'Reference Number';
    expectedDocuments    @title: 'Expected Documents'  @UI.MultiLineText;
}

annotate service.PackagingIssueItems with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: type,
        Label: 'Issue Type'
    },
    {
        $Type: 'UI.DataField',
        Value: text,
        Label: 'Description'
    },
    {
        $Type: 'UI.DataField',
        Value: expectedValue,
        Label: 'Expected'
    },
    {
        $Type: 'UI.DataField',
        Value: actualValue,
        Label: 'Actual'
    }
]);

annotate service.PackagingIssueItems with {
    type          @title: 'Issue Type';
    text          @title: 'Description';
    expectedValue @title: 'Expected Value';
    actualValue   @title: 'Actual Value';
}
