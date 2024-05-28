
sap.ui.define(function () {
    "use strict";

    var Formatter = {


        
        toInteger :function(oValue){
            var oValueInt= oValue;
            return parseInt(oValueInt)
        },

        weightState: function (fMeasure, sUnit) {

            // Boarder values for different status of weight
            var fMaxWeightSuccess = 1;
            var fMaxWeightWarning = 5;
            var fAdjustedMeasure = parseFloat(fMeasure);

            // if the value of fMeasure is not a number, no status will be set
            if (isNaN(fAdjustedMeasure)) {
                return "None";
            } else {

                if (sUnit === "G") {
                    fAdjustedMeasure = fMeasure / 1000;
                }

                if (fAdjustedMeasure < 0) {
                    return "None";
                } else if (fAdjustedMeasure < fMaxWeightSuccess) {
                    return "Success";
                } else if (fAdjustedMeasure < fMaxWeightWarning) {
                    return "Warning";
                } else {
                    return "Error";
                }
            }
        },
        formatDate: function (inpt) {
            if (inpt) {
                var value = inpt.toString();

                if (value.startsWith("/")) {
                    var sJsonDate = value;

                    var sNumber = sJsonDate.replace(/[^0-9]+/g, '');
                    var iNumber = sNumber * 1;
                    var oDate = new Date(iNumber);

                    return oDate;
                }
                else {
                    return inpt;
                }
            }
            else {
                return inpt;
            }
        },
        formatJSONDate: function (Input) {
            if (Input) {
                var dateString = Input.substr(6);
                var currentTime = new Date(parseInt(dateString));
                var month = currentTime.getMonth() + 1;
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();
                var hour = currentTime.getHours();
                var minutes = currentTime.getMinutes();
                var seconds = currentTime.getSeconds();
                	var date = day + "-" + month + "-" + year +"  "+ hour +":" + minutes +":"+ seconds;	
                //	var date = "" + hour +":" + minutes +":"+ seconds;
                  //var date = " " + hour + " hr " + minutes + " min" + " Ago";
                return date;
            }
            else {
                return Input;
            }
        },

        formatJSONDateTime: function (Input) {
            if (Input) {

                var dateString = Input.split('T')[0];

                var currentTime = Input.split('T')[1];

                var currentDate = new Date(dateString);
                var month = currentDate.getMonth() + 1;
                var day = currentDate.getDate();
                var year = currentDate.getFullYear();
                	var hour = currentDate.getHours();
                	var minutes = currentDate.getMinutes();
                	var seconds = currentDate.getSeconds();
                //	var date = day + "-" + month + "-" + year +"  "+ hour +":" + minutes +":"+ seconds;	
                //	var date = "" + hour +":" + minutes +":"+ seconds;
                //	var date = " " + hour +" hr " + minutes +" min" + " Ago";

                  var date = day + "-" + month + "-" + year + "";
                return date;
            }
            else {
                return Input;
            }
        },

        DeliveryStatus: function (oValue) {
            var oString = oValue; // X


            if (oString) {
                return "Yes"
            }
            else {
                return "No"
            }

        },

        DeliveryStatusState: function (oValue) {
            var oString = oValue; // X


            if (oString) {
                return "Success"
            }
            else {
                return "Error"
            }

        },
        SystemStatus: function (oValue, oThreshold) {
            var Value = parseInt(oValue);
            var Threshold = parseInt(oThreshold);

            if (Value < Threshold) {
                return "Success"
            }
            else if (Value >= Threshold) {
                return "Error"
            }
            else {
                return "None"
            }

        },

        QueueDepthStatus: function (oQDepth, oQThreshold, oQueueAge, oThreadAge) {
            var QueueAge = oQueueAge;
            var ThreadAge = oThreadAge;

            if (QueueAge == "X" || ThreadAge == "X") {
                return "Error"
            }
            else {
                var QDepth = parseInt(oQDepth);
                var QThreshold = parseInt(oQThreshold);

                if (QDepth < QThreshold) {
                    return "Good"

                } else if (QDepth >= QThreshold) {
                    return "Error"
                }
                else {
                    return "Neutral"
                }
            }
        },
        formatInputValue: function (oValue) {
            var oStr = oValue;

            if (oValue)
                var oStrlen = oStr.length;
            if (oStrlen <= 9) {
                var oStrM = oStr / 1000000;

                var oStrMR = Math.round(oStrM);
                return oStrMR + " M";


            } else if (oStrlen >= 9) {
                var oStrB = oStr / 1000000000;
                var oStrBR = Math.round(oStrB);
                return oStrBR + " B";
            }
            else {
                return oStr;
            }
        },






    };

    return Formatter;

}, /* bExport= */ true);
