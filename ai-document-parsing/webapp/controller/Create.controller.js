sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "com/sap/selfbilling/documentparsing/service/AIParsingService"
], function (Controller, Fragment, MessageToast, MessageBox, AIParsingService) {
    "use strict";

    return Controller.extend("com.sap.selfbilling.documentparsing.controller.Create", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("create").attachPatternMatched(this._onCreateNew, this);
            oRouter.getRoute("createWithId").attachPatternMatched(this._onEditDocument, this);

            // Initialize selected extraction items
            var oModel = this.getOwnerComponent().getModel();
            oModel.setProperty("/selectedExtractionItems", []);
        },

        _onCreateNew: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");

            // Create new document
            var sDocumentId = "DOC_" + Date.now();
            var oNewDocument = {
                documentId: sDocumentId,
                processType: "Self Billing",
                soldToParty: "",
                customerPlant: "",
                customerUnloadingPoint: "",
                uploadedBy: "System User",
                uploadedAt: new Date().toLocaleString(),
                status: "Draft",
                reviewStatus: "Not Started",
                uploadComplete: false,
                attachments: []
            };

            oModel.setProperty("/currentDocument", oNewDocument);
            oModel.setProperty("/extractionResult", null);
            oAppStateModel.setProperty("/currentDocumentId", sDocumentId);
            oAppStateModel.setProperty("/uploadProgress", 0);
            oAppStateModel.setProperty("/extractionProgress", 0);
            oAppStateModel.setProperty("/reviewProgress", 0);
            oAppStateModel.setProperty("/isUploading", false);
            oAppStateModel.setProperty("/isExtracting", false);
        },

        _onEditDocument: function (oEvent) {
            var sDocumentId = oEvent.getParameter("arguments").documentId;
            var oModel = this.getOwnerComponent().getModel();
            var aDocuments = oModel.getProperty("/documents") || [];

            var oDocument = aDocuments.find(function(doc) {
                return doc.documentId === sDocumentId;
            });

            if (oDocument) {
                oModel.setProperty("/currentDocument", oDocument);
            }
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("listReport");
        },

        onUpload: function () {
            // Create file input element dynamically
            var oFileUploader = document.createElement("input");
            oFileUploader.type = "file";
            oFileUploader.accept = ".pdf,.png,.jpg,.jpeg,.tiff";
            oFileUploader.multiple = false;

            var that = this;
            oFileUploader.addEventListener("change", function(event) {
                var file = event.target.files[0];
                if (file) {
                    that._handleFileUpload(file);
                }
            });

            oFileUploader.click();
        },

        _handleFileUpload: function (file) {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var oCurrentDocument = oModel.getProperty("/currentDocument");

            // Create attachment object
            var oAttachment = {
                fileName: file.name,
                fileType: file.type || "application/pdf",
                fileSize: this._formatFileSize(file.size),
                uploadProgress: 0,
                uploadStatus: "Uploading",
                lastModified: new Date(file.lastModified).toLocaleString(),
                fileObject: file
            };

            // Add to attachments
            if (!oCurrentDocument.attachments) {
                oCurrentDocument.attachments = [];
            }
            oCurrentDocument.attachments.push(oAttachment);
            oModel.setProperty("/currentDocument", oCurrentDocument);

            // Simulate upload progress
            oAppStateModel.setProperty("/isUploading", true);
            this._simulateUpload(oCurrentDocument.attachments.length - 1);
        },

        _simulateUpload: function (iAttachmentIndex) {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var sPath = "/currentDocument/attachments/" + iAttachmentIndex;

            var iProgress = 0;
            var that = this;

            var oInterval = setInterval(function() {
                iProgress += 10;
                oModel.setProperty(sPath + "/uploadProgress", iProgress);
                oAppStateModel.setProperty("/uploadProgress", iProgress);

                if (iProgress >= 100) {
                    clearInterval(oInterval);
                    oModel.setProperty(sPath + "/uploadStatus", "Uploaded");
                    oModel.setProperty("/currentDocument/uploadComplete", true);
                    oModel.setProperty("/currentDocument/status", "Uploaded");
                    oAppStateModel.setProperty("/isUploading", false);
                    MessageToast.show("File uploaded successfully");
                }
            }, 200);
        },

        _formatFileSize: function (bytes) {
            if (bytes === 0) return '0 Bytes';
            var k = 1024;
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        },

        onExtract: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var oCurrentDocument = oModel.getProperty("/currentDocument");

            if (!oCurrentDocument.attachments || oCurrentDocument.attachments.length === 0) {
                MessageBox.warning("Please upload a file first");
                return;
            }

            // Update status
            oCurrentDocument.status = "Extracting";
            oModel.setProperty("/currentDocument", oCurrentDocument);
            oAppStateModel.setProperty("/isExtracting", true);
            oAppStateModel.setProperty("/extractionProgress", 0);

            // Update attachment status
            oCurrentDocument.attachments.forEach(function(att, idx) {
                oModel.setProperty("/currentDocument/attachments/" + idx + "/uploadStatus", "Extracting");
            });

            // Simulate extraction progress
            this._simulateExtraction();
        },

        _simulateExtraction: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var iProgress = 0;
            var that = this;

            var oInterval = setInterval(function() {
                iProgress += 5;
                oAppStateModel.setProperty("/extractionProgress", iProgress);

                if (iProgress >= 100) {
                    clearInterval(oInterval);
                    that._completeExtraction();
                }
            }, 300);
        },

        _completeExtraction: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var oCurrentDocument = oModel.getProperty("/currentDocument");

            // Get mock extraction result
            var oExtractionResult = AIParsingService.extractDocument(oCurrentDocument.attachments[0].fileObject);

            // Update model
            oModel.setProperty("/extractionResult", oExtractionResult);
            oModel.setProperty("/currentDocument/status", "Completed");
            oAppStateModel.setProperty("/isExtracting", false);

            // Update attachment status
            oCurrentDocument.attachments.forEach(function(att, idx) {
                oModel.setProperty("/currentDocument/attachments/" + idx + "/uploadStatus", "Extracted");
            });

            MessageToast.show("Extraction completed successfully");
        },

        onStopAnalysis: function () {
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            oAppStateModel.setProperty("/isExtracting", false);
            oAppStateModel.setProperty("/extractionProgress", 0);
            MessageToast.show("Analysis stopped");
        },

        onExtractionSelectionChange: function (oEvent) {
            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();
            var oModel = this.getOwnerComponent().getModel();

            oModel.setProperty("/selectedExtractionItems", aSelectedItems.map(function(oItem) {
                return oItem.getBindingContext().getObject();
            }));
        },

        onMarkAsReviewed: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var aSelectedItems = oModel.getProperty("/selectedExtractionItems");
            var aDocuments = oModel.getProperty("/extractionResult/documents");

            if (aSelectedItems.length === 0) {
                return;
            }

            // Mark selected items as reviewed
            aSelectedItems.forEach(function(selectedItem) {
                var oDoc = aDocuments.find(function(doc) {
                    return doc.externalBillingDocument === selectedItem.externalBillingDocument;
                });
                if (oDoc) {
                    oDoc.reviewStatus = "Reviewed";
                }
            });

            oModel.setProperty("/extractionResult/documents", aDocuments);

            // Update review progress
            var iReviewedCount = aDocuments.filter(function(doc) {
                return doc.reviewStatus === "Reviewed";
            }).length;
            var iProgress = Math.round((iReviewedCount / aDocuments.length) * 100);
            oAppStateModel.setProperty("/reviewProgress", iProgress);

            // Clear selection
            var oTable = this.getView().byId("extractionTable");
            oTable.removeSelections(true);
            oModel.setProperty("/selectedExtractionItems", []);

            MessageToast.show("Marked as reviewed");
        },

        onDocumentLinkPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            var oDocument = oContext.getObject();
            MessageBox.information("Document details for: " + oDocument.externalBillingDocument);
        },

        onSave: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oCurrentDocument = oModel.getProperty("/currentDocument");
            var aDocuments = oModel.getProperty("/documents") || [];

            // Check if document already exists
            var iIndex = aDocuments.findIndex(function(doc) {
                return doc.documentId === oCurrentDocument.documentId;
            });

            if (iIndex >= 0) {
                // Update existing
                aDocuments[iIndex] = oCurrentDocument;
            } else {
                // Add new
                aDocuments.push(oCurrentDocument);
            }

            oModel.setProperty("/documents", aDocuments);
            MessageToast.show("Document saved successfully");
        },

        onPublish: function () {
            var oAppStateModel = this.getOwnerComponent().getModel("appState");
            var iReviewProgress = oAppStateModel.getProperty("/reviewProgress");

            if (iReviewProgress < 100) {
                MessageBox.warning("Please review all documents before publishing");
                return;
            }

            var that = this;
            MessageBox.confirm("Do you want to publish this document?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        that._publishDocument();
                    }
                }
            });
        },

        _publishDocument: function () {
            this.onSave();
            MessageToast.show("Document published successfully");
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("listReport");
        },

        onDiscard: function () {
            var that = this;
            MessageBox.confirm("Do you want to discard all changes?", {
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        var oRouter = that.getOwnerComponent().getRouter();
                        oRouter.navTo("listReport");
                    }
                }
            });
        }
    });
});
