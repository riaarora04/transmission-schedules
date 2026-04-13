const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { PackagingIssues } = this.entities;

    // Add virtual fields for criticality based on status and priority
    this.after('READ', 'PackagingIssues', (each) => {
        if (Array.isArray(each)) {
            each.forEach(item => addCriticality(item));
        } else {
            addCriticality(each);
        }
    });

    function addCriticality(item) {
        // Status criticality
        switch (item.status) {
            case 'New':
                item.criticality = 2; // Yellow - Warning
                break;
            case 'In Progress':
                item.criticality = 0; // Grey - Neutral
                break;
            case 'Partially Approved':
                item.criticality = 5; // Blue - Information
                break;
            case 'Approved':
                item.criticality = 3; // Green - Success
                break;
            case 'Rejected':
                item.criticality = 1; // Red - Error
                break;
            case 'Discarded':
                item.criticality = 0; // Grey - Neutral
                break;
            default:
                item.criticality = 0;
        }

        // Priority criticality
        switch (item.priority) {
            case 'Very High':
                item.priorityCriticality = 1; // Red
                break;
            case 'High':
                item.priorityCriticality = 2; // Yellow
                break;
            case 'Medium':
                item.priorityCriticality = 5; // Blue
                break;
            case 'Low':
                item.priorityCriticality = 3; // Green
                break;
            default:
                item.priorityCriticality = 0;
        }
    }

    // Action: Approve Issues
    this.on('approveIssues', async (req) => {
        const { issueIds } = req.data;

        if (!issueIds || issueIds.length === 0) {
            return 'No issues selected';
        }

        await UPDATE(PackagingIssues)
            .set({ status: 'Approved' })
            .where({ id: { in: issueIds } });

        return `${issueIds.length} issue(s) approved successfully`;
    });

    // Action: Reject Issues
    this.on('rejectIssues', async (req) => {
        const { issueIds, reason } = req.data;

        if (!issueIds || issueIds.length === 0) {
            return 'No issues selected';
        }

        await UPDATE(PackagingIssues)
            .set({ status: 'Rejected' })
            .where({ id: { in: issueIds } });

        return `${issueIds.length} issue(s) rejected successfully`;
    });
});
