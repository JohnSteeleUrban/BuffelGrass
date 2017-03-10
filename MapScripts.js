/**
* jQuery.browser.mobile (http://detectmobilebrowser.com/)
*
* jQuery.browser.mobile will be true if the browser is a mobile device
*
**/
(function (a) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

//$(function () {
//    var $content = $('#mapDiv');
//    var $window = $(window).on('resize', function () {
//        var height = $(this).height() - 115;
//        $content.height(height);
//    }).trigger('resize'); //on page load
//});

var thelat, thelong, theSiteArray, isSiteOwner, toolMode, theId;
var isUpdate = false;
var theVolArray = [];

$(function () {
    $('#contactemail').attr('readonly', true);
    $('#mapDiv').height($(window).height() - 50);

    $(window).bind('resize', function (event) {
        $('#mapDiv').height($(window).height() - 50);
    });

    var $content = $('#mapDiv');
    var $window = $(window).on('resize', function () {
        var height = $(this).innerHeight() - 50;
        $content.height(height);
    }).trigger('resize');


    if (theMode == 'SiteOrganizer') {
        $('#OrgButtons').css("display", "block");
    }

    $(".hideinstructions").click(function () {
        $('#instructions').modal('hide');
    });


    $("#addSite").click(function () {
        toolMode = 'AddSite'
    });

    $('#registerSiteModal').on('hide.bs.modal', function () {
        map.graphics.clear();
        toolMode = '';
    });
    //function toggleChevron(e) {
    //    $(e.target)
    //        .prev('a')
    //        .find("i.indicator")
    //        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    //}
    //$('#accordion').on('hidden.bs.collapse', toggleChevron);
    //$('#accordion').on('shown.bs.collapse', toggleChevron);
    ////$('#collapseOne').collapse("show");
    //$('#collapseTwo').collapse("show");

    //Uncomment below line when count is complete for the year
    //$("#CountClosedModal").modal();

    //Comment out next 4 lines when count is complete to keep disclaimer from poppin up
    //$("#myModalDisclaimer").modal();
    //$('#myModalDisclaimer').on('hide.bs.modal', function () {
    //    $("#myModal").modal();
    //});

    $('#submitBtn').click(function () {
        submit(".modal1");
    });
    $('#submitBtn2').click(function () {
        var siteid = document.getElementById('id').value;
        document.getElementById('LocationId').value = siteid;
        submit(".modal2");
    });
    $('#updateSiteBtn')
        .click(function () {
            isUpdate = true;
            submit(".modal1");
        });

    //$('#volunteerbtn').click(function () {
    //    var siteid = document.getElementById('id').value;
    //    document.getElementById('LocationId').value = siteid;
    //    document.getElementById('email').value = theUserEmail;
    //    document.getElementById('email').readOnly = true;
    //    fillVolunteerInfo(siteid);
    //});

    function fillVolunteerInfo(siteId) {
        for (vol in theVolArray) {
            var aVol = theVolArray[vol];

            if (aVol["LocationId"] === siteId) {
                $('.modal2').each(function () {
                    theElement = $("#" + this.id);
                    var id = this.id;
                    if (!(typeof aVol[id] === "object")) {
                        theElement[0].value = aVol[id];
                    }
                    if (id === "email") {
                        theElement[0].readOnly = true;
                    }
                });
                isUpdate = true;
            }
        }
    }
    function submit(modal) {
        //Not sure how your validation widget works but values should be valid and required fields checked at this point
        var isValid = true;
        //Validate values
        $(modal).each(function () {
            var theElement = $("#" + this.id);
            var theclass = theElement.attr("class");
            if (theElement.is('input') && (theclass.indexOf('notrequired') < 0)) {
                if (theElement.attr('type') == 'text') {
                    if (theElement.val() == '') {
                        alert("Please Fill Out: " + theElement.attr('title'));
                        isValid = false;
                        theElement.focus();
                        return false;
                    }
                }
                    //else if (theElement.attr('type') == 'date') {
                    //    //ble need to fix this regex to make sure it's in the correct date format
                    //    //var reg =  /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
                    //    // var reg = "[0-9]{2}[/][0-9]{2}[/][0-9]{4}$";
                    //    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(theElement.val())) {
                    //        alert("Please Answer " + theElement.attr('title') + " in the correct date format 'MM/DD/YYYY'");
                    //        isValid = false;
                    //        return false;
                    //    }
                    //}
                    //else if (theElement.attr('type') == 'checkbox') {
                    //    if (theElement.val() == '') {
                    //        alert("Please Answer " + theElement.attr('title'));
                    //        isValid = false;
                    //        return false;
                    //    }
                    //} 
                    //else if (theElement.attr('type') == 'number') {
                    //    //if (!/^\d+$/.test(theElement.val())) {
                    //    alert(Number.isInteger(theElement.val()))
                    //    if (!Number.isInteger(theElement.val())) {
                    //        alert("Please Answer " + theElement.attr('title') + " with numbers only.");
                    //        isValid = false;
                    //        return false;
                    //    }
                    //}
                else if (theElement.is('textarea')) {
                    if (theElement.val() == '') {
                        alert("Please Answer " + theElement.attr('title'));
                        isValid = false;
                        return false;
                    }
                }
            }
            if (theElement[0].id === "pulldate") {
                if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(theElement.val())) {
                    alert("Please Answer " + theElement.attr('title') + " in the correct date format 'MM/DD/YYYY'");
                    isValid = false;
                    return false;
                }
            }
            if (theElement[0].id === "PeopleNumber" || theElement[0].id === "maxpeople") {
                if (!(typeof theElement.val() === 'number') && !(theElement.val() % 1 === 0)) {
                    alert("Please Answer " + theElement.attr('title') + " in numeric format.");
                    isValid = false;
                    return false;
                }
            }
        });

        if (isValid) {
            //Create name value pair for fields/value
            var theVals = {};
            theVals['OrganizerEmail'] = theUserEmail;
            //theVals['UserName'] = theUserName;
            //theVals['DateTimeSubmitted'] = Date();

            $(modal).each(function () {
                theElement = $("#" + this.id);
                if (theElement.is('input')) {
                    if (theElement.attr('type') == 'text') {
                        theVals[theElement.attr('id')] = theElement.val();
                    }
                    else if (theElement.attr('type') == 'checkbox') {
                        if (theElement.is(':checked')) {
                            theVals[theElement.attr('id')] = 'Y';
                        }
                        else {
                            theVals[theElement.attr('id')] = 'N';
                        }
                    }
                    else if (theElement.attr('type') == 'number') {
                        theVals[theElement.attr('id')] = theElement.val();
                    }
                    else if (theElement.attr('type') == 'date') {
                        theVals[theElement.attr('id')] = theElement.val();
                    } else if (theElement[0].id === "id") {
                        theVals[theElement.attr('id')] = theElement.val();
                    }
                }
                else if (theElement.is('textarea')) {
                    theVals[theElement.attr('id')] = theElement.val();
                }
            });
            var theTableName;
            if (modal === ".modal1") {
                theTableName = "BuffelgrassLocations";
                theVals['locationlat'] = thelat;
                theVals['locationlong'] = thelong;
            } else if (modal === ".modal2") {
                theTableName = "BuffelgrassVolunteers";
            }
            if (isUpdate) {
                PageMethods.WriteResultsUpdate(theVals, theTableName, GetEvents_Result);
            } else {
                PageMethods.WriteResults(theVals, theTableName, GetEvents_Result);
            }
        }
    };

    function GetEvents_Result(ResultString) {
        if (ResultString == 'error') {
            alert("            An Error Has Occured\nPlease Review Your Entries Or\nContact The Website Administrator.");
        }
        else {
            if (ResultString.substring(0, 6) == 'update') {
                alert("Your site has been updated and you should receive a confirmation email shortly with the details.")
            }
            else {
                if (ResultString == 'BuffelgrassLocations') {
                    alert("Your site has been added and you should receive a confirmation email shortly with the details.")
                }
                else {
                    alert("Your registration has been received.  An email has been sent to you and the site contact with additional details.")
                }

            }
        }
        window.location = "Map.aspx";
    }

});

