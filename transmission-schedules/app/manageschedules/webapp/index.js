sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    new ComponentContainer({
        name: "transmissionjobs.manageschedules",
        settings: {
            id: "manageschedules"
        },
        async: true
    }).placeAt("content");
});
