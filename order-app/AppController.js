sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/Router",
    "sap/m/Shell",
    "sap/f/ShellBar",
    "sap/m/Avatar"
], function(Controller, Router, Shell, ShellBar, Avatar) {
    "use strict";

    return Controller.extend("orderapp.AppController", {

        constructor: function() {
            this.initApp();
        },

        initApp: function() {
            // Create Shell Bar
            var oShellBar = new ShellBar({
                title: "Order Empty Returnable Materials",
                showMenuButton: true,
                showNavButton: true,
                showSearch: true,
                showNotifications: true,
                showProductSwitch: false,
                profile: new Avatar({
                    initials: "UI"
                }),
                menuButtonPressed: this.onMenuButtonPressed.bind(this),
                navButtonPressed: this.onNavBack.bind(this)
            });

            // Get the main page
            var oMainPage = sap.ui.getCore().byId("mainPage");
            oMainPage.setCustomHeader(oShellBar);

            // Initialize mock data
            this.initMockData();

            // Show list view by default
            this.showListView();
        },

        initMockData: function() {
            window.ordersData = [
                {
                    id: "3094045",
                    material: "HT 4904",
                    materialDescription: "BLC bundle with red KLTs",
                    plant: "P1000",
                    exchangePartner: "Rolf Motors",
                    expectedDeliveryDate: "2025-04-25",
                    salesOrderNumber: "SO030333",
                    requestedQuantity: 8,
                    approvedQuantity: null,
                    orderStatus: "Requested",
                    statusType: "Information",
                    createdBy: "John Smith",
                    createdDate: "2025-03-10",
                    priority: "High",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "empty", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094046",
                    material: "HT 1001",
                    materialDescription: "21-95 packages for NLS",
                    plant: "P2000",
                    exchangePartner: "Pallet World",
                    expectedDeliveryDate: "2025-05-13",
                    salesOrderNumber: "SO020212",
                    requestedQuantity: 10,
                    approvedQuantity: null,
                    orderStatus: "Requested",
                    statusType: "Information",
                    createdBy: "Jane Doe",
                    createdDate: "2025-03-11",
                    priority: "Medium",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "empty", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094047",
                    material: "HT 1002",
                    materialDescription: "Bundle with blue KLTs",
                    plant: "P1500",
                    exchangePartner: "ABC Company",
                    expectedDeliveryDate: "2025-03-14",
                    salesOrderNumber: "SO020212",
                    requestedQuantity: 11,
                    approvedQuantity: null,
                    orderStatus: "Requested",
                    statusType: "Information",
                    createdBy: "Mike Johnson",
                    createdDate: "2025-03-08",
                    priority: "High",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "empty", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094048",
                    material: "PD-105",
                    materialDescription: "DTCS 0303 KLT, Pallets",
                    plant: "P3000",
                    exchangePartner: "Westerns Pvt Ltd",
                    expectedDeliveryDate: "2025-05-14",
                    salesOrderNumber: "SO020214",
                    requestedQuantity: 8,
                    approvedQuantity: null,
                    orderStatus: "Error",
                    statusType: "Error",
                    createdBy: "Sarah Wilson",
                    createdDate: "2025-03-09",
                    priority: "High",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "error", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094049",
                    material: "PD-106",
                    materialDescription: "BLC bundle with red KLTs",
                    plant: "P2500",
                    exchangePartner: "Westerns Pvt Ltd",
                    expectedDeliveryDate: "2025-05-13",
                    salesOrderNumber: "SO020456",
                    requestedQuantity: 10,
                    approvedQuantity: 0,
                    orderStatus: "Rejected",
                    statusType: "Error",
                    createdBy: "Tom Brown",
                    createdDate: "2025-03-07",
                    priority: "Low",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "error", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094050",
                    material: "PD-102",
                    materialDescription: "NCC bundle with Pallets",
                    plant: "P1000",
                    exchangePartner: "Rolf Motors",
                    expectedDeliveryDate: "2025-04-25",
                    salesOrderNumber: "SO123457",
                    requestedQuantity: 12,
                    approvedQuantity: 0,
                    orderStatus: "Approved with Changes",
                    statusType: "Success",
                    createdBy: "Lisa Anderson",
                    createdDate: "2025-03-12",
                    priority: "Medium",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "complete", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                },
                {
                    id: "3094051",
                    material: "PD-101",
                    materialDescription: "BCC bundles for 345 MCK",
                    plant: "P2000",
                    exchangePartner: "Pallet World",
                    expectedDeliveryDate: "2025-05-13",
                    salesOrderNumber: "SO543569",
                    requestedQuantity: 1,
                    approvedQuantity: 1,
                    orderStatus: "Approved",
                    statusType: "Success",
                    createdBy: "Robert Taylor",
                    createdDate: "2025-03-05",
                    priority: "High",
                    statusFlow: [
                        { status: "complete", label: "Created" },
                        { status: "complete", label: "Approved" },
                        { status: "empty", label: "In Transit" },
                        { status: "empty", label: "Delivered" }
                    ]
                }
            ];
        },

        showListView: function() {
            sap.ui.require([
                "orderapp/view/ListView"
            ], function(ListView) {
                var oMainPage = sap.ui.getCore().byId("mainPage");
                oMainPage.removeAllContent();

                var oListView = new ListView({
                    onNavigateToDetail: this.showObjectPage.bind(this)
                });

                oMainPage.addContent(oListView);

                // Show nav button only when not on list view
                var oShellBar = oMainPage.getCustomHeader();
                oShellBar.setShowNavButton(false);
            }.bind(this));
        },

        showObjectPage: function(orderId) {
            sap.ui.require([
                "orderapp/view/ObjectPage"
            ], function(ObjectPage) {
                var oMainPage = sap.ui.getCore().byId("mainPage");
                oMainPage.removeAllContent();

                var oObjectPage = new ObjectPage({
                    orderId: orderId
                });

                oMainPage.addContent(oObjectPage);

                // Show nav button on object page
                var oShellBar = oMainPage.getCustomHeader();
                oShellBar.setShowNavButton(true);
            }.bind(this));
        },

        onNavBack: function() {
            this.showListView();
        },

        onMenuButtonPressed: function() {
            sap.m.MessageToast.show("Menu button pressed");
        }
    });
});
