using packaging.orders from '../db/schema';

service CatalogService {
    @odata.draft.enabled
    entity PackagingOrders as projection on orders.PackagingOrders;

    entity PackagingOrderItems as projection on orders.PackagingOrderItems;
    entity BusinessPartners as projection on orders.BusinessPartners;
    entity Materials as projection on orders.Materials;
    entity PackagingStandards as projection on orders.PackagingStandards;

    action submitOrder(orderID: UUID) returns PackagingOrders;
    action approveOrder(orderID: UUID) returns PackagingOrders;
    action rejectOrder(orderID: UUID, reason: String) returns PackagingOrders;
}
