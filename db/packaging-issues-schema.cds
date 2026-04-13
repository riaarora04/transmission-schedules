namespace packaging.issues;

entity PackagingIssues {
    key id              : String;
        category        : String;
        status          : String;
        priority        : String;
        description     : String;
        summary         : String;
        summaryFull     : LargeString;
        materialCode    : String;
        deliveryDate    : Date;
        plant           : String;
        quantity        : Integer;

        // Inquiry category fields
        inquirySubcategory : String;
        accountNumber      : String;
        requestedAction    : String;

        // Posting Difference fields
        differenceType     : String;
        expectedValue      : String;
        actualValue        : String;
        exchangePartner    : String;
        postingDate        : Date;
        expectedPostingDate: Date;
        deliveryNoteNumber : String;
        quantityExpected   : Integer;
        quantityActual     : Integer;

        // Posting Missing fields
        missingDocumentType: String;
        referenceNumber    : String;
        expectedDocuments  : String;

        issues          : Composition of many PackagingIssueItems
                              on issues.parent = $self;
}

entity PackagingIssueItems {
    key id     : UUID;
        parent : Association to PackagingIssues;
        text   : String;
        type   : String;  // field that has the issue
        expectedValue : String;
        actualValue   : String;
}

// Code lists
entity IssueCategories {
    key code : String;
        name : String;
}

entity IssueStatuses {
    key code : String;
        name : String;
}

entity IssuePriorities {
    key code : String;
        name : String;
}

entity InquirySubcategories {
    key code : String;
        name : String;
}

entity DifferenceTypes {
    key code : String;
        name : String;
}

entity MissingDocumentTypes {
    key code : String;
        name : String;
}