$(document).ready(function () {
    if (theMode == 'Volunteer') {
        $('#instructions').modal();
    }
    $('#mapDiv').height($(window).height() - 50);

    $(window).bind('resize', function (event) {
        $('#mapDiv').height($(window).height() - 50);
    });

    var $content = $('#mapDiv');
    var $window = $(window).on('resize', function () {
        var height = $(this).innerHeight() - 50;
        $content.height(height);
    }).trigger('resize');

    if (theMode == 'SiteOrganizer') {

        $("#")
    }


});

var app = {};

var map, bounds, geocoder;
var locatorUrl = "http://gismaps.pagnet.org/arcgis/rest/services/stnet62912/GeocodeServer";
var updateFeature;
var siteLayer;

require(["dojo/dom-construct",
         "esri/map",
         "esri/dijit/BasemapToggle",
         "esri/dijit/Geocoder", "agsjs/dijit/TOC", "esri/layers/FeatureLayer", "esri/dijit/InfoWindow",
         "esri/arcgis/utils", "esri/graphic", "esri/graphicsUtils", "esri/renderers/UniqueValueRenderer",
         "esri/symbols/SimpleMarkerSymbol", "esri/renderers/SimpleRenderer", "esri/Color", "esri/dijit/AttributeInspector",
         "esri/tasks/query", "esri/geometry/Extent", "esri/geometry/Point", "esri/SpatialReference", "dijit/form/Button", "dojo/dom-style", "dijit/popup", "dojo/promise/all", "dojo/parser", "dojo/dom-construct", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/TooltipDialog",
         "dojo/domReady!"], function (
         domConstruct,
         Map, BasemapToggle, Geocoder, TOC, FeatureLayer, InfoWindow, arcgisUtils, Graphic, graphicsUtils, UniqueValueRenderer,
         SimpleMarkerSymbol, SimpleRenderer, Color, AttributeInspector,
         Query, Extent, Point, SpatialReference, Button, domStyle, dijitPopup, all, parser, domConstruct
         ) {
             parser.parse();

             var theCenterPt = new Point(-12355701, 3788000, new SpatialReference({ wkid: 102113 }));

             map = new Map("mapDiv", {
                 basemap: "topo",
                 //center: theCenterPt,
                 //zoom: 10,
                 logo: false,
                 showAttribution: false
             });

             var toggle = new BasemapToggle({
                 map: map,
                 basemap: "satellite"
             }, "BasemapToggle");
             toggle.startup();

             // dojo.connect(map, "onLayersAddResult", GetCameras);

             map.on("load", function () {
                 map.graphics.enableMouseEvents();
                 GetSite();
                 GetVolData();
             });

             var sps = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 0, 0]), 1), new esri.Color([0, 255, 255]));


             map.on("click", function (evt) {
                 if (toolMode == 'AddSite') {
                     if (theMode === "SiteOrganizer") {

                         $('.modal1').each(function () {
                             theElement = $("#" + this.id);
                             theElement[0].value = "";
                             theElement[0].readOnly = false;
                         });
                         thelat = evt.mapPoint.getLatitude();
                         thelong = evt.mapPoint.getLongitude();
                         var thelocLat = document.getElementById('locationlat');
                         var thelocLong = document.getElementById('locationlong');
                         var contactEmail = document.getElementById('contactemail');

                         contactEmail.value = theUserEmail;
                         thelocLat.value = thelat;
                         thelocLong.value = thelong;
                         contactEmail.readOnly = true;
                        // PeopleSignedUp.readOnly = true;

                         $("#nonOrgDiv").css("display", "none");
                         $("#organizerDiv").css("display", "");
                         $("#organizerUpdateDiv").css("display", "none");
                         $("#VolunteerDiv").css("display", "block");
                         $("#privatePhoneDiv").css("display", "");
                         if (toolMode == 'AddSite') {
                             $("#VolunteerDiv").css("display", "none");
                             toolMode = "";
                         }

                         map.graphics.clear();
                         var highlightGraphic = new Graphic(evt.mapPoint, Ownedsymbol);
                         map.graphics.add(highlightGraphic);


                         var r = confirm("Locate the pull site here?\nLat: "+thelat+"\nLong: "+thelong);
                         if (r == true) {
                             $("#registerSiteModal").modal();
                         } else {
                             map.graphics.remove(highlightGraphic);
                         }
                     }
                 }
             });

             function getDate() {
                 var date;
                 date = new Date();
                 date = date.getUTCFullYear() + '-' +
                         ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                         ('00' + date.getUTCDate()).slice(-2) + ' ' +
                         ('00' + date.getUTCHours()).slice(-2) + ':' +
                         ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                         ('00' + date.getUTCSeconds()).slice(-2) + ':' +
                         '00';
                 return date;
             };

             var myGeocoders = [{
                 url: locatorUrl,
                 name: "stnet62912"
             }];
             geocoder = new Geocoder({
                 map: map,
                 autoComplete: false,
                 arcgisGeocoder: false,
                 geocoders: myGeocoders,
                 showResults: false,
                 value: "1 E Broadway"
             }, "addressSearch");
             geocoder.startup();

             geocoder.on("find-results", function (response) {
                 if (response.results.results.length == 0) {
                     $.msgbox({ type: 'info', content: 'Not able to locate the address entered.<br />Please check the address and try again', title: 'Cannot Find Address', width: 330, height: 150, resize: false });
                 }
                 else {
                     map.graphics.clear();
                     response.results.results[0].feature.symbol = new SimpleMarkerSymbol("circle", 10, null, new Color([255, 0, 0, 0.5]));
                     map.graphics.add(response.results.results[0].feature);
                 }
             });

             var theMarkerSize = 25;
             if (jQuery.browser.mobile) { theMarkerSize = 45; }

             //SITE LAYER - create a feature collection for the incident features
             function GetSite() {
                 PageMethods.GetData("SiteLocations", GetSites_Result);
             }

             function GetVolData() {
                 PageMethods.GetVolunteerData("Volunteer", GetVol_Result);
             }

             function GetSites_Result(ResultString) {
                 var theSites = JSON.parse(ResultString);
                 var theSitesArray = theSites['SiteLocations']['SiteLocation'];
                 if (theSites['SiteLocations']['SiteLocation'].length > 1) {
                     buildSitesLayer(theSitesArray);
                 }
                 else {
                     buildSitesLayer([theSitesArray]);
                 }
             }

             var siteCollection = { "layerDefinition": null, "featureSet": { "features": [], "geometryType": "esriGeometryPoint" } };

             var symbol = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriPMS", "url": "Images/pickaxeAndShovelRed400px.png", "contentType": "image/png", "width": theMarkerSize, "height": theMarkerSize });
             var Ownedsymbol = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriPMS", "url": "Images/pickaxeAndShovelBlue400px.png", "contentType": "image/png", "width": theMarkerSize*1.2, "height": theMarkerSize*1.2 });
             var pastsymbol = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriPMS", "url": "Images/pickaxeAndShovelYellow400px.png", "contentType": "image/png", "width": theMarkerSize/1.2, "height": theMarkerSize/1.2 });

             siteCollection.layerDefinition = {
                 "geometryType": "esriGeometryPoint", "objectIdField": "ID", "drawingInfo": { "renderer": { "type": "simple", "symbol": symbol } },
                 "fields": [
                 { "name": "ID", "alias": "ID", "type": "esriFieldTypeInteger" },
                 { "name": "locationname", "alias": "locationname", "type": "esriFieldTypeString" },
                 { "name": "locationlat", "alias": "latitude", "type": "esriFieldTypeDouble" },
                 { "name": "locationlong", "alias": "longitude", "type": "esriFieldTypeDouble" },
                 { "name": "theRecordId", "alias": "theRecordId", "type": "esriFieldTypeInteger" },
                 { "name": "email", "alias": "email", "type": "esriFieldTypeString" },
                 { "name": "Sites", "alias": "Sites", "type": "esriFieldTypeString" },
                 { "name": "pulldate", "alias": "pulltime", "type": "esriFieldTypeString" },
                 { "name": "pulltime", "alias": "pulldate", "type": "esriFieldTypeString" },
                 { "name": "orgname", "alias": "orgname", "type": "esriFieldTypeString" },
                 { "name": "maxpeople", "alias": "maxpeople", "type": "esriFieldTypeDouble" },
                 { "name": "PeopleSignedUp", "alias": "PeopleSignedUp", "type": "esriFieldTypeDouble" }
                 ]
             };

             //create a feature layer based on the feature collection
             siteLayer = new FeatureLayer(siteCollection, {
                 id: 'siteLayer',
                 mode: FeatureLayer.MODE_SNAPSHOT
             });

             var renderer = new UniqueValueRenderer(null, "Sites");

             renderer.addValue("Managed Pull Site", Ownedsymbol);
             renderer.addValue("Buffelgrass Pull Site", symbol);
