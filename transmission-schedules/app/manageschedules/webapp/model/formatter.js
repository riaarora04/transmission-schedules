sap.ui.define([], function () {
    "use strict";

    return {
        formatCriticality: function (sCriticality) {
            if (!sCriticality) {
                return "None";
            }

            switch (parseInt(sCriticality)) {
                case 0:
                    return "None";
                case 1:
                    return "Error";
                case 2:
                    return "Warning";
                case 3:
                    return "Success";
                default:
                    return "None";
            }
        },

        formatDate: function (oDate) {
            if (!oDate) {
                return "";
            }
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy"
            });
            return oDateFormat.format(oDate);
        },

        formatDateTime: function (oDateTime) {
            if (!oDateTime) {
                return "";
            }
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "dd.MM.yyyy HH:mm:ss"
            });
            return oDateFormat.format(oDateTime);
        },

        formatTime: function (oTime) {
            if (!oTime) {
                return "";
            }
            var oTimeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                pattern: "HH:mm:ss"
            });
            return oTimeFormat.format(oTime);
        }
    };
});
