namespace document.parsing;

using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';

entity Documents : cuid, managed {
    documentID          : String(20) @title: 'Document ID';
    status              : Association to DocumentStatus @title: 'Status';
    extractionSummary   : String(500) @title: 'Extraction Summary';
    sender              : String(100) @title: 'Sender';
    uploadedBy          : String(100) @title: 'Uploaded By';
    uploadedDate        : DateTime @title: 'Uploaded Date';
    documentType        : Association to DocumentType @title: 'Document Type';
    fileName            : String(255) @title: 'File Name';
    fileSize            : Integer @title: 'File Size (KB)';
    processingDate      : DateTime @title: 'Processing Date';
    confidenceScore     : Decimal(5,2) @title: 'Confidence Score (%)';
    reviewedBy          : String(100) @title: 'Reviewed By';
    reviewedDate        : DateTime @title: 'Reviewed Date';
    notes               : String(1000) @title: 'Notes';

    // Navigation to extracted billing documents
    extractedDocuments  : Composition of many ExtractedBillingDocuments on extractedDocuments.document = $self;

    // Virtual fields for criticality
    statusCriticality   : Integer @title: 'Status Criticality';
    confidenceCriticality : Integer @title: 'Confidence Criticality';
}

entity ExtractedBillingDocuments : cuid, managed {
    document            : Association to Documents @title: 'Source Document';
    billingDocNumber    : String(20) @title: 'Billing Document Number';
    externalBillingDoc  : String(20) @title: 'External Billing Document';
    referenceDocument   : String(20) @title: 'Reference Document';
    billingDate         : Date @title: 'Billing Date';
    customerID          : String(10) @title: 'Customer ID';
    customerName        : String(100) @title: 'Customer Name';
    totalAmount         : Decimal(15,2) @title: 'Total Amount';
    currency            : String(3) @title: 'Currency';
    productItemsCount   : Integer @title: 'Product Items Count';
    billingDocsCount    : Integer @title: 'Billing Documents Count';
    reviewStatus        : Association to ReviewStatus @title: 'Review Status';
    extractedFields     : String(5000) @title: 'Extracted Fields (JSON)';
    validationErrors    : String(1000) @title: 'Validation Errors';
    reviewedBy          : String(100) @title: 'Reviewed By';
    reviewedDate        : DateTime @title: 'Reviewed Date';
    publishedDate       : DateTime @title: 'Published Date';
    markedAsReviewed    : Boolean default false @title: 'Marked as Reviewed';

    // Virtual fields for criticality
    reviewStatusCriticality : Integer @title: 'Review Status Criticality';
}

entity DocumentStatus : CodeList {
    key code : String(20);
    criticality : Integer @title: 'Criticality';
}

entity DocumentType : CodeList {
    key code : String(20);
    description : String(255) @title: 'Description';
}

entity ReviewStatus : CodeList {
    key code : String(20);
    criticality : Integer @title: 'Criticality';
}
