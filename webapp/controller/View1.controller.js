sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ux/zanalytics/util/Formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/BindingMode",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter,JSONModel,Fragment,Sorter,Filter,BindingMode,ChartFormatter,MessageToast,MessageBox) {
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
                var oSAPModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000000')?$format=json");
                // @ts-ignore
                this.getView().byId("IDcontainer").setModel(oSAPModel, "oSAPModel");

                // oConModel
                var oConModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000001')?$format=json");
                // @ts-ignore
                this.getView().byId("Concontainer").setModel(oConModel, "oConModel");




                //oAriModel
                var oAriModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000002')?$format=json");
                // @ts-ignore
                this.getView().byId("Aribacontainer").setModel(oAriModel, "oAriModel");


                //oFGModel
                var oFGModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000003')?$format=json");
                // @ts-ignore
                this.getView().byId("FGcontainer").setModel(oFGModel, "oFGModel");


                //oECCModel
                var oECCModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000004')?$format=json");
                // @ts-ignore
                this.getView().byId("ECCcontainer").setModel(oECCModel, "oECCModel");

                //oJavaModel
                var oJavaModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000005')?$format=json");
                // @ts-ignore
                this.getView().byId("Javcontainer").setModel(oJavaModel, "oJavaModel");


                //oSFModel
                var oSFModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000006')?$format=json");
                // @ts-ignore
                this.getView().byId("SFcontainer").setModel(oSFModel, "oSFModel");


                //oAZModel
                var oAZModel = new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('300000007')?$format=json");
                // @ts-ignore
                this.getView().byId("Azcontainer").setModel(oAZModel, "oAZModel");



                








            },

            // fragment controller logic - 1.20 Failed to load
//create
            // async onOpenDialog() {
            //     // create dialog lazily
            //     this.oDialog ??= await this.loadFragment({
            //         name: "ux.zanalytics.view.create"
            //     });
            
            //     this.oDialog.open();
            // },


// New Syntax  -- 1.93 and above
            // this === Controller instance
        onOpenDialog: async function() {
        const dialogCreate = this.byId("CreateDialog") || await this.loadFragment({
        name: "ux.zanalytics.view.create"
        });

        var oTable = this.getView().byId("IDOrderTable");
        var length =oTable.getSelectedItems().length ;

        if(length>0)
        {
        dialogCreate.open();

// Loading selected row data in create format

        //var oTable = this.getView().byId("IDOrderTable");

        var oCreateDialog = this.getView().byId("CreateDialog");

        // var length =oTable.getSelectedItems().length ;

        // if(length>0)
        // {

        var oPOID= oTable.getSelectedContextPaths()[0].split('(')[1].substr(1,9)

        var OCreateModel=  new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('"+ oPOID +"')?$format=json");
        // @ts-ignore
        this.getView().byId("IdCreateForm").setModel(OCreateModel, "OCreateModel");

        }else{
            MessageToast.show("please select the row ")
        }
  },            
            onCloseAppDialog1:function(){
                this.getView().byId("CreateDialog").close();
            },


            onPOCreate:function(oEvent){

                try{
                var oTable = this.getView().byId("IDOrderTable");

                var oCreateDialog = this.getView().byId("CreateDialog");

                var oModel= this.getView().getModel();

                

                var oPOID= this.getView().byId("idPOID").getValue();
                var oGAnt= this.getView().byId("idGAnt").getValue();
                var oSupplier= this.getView().byId("idSupplier").getValue();

                //JSON Payload

                var oCreatePayload = {

                    "POId": oPOID,
                    "OrderedById": "oGAmt",
                    "OrderedByName": "Walter  Winter",
                    "ChangedAt": "/Date(1716328800000)/",
                    "SupplierId": "100000088",
                    "SupplierName": oSupplier,
                    "DeliveryAddress": "Zeppelinstrasse 2, 85399 Munich, DE Germany",
                    "DeliveryDateEarliest": "/Date(1716933600000)/",
                    "LaterDelivDateExist": "X",
                    "GrossAmount": oGAnt,
                    "CurrencyCode": "USD",
                    "ItemCount": 4
                };
                
            oModel.create("/PurchaseOrders", oCreatePayload, {
                success: function () {


                    MessageToast.show("PO Created Successfully" + oPOID );
                 

                },
                error: function (oError) {


                    console.log(oError);
                    MessageToast.show("Po Creation failed.");
                }
            });
        }
        catch{
            MessageBox.error("Unable to Process Request . Kindly reach out to IT Support. ");
        }

                
            },


            onPOCreateMultipleRows:function(oEvent){

                try{
                var oTable = this.getView().byId("IDOrderTable");

                // var oCreateDialog = this.getView().byId("CreateDialog");

                var oModel= this.getView().getModel();

                

                var oPOID= this.getView().byId("idPOID").getValue();
                var oGAnt= this.getView().byId("idGAnt").getValue();
                var oSupplier= this.getView().byId("idSupplier").getValue();
var length = 3;


                if(length>0){
                //JSON Payload
var oArr = [];
                var oCreatePayload = {

                    "POId": oPOID,
                    "OrderedById": "oGAmt",
                    "OrderedByName": "Walter  Winter",
                    "ChangedAt": "/Date(1716328800000)/",
                    "SupplierId": "100000088",
                    "SupplierName": oSupplier,
                    "DeliveryAddress": "Zeppelinstrasse 2, 85399 Munich, DE Germany",
                    "DeliveryDateEarliest": "/Date(1716933600000)/",
                    "LaterDelivDateExist": "X",
                    "GrossAmount": oGAnt,
                    "CurrencyCode": "USD",
                    "ItemCount": 4
                };

                for( var i=0;i<length;i++);
                {
                    oArr.push("oCreatePayload")
                }
    


            
                
            oModel.create("/PurchaseOrders", oArr, {
                success: function () {


                    MessageToast.show("PO Created Successfully" + oPOID );
                 

                },
                error: function (oError) {


                    console.log(oError);
                    MessageToast.show("Po Creation failed.");
                }
            });
        }
        }
        catch{
            MessageBox.error("Unable to Process Request . Kindly reach out to IT Support. ");
        }

                
            },

