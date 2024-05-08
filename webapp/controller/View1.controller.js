sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ux.zanalytics.controller.View1", {
            onButtonPress: function(oEvent) {
                var oButton = oEvent.getSource();
                this.byId("actionSheet").openBy(oButton);
            }
        });
    });
