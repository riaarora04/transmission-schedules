sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Simulates AI document parsing and extraction
         * @param {File} file - The uploaded file object
         * @returns {Object} Extraction result with documents and metadata
         */
        extractDocument: function (file) {
            // Simulate AI processing delay and return mock structured data
            var oResult = {
                extractedAt: new Date().toLocaleString(),
                fileName: file ? file.name : "Unknown",
                confidenceScore: this._generateConfidenceScore(),
                totalDocuments: this._getRandomInt(1, 5),
                totalLineItems: this._getRandomInt(10, 50),
                documents: []
            };

            // Generate mock billing documents
            for (var i = 0; i < oResult.totalDocuments; i++) {
                var oDocument = {
                    externalBillingDocument: "EXT-" + this._generateDocumentId(),
                    transmission: "TRANS-" + this._getRandomInt(1000, 9999),
                    lineItems: this._getRandomInt(5, 20),
                    recommendedAction: this._getRecommendedAction(),
                    reviewStatus: "Needs Review",
                    billingDate: this._generateRandomDate(),
                    totalAmount: this._getRandomInt(1000, 50000),
                    currency: "EUR",
                    items: this._generateLineItems(this._getRandomInt(5, 20))
                };
                oResult.documents.push(oDocument);
            }

            return oResult;
        },

        /**
         * Generates line items for a billing document
         * @param {number} count - Number of line items to generate
         * @returns {Array} Array of line items
         */
        _generateLineItems: function (count) {
            var aItems = [];
            for (var i = 0; i < count; i++) {
                aItems.push({
                    lineItemNumber: (i + 1) * 10,
                    material: "MAT-" + this._getRandomInt(10000, 99999),
                    description: this._getMaterialDescription(),
                    quantity: this._getRandomInt(1, 100),
                    unit: this._getRandomUnit(),
                    unitPrice: this._getRandomInt(10, 500),
                    totalPrice: 0, // Will be calculated
                    plant: "P" + this._getRandomInt(1000, 9999),
                    storageLocation: "SL" + this._getRandomInt(100, 999),
                    deliveryDate: this._generateRandomDate()
                });
            }
            return aItems;
        },

        /**
         * Generates a confidence score
         * @returns {number} Confidence score between 70-99
         */
        _generateConfidenceScore: function () {
            return this._getRandomInt(70, 99);
        },

        /**
         * Generates a random document ID
         * @returns {string} Document ID
         */
        _generateDocumentId: function () {
            return "2024" + this._getRandomInt(100000, 999999);
        },

        /**
         * Gets a recommended action based on document analysis
         * @returns {string} Recommended action
         */
        _getRecommendedAction: function () {
            var aActions = [
                "Auto-post",
                "Review required",
                "Verify pricing",
                "Check quantities",
                "Validate tax code"
            ];
            return aActions[this._getRandomInt(0, aActions.length - 1)];
        },

        /**
         * Generates a random date within the last 30 days
         * @returns {string} Formatted date string
         */
        _generateRandomDate: function () {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() - this._getRandomInt(0, 30));
            return oDate.toLocaleDateString();
        },

        /**
         * Gets a random material description
         * @returns {string} Material description
         */
        _getMaterialDescription: function () {
            var aDescriptions = [
                "Steel Plate 10mm",
                "Aluminum Rod 20mm",
                "Copper Wire 5mm",
                "Plastic Sheet A4",
                "Wooden Beam 50x100",
                "Glass Panel 1000x500",
                "Rubber Gasket Type A",
                "Metal Fastener M8",
                "Composite Material X",
                "Industrial Adhesive"
            ];
            return aDescriptions[this._getRandomInt(0, aDescriptions.length - 1)];
        },

        /**
         * Gets a random unit of measure
         * @returns {string} Unit of measure
         */
        _getRandomUnit: function () {
            var aUnits = ["PC", "KG", "M", "L", "M2", "M3"];
            return aUnits[this._getRandomInt(0, aUnits.length - 1)];
        },

        /**
         * Generates a random integer between min and max (inclusive)
         * @param {number} min - Minimum value
         * @param {number} max - Maximum value
         * @returns {number} Random integer
         */
        _getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * Simulates error scenarios for testing
         * @returns {Object} Error result
         */
        generateErrorResult: function () {
            var aErrorTypes = [
                {
                    type: "UnreadableFile",
                    message: "The document could not be read. Please ensure the file is not corrupted.",
                    confidenceScore: 0
                },
                {
                    type: "PartialExtraction",
                    message: "Some information could not be extracted. Manual review required.",
                    confidenceScore: 45
                },
                {
                    type: "LowConfidence",
                    message: "Extraction completed with low confidence. Please verify all fields.",
                    confidenceScore: 55
                }
            ];

            var oError = aErrorTypes[this._getRandomInt(0, aErrorTypes.length - 1)];

            return {
                extractedAt: new Date().toLocaleString(),
                error: true,
                errorType: oError.type,
                errorMessage: oError.message,
                confidenceScore: oError.confidenceScore,
                totalDocuments: oError.confidenceScore > 0 ? 1 : 0,
                totalLineItems: oError.confidenceScore > 0 ? this._getRandomInt(1, 5) : 0,
                documents: oError.confidenceScore > 0 ? [
                    {
                        externalBillingDocument: "PARTIAL-" + this._generateDocumentId(),
                        transmission: "TRANS-" + this._getRandomInt(1000, 9999),
                        lineItems: this._getRandomInt(1, 5),
                        recommendedAction: "Manual review required",
                        reviewStatus: "Needs Review",
                        billingDate: "Unknown",
                        totalAmount: 0,
                        currency: "EUR",
                        items: []
                    }
                ] : []
            };
        }
    };
});
