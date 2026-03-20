sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/f/library"
], function(Controller, JSONModel, Fragment, MessageBox, MessageToast, Filter, FilterOperator, fioriLibrary) {
    "use strict";

    return Controller.extend("transmissionschedules.controller.ListReport", {

        onInit: function() {
            // Initialize status values for filter
            var oScheduleModel = this.getOwnerComponent().getModel("schedules");
            oScheduleModel.setProperty("/statusValues", [
                { key: "", text: "All" },
                { key: "Active", text: "Active" },
                { key: "Inactive", text: "Inactive" },
                { key: "Scheduled", text: "Scheduled" },
                { key: "Running", text: "Running" },
                { key: "Error", text: "Error" }
            ]);

            // Get router
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("listReport").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function() {
            // Reset layout to one column when returning to list
            var oModel = this.getOwnerComponent().getModel("layout");
            oModel.setProperty("/layout", fioriLibrary.LayoutType.OneColumn);
        },

        onSearch: function() {
            var aFilters = [];
            var oFilterBar = this.byId("filterBar");

            // Get filter values
            var sScheduleId = this.byId("scheduleIdFilter").getValue();
            var sStatus = this.byId("statusFilter").getSelectedKey();
            var sCategory = this.byId("categoryFilter").getValue();
            var sIssueType = this.byId("issueTypeFilter").getValue();
            var sSoldToParty = this.byId("soldToPartyFilter").getValue();
            var oValidFrom = this.byId("validFromFilter").getDateValue();
            var oValidTo = this.byId("validToFilter").getDateValue();

            // Build filters
            if (sScheduleId) {
                aFilters.push(new Filter("scheduleId", FilterOperator.Contains, sScheduleId));
            }
            if (sStatus) {
                aFilters.push(new Filter("status", FilterOperator.EQ, sStatus));
            }
            if (sCategory) {
                aFilters.push(new Filter("category", FilterOperator.Contains, sCategory));
            }
            if (sIssueType) {
                aFilters.push(new Filter("issueType", FilterOperator.Contains, sIssueType));
            }
            if (sSoldToParty) {
                aFilters.push(new Filter("soldToParty", FilterOperator.Contains, sSoldToParty));
            }
            if (oValidFrom) {
                aFilters.push(new Filter("validFrom", FilterOperator.GE, oValidFrom));
            }
            if (oValidTo) {
                aFilters.push(new Filter("validTo", FilterOperator.LE, oValidTo));
            }

            // Apply filters to table
            var oTable = this.byId("schedulesTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);

            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("searchExecuted"));
        },

        onReset: function() {
            // Clear all filter fields
            this.byId("scheduleIdFilter").setValue("");
            this.byId("statusFilter").setSelectedKey("");
            this.byId("categoryFilter").setValue("");
            this.byId("issueTypeFilter").setValue("");
            this.byId("soldToPartyFilter").setValue("");
            this.byId("validFromFilter").setValue("");
            this.byId("validToFilter").setValue("");

            // Clear table filter
            var oTable = this.byId("schedulesTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter([]);

            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("filtersCleared"));
        },

        onSelectionChange: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oContext = oSelectedItem.getBindingContext("schedules");
            var sScheduleId = oContext.getProperty("scheduleId");

            // Update layout to two columns
            var oModel = this.getOwnerComponent().getModel("layout");
            oModel.setProperty("/layout", fioriLibrary.LayoutType.TwoColumnsMidExpanded);

            // Navigate to object page
            this.oRouter.navTo("objectPage", {
                scheduleId: sScheduleId
            });
        },

        onCreateSchedule: function() {
            MessageBox.information(
                this.getView().getModel("i18n").getResourceBundle().getText("createDialogMessage"),
                {
                    title: this.getView().getModel("i18n").getResourceBundle().getText("createButton")
                }
            );
        },

        onSort: function() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("sortFunctionality"));
        },

        onExport: function() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("exportFunctionality"));
        },

        formatStatusState: function(sStatus) {
            switch (sStatus) {
                case "Active":
                    return "Success";
                case "Scheduled":
                    return "Information";
                case "Inactive":
                    return "None";
                case "Running":
                    return "Warning";
                case "Error":
                    return "Error";
                default:
                    return "None";
            }
        }
    });
});
