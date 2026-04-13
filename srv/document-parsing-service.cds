using {document.parsing as db} from '../db/document-parsing-schema';

service DocumentParsingService @(path: '/document-parsing') {
  @odata.draft.enabled
  entity Documents as projection on db.Documents {
    *,
    // Virtual fields for header facets
    virtual transmissionsCount : Integer @title: 'Transmissions Count',
    virtual productItemsTotal : Integer @title: 'Product Items Total',
    virtual billingDocsTotal : Integer @title: 'Billing Documents Total'
  } actions {
    action uploadDocument(fileName: String, fileContent: LargeBinary) returns Documents;
    action extractDocument() returns Documents;
    action publishDocument() returns Documents;
  };

  entity ExtractedBillingDocuments as projection on db.ExtractedBillingDocuments actions {
    action approveExtraction() returns ExtractedBillingDocuments;
    action rejectExtraction(reason: String) returns ExtractedBillingDocuments;
  };

  entity DocumentStatus as projection on db.DocumentStatus;
  entity DocumentType as projection on db.DocumentType;
  entity ReviewStatus as projection on db.ReviewStatus;
}