// disabled past for now             renderer.addValue("Past Pull Site", pastsymbol);

             siteLayer.setRenderer(renderer);

             siteLayer.on("click", function (evt) {
                 evt.stopPropagation();
                 var siteOwner = evt.graphic.attributes.email;
                 thelat = evt.graphic.attributes.locationlat;
                 thelong = evt.graphic.attributes.locationlong;
                 theId = evt.graphic.attributes.theRecordId;
                 for (site in theSiteArray) {
                     var aSite = theSiteArray[site];
                     if (aSite.id == theId) {
                         var realSiteDataArray = aSite;
                         $("#VolunteerDiv").css("display", "block");
                         if (theUserEmail === "") {
                             $("#organizerDiv").css("display", "none");
                             $("#organizerUpdateDiv").css("display", "none");
                             $("#nonOrgDiv").css("display", "");
                             theMode = "Volunteer";
                             isSiteOwner = false;
                             openRegModal(realSiteDataArray, isSiteOwner);
                             //$("#signInModal").modal();
                         } else if (aSite.contactemail === theUserEmail) {
                             theMode = "SiteOrganizer";
                             isSiteOwner = true;
                             openRegModal(realSiteDataArray, isSiteOwner);
                             $("#nonOrgDiv").css("display", "none");
                             $("#organizerDiv").css("display", "none");
                             $("#organizerUpdateDiv").css("display", "");
                         } else {
                             $("#organizerDiv").css("display", "none");
                             $("#organizerUpdateDiv").css("display", "none");
                             $("#nonOrgDiv").css("display", "");
                             isSiteOwner = false;
                             openRegModal(realSiteDataArray, isSiteOwner);

                         }
                     }
                 }
             });

             function GetVol_Result(ResultString) {
                 var theVolunteers = JSON.parse(ResultString);
                 //theVolArray = theVolunteers['Volunteers']['Volunteer'];
             }
             var toMmDdYy = function (input) {
                 var ptrn = /(\d{4})\-(\d{2})\-(\d{2})/;
                 if (!input || !input.match(ptrn)) {
                     return null;
                 }
                 return input.replace(ptrn, '$2/$3/$1');
             };

             function openRegModal(realSiteDataArray, isSiteOwner) {
                 var isReadOnly = !isSiteOwner;
                 $('.modal1').each(function () {

                     theElement = $("#" + this.id);
                     var id = this.id;
                     if (!(typeof realSiteDataArray[id] === "object")) {
                         theElement[0].value = realSiteDataArray[id];
                     }
                     if ((id === "contactemail") || (id === "PeopleSignedUp")){
                         theElement[0].readOnly = true;
                     } else {
                         theElement[0].readOnly = isReadOnly;
                     }
                     if (id === "pulldate") {
                         theElement[0].value = toMmDdYy(realSiteDataArray[id]);
                     }
                     if ((id === "locationlat") || (id === "locationlong")) {
                         var thetempnum = Number(realSiteDataArray[id])
                         theElement[0].value = thetempnum.toPrecision(12);
                     }

                 });
                 if (isSiteOwner) {
                     $("#privatePhoneDiv").css("display", "");
                 } else {
                     $("#privatePhoneDiv").css("display", "none");
                 }
                 $("#registerSiteModal").modal();
             };

             function toDate(dateStr) {
                 var parts = dateStr.split("-");
                 return (365*parts[0]+31*parts[1]+parts[2]);
             }


             function buildSitesLayer(theSiteRecords) {
                 siteLayer.clear();
                 theSiteArray = theSiteRecords;

                 //loop through the items and add to the feature layer
                 var features = [];
                 var theSite;
                 var curdate = toDate(new Date().toISOString().slice(0, 10));
                 for (site in theSiteRecords) {
                     theSite = theSiteRecords[site];
                     var attr = {};
                     attr["locationname"] = theSite.locationname;
                     attr["theRecordId"] = theSite.id;
                     //                     attr["description"] = theCamera.description;
                     //                     var theCameraURL = "http://166.89.65.175:8080/live-video-frame.dyn?device={localhost:60554-Media%20Source\theCameraID}&u=transview&p=1bda80f2be4d3658e0baa43fbe7ae8c1&res=4CIF"
                     //                     attr["regpeople"] = theCamera.regpeople
                     var theLatitude = theSite.locationlat;
                     var theLongitude = theSite.locationlong;
                     var geometry = new Point(theLongitude, theLatitude);
                     attr["latitude"] = theLatitude;
                     attr["longitude"] = theLongitude;
                     attr["email"] = theSite.contactemail;
                     attr["orgname"] = theSite.orgname;
                     attr["maxpeople"] = theSite.maxpeople;
                     attr["PeopleSignedUp"] = theSite.PeopleSignedUp;
                     attr["pulldate"] = theSite.pulldate;
                     attr["pulltime"] = theSite.pulltime + ' ';

                     if (theSite.contactemail == theUserEmail) {
                         attr["Sites"] = "Managed Pull Site";
                     } else {
                         if (toDate(theSite.pulldate) >= curdate) {
                             attr["Sites"] = "Buffelgrass Pull Site";
                         } else {
                            attr["Sites"] = "Past Pull Site";
                         }
                     }

                     if (attr["Sites"] != "Past Pull Site"){
                         var graphic = new Graphic(geometry);
                         graphic.setAttributes(attr);
                         features.push(graphic);
                     }
                 }
                 siteLayer.applyEdits(features, null, null);
                 var theExtent = graphicsUtils.graphicsExtent(features);
                 map.setExtent(theExtent.expand(1.4, true));
             }

             if (!jQuery.browser.mobile) {
                 siteLayer.on("mouse-over", function (evt) { map.setMapCursor("pointer"); showTooltip(evt); });
                 siteLayer.on("mouse-out", function (evt) { map.setMapCursor("default"); closeTooltip(evt) });
             }
             ///END CAMERA LAYER

             map.addLayers([siteLayer]);

             function closeTooltip(evt) {
                 closeDialog();
             }

             function showTooltip(evt) {
                 closeDialog();
                 var tmp = evt.graphic.attributes.PeopleSignedUp;
                 if (isNaN(tmp)) {
                     tmp = "0";
                 }
                 var tipContent = "<b>Site Name</b>: " + evt.graphic.attributes.locationname + "<br/><b>Organization Name</b>: " + evt.graphic.attributes.orgname + "<br><b>Pull Date:</b> " + evt.graphic.attributes.pulldate + "<br><b>Pull Time:</b> " + evt.graphic.attributes.pulltime + "<br><b>Volunteers:</b> " + tmp + " of " + evt.graphic.attributes.maxpeople;

                 var dialog = new dijit.TooltipDialog({
                     id: "tooltipDialog",
                     content: tipContent,
                     style: "position: absolute; width: auto;max-width:300px; font: normal normal normal 10pt Tahoma; z-index:100;"
                 });
                 dialog.startup();

                 dialog.setContent(tipContent);

                 domStyle.set(dialog.domNode, "opacity", 0.85);
                 dijitPopup.open({
                     popup: dialog,
                     x: evt.pageX,
                     y: evt.pageY
                 });

             }

             toc = new TOC({
                 map: map,
                 layerInfos: [{
                     layer: siteLayer,
                     title: "Buffelgrass"

                 }
                 ]
             }, 'tocDiv');


             var theDiv = document.getElementById("dijit__Widget_2");
             theDiv.style.paddingBottom = "5px";
             theDiv = document.getElementById("dijit__Widget_3");
             theDiv.style.borderTop = "3px solid white";
             theDiv.style.paddingBottom = "5px";
             //theDiv.style.borderBottom="3px solid white";
             theDiv = document.getElementById("dijit__Widget_4");
             theDiv.style.borderTop = "3px solid white";
             theDiv.style.paddingTop = "5px";
             theDiv.style.paddingBottom = "5px";

             toc.startup();

             function closeDialog() {
                 var widget = dijit.byId("tooltipDialog");
                 if (widget) {
                     widget.destroy();
                 }
             }
         });

//Needed to prevent enter button on address search from causing page to navigate
$(document).keypress(function (e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) alert("Ctrl+z");

    if (e.which == 13) {
        return false;
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
