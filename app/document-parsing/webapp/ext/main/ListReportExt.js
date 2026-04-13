sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/core/Fragment"
], function(ControllerExtension, Fragment) {
    'use strict';

    return ControllerExtension.extend("documentparsing.ext.main.ListReportExt", {
        override: {
            onInit: function() {
                // Call the original onInit
                if (this.base && this.base.onInit) {
                    this.base.onInit.apply(this, arguments);
                }

                // Add ShellBar to the page
                this._addShellBar();
            }
        },

        _addShellBar: function() {
            var oView = this.base.getView();

            Fragment.load({
                id: oView.getId(),
                name: "documentparsing.ext.fragment.CustomShellBar",
                controller: this
            }).then(function(oShellBar) {
                // Get the page content
                var oPage = oView.getContent()[0];
                if (oPage && oPage.insertContent) {
                    oPage.insertContent(oShellBar, 0);
                }
            });
        }
    });
});