//update
            // async onUpdateDialog() {
            //     // create dialog lazily
            //     this.oDialogupdate ??= await this.loadFragment({
            //         name: "ux.zanalytics.view.update"
            //     });
            
            //     this.oDialogupdate.open();
            // },

// New Syntax  -- 1.93 and above
            // this === Controller instance
            onUpdateDialog: async function() {
                const dialogUpdate = this.byId("UpdateDialog") || await this.loadFragment({
                name: "ux.zanalytics.view.update"
                });
                var oTable = this.getView().byId("IDOrderTable");
        var length =oTable.getSelectedItems().length ;

        if(length>0)
        {
                
                dialogUpdate.open();
                // Loading selected row data in create format

        //var oTable = this.getView().byId("IDOrderTable");

        var oCreateDialog = this.getView().byId("UpdateDialog");

        // var length =oTable.getSelectedItems().length ;

        // if(length>0)
        // {

        var oPOID= oTable.getSelectedContextPaths()[0].split('(')[1].substr(1,9)

        var OCreateModel=  new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PO_APV_SRV/PurchaseOrders('"+ oPOID +"')?$format=json");
        // @ts-ignore
        this.getView().byId("IdUpdateForm").setModel(OCreateModel, "OCreateModel");

        }else{
            MessageToast.show("please select the row ")
        }
          },

          onPOupdate:function(){
            try{
                var oTable = this.getView().byId("IDOrderTable");

                var oCreateDialog = this.getView().byId("UpdateDialog");

                var oModel= this.getView().getModel();

                

                var oPOID= this.getView().byId("idUPOID").getValue();
                var oGAnt= this.getView().byId("idUGAnt").getValue();
                var oSupplier= this.getView().byId("idUSupplier").getValue();

                //JSON Payload

                var oUpdatePayload = {

                    "POId": oPOID,
                    "OrderedById": "oGAmt",
                    "OrderedByName": "Walter  Winter",
                    "ChangedAt": "/Date(1716328800000)/",
                    "SupplierId": "100000088",
                    "SupplierName": oSupplier,
                    "DeliveryAddress": "Zeppelinstrasse 2, 85399 Munich, DE Germany",
                    "DeliveryDateEarliest": "/Date(1716933600000)/",
                    "LaterDelivDateExist": "X",
                    "GrossAmount": oGAnt,
                    "CurrencyCode": "USD",
                    "ItemCount": 4
                };
                
            oModel.update("/PurchaseOrders('oPOID')", oUpdatePayload, {
                success: function () {


                    MessageToast.show("PO Updated Successfully" + oPOID );
                 

                },
                error: function (oError) {


                    console.log(oError);
                    MessageToast.show("Po Updation failed.");
                }
            });
        }
        catch{
            MessageBox.error("Unable to Process Request . Kindly reach out to IT Support. ");
        }

          },
            
            onCloseupdateDialog1:function(){
                this.getView().byId("UpdateDialog").close();
            },
           

            
            
            // fragment controller logic 1.58 and above 1.96 below
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


            // async onOpensysErrorDialog() {
            //     // create dialog lazily
            //     this.oDialog ??= await this.loadFragment({
            //         name: "ux.zanalytics.view.sysError"
            //     });
            
            //     this.oDialog.open();
            // },

             // this === Controller instance
             onOpensysErrorDialog: async function() {
                const dialogCreate = this.byId("SysDialog") || await this.loadFragment({
                name: "ux.zanalytics.view.sysError"
                });
                dialogCreate.open();
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
