sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "transmissionjobs/manageschedules/model/formatter",
    "sap/f/library",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Fragment, formatter, fioriLibrary, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("transmissionjobs.manageschedules.controller.SchedulesList", {
        formatter: formatter,

        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this._bDescendingSort = false;

            var oViewModel = new JSONModel({
                busy: false,
                hasUIChanges: false
            });
            this.getView().setModel(oViewModel, "listView");
        },

        onFilterBarSearch: function (oEvent) {
            var aTableFilters = oEvent.getParameter("selectionSet");
            this._applyFilters(aTableFilters);
        },

        onFilterBarChange: function (oEvent) {
            // Filter bar state changed
        },

        onBeforeRebindTable: function (oEvent) {
            var mBindingParams = oEvent.getParameter("bindingParams");
            mBindingParams.parameters.$$updateGroupId = "schedulesGroup";
        },

        onSmartTableInit: function (oEvent) {
            var oSmartTable = oEvent.getSource();
        },

        _applyFilters: function (aTableFilters) {
            var oTable = this.byId("schedulesTable");
            oTable.rebindTable();
        },

        onSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var oCtx = oItem.getBindingContext();
            var sKey = oCtx.getProperty("ID");

            this.oRouter.navTo("SchedulesObjectPage", {
                key: sKey
            });
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext();
            var sKey = oCtx.getProperty("ID");

            this.oRouter.navTo("SchedulesObjectPage", {
                key: sKey
            });
        },

        onCreateSchedule: function () {
            var oView = this.getView();
            var oModel = oView.getModel();

            if (!this._oCreateDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "transmissionjobs.manageschedules.view.CreateScheduleDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oCreateDialog = oDialog;
                    oView.addDependent(this._oCreateDialog);
                    this._oCreateDialog.open();
                }.bind(this));
            } else {
                this._oCreateDialog.open();
            }
        },

        onCancelCreate: function () {
            this._oCreateDialog.close();
        },

        onSaveCreate: function () {
            var oView = this.getView();
            var oModel = oView.getModel();
            var oListBinding = oModel.bindList("/Schedules");

            var oNewSchedule = {
                scheduleID: this.byId("createScheduleID").getValue(),
                status_code: this.byId("createStatus").getSelectedKey(),
                category_code: this.byId("createCategory").getSelectedKey(),
                issueType_code: this.byId("createIssueType").getSelectedKey(),
                soldToParty: this.byId("createSoldToParty").getValue(),
                soldToPartyName: this.byId("createSoldToPartyName").getValue(),
                startDate: this.byId("createStartDate").getDateValue(),
                endDate: this.byId("createEndDate").getDateValue(),
                frequency_code: this.byId("createFrequency").getSelectedKey(),
                transmissionTime: this.byId("createTime").getDateValue(),
                description: this.byId("createDescription").getValue(),
                priority_code: this.byId("createPriority").getSelectedKey(),
                contactPerson: this.byId("createContactPerson").getValue(),
                contactEmail: this.byId("createContactEmail").getValue(),
                executionCount: 0,
                successCount: 0,
                failureCount: 0
            };

            var oContext = oListBinding.create(oNewSchedule);

            oContext.created().then(function () {
                MessageToast.show("Schedule created successfully");
                this._oCreateDialog.close();
                this.byId("schedulesTable").rebindTable();
            }.bind(this), function (oError) {
                MessageBox.error("Error creating schedule: " + oError.message);
            });
        },

        onExport: function () {
            MessageToast.show("Export functionality would export table data to Excel");
        },

        onTableSettings: function () {
            var oTable = this.byId("schedulesTable");
            oTable.openTablePersonalisationDialog();
        }
    });
});
