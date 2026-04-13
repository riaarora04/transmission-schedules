sap.ui.define(["sap/ui/core/library"], function (coreLibrary) {
	"use strict";

	const ValueState = coreLibrary.ValueState;

	return {
		/**
		 * Formats the status state for ObjectStatus control
		 * @param {string} status - The status value
		 * @returns {string} The ValueState
		 */
		formatStatusState: function (status) {
			if (!status) {
				return ValueState.None;
			}
			switch (status) {
				case "Approved":
					return ValueState.Success;
				case "Rejected":
					return ValueState.Error;
				case "In Progress":
					return ValueState.Information;
				case "New":
					return ValueState.None;
				default:
					return ValueState.None;
			}
		},

		/**
		 * Formats the priority state for ObjectStatus control
		 * @param {string} priority - The priority value
		 * @returns {string} The ValueState
		 */
		formatPriorityState: function (priority) {
			if (!priority) {
				return ValueState.None;
			}
			switch (priority) {
				case "Very High":
					return ValueState.Error;
				case "High":
					return ValueState.Warning;
				case "Low":
					return ValueState.None;
				default:
					return ValueState.None;
			}
		},

		/**
		 * Formats the table title with issue count
		 * @param {string} title - The title template
		 * @param {number} count - The count of issues
		 * @returns {string} The formatted title
		 */
		formatTableTitle: function (title, count) {
			return title.replace("{0}", count || 0);
		},

		/**
		 * Formats the popover issues title with count
		 * @param {string} title - The title template
		 * @param {number} count - The count of issues
		 * @returns {string} The formatted title
		 */
		formatPopoverIssuesTitle: function (title, count) {
			return title.replace("{0}", count || 0);
		}
	};
});
