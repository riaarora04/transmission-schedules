sap.ui.define([
    "sap/ui/core/Control",
    "sap/f/DynamicPage",
    "sap/f/DynamicPageTitle",
    "sap/f/DynamicPageHeader",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/Title",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/Button",
    "sap/m/Avatar",
    "sap/uxap/ObjectPageLayout",
    "sap/uxap/ObjectPageSection",
    "sap/uxap/ObjectPageSubSection",
    "sap/m/MessageStrip",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/m/ToolbarSpacer",
    "sap/m/IconTabBar",
    "sap/m/IconTabFilter"
], function(Control, DynamicPage, DynamicPageTitle, DynamicPageHeader, VBox, HBox,
            Title, Label, Text, ObjectStatus, Button, Avatar, ObjectPageLayout,
            ObjectPageSection, ObjectPageSubSection, MessageStrip, SimpleForm,
            ResponsiveGridLayout, Table, Column, ToolbarSpacer, IconTabBar, IconTabFilter) {
    "use strict";

    return Control.extend("orderapp.view.ObjectPage", {

        metadata: {
            properties: {
                orderId: { type: "string" }
            }
        },

        renderer: function(oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.style("height", "100%");
            oRm.openEnd();
            oRm.renderControl(oControl._getObjectPage());
            oRm.close("div");
        },

        _getOrderData: function() {
            var sOrderId = this.getOrderId();
            var aOrders = window.ordersData || [];
            return aOrders.find(function(order) {
                return order.id === sOrderId;
            }) || {};
        },

        _getObjectPage: function() {
            if (this._oObjectPage) {
                return this._oObjectPage;
            }

            var oData = this._getOrderData();

            this._oObjectPage = new ObjectPageLayout({
                showTitleInHeaderContent: true,
                alwaysShowContentHeader: false,
                preserveHeaderStateOnScroll: false,
                headerContentPinnable: true,
                isChildPage: true,
                upperCaseAnchorBar: false,

                headerTitle: new DynamicPageTitle({
                    heading: [
                        new Title({
                            text: "Material Order " + oData.id,
                            level: "H2"
                        })
                    ],
                    expandedContent: [
                        new HBox({
                            items: [
                                new VBox({
                                    items: [
                                        new Label({ text: "Material" }).addStyleClass("sapUiTinyMarginBottom"),
                                        new Text({ text: oData.material }).addStyleClass("sapUiMediumMarginEnd")
                                    ]
                                }).addStyleClass("sapUiMediumMarginEnd"),
                                new VBox({
                                    items: [
                                        new Label({ text: "Exchange Partner" }).addStyleClass("sapUiTinyMarginBottom"),
                                        new Text({ text: oData.exchangePartner })
                                    ]
                                }).addStyleClass("sapUiMediumMarginEnd"),
                                new VBox({
                                    items: [
                                        new Label({ text: "Expected Delivery" }).addStyleClass("sapUiTinyMarginBottom"),
                                        new Text({
                                            text: new Date(oData.expectedDeliveryDate).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ],
                    snappedContent: [
                        new Text({ text: oData.material + " • " + oData.exchangePartner })
                    ],
                    actions: [
                        new Button({
                            text: "Edit",
                            type: "Emphasized",
                            press: function() {
                                sap.m.MessageToast.show("Edit mode");
                            }
                        }),
                        new Button({
                            text: "Approve",
                            type: "Accept",
                            press: function() {
                                sap.m.MessageToast.show("Order approved");
                            }
                        }),
                        new Button({
                            text: "Reject",
                            type: "Reject",
                            press: function() {
                                sap.m.MessageToast.show("Order rejected");
                            }
                        }),
                        new Button({
                            icon: "sap-icon://overflow",
                            type: "Transparent"
                        })
                    ],
                    navigationActions: [
                        new Button({
                            icon: "sap-icon://full-screen",
                            type: "Transparent",
                            press: function() {
                                sap.m.MessageToast.show("Toggle fullscreen");
                            }
                        }),
                        new Button({
                            icon: "sap-icon://decline",
                            type: "Transparent",
                            press: function() {
                                sap.m.MessageToast.show("Close");
                            }
                        })
                    ]
                }),

                headerContent: [
                    new VBox({
                        items: [
                            new HBox({
                                items: [
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Order Status" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new ObjectStatus({
                                                text: oData.orderStatus,
                                                state: oData.statusType
                                            })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Plant" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.plant })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Sales Order Number" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.salesOrderNumber })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Priority" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.priority })
                                        ]
                                    })
                                ]
                            }).addStyleClass("sapUiSmallMarginBottom"),

                            new HBox({
                                items: [
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Requested Quantity" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.requestedQuantity.toString() })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Approved Quantity" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.approvedQuantity !== null ? oData.approvedQuantity.toString() : "-" })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Created By" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({ text: oData.createdBy })
                                        ]
                                    }).addStyleClass("sapUiMediumMarginEnd"),
                                    new VBox({
                                        width: "200px",
                                        items: [
                                            new Label({ text: "Created Date" }).addStyleClass("sapUiTinyMarginBottom"),
                                            new Text({
                                                text: new Date(oData.createdDate).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }).addStyleClass("sapUiSmallMargin")
                ],

                sections: [
                    this._getGeneralSection(oData),
                    this._getDetailsSection(oData),
                    this._getHistorySection(oData),
                    this._getAttachmentsSection(oData)
                ]
            });

            return this._oObjectPage;
        },

        _getGeneralSection: function(oData) {
            return new ObjectPageSection({
                title: "General Information",
                subSections: [
                    new ObjectPageSubSection({
                        blocks: [
                            new SimpleForm({
                                editable: false,
                                layout: "ResponsiveGridLayout",
                                labelSpanXL: 4,
                                labelSpanL: 4,
                                labelSpanM: 4,
                                labelSpanS: 12,
                                adjustLabelSpan: false,
                                emptySpanXL: 0,
                                emptySpanL: 0,
                                emptySpanM: 0,
                                emptySpanS: 0,
                                columnsXL: 2,
                                columnsL: 2,
                                columnsM: 1,
                                content: [
                                    new Label({ text: "Order Number" }),
                                    new Text({ text: oData.id }),

                                    new Label({ text: "Material" }),
                                    new Text({ text: oData.material }),

                                    new Label({ text: "Material Description" }),
                                    new Text({ text: oData.materialDescription }),

                                    new Label({ text: "Plant" }),
                                    new Text({ text: oData.plant }),

                                    new Label({ text: "Exchange Partner" }),
                                    new Text({ text: oData.exchangePartner }),

                                    new Label({ text: "Expected Delivery Date" }),
                                    new Text({
                                        text: new Date(oData.expectedDeliveryDate).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
        },

        _getDetailsSection: function(oData) {
            return new ObjectPageSection({
                title: "Order Details",
                subSections: [
                    new ObjectPageSubSection({
                        blocks: [
                            new SimpleForm({
                                editable: false,
                                layout: "ResponsiveGridLayout",
                                labelSpanXL: 4,
                                labelSpanL: 4,
                                labelSpanM: 4,
                                labelSpanS: 12,
                                adjustLabelSpan: false,
                                emptySpanXL: 0,
                                emptySpanL: 0,
                                emptySpanM: 0,
                                emptySpanS: 0,
                                columnsXL: 2,
                                columnsL: 2,
                                columnsM: 1,
                                content: [
                                    new Label({ text: "Sales Order Number" }),
                                    new Text({ text: oData.salesOrderNumber }),

                                    new Label({ text: "Requested Quantity" }),
                                    new Text({ text: oData.requestedQuantity.toString() }),

                                    new Label({ text: "Approved Quantity" }),
                                    new Text({ text: oData.approvedQuantity !== null ? oData.approvedQuantity.toString() : "-" }),

                                    new Label({ text: "Order Status" }),
                                    new ObjectStatus({
                                        text: oData.orderStatus,
                                        state: oData.statusType
                                    }),

                                    new Label({ text: "Priority" }),
                                    new Text({ text: oData.priority }),

                                    new Label({ text: "Created By" }),
                                    new Text({ text: oData.createdBy }),

                                    new Label({ text: "Created Date" }),
                                    new Text({
                                        text: new Date(oData.createdDate).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
        },

        _getHistorySection: function(oData) {
            return new ObjectPageSection({
                title: "Status History",
                subSections: [
                    new ObjectPageSubSection({
                        blocks: [
                            new VBox({
                                items: [
                                    new HBox({
                                        alignItems: "Center",
                                        items: this._createStatusFlow(oData.statusFlow)
                                    }).addStyleClass("sapUiSmallMargin")
                                ]
                            })
                        ]
                    })
                ]
            });
        },

        _createStatusFlow: function(aStatusFlow) {
            var aItems = [];

            aStatusFlow.forEach(function(oStep, index) {
                // Add status indicator
                var oIndicator = new VBox({
                    alignItems: "Center",
                    items: [
                        new sap.ui.core.Icon({
                            src: oStep.status === "complete" ? "sap-icon://accept" :
                                 oStep.status === "error" ? "sap-icon://decline" : "sap-icon://circle-task",
                            size: "1.5rem",
                            color: oStep.status === "complete" ? "#2da44e" :
                                   oStep.status === "error" ? "#d73a49" : "#758ca4"
                        }).addStyleClass("sapUiTinyMarginBottom"),
                        new Text({
                            text: oStep.label,
                            wrapping: false
                        })
                    ]
                });

                aItems.push(oIndicator);

                // Add separator line (except for last item)
                if (index < aStatusFlow.length - 1) {
                    aItems.push(new sap.ui.core.HTML({
                        content: "<div style='width: 60px; height: 2px; background: #758ca4; margin: 0 1rem; margin-top: 0.75rem;'></div>"
                    }));
                }
            });

            return aItems;
        },

        _getAttachmentsSection: function(oData) {
            return new ObjectPageSection({
                title: "Attachments",
                subSections: [
                    new ObjectPageSubSection({
                        blocks: [
                            new VBox({
                                items: [
                                    new MessageStrip({
                                        text: "No attachments available for this order",
                                        type: "Information",
                                        showIcon: true
                                    }).addStyleClass("sapUiSmallMargin"),
                                    new Button({
                                        text: "Add Attachment",
                                        icon: "sap-icon://add",
                                        press: function() {
                                            sap.m.MessageToast.show("Add attachment functionality");
                                        }
                                    }).addStyleClass("sapUiSmallMargin")
                                ]
                            })
                        ]
                    })
                ]
            });
        }
    });
});
