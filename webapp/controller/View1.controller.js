sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ux/zanalytics/util/Formatter",
    "sap/ui/model/json/JSONModel"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter,JSONModel) {
        "use strict";

        return Controller.extend("ux.zanalytics.controller.View1", {
            Formatter: Formatter,
            onInit: function () {
                // @ts-ignore
                // @ts-ignore
                var that = this;
                var sServiceUrl = "/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/";

                var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
                // @ts-ignore
                this.getView().setModel(oModel);


                // Sapmodel
                var oSAPModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001997')?$format=json");
                // @ts-ignore
                this.getView().byId("IDcontainer").setModel(oSAPModel, "oSAPModel");

                // oConModel
                var oConModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001989')?$format=json");
                // @ts-ignore
                this.getView().byId("Concontainer").setModel(oConModel, "oConModel");




                //oAriModel
                var oAriModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001999')?$format=json");
                // @ts-ignore
                this.getView().byId("Aribacontainer").setModel(oAriModel, "oAriModel");


                //oFGModel
                var oFGModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001996')?$format=json");
                // @ts-ignore
                this.getView().byId("FGcontainer").setModel(oFGModel, "oFGModel");


                //oECCModel
                var oECCModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001988')?$format=json");
                // @ts-ignore
                this.getView().byId("ECCcontainer").setModel(oECCModel, "oECCModel");

                //oJavaModel
                var oJavaModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001987')?$format=json");
                // @ts-ignore
                this.getView().byId("Javcontainer").setModel(oJavaModel, "oJavaModel");


                //oSFModel
                var oSFModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001986')?$format=json");
                // @ts-ignore
                this.getView().byId("SFcontainer").setModel(oSFModel, "oSFModel");


                //oAZModel
                var oAZModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001985')?$format=json");
                // @ts-ignore
                this.getView().byId("Azcontainer").setModel(oAZModel, "oAZModel");








            }
        });
    });
