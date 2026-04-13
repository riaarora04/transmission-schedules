sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library"
], function(UIComponent, JSONModel, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
    "use strict";

    return UIComponent.extend("transmissionschedules.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            // Call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // Create layout model for FlexibleColumnLayout
            var oModel = new JSONModel({
                layout: fioriLibrary.LayoutType.OneColumn,
                previousLayout: "",
                actionButtonsInfo: {
                    midColumn: {
                        fullScreen: false
                    }
                }
            });
            this.setModel(oModel, "layout");

            // Initialize the router
            this.getRouter().initialize();
        },

        getHelper: function() {
            var oFCL = this.getRootControl().byId("app").byId("flexibleColumnLayout");
            var oSettings = {
                defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded,
                maxColumnsCount: 2
            };

            return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
        }
    });
});
