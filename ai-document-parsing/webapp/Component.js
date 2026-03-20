sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("com.sap.selfbilling.documentparsing.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Create the views based on the url/hash
            this.getRouter().initialize();

            // Initialize app state model
            var oAppModel = new JSONModel({
                currentDocumentId: null,
                uploadProgress: 0,
                extractionProgress: 0,
                isUploading: false,
                isExtracting: false,
                reviewProgress: 0
            });
            this.setModel(oAppModel, "appState");
        }
    });
});
