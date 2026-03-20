sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"
], function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("transmissionjobs.manageschedules.controller.App", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var oArguments = oEvent.getParameter("arguments");

            this._updateUIElements();

            this.currentRoute = sRouteName;
            this.currentKey = oArguments.key;
        },

        onStateChanged: function (oEvent) {
            var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
                sLayout = oEvent.getParameter("layout");

            this._updateUIElements();

            if (bIsNavigationArrow) {
                this.oRouter.navTo(this.currentRoute, {key: this.currentKey, layout: sLayout}, true);
            }
        },

        _updateUIElements: function () {
            var oModel = this.getOwnerComponent().getModel("appView");
            var oUIState = this.getOwnerComponent().getAggregation("rootControl").getLayout();
            oModel.setProperty("/layout", oUIState);
        }
    });
});
