sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(MessageToast, MessageBox) {
    'use strict';

    return {
        onUploadPress: function(oEvent) {
            var oView = this.getView();
            var oContext = oView.getBindingContext();

            if (!oContext) {
                MessageBox.error("Please save the document first before uploading a file.");
                return;
            }

            var oModel = oContext.getModel();
            var sPath = oContext.getPath();

            // Create file input element
            var oFileInput = document.createElement('input');
            oFileInput.type = 'file';
            oFileInput.accept = '.pdf,.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg';
            oFileInput.style.display = 'none';

            // Add to DOM
            document.body.appendChild(oFileInput);

            // Handle file selection
            oFileInput.onchange = function(e) {
                var file = e.target.files[0];
                if (file) {
                    MessageToast.show("Uploading file: " + file.name);

                    // Update document properties
                    oModel.setProperty(sPath + "/status_code", "UPLOADED");
                    oModel.setProperty(sPath + "/fileName", file.name);
                    oModel.setProperty(sPath + "/fileSize", Math.round(file.size / 1024)); // KB
                    oModel.setProperty(sPath + "/uploadedDate", new Date().toISOString());
                    oModel.setProperty(sPath + "/uploadedBy", "Current User");

                    // Submit changes
                    oModel.submitBatch("updateGroup").then(function() {
                        MessageToast.show("File uploaded successfully. Status: Uploaded");
                        // Clean up
                        document.body.removeChild(oFileInput);
                    }).catch(function(oError) {
                        // Set status to ERROR if upload fails
                        oModel.setProperty(sPath + "/status_code", "ERROR");
                        MessageBox.error("Upload failed: " + (oError.message || "Unknown error"));
                        // Clean up
                        document.body.removeChild(oFileInput);
                    });
                } else {
                    // No file selected, clean up
                    document.body.removeChild(oFileInput);
                }
            }.bind(this);

            // Trigger file selection dialog
            oFileInput.click();
        },

        onExtractPress: function(oEvent) {
            var oContext = this.getView().getBindingContext();
            var oModel = oContext.getModel();
            var sPath = oContext.getPath();
            var sCurrentStatus = oModel.getProperty(sPath + "/status_code");

            // Only allow extraction if status is UPLOADED
            if (sCurrentStatus !== "UPLOADED") {
                MessageBox.warning("Document must be uploaded before extraction can begin.");
                return;
            }

            MessageBox.confirm("Start AI extraction for this document?", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function(oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        // Update status to ANALYSING when extract action is taken
                        oModel.setProperty(sPath + "/status_code", "ANALYSING");
                        oModel.setProperty(sPath + "/processingDate", new Date().toISOString());
                        MessageToast.show("Analysis started...");

                        // Simulate extraction process - in real app, call OData action
                        setTimeout(function() {
                            // Update status to READY_FOR_REVIEW when analysis finishes
                            oModel.setProperty(sPath + "/status_code", "READY_FOR_REVIEW");
                            oModel.setProperty(sPath + "/extractionSummary", "12 billing documents extracted with 56 product items");
                            oModel.setProperty(sPath + "/sender", "AKLUT");
                            oModel.setProperty(sPath + "/confidenceScore", 0);

                            MessageToast.show("Analysis complete. Status: Ready for Review");
                            oModel.submitBatch("updateGroup");
                        }.bind(this), 3000);
                    }
                }.bind(this)
            });
        },

        onPublishPress: function(oEvent) {
            var oContext = this.getView().getBindingContext();
            var oModel = oContext.getModel();
            var sPath = oContext.getPath();
            var sCurrentStatus = oModel.getProperty(sPath + "/status_code");

            // Allow publishing only from READY_FOR_REVIEW status
            if (sCurrentStatus !== "READY_FOR_REVIEW") {
                MessageBox.warning("Document must be in Ready for Review status before publishing.");
                return;
            }

            // Show confirmation dialog
            MessageBox.confirm(
                "Are you sure you want to publish this document to the target system?",
                {
                    title: "Confirm Publish",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function(oAction) {
                        if (oAction === MessageBox.Action.YES) {
                            // Update status to PUBLISHED when publish button is clicked
                            oModel.setProperty(sPath + "/status_code", "PUBLISHED");

                            MessageToast.show("Publishing document...");

                            oModel.submitBatch("updateGroup").then(function() {
                                MessageToast.show("Document published successfully. Status: Published");
                            }).catch(function(oError) {
                                // Set status to ERROR if publish fails
                                oModel.setProperty(sPath + "/status_code", "ERROR");
                                MessageBox.error("Failed to publish document: " + oError.message);
                            });
                        }
                    }.bind(this)
                }
            );
        },

        onMarkedAsReviewedChange: function(oEvent) {
            var oCheckBox = oEvent.getSource();
            var bSelected = oCheckBox.getSelected();
            var oContext = oCheckBox.getBindingContext();
            var oModel = oContext.getModel();
            var sPath = oContext.getPath();

            // Update the markedAsReviewed field
            oModel.setProperty(sPath + "/markedAsReviewed", bSelected);

            // If marked as reviewed, update the review status
            if (bSelected) {
                oModel.setProperty(sPath + "/reviewStatus_code", "APPROVED");
                oModel.setProperty(sPath + "/reviewedBy", "Current User");
                oModel.setProperty(sPath + "/reviewedDate", new Date().toISOString());
                MessageToast.show("Marked as reviewed");
            } else {
                oModel.setProperty(sPath + "/reviewStatus_code", "PENDING");
                MessageToast.show("Unmarked as reviewed");
            }

            // Calculate and update parent document confidence score
            this._updateConfidenceScore();

            // Submit changes
            oModel.submitBatch("updateGroup");
        },

        _updateConfidenceScore: function() {
            var oView = this.getView();
            var oDocContext = oView.getBindingContext();
            var oModel = oDocContext.getModel();
            var sDocPath = oDocContext.getPath();

            // Get all extracted documents
            var aExtractedDocs = oModel.getProperty(sDocPath + "/extractedDocuments");

            if (aExtractedDocs && aExtractedDocs.length > 0) {
                var iReviewedCount = aExtractedDocs.filter(function(doc) {
                    return doc.markedAsReviewed === true;
                }).length;

                var iTotal = aExtractedDocs.length;
                var fNewScore = Math.round((iReviewedCount / iTotal) * 100);

                // Update confidence score
                oModel.setProperty(sDocPath + "/confidenceScore", fNewScore);
            }
        },

        _callAction: function(sPath, sActionName) {
            var oModel = this.getView().getModel();
            var oContext = oModel.bindContext(sPath + "/" + sActionName + "(...)");

            oContext.execute().then(function() {
                MessageToast.show("Action completed successfully");
                oModel.refresh();
            }).catch(function(oError) {
                MessageBox.error("Action failed: " + oError.message);
            });
        }
    };
});
