sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.sap.selfbilling.documentparsing.controller.ListReport", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("listReport").attachPatternMatched(this._onRouteMatched, this);

            // Initialize selected documents array in model
            var oModel = this.getOwnerComponent().getModel();
            oModel.setProperty("/selectedDocuments", []);
        },

        _onRouteMatched: function () {
            // Refresh data when navigating to this view
            this._loadDocuments();
        },

        _loadDocuments: function () {
            // In a real app, this would load from backend
            // For now, we'll work with the model data
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("launchpad");
        },

        onFilterGo: function () {
            var oView = this.getView();
            var oTable = oView.byId("documentsTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];

            // Process Type filter
            var sProcessType = oView.byId("processTypeFilter").getSelectedKey();
            if (sProcessType) {
                aFilters.push(new Filter("processType", FilterOperator.EQ, sProcessType));
            }

            // Sold-to Party filter
            var sSoldToParty = oView.byId("soldToPartyFilter").getValue();
            if (sSoldToParty) {
                aFilters.push(new Filter("soldToParty", FilterOperator.Contains, sSoldToParty));
            }

            // Status filter
            var sStatus = oView.byId("statusFilter").getSelectedKey();
            if (sStatus) {
                aFilters.push(new Filter("status", FilterOperator.EQ, sStatus));
            }

            // Date filter
            var oDatePicker = oView.byId("uploadedDateFilter");
            var oDate = oDatePicker.getDateValue();
            if (oDate) {
                var sDate = oDate.toISOString().split('T')[0];
                aFilters.push(new Filter("uploadedAt", FilterOperator.Contains, sDate));
            }

            oBinding.filter(aFilters);
        },

        onFilterClear: function () {
            var oView = this.getView();

            // Clear all filter fields
            oView.byId("processTypeFilter").setSelectedKey("");
            oView.byId("soldToPartyFilter").setValue("");
            oView.byId("statusFilter").setSelectedKey("");
            oView.byId("uploadedDateFilter").setValue("");

            // Clear table filters
            var oTable = oView.byId("documentsTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter([]);
        },

        onTabSelect: function (oEvent) {
            var sKey = oEvent.getParameter("key");
            // Tab selection logic - different tabs show different data
        },

        onCreateNew: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("create");
        },

        onSelectionChange: function (oEvent) {
            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();
            var oModel = this.getOwnerComponent().getModel();

            // Update selected documents in model
            oModel.setProperty("/selectedDocuments", aSelectedItems.map(function(oItem) {
                return oItem.getBindingContext().getObject();
            }));
        },

        onDocumentPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var oContext = oItem.getBindingContext();
            var sDocumentId = oContext.getProperty("documentId");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("createWithId", {
                documentId: sDocumentId
            });
        },

        onDelete: function () {
            var oModel = this.getOwnerComponent().getModel();
            var aSelectedDocuments = oModel.getProperty("/selectedDocuments");
            var aDocuments = oModel.getProperty("/documents");

            if (aSelectedDocuments.length === 0) {
                return;
            }

            // Remove selected documents
            var aSelectedIds = aSelectedDocuments.map(function(oDoc) {
                return oDoc.documentId;
            });

            var aRemainingDocuments = aDocuments.filter(function(oDoc) {
                return aSelectedIds.indexOf(oDoc.documentId) === -1;
            });

            oModel.setProperty("/documents", aRemainingDocuments);
            oModel.setProperty("/selectedDocuments", []);

            // Clear table selection
            var oTable = this.getView().byId("documentsTable");
            oTable.removeSelections(true);

            sap.m.MessageToast.show("Document(s) deleted");
        }
    });
});
