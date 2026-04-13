sap.ui.define(
    ["sap/fe/core/AppComponent"],
    function (Component) {
        "use strict";

        return Component.extend("transmissionschedules.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                // Call the base component's init function
                Component.prototype.init.apply(this, arguments);
            }
        });
    }
);