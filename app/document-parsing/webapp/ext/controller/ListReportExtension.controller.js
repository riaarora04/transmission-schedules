sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(MessageToast, MessageBox) {
    'use strict';

    return {
        onHomeIconPressed: function(oEvent) {
            MessageToast.show("Navigate to home");
            // Navigate to launchpad or home
            window.location.href = "/";
        },

        onSearchButtonPressed: function(oEvent) {
            MessageToast.show("Search functionality");
        },

        onUserPress: function(oEvent) {
            MessageToast.show("User profile menu");
        },

        onExtractDocuments: function(oEvent) {
            const oTable = oEvent.getSource().getParent().getParent();
            const aSelectedContexts = oTable.getSelectedContexts();

            if (aSelectedContexts.length === 0) {
                MessageToast.show("Please select at least one document to extract");
                return;
            }

            const aSelectedDocs = aSelectedContexts.map(ctx => {
                return ctx.getObject().documentID;
            });

            MessageBox.confirm(
                `Extract ${aSelectedContexts.length} document(s)?\n\n${aSelectedDocs.join(', ')}`,
                {
                    title: "Confirm Extraction",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function(sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            MessageToast.show(`Extracting ${aSelectedContexts.length} document(s)...`);

                            // Call extraction service
                            aSelectedContexts.forEach(ctx => {
                                const oModel = ctx.getModel();
                                const sPath = ctx.getPath();

                                // Update status to PROCESSING
                                oModel.setProperty(sPath + "/status_code", "PROCESSING");

                                // Simulate extraction - in real app, call OData action
                                setTimeout(() => {
                                    oModel.setProperty(sPath + "/status_code", "REVIEW");
                                    MessageToast.show("Extraction complete");
                                }, 3000);
                            });
                        }
                    }
                }
            );
        }
    };
});
