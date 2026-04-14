sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.sap.packaging.issues",
		defaults: {
			page: "ui5://test-resources/com/sap/packaging/issues/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "com/sap/packaging/issues/",
				never: "test-resources/com/sap/packaging/issues/"
			},
			loader: {
				paths: {
					"com/sap/packaging/issues": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.sap.packaging.issues"
			},
			"integration/opaTests": {
				title: "Integration tests for com.sap.packaging.issues"
			}
		}
	};
});
