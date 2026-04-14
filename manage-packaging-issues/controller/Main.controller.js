sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.packaging.issues.controller.Main", {

		onInit: function () {
			// Initialize dialog model
			const oDialogModel = new JSONModel({
				message: "",
				issuesTitle: "",
				selectedIssues: []
			});
			this.getView().setModel(oDialogModel, "dialog");

			// Initialize popover model
			const oPopoverModel = new JSONModel({});
			this.getView().setModel(oPopoverModel, "popover");
		},

		onFilterGo: function () {
			MessageToast.show("Filter applied");
		},

		onAdaptFilters: function () {
			MessageToast.show("Adapt Filters");
		},

		onCreate: function () {
			MessageToast.show("Create new issue");
		},

		onSelectionChange: function (oEvent) {
			const oTable = this.byId("issuesTable");
			const aSelectedItems = oTable.getSelectedItems();
			const bHasSelection = aSelectedItems.length > 0;

			// Check if all selected items have "In Progress" status
			let bAllInProgress = true;
			let bHasNonInProgressItems = false;

			if (bHasSelection) {
				aSelectedItems.forEach(function (oItem) {
					const oContext = oItem.getBindingContext();
					if (oContext) {
						const oIssue = oContext.getObject();
						if (oIssue.status !== "In Progress") {
							bAllInProgress = false;
							bHasNonInProgressItems = true;
						}
					}
				});
			}

			// Enable approve/reject buttons only if all selected items are "In Progress"
			const bEnableButtons = bHasSelection && bAllInProgress;
			this.byId("approveButton").setEnabled(bEnableButtons);
			this.byId("rejectButton").setEnabled(bEnableButtons);

			// Show message toast if non-In Progress items are selected
			if (bHasSelection && bHasNonInProgressItems) {
				MessageToast.show("Approve and Reject possible for only In Progress Status");
			}
		},

		onShowSummary: function (oEvent) {
			const oLink = oEvent.getSource();
			const oContext = oLink.getBindingContext();
			const oIssue = oContext.getObject();

			// Sample issues data for the popover table
			const aIssues = [
				{
					type: "Posting Quantity",
					original: "8 PC",
					requested: "10 PC"
				},
				{
					type: "Material",
					original: "Aeroplast Cylinder",
					requested: "Aeroplast Cube"
				},
				{
					type: "Posting Date",
					original: "Aug 4, 2024",
					requested: "Aug 5, 2024"
				},
				{
					type: "Exchange Partner",
					original: "Plant ABC",
					requested: "Plant XYZ"
				}
			];

			// Generate natural language summary
			const sSummaryText = this._generateIssueSummary(aIssues, oIssue);

			// Set data for popover with issues array
			const oPopoverModel = this.getView().getModel("popover");
			oPopoverModel.setData({
				id: oIssue.id,
				summaryFull: oIssue.summaryFull,
				summaryText: sSummaryText,
				issues: aIssues
			});

			// Open popover
			const oPopover = this.byId("summaryPopover");
			oPopover.openBy(oLink);
		},

		_generateIssueSummary: function (aIssues, oIssue) {
			if (!aIssues || aIssues.length === 0) {
				return "";
			}

			const aParts = [];
			let sQuantity = "";
			let sMaterial = "";
			let sPlant = "";
			let sOriginalQuantity = "";
			let sOriginalMaterial = "";
			let sOriginalPlant = "";

			// Extract values from issues array
			aIssues.forEach(function (oIssueItem) {
				if (oIssueItem.type === "Posting Quantity") {
					sQuantity = oIssueItem.requested;
					sOriginalQuantity = oIssueItem.original;
				} else if (oIssueItem.type === "Material") {
					sMaterial = oIssueItem.requested;
					sOriginalMaterial = oIssueItem.original;
				} else if (oIssueItem.type === "Exchange Partner") {
					sPlant = oIssueItem.requested;
					sOriginalPlant = oIssueItem.original;
				} else if (oIssueItem.type === "Posting Date") {
					aParts.push("Posting date changed from " + oIssueItem.original + " to " + oIssueItem.requested);
				} else if (oIssueItem.type === "Delivery Note") {
					aParts.push("Delivery note number changed from " + oIssueItem.original + " to " + oIssueItem.requested);
				} else if (oIssueItem.type === "Material Code") {
					aParts.push("Material code changed from " + oIssueItem.original + " to " + oIssueItem.requested);
				} else if (oIssueItem.type === "Missing Document") {
					aParts.push("Document " + oIssueItem.original + " is missing");
				}
			});

			// Build quantity/material/plant summary
			if (sQuantity && sMaterial && sPlant) {
				const sMainSummary = sQuantity + " of " + sMaterial + " with " + sPlant +
					" is requested instead of " + sOriginalQuantity + " of " + sOriginalMaterial +
					" with " + sOriginalPlant;
				aParts.unshift(sMainSummary);
			}

			return aParts.length > 0 ? aParts.join("; ") + "." : "";
		},

		onApprove: function () {
			const oTable = this.byId("issuesTable");
			const aSelectedItems = oTable.getSelectedItems();
			const aSelectedIssues = [];
			const aIssueIds = [];

			// Get selected issues
			aSelectedItems.forEach(function (oItem) {
				const oContext = oItem.getBindingContext();
				if (oContext) {
					const oIssue = oContext.getObject();
					aSelectedIssues.push(oIssue);
					aIssueIds.push(oIssue.id);
				}
			});

			// Update dialog model
			const oDialogModel = this.getView().getModel("dialog");
			const sMessage = aSelectedIssues.length + " issues will be approved. Do you want to proceed?";
			const sIssuesTitle = "Issues (" + aSelectedIssues.length + ")";

			oDialogModel.setData({
				message: sMessage,
				issuesTitle: sIssuesTitle,
				selectedIssues: aSelectedIssues,
				issueIds: aIssueIds
			});

			// Open dialog
			this.byId("approveDialog").open();
		},

		onReject: function () {
			const oTable = this.byId("issuesTable");
			const aSelectedItems = oTable.getSelectedItems();
			const aSelectedIssues = [];
			const aIssueIds = [];

			// Get selected issues
			aSelectedItems.forEach(function (oItem) {
				const oContext = oItem.getBindingContext();
				if (oContext) {
					const oIssue = oContext.getObject();
					aSelectedIssues.push(oIssue);
					aIssueIds.push(oIssue.id);
				}
			});

			// Update dialog model
			const oDialogModel = this.getView().getModel("dialog");
			const sMessage = aSelectedIssues.length + " issues will be rejected. Do you want to proceed?";
			const sIssuesTitle = "Issues (" + aSelectedIssues.length + ")";

			oDialogModel.setData({
				message: sMessage,
				issuesTitle: sIssuesTitle,
				selectedIssues: aSelectedIssues,
				issueIds: aIssueIds
			});

			// Open dialog
			this.byId("rejectDialog").open();
		},

		onRemoveFromDialog: function (oEvent) {
			const oItem = oEvent.getParameter("listItem");
			const oContext = oItem.getBindingContext("dialog");
			const sPath = oContext.getPath();
			const iIndex = parseInt(sPath.split("/").pop(), 10);

			// Get dialog model
			const oDialogModel = this.getView().getModel("dialog");
			const aSelectedIssues = oDialogModel.getProperty("/selectedIssues");

			// Remove issue
			aSelectedIssues.splice(iIndex, 1);
			oDialogModel.setProperty("/selectedIssues", aSelectedIssues);

			// Update message and title
			const sMessage = aSelectedIssues.length + " issues will be approved. Do you want to proceed?";
			const sIssuesTitle = "Issues (" + aSelectedIssues.length + ")";
			oDialogModel.setProperty("/message", sMessage);
			oDialogModel.setProperty("/issuesTitle", sIssuesTitle);

			// Close dialog if no issues left
			if (aSelectedIssues.length === 0) {
				this.byId("approveDialog").close();
				this._clearTableSelection();
			}
		},

		onRemoveFromRejectDialog: function (oEvent) {
			const oItem = oEvent.getParameter("listItem");
			const oContext = oItem.getBindingContext("dialog");
			const sPath = oContext.getPath();
			const iIndex = parseInt(sPath.split("/").pop(), 10);

			// Get dialog model
			const oDialogModel = this.getView().getModel("dialog");
			const aSelectedIssues = oDialogModel.getProperty("/selectedIssues");

			// Remove issue
			aSelectedIssues.splice(iIndex, 1);
			oDialogModel.setProperty("/selectedIssues", aSelectedIssues);

			// Update message and title
			const sMessage = aSelectedIssues.length + " issues will be rejected. Do you want to proceed?";
			const sIssuesTitle = "Issues (" + aSelectedIssues.length + ")";
			oDialogModel.setProperty("/message", sMessage);
			oDialogModel.setProperty("/issuesTitle", sIssuesTitle);

			// Close dialog if no issues left
			if (aSelectedIssues.length === 0) {
				this.byId("rejectDialog").close();
				this._clearTableSelection();
			}
		},

		onConfirmApprove: function () {
			const oDialogModel = this.getView().getModel("dialog");
			const aIssueIds = oDialogModel.getProperty("/issueIds");
			const oModel = this.getView().getModel();
			const aIssues = oModel.getProperty("/issues");

			// Update status to "Approved" for selected issues
			aIssues.forEach(function (oIssue) {
				if (aIssueIds.includes(oIssue.id)) {
					oIssue.status = "Approved";
				}
			});

			// Update model
			oModel.setProperty("/issues", aIssues);

			// Show success message
			MessageBox.success(aIssueIds.length + " issues approved successfully!");

			// Close dialog
			this.byId("approveDialog").close();

			// Clear selection
			this._clearTableSelection();
		},

		onCancelApprove: function () {
			this.byId("approveDialog").close();
		},

		onConfirmReject: function () {
			const oDialogModel = this.getView().getModel("dialog");
			const aIssueIds = oDialogModel.getProperty("/issueIds");
			const oModel = this.getView().getModel();
			const aIssues = oModel.getProperty("/issues");

			// Update status to "Rejected" for selected issues
			aIssues.forEach(function (oIssue) {
				if (aIssueIds.includes(oIssue.id)) {
					oIssue.status = "Rejected";
				}
			});

			// Update model
			oModel.setProperty("/issues", aIssues);

			// Show success message
			MessageBox.error(aIssueIds.length + " issues rejected successfully!");

			// Close dialog
			this.byId("rejectDialog").close();

			// Clear selection
			this._clearTableSelection();
		},

		onCancelReject: function () {
			this.byId("rejectDialog").close();
		},

		_clearTableSelection: function () {
			const oTable = this.byId("issuesTable");
			oTable.removeSelections(true);

			// Disable approve and reject buttons
			this.byId("approveButton").setEnabled(false);
			this.byId("rejectButton").setEnabled(false);
		}
	});
});
