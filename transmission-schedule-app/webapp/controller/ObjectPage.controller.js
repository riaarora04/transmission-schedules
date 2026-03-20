sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/f/library"
], function(Controller, MessageBox, MessageToast, fioriLibrary) {
    "use strict";

    return Controller.extend("transmissionschedules.controller.ObjectPage", {

        onInit: function() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("objectPage").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var sScheduleId = oEvent.getParameter("arguments").scheduleId;
            var oScheduleModel = this.getOwnerComponent().getModel("schedules");
            var aSchedules = oScheduleModel.getProperty("/schedules");

            // Find schedule by ID
            var oSchedule = aSchedules.find(function(schedule) {
                return schedule.scheduleId === sScheduleId;
            });

            if (oSchedule) {
                // Bind view to selected schedule
                var sPath = "/schedules/" + aSchedules.indexOf(oSchedule);
                this.getView().bindElement({
                    path: sPath,
                    model: "schedules"
                });
            }
        },

        onClose: function() {
            // Navigate back to list report
            var oModel = this.getOwnerComponent().getModel("layout");
            oModel.setProperty("/layout", fioriLibrary.LayoutType.OneColumn);
            this.oRouter.navTo("listReport");
        },

        onEdit: function() {
            MessageBox.information(
                this.getView().getModel("i18n").getResourceBundle().getText("editDialogMessage"),
                {
                    title: this.getView().getModel("i18n").getResourceBundle().getText("edit")
                }
            );
        },

        onDelete: function() {
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            MessageBox.warning(
                oResourceBundle.getText("deleteConfirmMessage"),
                {
                    title: oResourceBundle.getText("delete"),
                    actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.DELETE,
                    onClose: function(oAction) {
                        if (oAction === MessageBox.Action.DELETE) {
                            MessageToast.show(oResourceBundle.getText("deleteSuccess"));
                            this.onClose();
                        }
                    }.bind(this)
                }
            );
        },

        onActivate: function() {
            var oContext = this.getView().getBindingContext("schedules");
            oContext.getModel().setProperty(oContext.getPath() + "/status", "Active");
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("scheduleActivated"));
        },

        onDeactivate: function() {
            var oContext = this.getView().getBindingContext("schedules");
            oContext.getModel().setProperty(oContext.getPath() + "/status", "Inactive");
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("scheduleDeactivated"));
        },

        onExecuteNow: function() {
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            MessageBox.confirm(
                oResourceBundle.getText("executeNowConfirm"),
                {
                    title: oResourceBundle.getText("executeNow"),
                    onClose: function(oAction) {
                        if (oAction === MessageBox.Action.OK) {
                            MessageToast.show(oResourceBundle.getText("executionStarted"));
                        }
                    }
                }
            );
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
        },

        formatExecutionState: function(sStatus) {
            switch (sStatus) {
                case "Success":
                    return "Success";
                case "Failed":
                    return "Error";
                case "Running":
                    return "Warning";
                default:
                    return "None";
            }
        }
    });
});
