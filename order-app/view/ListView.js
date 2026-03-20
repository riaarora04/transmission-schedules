sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/ui/layout/VerticalLayout",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Select",
    "sap/m/DatePicker",
    "sap/m/Button",
    "sap/m/Title",
    "sap/m/IconTabBar",
    "sap/m/IconTabFilter",
    "sap/m/OverflowToolbar",
    "sap/m/ToolbarSpacer",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/CheckBox",
    "sap/ui/model/json/JSONModel"
], function(Control, VBox, HBox, VerticalLayout, Label, Input, Select, DatePicker,
            Button, Title, IconTabBar, IconTabFilter, OverflowToolbar, ToolbarSpacer,
            Table, Column, Text, ObjectStatus, CheckBox, JSONModel) {
    "use strict";

    return Control.extend("orderapp.view.ListView", {

        metadata: {
            properties: {
                onNavigateToDetail: { type: "function" }
            }
        },

        init: function() {
            this._oModel = new JSONModel(window.ordersData);
        },

        renderer: function(oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("listViewContainer");
            oRm.style("height", "100%");
            oRm.style("display", "flex");
            oRm.style("flex-direction", "column");
            oRm.openEnd();

            // Render filter bar
            oRm.renderControl(oControl._getFilterBar());

            // Render tab bar
            oRm.renderControl(oControl._getTabBar());

            // Render content area
            oRm.openStart("div");
            oRm.style("flex", "1");
            oRm.style("padding", "1rem 3rem");
            oRm.style("overflow", "auto");
            oRm.style("background", "#f5f6f7");
            oRm.openEnd();

            oRm.renderControl(oControl._getTable());

            oRm.close("div");

            oRm.close("div");
        },

        _getFilterBar: function() {
            if (this._oFilterBar) {
                return this._oFilterBar;
            }

            var oMaterialInput = new Input({
                placeholder: "",
                showValueHelp: true
            });

            var oPlantInput = new Input({
                placeholder: "",
                showValueHelp: true
            });

            var oPartnerInput = new Input({
                placeholder: "",
                showValueHelp: true
            });

            var oDatePicker = new DatePicker({
                value: "Oct 23, 2024 - Nov 23, 2024",
                width: "100%"
            });

            var oStatusSelect = new Select({
                width: "100%",
                items: [
                    new sap.ui.core.Item({ text: "" }),
                    new sap.ui.core.Item({ text: "Requested" }),
                    new sap.ui.core.Item({ text: "Approved" }),
                    new sap.ui.core.Item({ text: "Rejected" }),
                    new sap.ui.core.Item({ text: "Error" })
                ]
            });

            var oFilterFields = new HBox({
                wrap: "Wrap",
                items: [
                    new VerticalLayout({
                        width: "13.75rem",
                        content: [
                            new Label({ text: "Material:" }),
                            oMaterialInput
                        ]
                    }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom"),

                    new VerticalLayout({
                        width: "13.75rem",
                        content: [
                            new Label({ text: "Plant:" }),
                            oPlantInput
                        ]
                    }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom"),

                    new VerticalLayout({
                        width: "13.75rem",
                        content: [
                            new Label({ text: "Exchange Partner:" }),
                            oPartnerInput
                        ]
                    }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom"),

                    new VerticalLayout({
                        width: "13.75rem",
                        content: [
                            new Label({ text: "Expected Delivery Date:" }),
                            oDatePicker
                        ]
                    }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom"),

                    new VerticalLayout({
                        width: "13.75rem",
                        content: [
                            new Label({ text: "Order Status:" }),
                            oStatusSelect
                        ]
                    }).addStyleClass("sapUiTinyMarginEnd sapUiTinyMarginBottom"),

                    new VBox({
                        items: [
                            new Button({
                                text: "Go",
                                type: "Emphasized",
                                press: function() {
                                    sap.m.MessageToast.show("Filter applied");
                                }
                            }).addStyleClass("sapUiTinyMarginEnd"),
                            new Button({
                                text: "Adapt Filters (1)",
                                type: "Transparent",
                                press: function() {
                                    sap.m.MessageToast.show("Adapt filters");
                                }
                            })
                        ],
                        justifyContent: "End",
                        alignItems: "Center"
                    }).addStyleClass("sapUiTinyMarginBottom")
                ]
            });

            this._oFilterBar = new VBox({
                items: [
                    new HBox({
                        justifyContent: "SpaceBetween",
                        items: [
                            new HBox({
                                items: [
                                    new Title({
                                        text: "Standard",
                                        level: "H1"
                                    }).addStyleClass("sapUiTinyMarginEnd"),
                                    new Button({
                                        icon: "sap-icon://slim-arrow-down",
                                        type: "Transparent"
                                    })
                                ]
                            }),
                            new Button({
                                icon: "sap-icon://overflow",
                                type: "Transparent"
                            })
                        ]
                    }).addStyleClass("sapUiSmallMarginBottom"),

                    oFilterFields,

                    new HBox({
                        justifyContent: "Center",
                        items: [
                            new Button({
                                icon: "sap-icon://collapse",
                                type: "Default",
                                tooltip: "Collapse"
                            }).addStyleClass("sapUiTinyMarginEnd"),
                            new Button({
                                icon: "sap-icon://pushpin-off",
                                type: "Default",
                                tooltip: "Pin"
                            })
                        ]
                    }).addStyleClass("sapUiSmallMarginTop")
                ]
            }).addStyleClass("sapUiMediumMargin");

            return this._oFilterBar;
        },

        _getTabBar: function() {
            if (this._oTabBar) {
                return this._oTabBar;
            }

            this._oTabBar = new IconTabBar({
                selectedKey: "packagingOrders",
                items: [
                    new IconTabFilter({
                        key: "materialOrders",
                        text: "Material Orders"
                    }),
                    new IconTabFilter({
                        key: "packagingOrders",
                        text: "Packaging Standard Orders",
                        count: "7"
                    })
                ],
                select: function(oEvent) {
                    var sKey = oEvent.getParameter("key");
                    sap.m.MessageToast.show("Selected: " + sKey);
                }
            }).addStyleClass("sapUiNoContentPadding");

            return this._oTabBar;
        },

        _getTable: function() {
            if (this._oTable) {
                return this._oTable;
            }

            var that = this;

            this._oTable = new Table({
                selectionMode: "MultiToggle",
                visibleRowCount: 10,
                enableCellFilter: true,
                enableSelectAll: true,
                rowActionCount: 1,
                rowActionTemplate: new sap.ui.table.RowAction({
                    items: [
                        new sap.ui.table.RowActionItem({
                            icon: "sap-icon://navigation-right-arrow",
                            text: "Navigate",
                            press: function(oEvent) {
                                var oContext = oEvent.getParameter("row").getBindingContext();
                                var orderId = oContext.getProperty("id");
                                var fnNavigate = that.getOnNavigateToDetail();
                                if (fnNavigate) {
                                    fnNavigate(orderId);
                                }
                            }
                        })
                    ]
                }),
                columns: [
                    new Column({
                        label: new Label({ text: "Order Number" }),
                        template: new Text({
                            text: "{id}",
                            wrapping: false
                        }).addStyleClass("sapUiSmallMarginEnd"),
                        width: "8rem",
                        sortProperty: "id",
                        filterProperty: "id"
                    }),

                    new Column({
                        label: new Label({ text: "Packaging Standard" }),
                        template: new Text({ text: "{material}" }),
                        width: "9rem",
                        sortProperty: "material",
                        filterProperty: "material"
                    }),

                    new Column({
                        label: new Label({ text: "Packaging Standard Description" }),
                        template: new Text({ text: "{materialDescription}" }),
                        width: "14rem",
                        sortProperty: "materialDescription",
                        filterProperty: "materialDescription"
                    }),

                    new Column({
                        label: new Label({ text: "Business Partner" }),
                        template: new Text({ text: "{exchangePartner}" }),
                        width: "10rem",
                        sortProperty: "exchangePartner",
                        filterProperty: "exchangePartner"
                    }),

                    new Column({
                        label: new Label({ text: "Expected Delivery Date" }),
                        template: new Text({
                            text: {
                                path: "expectedDeliveryDate",
                                formatter: function(sDate) {
                                    if (!sDate) return "";
                                    var oDate = new Date(sDate);
                                    return oDate.toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    });
                                }
                            }
                        }),
                        width: "10rem",
                        sortProperty: "expectedDeliveryDate",
                        filterProperty: "expectedDeliveryDate"
                    }),

                    new Column({
                        label: new Label({ text: "Sales Order Number" }),
                        template: new Text({ text: "{salesOrderNumber}" }),
                        width: "10rem",
                        sortProperty: "salesOrderNumber",
                        filterProperty: "salesOrderNumber"
                    }),

                    new Column({
                        label: new Label({ text: "Requested Quantity" }),
                        template: new Text({ text: "{requestedQuantity}" }),
                        width: "9rem",
                        hAlign: "End",
                        sortProperty: "requestedQuantity",
                        filterProperty: "requestedQuantity"
                    }),

                    new Column({
                        label: new Label({ text: "Approved Quantity" }),
                        template: new Text({
                            text: {
                                path: "approvedQuantity",
                                formatter: function(val) {
                                    return val === null ? "" : val;
                                }
                            }
                        }),
                        width: "9rem",
                        hAlign: "End",
                        sortProperty: "approvedQuantity",
                        filterProperty: "approvedQuantity"
                    }),

                    new Column({
                        label: new Label({ text: "Order Status" }),
                        template: new ObjectStatus({
                            text: "{orderStatus}",
                            state: {
                                path: "statusType",
                                formatter: function(sType) {
                                    var mStateMap = {
                                        "Success": "Success",
                                        "Error": "Error",
                                        "Information": "Information"
                                    };
                                    return mStateMap[sType] || "None";
                                }
                            }
                        }),
                        width: "10rem",
                        sortProperty: "orderStatus",
                        filterProperty: "orderStatus"
                    }),

                    new Column({
                        label: new Label({ text: "Status Flow" }),
                        template: new HBox({
                            alignItems: "Center",
                            items: [
                                new sap.m.GenericTile({
                                    class: "sapUiTinyMarginEnd",
                                    header: "",
                                    subheader: "",
                                    press: function() {
                                        sap.m.MessageToast.show("Status flow visualization");
                                    }
                                }).addStyleClass("statusFlowTile"),
                                new sap.ui.core.Icon({
                                    src: "sap-icon://navigation-right-arrow",
                                    size: "1rem",
                                    color: "#758CA4"
                                })
                            ]
                        }),
                        width: "10rem"
                    })
                ]
            });

            // Add toolbar
            var oToolbar = new OverflowToolbar({
                content: [
                    new Title({
                        text: "Packaging Standard Orders (7)",
                        level: "H2"
                    }),
                    new ToolbarSpacer(),
                    new Button({
                        text: "Create",
                        type: "Default",
                        press: function() {
                            sap.m.MessageToast.show("Create new order");
                        }
                    }),
                    new Button({
                        text: "Create Multiple Orders",
                        type: "Transparent",
                        press: function() {
                            sap.m.MessageToast.show("Create multiple orders");
                        }
                    })
                ]
            });

            this._oTable.setExtension([oToolbar]);
            this._oTable.setModel(this._oModel);
            this._oTable.bindRows("/");

            return this._oTable;
        }
    });
});
