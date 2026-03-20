sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "transmissionjobs/manageschedules/model/formatter",
    "sap/f/library",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, JSONModel, formatter, fioriLibrary, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("transmissionjobs.manageschedules.controller.SchedulesObjectPage", {
        formatter: formatter,

        onInit: function () {
            var oViewModel = new JSONModel({
                busy: false,
                editMode: false,
                headerExpanded: true
            });
            this.getView().setModel(oViewModel, "objectView");

            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("SchedulesObjectPage").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sObjectId = oEvent.getParameter("arguments").key;
            this.getView().bindElement({
                path: "/Schedules(" + sObjectId + ")",
                parameters: {
                    $expand: "status,category,issueType,frequency,priority"
                },
                events: {
                    dataRequested: function () {
                        this.getView().getModel("objectView").setProperty("/busy", true);
                    }.bind(this),
                    dataReceived: function () {
                        this.getView().getModel("objectView").setProperty("/busy", false);
                    }.bind(this)
                }
            });
        },

        onEdit: function () {
            this.getView().getModel("objectView").setProperty("/editMode", true);
        },

        onSave: function () {
            var oView = this.getView();
            var oModel = oView.getModel();
            var oContext = oView.getBindingContext();

            if (oModel.hasPendingChanges()) {
                oModel.submitBatch("schedulesGroup").then(function () {
                    MessageToast.show("Schedule saved successfully");
                    this.getView().getModel("objectView").setProperty("/editMode", false);
                }.bind(this), function (oError) {
                    MessageBox.error("Error saving schedule: " + oError.message);
                });
            } else {
                this.getView().getModel("objectView").setProperty("/editMode", false);
            }
        },

        onCancel: function () {
            var oView = this.getView();
            var oModel = oView.getModel();

            if (oModel.hasPendingChanges()) {
                MessageBox.confirm("Discard changes?", {
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.OK) {
                            oModel.resetChanges();
                            this.getView().getModel("objectView").setProperty("/editMode", false);
                        }
                    }.bind(this)
                });
            } else {
                this.getView().getModel("objectView").setProperty("/editMode", false);
            }
        },

        onDelete: function () {
            var oView = this.getView();
            var oModel = oView.getModel();
            var oContext = oView.getBindingContext();

            MessageBox.confirm("Delete this schedule?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        oContext.delete().then(function () {
                            MessageToast.show("Schedule deleted successfully");
                            this.onClose();
                        }.bind(this), function (oError) {
                            MessageBox.error("Error deleting schedule: " + oError.message);
                        });
                    }
                }.bind(this)
            });
        },

        onClose: function () {
            var oAppModel = this.getOwnerComponent().getModel("appView");
            oAppModel.setProperty("/layout", "OneColumn");
            this.oRouter.navTo("SchedulesList");
        }
    });
});
