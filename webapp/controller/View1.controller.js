sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ux/zanalytics/util/Formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",



    
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter,JSONModel,Fragment,Sorter,Filter) {
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

                this._mViewSettingsDialogs = {};    


                // Sapmodel
                var oSAPModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001990')?$format=json");
                // @ts-ignore
                this.getView().byId("IDcontainer").setModel(oSAPModel, "oSAPModel");

                // oConModel
                var oConModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001991')?$format=json");
                // @ts-ignore
                this.getView().byId("Concontainer").setModel(oConModel, "oConModel");




                //oAriModel
                var oAriModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001992')?$format=json");
                // @ts-ignore
                this.getView().byId("Aribacontainer").setModel(oAriModel, "oAriModel");


                //oFGModel
                var oFGModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001993')?$format=json");
                // @ts-ignore
                this.getView().byId("FGcontainer").setModel(oFGModel, "oFGModel");


                //oECCModel
                var oECCModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001994')?$format=json");
                // @ts-ignore
                this.getView().byId("ECCcontainer").setModel(oECCModel, "oECCModel");

                //oJavaModel
                var oJavaModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001995')?$format=json");
                // @ts-ignore
                this.getView().byId("Javcontainer").setModel(oJavaModel, "oJavaModel");


                //oSFModel
                var oSFModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001996')?$format=json");
                // @ts-ignore
                this.getView().byId("SFcontainer").setModel(oSFModel, "oSFModel");


                //oAZModel
                var oAZModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300001997')?$format=json");
                // @ts-ignore
                this.getView().byId("Azcontainer").setModel(oAZModel, "oAZModel");








            },

            // fragment controller logic - 1.20

            async onOpenDialog() {
                // create dialog lazily
                this.oDialog ??= await this.loadFragment({
                    name: "ux.zanalytics.view.create"
                });
            
                this.oDialog.open();
            },
            
            
            // fragment controller logic 1.96 below
            onOpenDialog1 : function () {
    
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ux.zanalytics.view.create"
                    });
                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },


            async onOpensysErrorDialog() {
                // create dialog lazily
                this.oDialog ??= await this.loadFragment({
                    name: "ux.zanalytics.view.sysError"
                });
            
                this.oDialog.open();
            },
            onCloseAppDialog:function(){
                this.getView().byId("SysDialog").close();
            },

            async onOpenTableDialog() {
                // create dialog lazily
                this.oDialog ??= await this.loadFragment({
                    name: "ux.zanalytics.view.Form"
                });
            
                this.oDialog.open();
            }




            ,

//sort
            handleSortButtonPressed: function () {
                this.getViewSettingsDialog("ux.zanalytics.view.SortDialog")
                    .then(function (oViewSettingsDialog) {
                        oViewSettingsDialog.open();
                    });
            },

            handleSortDialogConfirm: function (oEvent) {
                var oTable = this.byId("IDOrderTable"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];
    
                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));
    
                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            },

// filter
            handleFilterButtonPressed: function () {
                this.getViewSettingsDialog("ux.zanalytics.view.FilterDialog")
                    .then(function (oViewSettingsDialog) {
                        oViewSettingsDialog.open();
                    });
            },

            handleFilterDialogConfirm: function (oEvent) {
                var oTable = this.byId("IDOrderTable"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    aFilters = [];
    
                mParams.filterItems.forEach(function(oItem) {
                    var aSplit = oItem.getKey().split("___"),
                        sPath = aSplit[0],
                        sOperator = aSplit[1],
                        sValue1 = aSplit[2],
                        sValue2 = aSplit[3],
                        oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
                    aFilters.push(oFilter);
                });
    
                // apply filter settings
                oBinding.filter(aFilters);
    
                // update filter bar
                //this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
                //this.byId("vsdFilterLabel").setText(mParams.filterString);
            },

            //group
            handleGroupButtonPressed: function () {
                this.getViewSettingsDialog("ux.zanalytics.view.GroupDialog")
                    .then(function (oViewSettingsDialog) {
                        oViewSettingsDialog.open();
                    });
            },
            handleGroupDialogConfirm: function (oEvent) {
                var oTable = this.byId("IDOrderTable"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    vGroup,
                    aGroups = [];
    
                if (mParams.groupItem) {
                    sPath = mParams.groupItem.getKey();
                    bDescending = mParams.groupDescending;
                    vGroup = this.mGroupFunctions[sPath];
                    aGroups.push(new Sorter(sPath, bDescending, vGroup));
                    // apply the selected group settings
                    oBinding.sort(aGroups);
                } else if (this.groupReset) {
                    oBinding.sort();
                    this.groupReset = false;
                }
            },
            resetGroupDialog: function(oEvent) {
                this.groupReset =  true;
            },

            getViewSettingsDialog: function (sDialogFragmentName) {
                var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];
    
                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        // if (Device.system.desktop) {
                        //     oDialog.addStyleClass("sapUiSizeCompact");
                        // }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            }
    
        });
    });
