namespace packaging.orders;

entity PackagingOrders {
    key ID                : UUID;
        material          : String;
        materialDescription: String;
        packagingStandard : String;
        plant             : String;
        storageLocation   : String;
        requiredDate      : Date;
        deliveryDate      : Date;
        status            : String enum {
            Requested;
            Approved;
            Rejected;
            Error;
        };
        businessPartner   : Association to BusinessPartners;
        items             : Composition of many PackagingOrderItems on items.order = $self;
        createdAt         : Timestamp;
        createdBy         : String;
        modifiedAt        : Timestamp;
        modifiedBy        : String;
}

entity PackagingOrderItems {
    key ID              : UUID;
        order           : Association to PackagingOrders;
        position        : Integer;
        material        : String;
        quantity        : Integer;
        unit            : String;
        packagingType   : String;
        status          : String;
}

entity BusinessPartners {
    key ID              : String;
        name            : String;
        street          : String;
        city            : String;
        postalCode      : String;
        country         : String;
        email           : String;
        phone           : String;
}

entity Materials {
    key ID              : String;
        description     : String;
        type            : String;
        stockQuantity   : Integer;
        unit            : String;
        plant           : String;
        storageLocation : String;
}

entity PackagingStandards {
    key ID              : String;
        description     : String;
        type            : String;
        dimensions      : String;
        weight          : Decimal(10,2);
        unit            : String;
}
