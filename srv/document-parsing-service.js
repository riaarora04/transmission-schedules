const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Documents, ExtractedBillingDocuments, DocumentStatus, ReviewStatus } = this.entities;

    // After READ, set criticality based on status
    this.after('READ', 'Documents', (documents) => {
        if (!documents) return;
        const docs = Array.isArray(documents) ? documents : [documents];

        docs.forEach(doc => {
            // Map status codes to SAP Fiori criticality values
            // 0 = None/Neutral (gray)
            // 1 = Negative/Error (red)
            // 2 = Critical/Warning (orange/yellow)
            // 3 = Positive/Success (green)

            switch (doc.status_code) {
                case 'UPLOADED':
                    doc.statusCriticality = 0; // Neutral - gray
                    break;
                case 'ANALYSING':
                    doc.statusCriticality = 2; // Warning - orange (in progress)
                    break;
                case 'READY_FOR_REVIEW':
                    doc.statusCriticality = 2; // Warning - orange (needs attention)
                    break;
                case 'ERROR':
                    doc.statusCriticality = 1; // Negative - red
                    break;
                case 'PUBLISHED':
                    doc.statusCriticality = 3; // Positive - green (success)
                    break;
                default:
                    doc.statusCriticality = 0; // Default neutral
            }

            // Set confidence criticality based on score
            if (doc.confidenceScore !== null && doc.confidenceScore !== undefined) {
                if (doc.confidenceScore >= 80) {
                    doc.confidenceCriticality = 3; // High confidence - green
                } else if (doc.confidenceScore >= 50) {
                    doc.confidenceCriticality = 2; // Medium confidence - orange
                } else {
                    doc.confidenceCriticality = 1; // Low confidence - red
                }
            } else {
                doc.confidenceCriticality = 0; // No score - gray
            }
        });
    });

    // After READ, set criticality for extracted billing documents
    this.after('READ', 'ExtractedBillingDocuments', (items) => {
        if (!items) return;
        const docs = Array.isArray(items) ? items : [items];

        docs.forEach(item => {
            // Map review status to criticality
            switch (item.reviewStatus_code) {
                case 'PENDING':
                    item.reviewStatusCriticality = 2; // Warning - needs review
                    break;
                case 'APPROVED':
                    item.reviewStatusCriticality = 3; // Success - green
                    break;
                case 'REJECTED':
                    item.reviewStatusCriticality = 1; // Error - red
                    break;
                case 'REVIEWED':
                    item.reviewStatusCriticality = 3; // Success - green
                    break;
                default:
                    item.reviewStatusCriticality = 0; // Neutral
            }
        });
    });

    // Action implementations (stubs for now)
    this.on('uploadDocument', 'Documents', async (req) => {
        const { fileName, fileContent } = req.data;
        // Implementation would handle file upload
        return req.subject;
    });

    this.on('extractDocument', 'Documents', async (req) => {
        // Implementation would trigger AI extraction
        return req.subject;
    });

    this.on('publishDocument', 'Documents', async (req) => {
        // Implementation would publish to target system
        return req.subject;
    });

    this.on('approveExtraction', 'ExtractedBillingDocuments', async (req) => {
        // Implementation would approve extraction
        return req.subject;
    });

    this.on('rejectExtraction', 'ExtractedBillingDocuments', async (req) => {
        const { reason } = req.data;
        // Implementation would reject with reason
        return req.subject;
    });
});
