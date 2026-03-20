sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.sap.selfbilling.documentparsing.controller.Launchpad", {
        onInit: function () {
            // Controller initialization
        },

        onAITilePress: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("listReport");
        },

        onTabSelect: function (oEvent) {
            var sKey = oEvent.getParameter("key");
            // Tab selection logic can be implemented here if needed
            // For now, only "selfBilling" tab has content
        }
    });
});
