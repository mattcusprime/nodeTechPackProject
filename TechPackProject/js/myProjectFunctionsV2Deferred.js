/// <reference path="../Scripts/jquery-2.1.0-vsdoc.js" />
/// <reference path="../Scripts/jquery-2.1.4.js" />
/// <reference path="../Scripts/jquery-2.1.4.intellisense.js" />
/// <reference path="myReportGeneratorFunctions.js" />
/// <reference path="../DataTables-1.10.1/media/js/jquery.dataTables.js" />
/**
* @class  garmentProduct 
* @param {String} strName Defines the name of the Garment Product itself
* @param {Array} arrAttributes Defines the set of attributes that would need to be pulled from the Garment Product itself for headers etc or just for general display but for which no linkage is created
* @param {Array} arrSpecs an array of the specs that are in the garment product
* @param {Array} arrSources an array of the Sources that are in the garment product
* @param {Object} objColorwayProduct The linked Colorway Product Object.  Later a corresponding Class May be Created
* @param {Object} objPatternProduct The linked Pattern Product Object.  Later a corresponding Class May be Created
* @param {Object} objLabelProduct The linked Label Product Object.  Later a corresponding Class May be Created
* @param {Object} objSellingProduct The linked Selling Product Object.  Later a corresponding Class May be Created
* @param {Array} arrBoms an array of the BOMs that are in the garment product, these will and should be paired down to only be those coming from the active spec
* @param {Array} arrSeasonSourceSpecCombos an array of viable combinations of season/source/spec
* @param {Array} arrDocuments an array of the doucments that are in the garment product
* @param {Object} objMeasurement an object containing the branch id and objectId of the LCSMeasurement class, does not contain the individual POMs etc et at this point in this object
* @param {Object} objConstruction an object containing the branch id and objectId of the LCSConstruction class, does not contain the individual POMs etc et at this point in this object
* @param {String} strObjectId a string denoting the objecId of the LCSProduct that is the garment product
* @param {Object} objGSpec an object container for the active garment spec
* @param {Object} objPSpec an object container for the active pattern spec
* @param {Array} arrBase64Documents not sure yet if will be used
* @param {Array} arrConstructionInfo not sure yet if will be used
* @param {Object} objconstructionDetail container for the individual poms of objConstruction
* @param {Object} objMeasurementDetail container for the individual poms of objMeasurement
* @param {String} strSpecId a string denoting the objectId of the LCSFlexSpecification which is the active spec
* @param {String} strSpecName a string denoting the name of the LCSFlexSpecification which is the active spec
* @param {String} strActiveSeasonName a string denoting the name of the current season
* @param {String} strMeasTableString a string representing the whole table of the measurements
* @param {String} strBaseSize a string representing the base/sample size of the product measurements
* @param {String} strSizeRun a string representing the whole size definition delimited by ~*~
* @param {Array} arrDisplayKeys keys for att value lists with matching index positions in arrDisplay values
* @param {Array} arrDisplayValues see arrDisplayKeys
* @param {Array} arrBlockWeightsSpread 
* @param {String} strBlockWeightsSpreadTableString
* @param {Array} arrBlockWeightsTrim
* @param {Array} arrColorways 
* @param {Array} arrColorwayData 
*
*/
function garmentProduct(strName, arrAttributes, arrSpecs, arrSources, objColorwayProduct, objPatternProduct, objLabelProduct, objSellingProduct, arrBoms, arrSeasonSourceSpecCombos, arrDocuments, objMeasurement, objConstruction, strObjectId, objGSpec, objPSpec, arrBase64Documents, arrConstructionInfo, objconstructionDetail, objMeasurementDetail, strSpecId, strSpecName, strActiveSeasonName, strMeasTableString, strConstructionTableString, strBaseSize, strSizeRun, arrDisplayKeys, arrDisplayValues, strBlockWeightsSpreadTableString, arrBlockWeightsSpread, arrBlockWeightsTrim, arrColorways, strTrimSpreadTableString) {
    this.specs = arrSpecs;
    this.attributes = arrAttributes;
    this.name = strName;
    this.sources = arrSources;
    this.colorwayProduct = objColorwayProduct;
    this.patternProduct = objPatternProduct;
    this.labelProduct = objLabelProduct;
    this.sellingProduct = objSellingProduct;
    this.boms = arrBoms;
    this.seasonSourceSpecCombos = arrSeasonSourceSpecCombos;
    this.documents = arrDocuments;
    this.measurement = objMeasurement;
    this.measurementDetail = objMeasurementDetail;
    this.construction = objConstruction;
    this.constructionInfo = arrConstructionInfo;
    this.constructionDetail = objconstructionDetail;
    this.objectId = strObjectId;
    this.currentGarmentSpec = objGSpec;
    this.currentPatternSpec = objPSpec;
    this.activeSpecId = strSpecId;
    this.activeSeason = strActiveSeasonName;
    this.activeSpecName = strSpecName;
    this.base64DocumentArray = arrBase64Documents;
    this.constructionTableString = strConstructionTableString;
    this.measurementTableString = strMeasTableString;
    this.baseSize = strBaseSize;
    this.sizeRun = strSizeRun;
    this.garmentDoc = new jsPDF('landscape');
    this.displayKeys = arrDisplayKeys
    this.displayValues = arrDisplayValues
    this.blockWeightSpread = arrBlockWeightsSpread;
    this.getMyBlockWeightsTrim = arrBlockWeightsTrim;
    this.colorways = arrColorways;
    //this.colorwayDetails = arrColorwayData;
    //moved to be a property of colorwayobj
    this.blockWeightsSpreadTableString = strBlockWeightsSpreadTableString;
    this.blockWeightsTrimTableString = strTrimSpreadTableString;
    this.sortingArray = ['sizeXXS', '1', 'sizeXS', '2', 'sizeS', '3', 'sizeM', '4', 'sizeL', '5', 'sizeXL', '6', 'size2X', '7', 'size3X', '8', 'size4X', '9', 'size5X', '10', 'size6X', '11', 'size3M', '1', 'size6M', '2', 'size9M', '3', 'size12M', '4', 'size18M', '5', 'size24M', '6', 'size2T', '7', 'size3T', '8', 'size4T', '9', 'size5T', '10', 'size2', '1', 'size4', '2', 'size5', '3', 'size6', '4', 'size7', '5', 'size8', '6', 'size9', '7', 'size10', '8', 'size11', '9', 'size12', '10', 'size13', '11', 'size14', '12', 'size16', '13', 'size18', '14', 'size20', '15', 'size22', '16', 'size24', '17', 'size26', '18', 'size28', '19', 'size30', '20', 'size32', '21', 'size34', '22', 'size36', '23', 'size38', '24', 'size40', '25', 'size42', '26', 'size44', '27', 'size46', '28', 'size48', '29', 'size50', '30', 'size52', '31', 'size54', '32', 'size56', '33', 'size58', '34', 'size60', '35', 'size62', '36', 'sizeS/M', '1', 'sizeL/`', '2', 'size16W', '1', 'size20W', '2', 'size24W', '3', 'size28W', '4', 'size32W', '5', 'size36W', '6'];

};

//var fs = require('fs.extra');
//var execFile = require('child_process').execFile, child;
//var wkhtmltopdf = require('wkhtmltopdf');
//var gui = require('nw.gui');
//Node webkit functionalities
var arrDataArray = [];// global var for ajax calls
var numIndexerForArray = 0;
var arrWhenDeferredArray = [];
/**
 * @method of @class GarmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the construction sits.  All string prior to Windchill.
 * @param {Number} numConstructionBranchId takes the branch id from objConstruction (preferrably) and then turn later constructionDetail of the garmentProduct which runs this to contain all the POMs etc.
 *
 */
garmentProduct.prototype.getMyConstruction = function (strHostUrlPrefix, numConstructionBranchId, constructionData, objSelfReference) {
    var objCurrentRow = {};
    var arrCurrentConstruction = [];
    //namespace is harder to grab so just grabbing the parant element of the first element and then iterating through those
    //need to change this later to correctly use the namespace but, working for now.
    //this probably needs to be changed to a switch case but not a high priority...
    $('id', constructionData).parent().find('*').each(function () {
        var objCurrentElement = $(this);
        if (objCurrentElement.is("id")) {
            //push the current object to the array and nuke the current object
            objCurrentRow.id = objCurrentElement.text();
        }
        else if (objCurrentElement.is("sortingNumber")) {
            objCurrentRow.sortingNumber = objCurrentElement.text();
        }
        else if (objCurrentElement.is("IDA2A2")) {
            objCurrentRow.IDA2A2 = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiLooperThread")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiLooperThread = getValueDisplayFromKey(strKey, objSelfReference);
        }
        else if (objCurrentElement.is("libraryItemReference")) {
            objCurrentRow.libraryItemReference = objCurrentElement.text();
        }
        else if (objCurrentElement.is("detailImage")) {
            objCurrentRow.detailImage = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiGarmentUse")) {
            objCurrentRow.hbiGarmentUse = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiGarmentUseDisplay")) {
            objCurrentRow.hbiGarmentUseDisplay = objCurrentElement.text();
        }
        else if (objCurrentElement.is("constructionPart")) {
            objCurrentRow.constructionPart = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiNeedleColor")) {
            objCurrentRow.hbiNeedleColor = objCurrentElement.text();
        }
        else if (objCurrentElement.is("stitching")) {
            objCurrentRow.stitching = objCurrentElement.text();
        }
        else if (objCurrentElement.is("stitchingDisplay")) {
            objCurrentRow.stitchingDisplay = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiSpi")) {
            objCurrentRow.hbiSpi = objCurrentElement.text();
        }
        else if (objCurrentElement.is("comments")) {
            objCurrentRow.comments = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiGuageWidth")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiGuageWidth = getValueDisplayFromKey(strKey, objSelfReference);
        }
        else if (objCurrentElement.is("hbiLooperColor")) {
            objCurrentRow.hbiLooperColor = objCurrentElement.text();
        }
        else if (objCurrentElement.is("hbiNeedleThread")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiNeedleThread = getValueDisplayFromKey(strKey, objSelfReference);
        }
        else if (objCurrentElement.is("number")) {
            objCurrentRow.number = objCurrentElement.text();
        }
        else if (objCurrentElement.is("instruction")) {
            objCurrentRow.instruction = objCurrentElement.text();
        }
        else if (objCurrentElement.is("constructionPartDetail")) {
            objCurrentRow.constructionPartDetail = objCurrentElement.text();
        }
        else if (objCurrentElement.is("topStitch")) {
            objCurrentRow.topStitch = objCurrentElement.text();
        }
        else if (objCurrentElement.is("topStitchDisplay")) {
            objCurrentRow.topStitchDisplay = objCurrentElement.text();
        }
        else if (objCurrentElement.is("seamType")) {
            objCurrentRow.seamType = objCurrentElement.text();
        }
        else if (objCurrentElement.is("seamTypeDisplay")) {
            objCurrentRow.seamTypeDisplay = objCurrentElement.text();
            arrCurrentConstruction.push(objCurrentRow)
            objCurrentRow = {};
        }

    });
    // and so on for each element that we want to capture
    objSelfReference.constructionDetail = arrCurrentConstruction;
    if (objSelfReference.constructionDetail.length > 0) {
        var strTableHeaderString = '<thead><tr><th>Sorting Number</th><th>Sewing Operation</th><th>Stitch Type / Description</th><th>Gauge Width</th><th>SPI</th><th>Seam/Trimoff Allowance</th><th>Garment Use</th><th>Needle Thread</th><th>Needle Visibility</th><th>Looper Thread</th><th>Looper Visbility</th><th>Comments</th></tr></thead>';
        var strTableBodyString = '<tbody>';
        for (var j = 0; j < objSelfReference.constructionDetail.length; j++) {
            var objThisRow = objSelfReference.constructionDetail[j];
            strTableBodyString += '<tr><td>' + objThisRow.sortingNumber + '</td>';
            strTableBodyString += '<td>' + objThisRow.number + '</td>';
            strTableBodyString += '<td>' + objThisRow.stitchingDisplay + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiGuageWidth + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiSpi + '</td>';
            strTableBodyString += '<td>' + objThisRow.seamTypeDisplay + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiGarmentUseDisplay + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiNeedleThread + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiNeedleColor + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiLooperThread + '</td>';
            strTableBodyString += '<td>' + objThisRow.hbiLooperColor + '</td>';
            strTableBodyString += '<td>' + objThisRow.comments + '</td>';
        };
        strTableBodyString += '</tr>';
        strTableBodyString += '</tbody>';
        objSelfReference.constructionTableString = '<h1>Constructions</h1><table id="construction" class="display responsive col-md-12 compact cell-border">' + strTableHeaderString + strTableBodyString + '</table>';

    }
    else {
        $('#constructionsLi').fadeOut();
    };

};
/**
 * @comment Still need to add logic here to deal with size variation and variable columns as a result; this is currently ran within @method getSpecComponentsForActiveSpec
 * @comment SIZE LOGIC NOW DEALT WITH
 * @method of @class GarmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Number} numMeasurementBranchId takes the branch id from objMeasurement (preferrably) and then turns measurementDetail of the garmentProduct which runs this to contain all the POMs etc.
 *
 */
garmentProduct.prototype.getMyMeasurement = function (strHostUrlPrefix, numMeasurementBranchId, measurementData, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml?oid=VR:com.lcs.wc.measurements.LCSMeasurements:2394285&instance=net.hbi.res.wsflexappprd1v.windchillAdapter
    var strTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    var arrCurrentMeasurement = [];
    /*if (measurementData.childNodes.length == 1) {
        return false;
    };*/

    $('id', measurementData).parent().each(function () {
        var objRow = {};
        objRow.id = $(this).find('id ').text();
        objRow.sortingNumber = $(this).find('sortingNumber').text();
        objRow.name = $(this).find('name ').text();
        objRow.point1 = $(this).find('point1 ').text();
        objRow.point2 = $(this).find('point2 ').text();
        objRow.plusTolerance = $(this).find('plusTolerance').first().text();
        objRow.minusTolerance = $(this).find('minusTolerance').first().text();
        objRow.IDA2A2 = $(this).find('IDA2A2').text();
        objRow.pointsOfMeasureType = $(this).find('pointsOfMeasureType').text();
        objRow.effectSequence = $(this).find('effectSequence ').text();
        objRow.hbiPatternPiece = $(this).find('hbiPatternPiece ').text();
        objRow.placementAmountKey = $(this).find('placementAmount ').text();
        objRow.placementAmount = getValueDisplayFromKey(objRow.placementAmountKey, objSelfReference);
        objRow.actualMeasurement = $(this).find('actualMeasurement ').text();
        objRow.Illustration = $(this).find('Illustration ').text();
        objRow.measurementName = $(this).find('measurementName').text();
        objRow.section = $(this).find('section ').text();
        objRow.hbiGradeCode = $(this).find('hbiGradeCode').text();
        objRow.hbiPiecesPerGarment = $(this).find('hbiPiecesPerGarment').text();
        objRow.htmInstruction = $(this).find('htmInstruction ').text();
        objRow.quotedMeasurementDelta = $(this).find('quotedMeasurementDelta').text();
        objRow.number = $(this).find('number').text();
        objRow.criticalPom = $(this).find('criticalPom ').text();
        objRow.libraryItemReference = $(this).find('libraryItemReference').text();
        objRow.howToMeasure = $(this).find('howToMeasure').text();
        objRow.placementReferenceKey = $(this).find('placementReference').text();
        objRow.placementReference = getValueDisplayFromKey(objRow.placementReferenceKey, objSelfReference);
        objRow.actualMeasurementDelta = $(this).find('actualMeasurementDelta ').text();
        objRow.requestedMeasurement = $(this).find('requestedMeasurement').text();
        objRow.newMeasurement = $(this).find('newMeasurement').text();
        objRow.sampleMeasurementComments = $(this).find('sampleMeasurementComments').text();
        objRow.quotedMeasurement = $(this).find('quotedMeasurement').text();
        objRow.highLight = $(this).find('highLight').text();
        objRow.placeholderRow = $(this).find('placeholderRow ').text();
        objRow.arrSizeArray = [];
        $(this).find('placeholderRow ').nextAll().each(function () {
            var strSizeNameString = $(this).prop('tagName');
            var numStrLength = strSizeNameString.length;
            var numStartPositionForSizeName = strSizeNameString.search('_') + 1;
            var strSizeName = strSizeNameString.substring(numStartPositionForSizeName, numStrLength)
            var strSizePomValue = $(this).text();
            var objSizeValueObject = {};
            objSizeValueObject.sizeName = strSizeName;
            objSizeValueObject.sizeValue = strSizePomValue;
            objRow.arrSizeArray.push(objSizeValueObject);

        });
        arrCurrentMeasurement.push(objRow);
    });
    arrCurrentMeasurement.sort(compare);
    objSelfReference.measurementDetail = arrCurrentMeasurement;
    var objRowOne = objSelfReference.measurementDetail[0];
    var strTableHeaderString = '<thead><tr><th>Sorting Number</th><th>POM#</th><th>Measurement Name</th><th>Placement Amount</th><th>Placement Reference</th><th>Tol (+)</th><th>Tol(-)</th><th>HTM Instructions</th><th>Comments</th>';
    var arrSizes = objRowOne.arrSizeArray;
    var objRowOthers = {};
    for (var i = 0; i < arrSizes.length; i++) {
        strTableHeaderString = strTableHeaderString + '<th>' + arrSizes[i].sizeName + '</th>';
    };
    strTableHeaderString = strTableHeaderString + '</tr></thead>';
    var strTableBodyString = '<tbody>';
    for (var j = 0; j < objSelfReference.measurementDetail.length; j++) {
        var objThisRow = objSelfReference.measurementDetail[j];
        var arrSizes2 = objThisRow.arrSizeArray;
        strTableBodyString += '<tr><td>' + objThisRow.sortingNumber + '</td>';
        strTableBodyString += '<td>' + objThisRow.number + '</td>';
        strTableBodyString += '<td>' + objThisRow.measurementName + '</td>';
        strTableBodyString += '<td>' + objThisRow.placementAmount + '</td>';
        strTableBodyString += '<td>' + objThisRow.placementReference + '</td>';
        strTableBodyString += '<td>' + objThisRow.plusTolerance + '</td>';
        strTableBodyString += '<td>' + objThisRow.minusTolerance + '</td>';
        strTableBodyString += '<td>' + objThisRow.htmInstruction + '</td>';
        strTableBodyString += '<td>' + objThisRow.sampleMeasurementComments + '</td>';
        for (var k = 0; k < arrSizes2.length; k++) {
            var strCurrentSizeName = arrSizes2[k].sizeName;
            var strBaseSize = objSelfReference.baseSize;
            if (strCurrentSizeName == strBaseSize) {
                strTableBodyString += '<td class="baseSize">' + arrSizes2[k].sizeValue + '</td>';
            }
            else {
                strTableBodyString += '<td>' + arrSizes2[k].sizeValue + '</td>';
            }

        };

        strTableBodyString += '</tr>';
    };
    strTableBodyString += '</tbody>';
    objSelfReference.measurementTableString = '<h1>Measurements</h1><table id="measurements" class="display responsive col-md-12 compact cell-border">' + strTableHeaderString + strTableBodyString + '</table>';

};
/**
 * @comment this is currently ran within @method getSpecComponentsForActiveSpec
 * @method of @class GarmentProduct, this method returns the active spec and identifies it on the objSelfReference garment and alters that property.
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {String} strGarmentName uses the name of the garmentProduct that is calling this method
 * @param {Function} funCallback passes a function to callback after the modification of the garmentProduct being passed to this function
 * @param {Object} objForCallback provides a container for the callback function to operate on to pass into the objSelfReference object.  This is used to work around scope limitations.
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * without further developer input but rather in other methods within the class so that no further code is necessary.
 *
 */
garmentProduct.prototype.getSpecByName = function (strHostUrlPrefix, strGarmentName, funCallback, objForCallback, objSelfReference) {
    if (typeof (strGarmentName) == 'undefined')  // How can I stop working of function here?
    {
        alert('No Garment Name was given')
        return;
    }
    var strSpecUrl = strHostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Product+Name=' + strGarmentName + '&oid=OR%3Awt.query.template.ReportTemplate%3A' + getMyReportIdFromReportName(GarmentProdtoGarmentSpecs) + 'action=ExecuteReport';
    var numActiveSpecId = 0;
    var strActiveSpecName;
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    var gProdName = '';
    $.get(strSpecUrl, function (specData) { }).done(function (specData) {
        if (typeof (strSpecUrl) == 'undefined')  // How can I stop working of function here?
        {
            console.log('no spec.')
            return;
        }
        $('row', specData).each(function () {
            gProdName = $(this).find('Garment_product_Name').first().text();
            var techDesignerKey = $(this).find('valueListTechDesigner').text();
            var productManagerKey = $(this).find('valueListProductManager').text();
            var techDesignerDisplay = getValueDisplayFromKey(techDesignerKey, objSelfReference);
            var productManagerDisplay = getValueDisplayFromKey(productManagerKey, objSelfReference);
            var objSpec = {};
            objSpec.name = $(this).find('Spec_Name').text();
            objSpec.idNumber = $(this).find('specLink').attr('objectId');
            //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
            var strSpecName = $(this).find('Spec_Name').text();
            var strType = $(this).find('specLink').attr('type');
            var strHbiActiveSpec = $(this).find('hbiActiveSpec').text().substring(3, 6);
            if (strSpecName.indexOf(strHbiActiveSpec) == -1) {
                objSpec.active = false;
            }
            else {
                objSpec.active = true;
                numActiveSpecId = objSpec.idNumber;
                strActiveSpecName = objSpec.name;
            };
            var strId = objSpec.idNumber;
            var strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
            objSpec.link = strReturnString
            arrSpecArray.push(objSpec);
            //moving to building products sources from the specs
            var objSource = {};
            objSource.name = $(this).find('Sourcing_Config_Name').text();
            objSource.idNumber = $(this).find('LCSSourcingConfig').attr('objectId');
            strType = $(this).find('LCSSourcingConfig').attr('type');
            strId = objSource.idNumber
            strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
            objSource.link = strReturnString;
            var strPrimary = $(this).find('Primary_Source').text();
            objSource.primary = strPrimary == 1 ? true : false;
            arrSourceArray.push(objSource);
            //show viable combinations
            var objCombinationObject = {};
            objCombinationObject.sourceId = objSource.idNumber;
            objCombinationObject.sourceName = objSource.name;
            objCombinationObject.specId = objSpec.idNumber;
            objCombinationObject.specName = objSpec.name;
            objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
            objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
            objSelfReference.activeSeason = $(this).find('Garment_Season_Season_Name').text();
            objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
            arrCombinationArray.push(objCombinationObject);
        });
        arrSpecArray.reverse();
        arrSourceArray.reverse();
        arrCombinationArray.reverse();
        var numQuantityOfActiveSpecs = 0;
        for (var i = 0; i < arrSpecArray.length; i++) {
            var objLoopObj = arrSpecArray[i];
            if (objLoopObj.active == true) {
                numQuantityOfActiveSpecs++;
            };
        };
        if (numQuantityOfActiveSpecs > 1) {
            $('#generalAttributes').append('<p>Multiple active specs were found, please reduce the number of active specs to 1 and run again.</p>');
            return;
        }
        else {
            objForCallback = { arrSpecArray: arrSpecArray, arrSourceArray: arrSourceArray, arrCombinationArray: arrCombinationArray, activeSpecId: numActiveSpecId, gProdName: gProdName, activeSpecName: strActiveSpecName };
            funCallback(objForCallback, objSelfReference);
        };
    });
};

/**
 * @comment this is currently ran within @method getSpecComponentsForActiveSpec
 * @method of @class GarmentProduct, this method returns the active spec and identifies it on the objSelfReference garment and alters that property.
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {String} strGarmentName uses the name of the garmentProduct that is calling this method
 * @param {Function} funCallback passes a function to callback after the modification of the garmentProduct being passed to this function
 * @param {Object} objForCallback provides a container for the callback function to operate on to pass into the objSelfReference object.  This is used to work around scope limitations.
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * without further developer input but rather in other methods within the class so that no further code is necessary.
 *
 */
garmentProduct.prototype.getSpecByNameButNotJustActiveSpec = function (strHostUrlPrefix, strGarmentName, funCallback, objForCallback, objSelfReference) {
    if (typeof (strGarmentName) == 'undefined')  // How can I stop working of function here?
    {
        alert('No Garment Name was given')
        return;
    }
    var strSpecUrl = strHostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Product+Name=' + strGarmentName + '&oid=OR%3Awt.query.template.ReportTemplate%3A' + getMyReportIdFromReportName(GarmentProdtoGarmentSpecs) + '&action=ExecuteReport';
    var numActiveSpecId = 0;
    var strActiveSpecName;
    var arrSpecArray = [];
    var arrSourceArray = [];
    var arrCombinationArray = [];
    var gProdName = '';
    $.get(strSpecUrl, function (specData) { }).done(function (specData) {
        if (typeof (strSpecUrl) == 'undefined')  // How can I stop working of function here?
        {
            console.log('no spec.')
            return;
        }
        $('row', specData).each(function () {
            gProdName = $(this).find('Garment_product_Name').first().text();
            var techDesignerKey = $(this).find('valueListTechDesigner').text();
            var productManagerKey = $(this).find('valueListProductManager').text();
            var techDesignerDisplay = getValueDisplayFromKey(techDesignerKey, objSelfReference);
            var productManagerDisplay = getValueDisplayFromKey(productManagerKey, objSelfReference);
            var objSpec = {};
            objSpec.name = $(this).find('Spec_Name').text();
            objSpec.idNumber = $(this).find('specLink').attr('objectId');
            //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
            var strSpecName = $(this).find('Spec_Name').text();
            var strType = $(this).find('specLink').attr('type');
            var strHbiActiveSpec = $(this).find('hbiActiveSpec').text().substring(3, 6);
            if (strSpecName.indexOf(strHbiActiveSpec) == -1) {
                objSpec.active = false;
            }
            else {
                objSpec.active = true;
                numActiveSpecId = objSpec.idNumber;
                strActiveSpecName = objSpec.name;
            };
            var strId = objSpec.idNumber;
            var strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
            objSpec.link = strReturnString
            arrSpecArray.push(objSpec);
            //moving to building products sources from the specs
            var objSource = {};
            objSource.name = $(this).find('Sourcing_Config_Name').text();
            objSource.idNumber = $(this).find('LCSSourcingConfig').attr('objectId');
            strType = $(this).find('LCSSourcingConfig').attr('type');
            strId = objSource.idNumber
            strReturnString = strLinkBeginTag + strTypeBaseLink + strType + strEncodeColonString + strId + strU8 + strLinkMidTag + strSpecName + strLinkCloseTag;
            objSource.link = strReturnString;
            var strPrimary = $(this).find('Primary_Source').text();
            objSource.primary = strPrimary == 1 ? true : false;
            arrSourceArray.push(objSource);
            //show viable combinations
            var objCombinationObject = {};
            objCombinationObject.sourceId = objSource.idNumber;
            objCombinationObject.sourceName = objSource.name;
            objCombinationObject.specId = objSpec.idNumber;
            objCombinationObject.specName = objSpec.name;
            objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
            objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
            objSelfReference.activeSeason = $(this).find('Garment_Season_Season_Name').text();
            objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
            arrCombinationArray.push(objCombinationObject);
        });
        arrSpecArray.reverse();
        arrSourceArray.reverse();
        arrCombinationArray.reverse();
        var numQuantityOfActiveSpecs = 0;
        for (var i = 0; i < arrSpecArray.length; i++) {
            var objLoopObj = arrSpecArray[i];
            if (objLoopObj.active == true) {
                numQuantityOfActiveSpecs++;
            };
        };
        console.log(arrSpecArray);
        console.log(arrSourceArray);
        console.log(arrCombinationArray);
        //$('#seasonSpecSelection').append();
        $('#seasonSpecSelection').append('</br></br>');
        for (var i = 0; i < arrCombinationArray.length; i++) {
            var objLoopObject = arrCombinationArray[i];
            $('#seasonSpecSelection').append('<button class="seasonSpecButton btn col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 col-xs-offset-2 col-xs-8" specId= ' + objLoopObject.specId + '>Season:' + objLoopObject.seasonName + ' Source:' + objLoopObject.sourceName + 'Spec:' + objLoopObject.specName + '</button><hr></br>')

        };

        $('.seasonSpecButton').click(function () {
            var strSelectedSpecId = $(this).attr('specId');
            $('#seasonSpecSelection *').remove();
            objForCallback = { arrSpecArray: arrSpecArray, arrSourceArray: arrSourceArray, arrCombinationArray: arrCombinationArray, activeSpecId: strSelectedSpecId, gProdName: gProdName, activeSpecName: strActiveSpecName };
            funCallback(objForCallback, objSelfReference);
        });

        /*
        if (numQuantityOfActiveSpecs > 1) {
            $('#generalAttributes').append('<p>Multiple active specs were found, please reduce the number of active specs to 1 and run again.</p>');
            return;
        }
        else {
            objForCallback = { arrSpecArray: arrSpecArray, arrSourceArray: arrSourceArray, arrCombinationArray: arrCombinationArray, activeSpecId: numActiveSpecId, gProdName: gProdName, activeSpecName: strActiveSpecName };
            funCallback(objForCallback, objSelfReference);
        };*/




    });
};




/**
 * @method of @class GarmentProduct, this method gets all spec components for the active spec of the garment for which is passed.  It is run as a deffered call nested within the @method getAllMyDataForMyActiveSpec within @class garmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} objDocumentData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objConstructionData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objMeasurementData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objBomData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objProdLinkData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.getSpecComponentsForActiveSpec = function (strHostUrlPrefix, objDocumentData, objConstructionData, objMeasurementData, objBomData, objProdLinkData, objGarmentSewBomData, objPatternSewBomDataWithUsage, objSelfReference) {
    var arrDocuments = [];
    var arrBoms = [];
    var arrTableDataArray = [];
    var objColorwayProduct = {};
    var objPatternProduct = {};
    var objGarmentProduct = {};
    var objLabelProduct = {};
    var objSellingProduct = {};
    var numObjectId;

    //first pass here gets all product relationships
    //changes in relationship names or type names would need to be later reflected here in the naming structure
    //using actual text names in place of flex path type ids allows us to easier alternate between instances of PLM
    //need to replicate using that approach more
    $('row', objProdLinkData).each(function (index) {
        var linkedProductType = $(this).find('linkedProductType').text();
        var objLinkedProduct = {};
        numObjectId = $(this).find('garmentProductName').first().attr('objectId');
        objLinkedProduct.name = $(this).find('linkedProductName').text();
        objLinkedProduct.objectId = $(this).find('linkedProductName').attr('objectId');
        objLinkedProduct.branchId = $(this).find('linkedProductName').attr('branchId');
        objLinkedProduct.patternNo = $(this).find('Pattern_No').text();

        if (linkedProductType == "BASIC CUT & SEW - COLORWAY") {
            objLinkedProduct.type = "Colorway Product";
            objColorwayProduct = objLinkedProduct;
            objSelfReference.colorwayProduct = objColorwayProduct;
        }
        else if (linkedProductType == "BASIC CUT & SEW - PATTERN") {
            objLinkedProduct.type = "Pattern Product";
            objPatternProduct = objLinkedProduct;
            objSelfReference.patternProduct = objPatternProduct;
        }
        else if (linkedProductType == "LABEL") {
            objLinkedProduct.type = "Label Product";
            objLabelProduct = objLinkedProduct;
            objSelfReference.labelProduct = objLabelProduct;
        }
        else if (linkedProductType == "BASIC CUT & SEW - SELLING" || linkedProductType == "Selling") {
            objLinkedProduct.type = "Selling Product";
            objSellingProduct = objLinkedProduct;
            objSelfReference.sellingProduct = objSellingProduct;
        };
    });
    objSelfReference.objectId = numObjectId;

    if (typeof (objSelfReference.colorwayProduct) != 'undefined') {
        objSelfReference.getColorwayBoms(strHostUrlPrefix, objSelfReference);
    };


    if (typeof (objSelfReference.labelProduct) != 'undefined') {
        var strObjectIdForParam = objSelfReference.labelProduct.objectId;
        objSelfReference.getLabelBoms(strObjectIdForParam, strHostUrlPrefix, objSelfReference);
        //get label bom
    };

    if (typeof (objSelfReference.patternProduct) != 'undefined') {
        objSelfReference.getMoas(strHostUrlPrefix, objSelfReference, objSelfReference.objectId + "%2C" + objSelfReference.patternProduct.objectId);
    }
    else {
        objSelfReference.getMoas(strHostUrlPrefix, objSelfReference, objSelfReference.objectId);
    }

    var offLineTurnOff = $('#offline').val();
    var arrNamesOfDocumentsForSvgHold = [];
    var arrSvgData = [];
    var intTimesAjaxCalled = 0;
    if (offLineTurnOff != 1) {
        var numOfDocumentRows = $('row', objDocumentData).length;
        $('row', objDocumentData).each(function (index) {
            //var boolCheckForPng = false;
            var strFileNameString = $(this).find('Application_Data').text();
            var numCheckForPng = strFileNameString.indexOf('png');
            if (numCheckForPng == -1) {

            }
            else {

                //https://plmqa.hanes.com/Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:2394231&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:2394226
                //var strImgViewerPrefix1 = 'https://plmqa.hanes.com/Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
                var strImgViewerPrefix1 = 'http://wsflexappdev2v/Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
                var strImgViewerPrefix2 = '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:';
                //var strImgViewerPrefix3 = "file://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
                //var strImgViewerPrefix3 = "file:\\\\res.hbi.net\\dfs/BrandedApparel\\Activewear\\FlexApp\\QA\\Prod\\";
                var strImgViewerPrefix3 = "https://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/QA/Prod/";
                //var strImgViewerPrefix3 = "//res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/QA/Prod/";

                if (location.protocol == 'file') {
                    //var strImgViewerPrefix3 = "http://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/Prod/";
                }
                else {
                };
                var name = $(this).find('Document_Master_Name').text();
                var strpSpecId = $(this).find('patternSpecId').text();
                var strgSpecId = $(this).find('garmentSpecId').text();
                var strCompSpecId = $(this).find('comRefSpecId').text();
                var strApplicationDataPartOneOfLink = $(this).find('documentNotMasterDocumentOid').text();
                var strDocumentIdPartTwoOfLink = $(this).find('DocumentIdPartTwoOfLink').text();
                var strMyFullId = strDocumentIdPartTwoOfLink + "_" + strApplicationDataPartOneOfLink;

                strImgViewerPrefix1 = strImgViewerPrefix1 + strDocumentIdPartTwoOfLink + '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:' + strApplicationDataPartOneOfLink;

                if ($(this).is('row:first')) {
                    var objGSpec = {};
                    var objPSpec = {};
                    objGSpec.currentGarmentSpecId = $(this).find('garmentSpecId').text();
                    objPSpec.currentGarmentSpecId = $(this).find('patternSpecId').text();
                    objGSpec.name = $(this).find('gSpecName').text();
                    objPSpec.name = $(this).find('pSpecName').text();
                };
                objComponent = {};
                objComponent.name = name;
                objComponent.myFullId = strMyFullId;


                objComponent.componentType = 'Document';
                objComponent.masterId = $(this).find('Document_Master').attr('objectId');
                objComponent.documentType = $(this).find('Component_Type').text();
                objComponent.fileName = $(this).find('fileName').text();
                objComponent.vaultFileName = $(this).find('fileNameOnVault').text();
                objComponent.pageType = $(this).find('pageType').text();
                objComponent.pageLayout = $(this).find('pageLayout').text();
                objComponent.pageDescription = $(this).find('pageDescription').text();
                objComponent.number = $(this).find('number').text();
                objComponent.ownerId = $(this).find('ownerId').text();
                objComponent.specMasterReferenceId = $(this).find('specMasterReferenceId').text();
                objComponent.garmentSpecMasterId = $(this).find('garmentSpecMasterId').text();
                objComponent.patternSpecMasterId = $(this).find('patternSpecMasterId').text();
                if (objComponent.garmentSpecMasterId == objComponent.specMasterReferenceId) {
                    objComponent.ownerType = 'Garment';
                }
                else if (objComponent.patternSpecMasterId == objComponent.specMasterReferenceId) {
                    objComponent.ownerType = 'Pattern';
                };

                objComponent.fullVaultUrl = strImgViewerPrefix3 + objComponent.vaultFileName + '.png';
                //objComponent.fullVaultUrl = strImgViewerPrefix1;

                objComponent.seqeuence = $(this).find('Unique_Sequence_Number').text();
                //objComponent.imgSrcUrl = objComponent.seqeuence + " " + objComponent.fileName;
                objComponent.imgSrcUrl = strImgViewerPrefix1;
                objComponent.dataUri = 'initial value';
                objComponent.description = $(this).find('Description').text();
                var strStartPointSubString = objComponent.description.substring(11, objComponent.description.length);
                var numLengthStartPoint = strStartPointSubString.search('x') + 1;
                var numNumCharsOfWidth = numLengthStartPoint - 1;
                var numWidth = strStartPointSubString.substring(0, numNumCharsOfWidth);
                var numLength = strStartPointSubString.substring(numLengthStartPoint, strStartPointSubString.length);
                objComponent.width = numWidth;
                objComponent.height = numLength;
                objComponent.roleDocumentLink = $(this).find('roleDocumentLink').text();
                var roleB = $(this).find('roleBObjectRef_key_id').text();

                //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive hideImg" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
                //changing the imgviewer prefix variable here alters protocol and where the file is being grabbed from
                objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><iframe width="100%" height="1200" class="img-responsive hideImg" src="' + strImgViewerPrefix1 + '"></iframe></div>';

                //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="sponsive hideImg" src="' + objComponent.fullVaultUrl +  '" /></div>';

                if (objComponent.ownerType == 'Pattern' && objComponent.pageType == 'frontSketch') {

                }
                else {
                    arrDocuments.push(objComponent);
                };

                if (index == numOfDocumentRows - 1) {

                };
            };
        });
    };
    function objCompareByName(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    arrDocuments.sort(objCompareByName);
    objSelfReference.documents = arrDocuments;
    //var initialIndexer = 0;
    //callNextDocument(objSelfReference.documents, 0);

    var objMeasurementComp = {};
    $('row', objMeasurementData).each(function (index) {
        if (index == 0) {
            objSelfReference.baseSize = $(this).find('baseSize').text();
            objSelfReference.sizeRun = $(this).find('sizeRun').text();
        };
        var name = $(this).find('Measurements_Name').text();
        objMeasurementComp = {};
        objMeasurementComp.name = name;
        objMeasurementComp.componentType = 'Measurement';
        objMeasurementComp.ownerType = 'Pattern';
        objMeasurementComp.fileName = "";
        objMeasurementComp.imageUrl = "<img src='' />";
        objMeasurementComp.branchId = $(this).find('branchIdForTaskCall').text();
    });
    objSelfReference.measurement = objMeasurementComp;
    var strMeasTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    //var strInstance = 'net.hbi.res.wsflexappprd1v.windchillAdapter';
    var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
    var strCurrentEnvironment = window.location.href;
    if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
        strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
    };

    var objDefferedMeasurement = $.ajax({
        url: strMeasTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.measurements.LCSMeasurements:' + objSelfReference.measurement.branchId,
            instance: strInstance,
            //instance: 'net.hbi.res.wsflexappqa1v.windchillAdapter'
        },
        async: true

    });
    var objConstructionComp = {};
    $('row', objConstructionData).each(function () {
        var name = $(this).find('Construction_Info_Name').text();
        objConstructionComp = {};
        objConstructionComp.name = name;
        objConstructionComp.componentType = 'Construction';
        objConstructionComp.ownerType = 'Pattern';
        objConstructionComp.fileName = "";
        objConstructionComp.imageUrl = "<img src='' />";
        objConstructionComp.branchId = $(this).find('branchIdForTask').text();
    });
    objSelfReference.construction = objConstructionComp;
    var conStrTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml'; //?oid=VR:com.lcs.wc.construction.LCSConstructionInfo:' + numConstructionBranchId + '&instance=net.hbi.res.wsflexappprd1v.windchillAdapter';
    //var strInstance = 'net.hbi.res.wsflexappprd1v.windchillAdapter';
    var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
    var strCurrentEnvironment = window.location.href;
    if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
        strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
    };
    var objDefferedConstruction = $.ajax({
        url: conStrTaskUrl,
        type: 'get',
        data: {
            oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + objSelfReference.construction.branchId,
            //instance: 'net.hbi.res.wsflexappprd1v.windchillAdapter'
            instance: strInstance
        },
        async: true

    });
    $('row', objBomData).each(function () {
        var name = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Name').text();
        var strpBomSpecId = $(this).find('pSpecId').text();
        var strgBomSpecId = $(this).find('gSpecId').text();
        var strBomCompSpecId = $(this).find('comRefSpecId').text();
        var strFlexBomType = $(this).find('Flex_Type_Type_Name').text();
        objBomComponent = {};
        objBomComponent.name = name;
        objBomComponent.fileName = "";
        objBomComponent.componentType = 'BOM';
        objBomComponent.imageUrl = "<img src='' />";
        objBomComponent.flexType = strFlexBomType;
        var regPprod = new RegExp("Pattern");
        var regGprod = new RegExp("Garment");
        if (regPprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Pattern';
        }
        else if (regGprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Garment';
        };
        arrTableDataArray.push(objBomComponent);
        arrBoms.push(objBomComponent);

    });
    objSelfReference.boms = arrBoms;
    //console.log("Garment Data " + objGarmentSewBomData + " Pattern Data " + objPatternSewBomDataWithUsage);



    //objSelfReference.garmentSewBoms = objGarmentSewBomData;
    //objSelfReference.patternSewBoms = objPatternSewBomDataWithUsage;
    //put this back later when the objects are actually constructed through parsing
    var arrGarmentSewRows = rowParser('row', objGarmentSewBomData);


    var arrGarmentSourceRows = [];
    //var strGarmentSewBomString = convertRowArrayIntoHtmlTable(arrGarmentSewRows);
    var arrPatternSewRows = rowParser('row', objPatternSewBomDataWithUsage);
    //var strPatternSewBomString = convertRowArrayIntoHtmlTable(arrPatternSewRows);
    for (var i = 0; i < arrGarmentSewRows.length; i++) {
        var objGarmentSewRow = {};

        objGarmentSewRow = arrGarmentSewRows[i];
        for (var j = 0; j < arrPatternSewRows.length; j++) {
            var objPatternSewRow = {};
            objPatternSewRow = arrPatternSewRows[j];
            if (objGarmentSewRow.garmentUseId == objPatternSewRow.garmentUseId) {
                //give the garment sew object the pattern branch here to use in the next loop
                //console.log("MATCH");
                objGarmentSewRow.patternBranch = objPatternSewRow.branchId;
            };


        };
        objGarmentSewRow.sizeData = [];
        if (objGarmentSewRow.sewOrSource == 'sew' && arrPatternSewRows.length != 0) {
            for (var k = 0; k < arrPatternSewRows.length; k++) {
                var objPatternSewRow = {};
                objPatternSewRow = arrPatternSewRows[k];
                if (objGarmentSewRow.patternBranch == objPatternSewRow.branchId && objGarmentSewRow.accessorySize == objPatternSewRow.accessorySize) {
                    //give the garment sew object the pattern usages based on the branch
                    objSizeData = {};
                    if (objPatternSewRow.garmentUseId == '0' && objPatternSewRow.usagePerDozen != '0') {

                        objSizeData.size = objPatternSewRow.size;
                        objSizeData.usagePerDozen = objPatternSewRow.usagePerDozen
                        var strSize = 'size' + objSizeData.size;
                        var numLookUpPosition = objSelfReference.sortingArray.indexOf(strSize);
                        var numIndexToGrabSortPosition = numLookUpPosition + 1;
                        var numActualIndexPosition = objSelfReference.sortingArray[numIndexToGrabSortPosition];
                        objSizeData.sortPosition = numActualIndexPosition;
                        objGarmentSewRow.sizeData.push(objSizeData);
                    }
                    else if (objPatternSewRow.garmentUseId != '0' && objPatternSewRow.usagePerDozen != '0') {
                        objSizeData.size = "ALL";
                        objSizeData.usagePerDozen = objPatternSewRow.usagePerDozen
                        var strSize = 'size' + objSizeData.size;
                        var numLookUpPosition = objSelfReference.sortingArray.indexOf(strSize);
                        var numIndexToGrabSortPosition = numLookUpPosition + 1;
                        var numActualIndexPosition = objSelfReference.sortingArray[numIndexToGrabSortPosition];
                        objSizeData.sortPosition = 0;
                        objGarmentSewRow.sizeData.push(objSizeData);
                    };


                }

            };

        }
        else if (objGarmentSewRow.sewOrSource == 'source') {
            var objSourceRow = {};
            objSourceRow.Garment_Use = objGarmentSewRow.Garment_Use
            objSourceRow.Material = objGarmentSewRow.Material
            objSourceRow.Description = objGarmentSewRow.Description
            objSourceRow.Minor_Category = objGarmentSewRow.Minor_Category
            for (var property in objSourceRow) {
                if (objSourceRow.hasOwnProperty(property)) {
                    if (typeof (objSourceRow[property]) == 'undefined') {
                        objSourceRow[property] = ' ';
                    }
                };
            }


            arrGarmentSourceRows.push(objSourceRow);


        };


        function objCompareBySortPosition(a, b) {
            if (a.sortPosition < b.sortPosition)
                return -1;
            if (a.sortPosition > b.sortPosition)
                return 1;
            return 0;
        };

        objGarmentSewRow.sizeData.sort(objCompareBySortPosition);
        arrGarmentSewRows[i] = objGarmentSewRow;




    };



    //console.log('Garment Sew Bom String ' + strGarmentSewBomString, 'Pattern Sew Bom String ' + strPatternSewBomString);
    for (var r = 0; r < arrGarmentSewRows.length; r++) {
        var objSewSourceChecker = arrGarmentSewRows[r];
        var strSewOrSource = objSewSourceChecker.sewOrSource;
        if (strSewOrSource != 'sew') {
            arrGarmentSewRows.splice(r, 1);
            r = -1;
        };

    };
    objSelfReference.garmentSewBoms = arrGarmentSewRows;
    objSelfReference.garmentSourceBoms = arrGarmentSourceRows;
    objSelfReference.patternSewBoms = arrPatternSewRows;
    if (objSelfReference.garmentSewBoms.length > 0) {
        objSelfReference.sewBomTableString = convertRowArrayIntoHtmlTable(objSelfReference.garmentSewBoms, 'size', 'usagePerDozen', 'sewBomTable', '<h1>Sew BOMs</h1>');
    };
    if (objSelfReference.garmentSourceBoms.length > 0) {
        objSelfReference.sourceBomTableString = convertRowArrayIntoHtmlTable(objSelfReference.garmentSourceBoms, '', '', 'sourceBomTable', '<h1>Sourced BOMs</h1>');
    };
    //if (typeof (objSelfReference.patternSewBoms) != 'undefined') {
    if (objSelfReference.patternSewBoms.length > 0) {
        $('#sewBomDiv').append(objSelfReference.sewBomTableString);
    }
    else {
        $('#sewBomLi').fadeOut();
    };
    if (objSelfReference.garmentSourceBoms.length != 0) {
        $('#sourceBomDiv').append(objSelfReference.sourceBomTableString);
        $('#sourceBomTable').DataTable(sourceBomTableOptions);
    }
    else {
        $('#sourcedBomLi').fadeOut();
    };
    //sourceBomDivgarmentSewBoms
    if (objSelfReference.patternSewBoms.length > 0 && objSelfReference.garmentSewBoms.length > 0) {
        $('#sewBomTable').DataTable(sewBomTableOptions);
    };
    var arrConstructionDetailDataContainer;
    var arrMeasurementDetailDataContainer;
    $.when(objDefferedConstruction, objDefferedMeasurement).done(function (objDefferedConstruction, objDefferedMeasurement) {
        arrConstructionDetailDataContainer = objDefferedConstruction[0];
        arrMeasurementDetailDataContainer = objDefferedMeasurement[0];
        try {
            objSelfReference.getMyConstruction(strHostUrlPrefix, objSelfReference.construction.branchId, arrConstructionDetailDataContainer, objSelfReference);
            createComponentTable('constructionDiv', 'construction', objSelfReference.constructionTableString, constructionTableOptions);
        } catch (e) {
            console.log(e);
            console.log("construction not found");
            $('#constructionsLi').fadeOut();
        };
        try {
            objSelfReference.getMyMeasurement(strHostUrlPrefix, objSelfReference.measurement.branchId, arrMeasurementDetailDataContainer, objSelfReference);
            createComponentTable('measurementDiv', 'measurements', objSelfReference.measurementTableString, measurementTableOptions, true);
        } catch (e) {
            console.log(e);
            console.log("construction not found");
            $('#measurementsLi').fadeOut();
        };

    });
    var strApprovedSupplierUrlObjectId = getMyReportIdFromReportName('garmentProdSpecsGarmentAndPatternComponentsApprovedSuppliers');
    var strApprovedSupplierUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?u8&action=ExecuteReport&specId=' + objSelfReference.activeSpecId + '&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + strApprovedSupplierUrlObjectId + '&xsl1=&format=formatDelegate&delegateName=XML&jrb=wt.query.template.reportTemplateRB&sortByIndex=6&sortOrder=asc';
    var arrApprovedSupplierArray = [];
    var strApprovedSupplierTableString = '';
    $.get(strApprovedSupplierUrl, function (data) { }).done(function (data) {
        arrApprovedSupplierArray = rowParser('row', data);
        if (typeof (arrApprovedSupplierArray) != 'undefined' && arrApprovedSupplierArray.length != 0) {
            strApprovedSupplierTableString = convertRowArrayIntoHtmlTable(arrApprovedSupplierArray, '', '', 'approvedSupplierTbl', '<h1>Approved Suppliers</h1>');
            objSelfReference.approvedSuppliers = arrApprovedSupplierArray;
            objSelfReference.approvedSupplierTableString = strApprovedSupplierTableString;
            $('#approvedSupplierDiv').append(objSelfReference.approvedSupplierTableString);
            $('#approvedSupplierTbl').DataTable(approvedSupplierTableOptions);
        }
        else {
            $('#approvedSupplierDiv').append('<p>Approved Supplier table was not found.</p>')
        };
    });






};
/**
 * @method of @class GarmentProduct, this method runs a sequence of ajax calls to get all necessary data sets for running @method getSpecComponentsForActiveSpec, then it sequentially calls them
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} strSpecId objectId of active LCSFlexSpecification
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.getAllMyDataForMyActiveSpec = function (strHostUrlPrefix, strSpecId, objSelfReference) {
    if (typeof (strSpecId) == 'undefined')  // How can I stop working of function here?
    {
        console.log('no spec id, cannot obtain components.')
        return;
    }
    var strSpecGetUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9999594&action=ExecuteReport"
    var strDocumentsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9996723&action=ExecuteReport";
    var strMeasurementsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953962&action=ExecuteReport";
    var strConstructionsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10343155&action=ExecuteReport";
    var strBomsUrl = strHostUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gSpecId=" + strSpecId + "&garmentProductName=" + this.name + "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A9953826&action=ExecuteReport";
    var strGetColorwayPatternUrl = strHostUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?gProd=' + currentGarmentProduct.name + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10430767&action=ExecuteReport';
    var strGarmentSewAndSourceBomUrls = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?specId=' + strSpecId + '+&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12079049&action=ExecuteReport';
    var strPatternSewAndBomUsageUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?specId=' + strSpecId + '+&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12076562&action=ExecuteReport';//add rest here.


    var arrDocumentData = $.ajax({
        url: strDocumentsUrl,
        type: 'get'

    });
    var arrMeasData = $.ajax({
        url: strMeasurementsUrl,
        type: 'get'
    });
    var arrConstructionData = $.ajax({
        url: strConstructionsUrl,
        type: 'get'
    });
    var arrBomData = $.ajax({
        url: strBomsUrl,
        type: 'get'
    });
    var arrProdLinkData = $.ajax({
        url: strGetColorwayPatternUrl,
        type: 'get'
    });
    var arrGarSewBomData = $.ajax({
        url: strGarmentSewAndSourceBomUrls,
        type: 'get'
    });
    var arrPatSewBomData = $.ajax({
        url: strPatternSewAndBomUsageUrl,
        type: 'get'
    });



    var objDocData = {};
    var objConData = {};
    var objMeasData = {};
    var objBomData = {};
    var objProdLinkData = {};
    var obGarSewBomData = {};
    var objPatSewBomData = {};
    $.when(arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData, arrGarSewBomData, arrPatSewBomData).done(function (arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData, arrGarSewBomData, arrPatSewBomData) {
        objDocData = arrDocumentData[0];
        objConData = arrConstructionData[0];
        objMeasData = arrMeasData[0];
        objBomData = arrBomData[0];
        objProdLinkData = arrProdLinkData[0];
        obGarSewBomData = arrGarSewBomData[0];
        objPatSewBomData = arrPatSewBomData[0];
        //console.log(objDocData, objConData, objMeasData, objBomData, arrProdLinkData);
        objSelfReference.getSpecComponentsForActiveSpec(strHostUrlPrefix, objDocData, objConData, objMeasData, objBomData, objProdLinkData, obGarSewBomData, objPatSewBomData, objSelfReference);
        console.log(objSelfReference);
        objSelfReference.generateAvailableReportsList(objSelfReference);
        //saveGarmentProd(objSelfReference);
        //further sequential callbacks should be put here.  Like for constructiong the pom data on measurements and constructions since all data
        //should more or less be available at this juncture.
    });

};
/**
 * @method of @class GarmentProduct, this method runs as a callback to finalize the population of the garmentProduct class
 * @param {Object} objectForCallback Object container passed in callbkac
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.thenCallSpecs = function (objectForCallback, objSelfReference) {
    objSelfReference.specs = objectForCallback.arrSpecArray
    objSelfReference.sources = objectForCallback.arrSourceArray
    objSelfReference.seasonSourceSpecCombos = objectForCallback.arrCombinationArray
    objSelfReference.activeSpecId = objectForCallback.activeSpecId;
    objSelfReference.activeSpecName = objectForCallback.activeSpecName;
    objSelfReference.name = objectForCallback.gProdName;
    objSelfReference.getAllMyDataForMyActiveSpec(strUrlPrefix, objSelfReference.activeSpecId, objSelfReference);
};
/**
 * @method of @class GarmentProduct, this method runs to determine, based on available spec components in the objSelfReference, what are the available report sets that 
 * could be used.  Currently it is only invoked as a callback.
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 */
garmentProduct.prototype.generateAvailableReportsList = function (objSelfReference) {
    $('#reportsHeader *').remove();
    $('#reportsHeader').append('<table cellpadding="0" cellspacing="0" border="0" class="display compact cell-border" id="reports"><thead><th>Sort Order</th><th>Report</th><th>Name</th></thead><tbody></tbody></table>');
    var reportTable = $('#reports').DataTable(reportsTableOptions);
    // later will need to add here a few documents that we want to exclude intentionally
    // like front back images that come from pattern products
    var sortOrder = 0;
    if (typeof (objSelfReference.construction.name) != 'undefined') {
        reportTable.row.add([sortOrder, '<a href="#" id="getConstructionReport">Construction</a>', objSelfReference.construction.name]); sortOrder++;
    };
    if (typeof (objSelfReference.measurement.name) != 'undefined') {
        reportTable.row.add([sortOrder, '<a href="#" id="getMeasurementReport">Measurements</a>', objSelfReference.measurement.name]); sortOrder++;
    };
    if (typeof (objSelfReference.boms != 'undefined' || objSelfReference.boms.length != 0)) {
        var arrBoms = objSelfReference.boms;
        var boolHaveGarmentCut = false;
        var boolHavePatternSpread = false;
        var boolHavePatternTrimStraight = false;
        var boolHavePatternTrimBias = false;
        if (typeof (arrBoms) != 'undefined') {
            for (var i = 0; i < arrBoms.length; i++) {

                var strBomType = arrBoms[i].flexType;
                if (strBomType == 'Pattern Product Trim Bias BOM') {
                    boolHavePatternTrimBias = true;
                }
                if (strBomType == 'Garment Cut') {
                    boolHaveGarmentCut = true;
                }
                if (strBomType == 'Pattern Product Trim Straight BOM') {
                    boolHavePatternTrimStraight = true;
                }
                if (strBomType == 'Pattern Product Spread BOM') {
                    boolHavePatternSpread = true;
                }

            };
        };
        var strBlockWeightBomScenario;
        if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimStraight && boolHavePatternTrimBias) {
            strBlockWeightBomScenario = 'Spread, Trim Straight and Trim Bias';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimStraight) {
            strBlockWeightBomScenario = 'Spread and Trim Straight';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimBias) {
            strBlockWeightBomScenario = 'Spread and Trim Bias';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        }
        else if (boolHaveGarmentCut && boolHavePatternSpread) {
            strBlockWeightBomScenario = 'Spread, Trim Straight and Trim Bias';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        }
        else {
        };

    };

    if (typeof (objSelfReference.documents != 'undefined')) {
        var arrdocs = objSelfReference.documents;
        if (typeof (arrdocs) != 'undefined') {

            arrWhenDeferredArray = [];
            arrDataArray = [];
            numIndexerForArray = 0;
            for (i = 0; i < arrdocs.length; i++) {
                if (i == 0) {
                    for (x = 0; x < arrdocs.length; x++) {
                        if (x == 0) { $('#imagesDiv').append('<h1>Documents</h1>') };

                        $('#imagesDiv').append('<div class="imageHolder row col-md-12 ' + arrdocs[x].masterId + '" id="' + arrdocs[x].myFullId + '" headerValue="' + arrdocs[x].name + '_' + arrdocs[x].fileName + '"></div>');

                    };
                };
                var strDivIdToUse = arrdocs[i].myFullId;
                var strMyMasterId = '#' + arrdocs[i].masterId;
                var strHeaderName = $('#' + strDivIdToUse).attr('headerValue');
                var strSrcUrl = arrdocs[i].imgSrcUrl;
                arrDataArray.push({
                    header: strHeaderName,
                    myDivId: strDivIdToUse,
                    masterId: strMyMasterId,
                    callerUrl: strSrcUrl,
                    pageType: arrdocs[i].pageType,
                    pageDescription: arrdocs[i].pageDescription,
                    ownerType: arrdocs[i].ownerType,
                    pageLayout: arrdocs[i].pageLayout,
                    name: arrdocs[i].name,
                    width: arrdocs[i].width,
                    height: arrdocs[i].height
                });
                arrWhenDeferredArray.push($.ajax({
                    type: "GET",
                    url: strSrcUrl,
                    data: { header: strHeaderName, myDivId: strDivIdToUse, masterId: strMyMasterId }
                }));
            };
            $.when.apply($, arrWhenDeferredArray).done(function (responseData) {
                for (var z = 0; z < arrWhenDeferredArray.length; z++) {
                    var objImgData = arrWhenDeferredArray[z];
                    var objImgMeta = arrDataArray[z];
                    var strResponseText = objImgData.responseText;
                    var objNewImageToAdd = $(strResponseText).find('img');
                    if (window.location.href.indexOf('.res.hbi.net') == -1) {
                        objNewImageToAdd[0].src = objNewImageToAdd[0].src.replace('.res.hbi.net', '');
                    };
                    var myDivId = objImgMeta.myDivId;
                    var myMasterId = objImgMeta.masterId;
                    var strMyMasterIdWithPoundRemoved = myMasterId.replace('#', '');
                    $(objNewImageToAdd).attr('id', myDivId + 'img');
                    $('#' + myDivId).append(objNewImageToAdd);
                    $('#' + myDivId).append('<h3 class="col-md-offset-1 col-md-11 row">' + decodeURIComponent(objImgMeta.name) + '</h3>');
                    $('#' + myDivId).append(objNewImageToAdd);
                    //$('#' + myDivId + 'img').addClass('col-md-offset-2 col-md-8');
                    $('#' + myDivId + 'img').addClass('img-responsive');
                    // row per image from the below
                    $('#' + myDivId + 'img').addClass('row');
                    //and centers it
                    $('#' + myDivId + 'img').addClass('center-block');
                    $('#' + myDivId + 'img').addClass('documentImage');

                };

            }).done(function () {
                //I swear you had something here iterating through the above 2 arrays in sequence...

                $('img').each(function () {
                    var urlToUse = $(this).attr('src');
                    var strParentDiv = '#' + $(this).parent().attr('id');
                    getDataUri(urlToUse, function (dataUri) {
                        var strDataImagePrefix = 'data:image/png;base64,';
                        var strFullDataUri = strDataImagePrefix + dataUri;
                        $(strParentDiv).find('img').attr('src', strFullDataUri);
                    });
                });

            });



        };

    };
    createRelatedProductsDiv(objSelfReference);
    reportTable.draw();

    $('#getMeasurementReport').click(function () {
    });
    $('#getConstructionReport').click(function () {
    });
    //var StrUrlPrefix = 'http://wsflexwebprd1v.res.hbi.net/';
    $('.blockWeights').click(function () {
        //turning off temporarily until URL is fixed
        //
        console.log('turning off temporarily until URL and table for trim is fixed');
        //objSelfReference.getMyBlockWeightsSpread(strUrlPrefix, objSelfReference);
        //
        objSelfReference.getBlockWeightsTrim(strUrlPrefix, objSelfReference);
    });
};
/*
needs comments
*/

garmentProduct.prototype.getMyValueLists = function (strUrlPrefix, arrListIds, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=2381876%2C102771%2C2381693&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport
    var strUrl1 = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=';
    //var strUrl2 = '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport';
    var strUrl2 = '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A'+ getMyReportIdFromReportName(garmentProdSpecsAndSuchAttributeValueListCall) + '&action=ExecuteReport';
    var strInStringForQuery = '';
    objSelfReference.displayValues = [];
    objSelfReference.displayKeys = [];
    for (var i = 0; i < arrListIds.length; i++) {
        if (i != arrListIds.length - 1) {
            strInStringForQuery += arrListIds[i] + "%2C";
        }
        else {
            strInStringForQuery += arrListIds[i];
        }
    };
    var strFullUrl = strUrl1 + strInStringForQuery + strUrl2;
    $.get(strFullUrl, function (data) { }).done(function (data) {
        $('row', data).each(function () {
            objSelfReference.displayValues.push($(this).find('Display').text());
            objSelfReference.displayKeys.push($(this).find('Value_Key').text());

        });
        //console.log(objSelfReference.displayValues, objSelfReference.displayKeys);
    });

};

garmentProduct.prototype.getMyBlockWeightsSpread = function (strUrlPrefix, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=Garment%20%20BIW&Product+Name=10188%20Boys%20Knit%20Brief%20ExpWB%20B252&Spec+Name=002&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport
    $('#blockWeightSpreadDiv *').remove();
    var reportStringSpread = "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=";
    var reportStringSpread2 = "&Product+Name=";
    var reportStringSpread3 = "&Spec+Name=";
    var reportStringSpread4 = "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport"
    var arrOfRowsForFunctionScope = [];
    var arrDupChecker = [];
    var strSpreadTableString = '<table id="spreadReport" class="display responsive col-md-12 compact cell-border"><thead id="spreadHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Size Sort</th><th>Shade</th><th>Size</th><th>Marker</th><th>Conditioned Width</th><th>#Gmts</th><th>MU%</th><th>Total Length</th><th>Ply</th><th>Usage Yd/Dz</th><th>Usage Lb/Dz</th></tr></thead><tbody>';
    var strSpreadLocalHeaderStringEmptyBody = '<h1>Block Weights</h1><h2>Block Weights - Spread</h1><table id="spreadReport" class="display responsive col-md-12 compact cell-border"><thead id="spreadHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Size Sort</th><th>Shade</th><th>Size</th><th>Marker</th><th>Conditioned Width</th><th>#Gmts</th><th>MU%</th><th>Total Length</th><th>Ply</th><th>Usage Yd/Dz</th><th>Usage Lb/Dz</th></tr></thead><tbody></tbody>';
    //var fullSpreadUrl = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season=" & objSelfReference.activeSeason & "&Product+Name=" & objSelfReference.name & "&Spec+Name=" & objSelfReference.activeSpecName & "&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A3009695&action=ExecuteReport";
    //var currentGarmentProductFromThis = this;
    var sortingArray = ['sizeXXS', '1', 'sizeXS', '2', 'sizeS', '3', 'sizeM', '4', 'sizeL', '5', 'sizeXL', '6', 'size2X', '7', 'size3X', '8', 'size4X', '9', 'size5X', '10', 'size6X', '11', 'size3M', '1', 'size6M', '2', 'size9M', '3', 'size12M', '4', 'size18M', '5', 'size24M', '6', 'size2T', '7', 'size3T', '8', 'size4T', '9', 'size5T', '10', 'size2', '1', 'size4', '2', 'size5', '3', 'size6', '4', 'size7', '5', 'size8', '6', 'size9', '7', 'size10', '8', 'size11', '9', 'size12', '10', 'size13', '11', 'size14', '12', 'size16', '13', 'size18', '14', 'size20', '15', 'size22', '16', 'size24', '17', 'size26', '18', 'size28', '19', 'size30', '20', 'size32', '21', 'size34', '22', 'size36', '23', 'size38', '24', 'size40', '25', 'size42', '26', 'size44', '27', 'size46', '28', 'size48', '29', 'size50', '30', 'size52', '31', 'size54', '32', 'size56', '33', 'size58', '34', 'size60', '35', 'size62', '36', 'sizeS/M', '1', 'sizeL/XL', '2', 'size16W', '1', 'size20W', '2', 'size24W', '3', 'size28W', '4', 'size32W', '5', 'size36W', '6'];
    sortingArray = objSelfReference.sortingArray;
    var strPnameForParam = objSelfReference.name;
    var strSeasonNameForParam = objSelfReference.activeSeason;
    var strSpecNameForParam = objSelfReference.activeSpecName;
    strPnameForParam = strPnameForParam.replace('/\s/g', '%20');
    strSeasonNameForParam = strSeasonNameForParam.replace('/\s/g', '%20');
    strSpecNameForParam = strSpecNameForParam.replace('/\s/g', '%20');
    var fullSpreadUrl = strUrlPrefix + reportStringSpread + strSeasonNameForParam + reportStringSpread2 + strPnameForParam + reportStringSpread3 + strSpecNameForParam + reportStringSpread4;
    //var fullSpreadUrl = 'dataSetSamples/spread.xml';
    if (typeof (objSelfReference.blockWeightSpread) == 'undefined') {
        $.get(fullSpreadUrl, function (data) { }).done(function (data) {
            $('row', data).each(function () {
                var objRow = {};
                strSpreadTableString += '<tr>';
                objRow.pProdSpread = $(this).find("Pattern_Product").text();
                objRow.pMastSpread = $(this).find("Pattern_Master_Material").text();
                objRow.gProdSpread = $(this).find("Garment_product").text();
                objRow.seasonSpread = $(this).find("Season").text();
                objRow.specNameSpread = $(this).find("Spec_Name").text();
                objRow.sizeSpreadForLookUp = $(this).find("Size").text();
                objRow.sizeSpread = "  " + objRow.sizeSpreadForLookUp + "  ";
                objRow.pCodeSpread = $(this).find("Part_Code").text();
                objRow.allowanceSpread = $(this).find("Allowance__").text();
                objRow.numGarmentsSpread = $(this).find("__Garments").text();
                objRow.manfOptionSpread = $(this).find("Manufacturing_option").text();
                objRow.conWidthSpread = $(this).find("Conditioned_Width").text();
                objRow.plySpread = $(this).find("Ply").text();
                objRow.totLengthSpread = $(this).find("Total_Length").text();
                objRow.totLengthSpread = Math.round(objRow.totLengthSpread * 10000) / 10000;
                objRow.useYdDzSpread = $(this).find("Usage_Yd_Dz").text();
                objRow.useYdDzSpread = Math.round(objRow.useYdDzSpread * 100) / 100;
                objRow.cMethCodeSpread = $(this).find("Cut_Method_Code").text();
                objRow.muSpread = $(this).find("MU_").text();
                objRow.shadeSpread = $(this).find("Shade").text().toUpperCase().substring(0, 1);
                objRow.shadeSpread = "  " + objRow.shadeSpread + "  ";
                objRow.gBOMallowanceSpread = $(this).find("Garment_BOM_Allowance").text();
                objRow.manfFabricWeightSpread = $(this).find("Manf__Option___Weight__oz_yd__").text();
                objRow.pMastTypeSpread = $(this).find("Pattern_Master_Material_Type").text();
                objRow.cylinderValueSpread = $(this).find("Cylinder").text();
                objRow.usageLBDZSpread = Math.round((objRow.conWidthSpread * objRow.totLengthSpread / objRow.numGarmentsSpread * 12 * objRow.plySpread / 36 / 36) * (objRow.manfFabricWeightSpread / 16) * 100) / 100;
                var sortLookup = "size" + objRow.sizeSpreadForLookUp;
                objRow.sortValue = sortingArray.indexOf(sortLookup);
                objRow.patternDimId = $(this).find('patDimId').text();
                objRow.garDimId = $(this).find('garDimID').text();
                objRow.combinedDimId = objRow.patternDimId + objRow.garDimId;
                var numDupChecker = objRow.combinedDimId;
                objRow.plySpread = "   " + objRow.plySpread + "   ";
                objRow.conWidthSpread = "   " + objRow.conWidthSpread + "   ";
                for (var name in objRow) {
                    if (typeof (name) == 'undefined') {
                        objRow.name = '';
                    }
                };
                strSpreadTableString += '<td>' + objRow.pCodeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.cMethCodeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.manfOptionSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.sortValue + '</td>';
                strSpreadTableString += '<td>' + objRow.shadeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.sizeSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.pMastSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.conWidthSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.numGarmentsSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.muSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.totLengthSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.plySpread + '</td>';
                strSpreadTableString += '<td>' + objRow.useYdDzSpread + '</td>';
                strSpreadTableString += '<td>' + objRow.usageLBDZSpread + '</td>';
                strSpreadTableString += '</tr>';
                arrOfRowsForFunctionScope.push(objRow);
                arrDupChecker.push(numDupChecker);
            });
            strSpreadTableString += '</tbody></table>';
            objSelfReference.blockWeightsSpreadTableString = strSpreadTableString;
            objSelfReference.blockWeightSpread = arrOfRowsForFunctionScope;
            //console.log(objSelfReference);
            spreadBomTableOptions.data = objSelfReference.blockWeightSpread;
            $('#blockWeightSpreadDiv').append(strSpreadLocalHeaderStringEmptyBody);
            $('#spreadReport').DataTable(spreadBomTableOptions);
        });
    }
    else {
        if ($('#spreadReport').length) {
            spreadBomTableOptions.data = objSelfReference.blockWeightSpread;
            $('#blockWeightSpreadDiv').append(strSpreadLocalHeaderStringEmptyBody);
            $('#spreadReport').DataTable(spreadBomTableOptions);
        };
    };
};


garmentProduct.prototype.getBlockWeightsTrim = function updateTrim(strUrlPrefix, objSelfReference) {
    var sortingArray = ['sizeXXS', '1', 'sizeXS', '2', 'sizeS', '3', 'sizeM', '4', 'sizeL', '5', 'sizeXL', '6', 'size2X', '7', 'size3X', '8', 'size4X', '9', 'size5X', '10', 'size6X', '11', 'size3M', '1', 'size6M', '2', 'size9M', '3', 'size12M', '4', 'size18M', '5', 'size24M', '6', 'size2T', '7', 'size3T', '8', 'size4T', '9', 'size5T', '10', 'size2', '1', 'size4', '2', 'size5', '3', 'size6', '4', 'size7', '5', 'size8', '6', 'size9', '7', 'size10', '8', 'size11', '9', 'size12', '10', 'size13', '11', 'size14', '12', 'size16', '13', 'size18', '14', 'size20', '15', 'size22', '16', 'size24', '17', 'size26', '18', 'size28', '19', 'size30', '20', 'size32', '21', 'size34', '22', 'size36', '23', 'size38', '24', 'size40', '25', 'size42', '26', 'size44', '27', 'size46', '28', 'size48', '29', 'size50', '30', 'size52', '31', 'size54', '32', 'size56', '33', 'size58', '34', 'size60', '35', 'size62', '36', 'sizeS/M', '1', 'sizeL/XL', '2', 'size16W', '1', 'size20W', '2', 'size24W', '3', 'size28W', '4', 'size32W', '5', 'size36W', '6'];
    sortingArray = objSelfReference.sortingArray;
    var param = objSelfReference.name;
    var paramSeasonTrim = objSelfReference.activeSeason;
    var paramSpecTrim = objSelfReference.activeSpecName;
    param = param.replace('/\s/g', '%20');
    paramSeasonTrim = paramSeasonTrim.replace('/\s/g', '%20');
    paramSpecTrim = paramSpecTrim.replace('/\s/g', '%20');
    var reportStringTrim1 = strUrlPrefix + "Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?Garment+Product+Season="
    var reportStringTrim2 = "&Product+Name=";
    var reportStringTrim3 = "&Spec+Name=";
    var reportStringTrim4 = "&oid=OR%3Awt.query.template.ReportTemplate%3A4490123&action=ExecuteReport";
    var fullReportString = reportStringTrim1 + paramSeasonTrim + reportStringTrim2 + param + reportStringTrim3 + paramSpecTrim + reportStringTrim4;
    var strTrimTableString = '<table id="trimReport" class="display responsive col-md-12 compact cell-border"><thead id="trimHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Shade</th><th>SizeSort</th><th>Size</th><th>Pattern# Version</th><th>#Gmts</th><th>Trim Cut Width</th><th>Total Length</th><th>UsageYd/Dz</th><th>UsageLb/Dz</th></tr></thead><tbody>';
    var strLocalHeaderStringEmptyBody = '<h2>Block Weights - Trim</h1><table id="trimReport" class="display responsive col-md-12 compact cell-border"><thead id="trimHeader"><tr><th>Part Code</th><th>Cut Method Code</th><th>Mfg Fabric</th><th>Shade</th><th>SizeSort</th><th>Size</th><th>Pattern# Version</th><th>#Gmts</th><th>Trim Cut Width</th><th>Total Length</th><th>UsageYd/Dz</th><th>UsageLb/Dz</th></tr></thead><tbody></tbody>';
    var arrRowsArray = [];
    var dimIdArrays = [];
    if (typeof (objSelfReference.blockWeightTrim) == 'undefined') {
        $.get(fullReportString, function (result) { }).done(function (result) {
            $('row', result).each(function () {
                var objRow = {}; //objRow.
                objRow.pProd = $(this).find("Pattern_Product").text();
                objRow.pMast = $(this).find("Pattern_Master_Material").text();
                objRow.gProd = $(this).find("Garment_product").text();
                objRow.season = $(this).find("Season").text();
                objRow.specName = $(this).find("Spec_Name").text();
                objRow.sizeForLookUp = $(this).find("Size").text();
                objRow.size = "  " + objRow.sizeForLookUp + "  ";
                objRow.pCode = $(this).find("Part_Code").text();
                objRow.allowance = $(this).find("Allowance__").text();
                objRow.trimCutWidth = $(this).find("Trim_Cut_Width").text();
                objRow.numGarments = $(this).find("__Garments").text();
                objRow.edgeLoss = $(this).find("Edge_Loss__IN_").text();
                objRow.runoff = $(this).find("Runoff").text();
                objRow.manfOption = $(this).find("Manufacturing_option").text();
                objRow.ply = $(this).find("Ply").text();
                objRow.totLength = $(this).find("Total_Length").text();
                objRow.useYdDz = $(this).find("Usage_Yd_Dz").text().substring(0, 6);
                objRow.cMethCode = $(this).find("Cut_Method_Code").text();
                objRow.mu = $(this).find("MU_").text();
                objRow.shade = $(this).find("Shade").text().toUpperCase().substring(0, 1);
                objRow.shade = "  " + objRow.shade + "  ";
                objRow.gBOMallowance = $(this).find("Garment_BOM_Allowance").text();
                objRow.cylinder = $(this).find("Cylinder").text();
                objRow.manfFabricWeight = $(this).find("Manf__Option___Weight__oz_yd__").text();
                objRow.pMastType = $(this).find("Pattern_Master_Material_Type").text();
                objRow.trimPatternNumAndVersion = $(this).find("patternNumVersion").text();
                objRow.usageLBDZ = 0;
                if (objRow.pMastType == "Bias") {
                    objRow.usageLBDZ = (objRow.trimCutWidth * objRow.totLength * 12 / objRow.numGarments / 1296 * objRow.manfFabricWeight / 16)
                };
                if (objRow.pMastType == "Straight") {
                    objRow.usageLBDZ = (objRow.trimCutWidth * objRow.totLength * 12 / objRow.numGarments / 1296 * objRow.manfFabricWeight / 16)
                };
                var sortLookup = "size" + objRow.sizeForLookUp;
                objRow.sortValue = sortingArray.indexOf(sortLookup);
                objRow.usageLBDZ = Math.round(objRow.usageLBDZ * 100) / 100;
                objRow.useYdDz = Math.round(objRow.useYdDz * 100) / 100;
                objRow.totLength = Math.round(objRow.totLength * 10000) / 10000;
                objRow.patternDimId = $(this).find('patDimId').text();
                objRow.garDimId = $(this).find('garDimID').text();
                objRow.combinedDimId = objRow.patternDimId + objRow.garDimId;
                objRow.ply = "   " + objRow.ply + "   ";
                objRow.trimCutWidth = "   " + objRow.trimCutWidth + "   ";
                arrRowsArray.push(objRow);
            });
            var arrOfProperties = ['pCode', 'cMethCode', 'manfOption', 'shade', 'sortValue', 'size', 'trimPatternNumAndVersion', 'numGarments', 'trimCutWidth', 'totLength', 'useYdDz', 'usageLBDZ'];
            for (var i = 0; i < arrRowsArray.length; i++) {
                var objGetObject = {};
                objGetObject = arrRowsArray[i];
                strTrimTableString += '</tr>'
            };
            strTrimTableString += '</tbody></table>';
            objSelfReference.blockWeightsTrimTableString = strTrimTableString;
            objSelfReference.blockWeightTrim = arrRowsArray;
            $('#blockWeightTrimDiv').append(strLocalHeaderStringEmptyBody);
            trimBomTableOptions.data = objSelfReference.blockWeightTrim
            $('#trimReport').DataTable(trimBomTableOptions);
        });
    }
    else {
        if ($('#trimReport').length) {
            $('#blockWeightTrimDiv').append(strLocalHeaderStringEmptyBody);
            trimBomTableOptions.data = objSelfReference.blockWeightTrim
            $('#trimReport').DataTable(trimBomTableOptions);
        };
    };
};

garmentProduct.prototype.saveMe = function (objSelfReference) {
    var garmentProductString = JSON.stringify(objSelfReference);
    fs.writeFile(objSelfReference.name + '.json', garmentProductString, function (err) {
        if (err) throw err;
        alert('saved ' + objSelfReference.name);
    });
};

garmentProduct.prototype.getColorwayBoms = function (strUrlPrefix, objSelfReference) {

    var strBeginUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction'//objectId=<param>&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10734353&action=ExecuteReport';
    var strTrimCwayBomString = '<h2>Colorway BOM</h2><table id="colorwayReport" class="display responsive col-md-12 compact cell-border"><thead><tr>';//<th>Part Name</th><th>Desc</th><th>Garment Use</th><th>Material</th>';</tr></thead><tbody>';
    var strTrimCwaysTableString = '<h1>Colorways</h1><h2>Colorways by Group</h2> <button id="swapSwatch">Show Swatches</button><table id="colorwaysListTable" class="display responsive col-md-12 compact cell-border"><thead><tr><th>Colorway Group</th><th>Colorway Name</th></tr></thead><tbody>';
    var arrMaterialsToGet = [];
    var strOidPrefix = 'OR:wt.query.template.ReportTemplate:';
    var strSkuOidUrl = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayBoms);
    var strBranchOidUrl = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayBomsV2AllColors);
    var strDefColorways = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayColorways);
    var strDefAllGarmentMaterials = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAllBomMaterials);
    
    var objDefferedAllGarmentMaterials = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            specId: objSelfReference.activeSpecId,
            oid:strDefAllGarmentMaterials,
	    //oid: 'OR:wt.query.template.ReportTemplate:11146551',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    });
    
    var objDefferedBranch = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid:strBranchOidUrl,
	    //oid: 'OR:wt.query.template.ReportTemplate:11146551',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    });
    var objDefferedSkuData = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid:strSkuOidUrl,
	    //oid: 'OR:wt.query.template.ReportTemplate:10732525',
            format: 'formatDelegate',
            xsl2: '',
            xsl2: '',
            delegateName: 'XML',
            action: 'ExecuteReport'
            //jrb: 'wt.query.template.reportTemplateRB'
        }
    });
    var objDefferedColorways = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            objectId: objSelfReference.colorwayProduct.objectId,
            oid:strDefColorways,
	    //oid: 'OR:wt.query.template.ReportTemplate:10777566',
            format: 'formatDelegate',
            xsl2: '',
            xsl2: '',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    });
    var arrBranch = [];
    var arrSku = [];
    var arrLocalColorways = [];
    //just fixed query to get all colorways without the 'no blank description allowed' condition
    var arrColumns = ['Grouping', 'Part Name', 'Garment Use', 'Material'];
    var arrGroupings = [];
    var arrGroupingsTableStrings = [];
    var arrGarmentUses = [];
    var arrGarmentAllMaterials = [];
    //var arrGarmentUseDisplay = [];
    $.when(objDefferedBranch, objDefferedSkuData, objDefferedColorways,objDefferedAllGarmentMaterials).done(function (objDefferedBranch, objDefferedSkuData, objDefferedColorways,objDefferedAllGarmentMaterials) {
        arrBranch = objDefferedBranch[0];
        arrSku = objDefferedSkuData[0];
        arrLocalColorways = objDefferedColorways[0];
	arrGarmentAllMaterials = objDefferedAllGarmentMaterials[0];
	var arrAlternatesForAltTable = [];
	var arrOfJustMaterialBranchIdsFromGarment = [];
	var arrOfJustMaterialObjectIdsFromGarment = [];
        $('row', arrGarmentAllMaterials).each(function (index) {
	//later get alternates from this too
		var numMaterialObjectId = $(this).find('Garment_Product_Child_Material').attr('objectId');
		var numMaterialBranchId = $(this).find('Garment_Product_Child_Material').attr('branchId');
		if(arrOfJustMaterialObjectIdsFromGarment.indexOf(numMaterialObjectId) == -1){
			arrOfJustMaterialObjectIdsFromGarment.push(numMaterialObjectId);
		};
		if(arrOfJustMaterialBranchIdsFromGarment.indexOf(numMaterialBranchId) == -1){
			arrOfJustMaterialBranchIdsFromGarment.push(numMaterialBranchId);
		};
	});
	var arrColorwayObjects = [];
        var initCwayString0 = '<h2>';
        var initCwayString1 = '</h2><table id="';
        var initCwayString2 = '" class="tblCbomTable display responsive col-md-12 compact cell-border"><thead><tr><th>Branch Id</th><th>Part Name</th><th>Garment Use</th><th>Material</th><th class="lastBeforeSkip">Fiber Content</th> ';
        $('row', arrLocalColorways).each(function (index) {
            var objRow = {};
            objRow.cwayGrouping = $(this).find('cwayGroupDescription').text();
            objRow.specName = $(this).find('specName').text();
            objRow.colorwayName = $(this).find('Colorway_Name').text();
            objRow.Sku_ARev_Id = $(this).find('Sku_ARev_Id').text();
            objRow.skuBranchId = $(this).find('skuBranchId').text();
            objRow.skuObjectId = $(this).find('skuObjectId').text();
            objRow.parentProductArevId = $(this).find('Product_ARev_Id').text();
            objRow.parentProductObjectId = $(this).find('Colorway_Product_Name_Link').attr('objectId');
            objRow.parentProductName = $(this).find('Colorway_Product_Name_Link').text();
            objRow.parentProductBranchId = $(this).find('Colorway_Product_Name_Link').attr('branchId');
            strTrimCwaysTableString += '<tr>' + '<td>' + objRow.specName + '</td>' + '<td>' + objRow.colorwayName + '</td>' + '</tr>'
            arrColumns.push(objRow.colorwayName);
            arrColorwayObjects.push(objRow);
            if (arrGroupings.indexOf(objRow.cwayGrouping) == -1) {
                arrGroupings.push(objRow.cwayGrouping);
                arrGroupingsTableStrings.push(initCwayString0 + objRow.specName + initCwayString1 + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + initCwayString2 + '<th id="SKU_' + objRow.Sku_ARev_Id + '_Spec_' + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + '">' + objRow.colorwayName + '</th>');
            }
            else {
                var numActualIndex = arrGroupings.indexOf(objRow.cwayGrouping);
                arrGroupingsTableStrings[numActualIndex] = arrGroupingsTableStrings[numActualIndex] + '<th id="SKU_' + objRow.Sku_ARev_Id + '_Spec_' + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + '">' + objRow.colorwayName + '</th>';
            };
        });
        if (typeof (objSelfReference.colorwayProduct) != 'undefined') {
            objSelfReference.colorwayProduct.colorways = arrColorwayObjects;
        };
        //console.log(objSelfReference.colorwayProduct.colorways);
        for (var i = 0; i < arrGroupingsTableStrings.length; i++) {
            arrGroupingsTableStrings[i] = arrGroupingsTableStrings[i] + '</tr></thead><tbody></tbody></table><hr  class="page"/>';
        };
        strTrimCwaysTableString += '</tbody></table>';
        $('#colorwaysListDiv').append(strTrimCwaysTableString);
        $('#colorwaysDiv').append('<h1>Colorway BOMs</h1>');
        for (var i = 0; i < arrGroupingsTableStrings.length; i++) {
            $('#colorwaysDiv').append(arrGroupingsTableStrings[i]);
        };
        $('#colorwaysListTable').DataTable(colorwayListTableOptions);
        var arrTopLevelRows = [];
        var arrSkuLevelRows = [];
        var arrComboArray = [];
        $('row', arrBranch).each(function () {
            var objRow = {};

            objRow.specName = $(this).find('specName').text();
            objRow.bomName = $(this).find('bomName').text();
            objRow.Material = $(this).find('Child_Name').text();
            if (objRow.Material == 'material_placeholder') { objRow.Material = '' };

            objRow.bomPartId = $(this).find('com_lcs_wc_flexbom_FlexBOMPart').attr('objectId');
            objRow.Branch_Id = $(this).find('Branch_Id').text();
	    if(arrOfJustMaterialBranchIdsFromGarment.indexOf(objRow.Branch_Id) == -1){
		objRow.inGarmentProduct = false;
	    }
	    else{
		objRow.inGarmentProduct = true;
	    };
	    
            objRow.garmentUseBranchId = $(this).find('garmentUse').text();
            //objRow.masterMaterialDesc = $(this).find('masterMaterialDesc').text();
            objRow.partName = $(this).find('partName').text();
            objRow.matrlObjectId = $(this).find('matrlObjectId').text();
            objRow.Dimension_Id = $(this).find('Dimension_Id').text();
            objRow.Dimension_Name = $(this).find('Dimension_Name').text();
            objRow.fiberContent = $(this).find('fiberContent').text();

            objRow.variationRows = [];
            if (objRow.Dimension_Name == ':SKU') {
                objRow.colorSpecificData = $(this).find('cVariationData').text();
                arrSkuLevelRows.push(objRow);
            }
            else {
                arrTopLevelRows.push(objRow);
            };

        });
        //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=1157716%2C9446287&format=formatDelegate&delegateName=HTMLWithSorting&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11033513&action=ExecuteReport
        // var strUseJoin = arrGarmentUses.join([separator = ',']);
        //var strGarmentUseUrl = strBeginUrl + '?objectId=' + strUseJoin + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR:wt.query.template.ReportTemplate:11033513&action=ExecuteReport';
        //strGarmentUseUrl = encodeURI(strGarmentUseUrl);
        //$.get(strGarmentUseUrl, function (data) { }).done(function (data) {
        /*$('row', data).each(function () {
            var strId = $(this).find('objectId').text();
            var strDisplay = $(this).find('Name').text();
            for (var i = 0; i < arrTopLevelRows.length; i++) {
                var strArrId = arrTopLevelRows[i].garmentUseBranchId;
                if (strArrId == strId) {
                    var obj = arrTopLevelRows[i];
                    obj.garmentUseBranchId = strDisplay;
                    arrTopLevelRows[i] = obj;

                };

            };
        });*/




        $('row', arrSku).each(function () {
            var regxPeriod = /[.\s]+/g;
            var regxHyphen = /[-\s]+/g;
            var objRow = {};
            objRow.cWayName = $(this).find('cWayName').text();
            objRow.bomName = $(this).find('bomName').text();
            objRow.Color_Code = $(this).find('Color_Code').text();
            objRow.specName = $(this).find('Spec_Name').text();
            objRow.Material = $(this).find('Material').text();
            objRow.Branch_Id = $(this).find('bomLinkBranch_Id').text();
	    objRow.Dimension_Id = $(this).find('Dimension_Id').text();
            objRow.strIdToUse = objRow.Dimension_Id.replace(/:/g, "").replace(regxPeriod, "").replace(regxHyphen, "");
            objRow.Dimension_Name = $(this).find('Dimension_Name').text();
            objRow.colorName = $(this).find('Att_').text();
            objRow.hex = $(this).find('hex').text();
            objRow.Thumbnail = $(this).find('Thumbnail').text();
            objRow.bPartMaster_bLinkBranchId = $(this).find('bPartMaster_bLinkBranchId').text();
            objRow.bPartBranch = $(this).find('bPartBranch').text();
            objRow.bPartObjectId = $(this).find('bPartObjectId').text();
            objRow.elastic = $(this).find('elastic').text();
            objRow.dyeCode = $(this).find('dyeCode').text();
            objRow.matColor = $(this).find('matColor').text();
            objRow.colorSpecificData = $(this).find('com_lcs_wc_material_LCSMaterial_Att_').text();
            arrSkuLevelRows.push(objRow);
            /*
            if (objRow.elastic != 0) { if (arrMaterialsToGet.indexOf(objRow.elastic) == -1) { arrMaterialsToGet.push(objRow.elastic) } };
            if (objRow.dyeCode != 0) { if (arrMaterialsToGet.indexOf(objRow.dyeCode) == -1) { arrMaterialsToGet.push(objRow.dyeCode) } };
            */

        });
        //console.log(arrMaterialsToGet);
        for (var i = 0; i < arrTopLevelRows.length; i++) {
            var strCurrentDimsionId = arrTopLevelRows[i].Dimension_Id;
            var arrThisLoop = [];
            arrThisLoop = $.grep(arrSkuLevelRows, function (e) {
                return e.Dimension_Id.search(strCurrentDimsionId) != -1;
            }, false);
            if (typeof (arrThisLoop) != 'undefined') {
                for (var j = 0; j < arrThisLoop.length; j++) {
                    arrTopLevelRows[i].variationRows.push(arrThisLoop[j]);
                };
            };
        };
        for (var i = 0; i < arrColumns.length; i++) {
            strTrimCwayBomString += '<th>' + arrColumns[i] + '</th>';
        };
        strTrimCwayBomString += '</tr></thead>';

        objSelfReference.colorwayProduct.colorwayBomDetail = arrTopLevelRows;

        //this one goes through and adds all branches
        for (var i = 0; i < objSelfReference.colorwayProduct.colorwayBomDetail.length; i++) {
            try {
                var objRow = objSelfReference.colorwayProduct.colorwayBomDetail[i];
                var regxPeriod = /[.\s]+/g;
                var regxHyphen = /[-\s]+/g;
                var strIdToUse = objRow.Dimension_Id.replace(/:/g, "").replace(regxPeriod, "").replace(regxHyphen, "");
                var strThisRow = '<tr id="' + strIdToUse + '">' + '<td>' + objRow.Branch_Id + '</td>' + '<td>' + objRow.partName + '</td>' + '<td>' + objRow.garmentUseBranchId + '</td>' + '<td>' + objRow.Material + '</td>' + '<td>' + objRow.fiberContent + '</td>';
                var strSprecNameToGet = '#' + objRow.specName.replace(/\s/g, "_");
                strSprecNameToGet = strSprecNameToGet.replace(/:/g, "");
                var numOfColumns = $(strSprecNameToGet + ' thead tr th').length;
                var numOfColumnsToSkip = $(strSprecNameToGet + ' thead tr th.lastBeforeSkip').index() + 1;
                for (var j = numOfColumnsToSkip; j < numOfColumns; j++) {
                    strThisRow += '<td> </td>';
                };
                strThisRow += '</tr>';
                $(strSprecNameToGet).append(strThisRow);
                //console.log(strIdToUse);
            }
            catch (e) {
                continue;
            }
        };
        //this one will go through and add only SKU data
        for (var i = 0; i < objSelfReference.colorwayProduct.colorwayBomDetail.length; i++) {
            try {
                for (var j = 0; j < objSelfReference.colorwayProduct.colorwayBomDetail[i].variationRows.length; j++) {
                    var objRow = objSelfReference.colorwayProduct.colorwayBomDetail[i].variationRows[j];
                    var strSprecNameToGet = '#' + objRow.specName.replace(/\s/g, "_");
                    strSprecNameToGet = strSprecNameToGet.replace(/:/g, "");
                    var numSearchPositionOfSku = objRow.Dimension_Id.search('-SKU:');
                    var regxPeriod = /[.\s]+/g;
                    var regxHyphen = /[-\s]+/g;
                    var strToGetForRow = '#' + objRow.Dimension_Id.substring(0, numSearchPositionOfSku).replace(/:/g, "").replace(regxPeriod, "").replace(regxHyphen, "");
                    //console.log(strToGetForRow);
                    var cWayName = objRow.cWayName;
                    var numOfColumns = $(strSprecNameToGet + ' thead tr th').length;
                    var numOfColumnsToSkip = $(strSprecNameToGet + ' thead tr th:contains("' + cWayName + '")').index();


                    $(strToGetForRow).find('td').eq(numOfColumnsToSkip).html(objRow.colorName + '-' + objRow.colorSpecificData).attr('thisColor', objRow.colorName).attr("backupBgColor", '#' + objRow.hex).addClass('colorCell').attr('id', objRow.strIdToUse);
                    //$(strToGetForRow).find('td').eq(numOfColumnsToSkip).html(objRow.colorSpecificMaterial).attr('thisColor', objRow.colorName).attr("backupBgColor", '#' + objRow.hex).addClass('colorCell').attr('id', objRow.strIdToUse);
                    //$(strToGetForRow).find('td').eq(numOfColumnsToSkip)

                    //            };

                };
            }
            catch (e) {
                //console.log(e);
                continue;
            }
        };


        //}).done(function () {

        //materialSwapper(arrMaterialsToGet);
        $('td').each(function () {
            strText = $(this).text();
            if (strText == '0') {
                $(this).text('');
            }
        });
        $('#colorwaysDiv').append('<button id="swapSwatch">Show Swatches</button>');
        $('#swapSwatch').click(function () {
            switchToSwatches();
        });
        $('.tblCbomTable').each(function () {
            var table = $(this).DataTable(colorwayBomTableOptions);
            //table.column(0).visible(false).draw();
        });
        $('#colorwayReport').DataTable(cwayReportTableOptions);

        //})
    });
};

garmentProduct.prototype.getLabelBoms = function (labelProductObjectId, strUrlPrefix, objSelfReference) {
    //WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=1217726+&format=formatDelegate&delegateName=HTMLWithSorting&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=1217726&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport
    var strGetUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=' + labelProductObjectId + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport';
    var arrLabelData = [];
    $.get(strGetUrl, function (data) { }).done(function (data) {
        $('row', data).each(function () {

            var arrRow = [];
            arrRow.push($(this).find('madeInCountryDisplay').text());
            arrRow.push($(this).find('garmentUse').text());
            arrRow.push($(this).find('Material_Name').text());
            arrRow.push($(this).find('application').text());
            //objRow.Garment_size_from_Label_Material($(this).find('Garment_size_from_Label_Material').text()());
            //objRow.Link_to_Label_Material($(this).find('Link_to_Label_Material').text()());
            arrRow.push($(this).find('garmentSize').text());
            arrRow.push($(this).find('fiberCodeContent').text());
            arrRow.push($(this).find('padPrintInkColors').text());
            arrRow.push($(this).find('usagePerDozen').text());
            arrRow.push($(this).find('usageUom').text());
            arrRow.push($(this).find('stdWasteFactor').text());
            arrRow.push($(this).find('usagePriceForBom').text());
            for (var i = 0; i < arrRow.length; i++) {
                if (typeof (arrRow[i]) == 'undefined') {
                    arrRow[i] = '';
                };

            };
            arrLabelData.push(arrRow);

        });

        $('#labelsDiv').append('<h1>Label BOM</h1><table id="labelBom" class="display responsive col-md-12 compact cell-border"><thead><tr><th>Country</th><th>Garment Use</th><th>Material</th><th>Application</th><th>Label Size</th><th>Fiber Code-Content</th><th>Ink Colors</th><th>Usage Per Dozen</th><th>Usage UOM</th><th>Std Waste Factor</th><th>Usage Price</th></tr></thead><tbody></tbody></table>');
        labelBomTableOptions.data = arrLabelData;
        $('#labelBom').DataTable(labelBomTableOptions);


    });

};

garmentProduct.prototype.getMoas = function (strUrlPrefix, objSelfReference, objectIdsToPass) {
    var strUrlToCall = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?prodIds=' + objectIdsToPass + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11138313&action=ExecuteReport'
    var strRevisionIdsToget = '';
    var strUserIdsToGet = '';
    //var strEncodedUrl = encodeURI(strUrlToCall);
    //Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=2384183&format=formatDelegate&delegateName=HTMLWithSorting&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11138313&action=ExecuteReport
    $.get(strUrlToCall, function (data) { }).done(function (data) {
        var arrMoaData = rowParser('row', data);
        objSelfReference.moaArray = arrMoaData;


        for (var i = 0; i < objSelfReference.moaArray.length; i++) {
            var objThisLoopObject = objSelfReference.moaArray[i];
            if (objThisLoopObject.Rev_one != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_one;
            };
            if (objThisLoopObject.Rev_two != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_two;
            };
            if (objThisLoopObject.Rev_three != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_three;
            };
            if (objThisLoopObject.Last_Edited_By != '0' && typeof (objThisLoopObject.Last_Edited_By) != 'undefined') {
                strUserIdsToGet += ',' + objThisLoopObject.Last_Edited_By;
            };

            objThisLoopObject.Spec = objThisLoopObject.Spec.replace(/hbi/g, "");
            if (objThisLoopObject.Last_Modified.length > 10) {
                objThisLoopObject.Last_Modified = objThisLoopObject.Last_Modified.substring(0, 10);
            };

        };
        strRevisionIdsToget = strRevisionIdsToget.substring(1, strRevisionIdsToget.length);
        strRevisionIdsToget = strRevisionIdsToget.replace(/[,]/g, "%2C");
        strUserIdsToGet = strUserIdsToGet.substring(1, strUserIdsToGet.length);
        strUserIdsToGet = strUserIdsToGet.replace(/[,]/g, "%2C");
        strUserIdsToGet = strUserIdsToGet.replace(/Nan/g, "");

        var strUrlToCallForRevisionDisplays = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?revisionIds=' + strRevisionIdsToget + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12131345&action=ExecuteReport';
        //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?revisionIds=1966368%2C4704613&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12131345&action=ExecuteReport
        $.get(strUrlToCallForRevisionDisplays, function (data2) { }).done(function (data2) {
            var arrMoaDataWithDisplays = rowParser('row', data2);
            for (var i = 0; i < objSelfReference.moaArray.length; i++) {
                for (var j = 0; j < arrMoaDataWithDisplays.length; j++) {
                    var objThisLoopObjectFromGarment = objSelfReference.moaArray[i];
                    var objThisLoopObjectFromDisplayQuery = arrMoaDataWithDisplays[j];

                    if (objThisLoopObjectFromGarment.Rev_one == objThisLoopObjectFromDisplayQuery.objectId) {
                        objThisLoopObjectFromGarment.Rev_one = objThisLoopObjectFromDisplayQuery.Revision;
                    };
                    if (objThisLoopObjectFromGarment.Rev_two == objThisLoopObjectFromDisplayQuery.objectId) {
                        objThisLoopObjectFromGarment.Rev_two = objThisLoopObjectFromDisplayQuery.Revision;
                    };
                    if (objThisLoopObjectFromGarment.Rev_three == objThisLoopObjectFromDisplayQuery.objectId) {
                        objThisLoopObjectFromGarment.Rev_three = objThisLoopObjectFromDisplayQuery.Revision;
                    };

                    objSelfReference.moaArray[i] = objThisLoopObjectFromGarment;


                }
            }



        }).done(function () {
            //var strUrlForUsers = 'http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?userIds=' + strUserIdsToGet + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12134557&action=ExecuteReport';
            var strUrlForUsers = 'http://wsflexappdev2v/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?userIds=' + strUserIdsToGet + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12134557&action=ExecuteReport';
            var arrUserArray = [];
            $.get(strUrlForUsers, function (data3) { }).done(function (data3) {
                arrUserArray = rowParser('row', data3);
                for (var i = 0; i < objSelfReference.moaArray.length; i++) {
                    for (var j = 0; j < arrUserArray.length; j++) {
                        var objThisLoopObjectFromGarment = objSelfReference.moaArray[i];
                        var objThisLoopObjectFromDisplayQuery = arrUserArray[j];

                        if (objThisLoopObjectFromGarment.Last_Edited_By == objThisLoopObjectFromDisplayQuery.userObjectId) {
                            objThisLoopObjectFromDisplayQuery.Name = objThisLoopObjectFromDisplayQuery.Name.replace(/[.]/g, ' ');
                            var encodedProdName = objThisLoopObjectFromGarment.Product_Name.replace(/[ ]/, "%20");
                            objThisLoopObjectFromGarment.Last_Edited_By = '<a href="mailto:' + objThisLoopObjectFromDisplayQuery.E_Mail + '?subject=' + encodedProdName + '">' + objThisLoopObjectFromDisplayQuery.Name + '</a>';
                            //objThisLoopObjectFromGarment.Last_Edited_By = objThisLoopObjectFromGarment.Last_Edited_By.replace(/[ ]/, "%20");
                        };


                        objSelfReference.moaArray[i] = objThisLoopObjectFromGarment;


                    };
                };


            }).done(function () {
                var arrRevisionAttributeArray = [];
                var arrSizeTableArray = [];
                for (var i = 0; i < objSelfReference.moaArray.length; i++) {
                    var objThisLoopObject = objSelfReference.moaArray[i];

                    if (objThisLoopObject.Table_Name == "Revision Attribute") {
                        arrRevisionAttributeArray.push(objThisLoopObject);
                    }
                    else if (objThisLoopObject.Table_Name == "Sizing Table") {
                        arrSizeTableArray.push(objThisLoopObject);
                    };


                };
                var strRevisionAttributeTableString = convertRowArrayIntoHtmlTable(arrRevisionAttributeArray, '', '', 'revisionAttributeTbl', '<h1>Product Revisions</h1>');
                var strSizeTableString = convertRowArrayIntoHtmlTable(arrSizeTableArray, '', '', 'sizeTbl', '<h1>Sizing Table</h1>');

                objSelfReference.revisionAttributes = arrRevisionAttributeArray;
                objSelfReference.sizeTable = arrSizeTableArray;
                objSelfReference.RevisionAttributeTableString = strRevisionAttributeTableString;
                objSelfReference.SizeTableString = strSizeTableString;
                $('#sizeTableDiv').append(objSelfReference.SizeTableString);
                $('#prodRevisionDiv').append(objSelfReference.RevisionAttributeTableString);
                //sizeTbl
                $('#sizeTbl').DataTable(sizeTableOptions);
                $('#revisionAttributeTbl').DataTable(revisionTableTableOptions);



            });






        });




    });

};


//utility functions to work with garmentProduct class below
/*

 * @param {String} strkey key value of item in list to be passed to key array to get back display
 * @param {Object} objGarmentProduct takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * @return {String} strvalue return the display value from the key
 */
function getValueDisplayFromKey(strkey, objGarmentProduct) {
    var numIndexPositionOfKeyInKeyArray = objGarmentProduct.displayKeys.indexOf(strkey);
    var strvalue = objGarmentProduct.displayValues[numIndexPositionOfKeyInKeyArray];
    return strvalue;
};


// version 1, didn't work 
function pdfPage(objForFile) {
    $('button').remove();
    $('label').remove();
    $('th').each(function () {
        $(this).removeClass("sorting sorting_asc sorting_desc");
    });
    $('.clearThisComponentOnNewGarmentLoad').each(function () {
        if ($(this).find('h1').length) {

        }
        else {
            $(this).parent().remove();
        };
    });
    var header = $('head').html();
    // do a a string find in this pagehtml element and insert commented out comments into the string
    //awesome
    String.prototype.splice = function (idx, rem, s) {
        return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
    };

    var pageHtml = $('body').not('button,.dataTables_info,.dataTables_paginate,#scriptsToIgnore').html();
    var numKillBegin = pageHtml.indexOf('killBeginPoint');
    var numKillEnd = pageHtml.indexOf('killEndPoint');
    pageHtml = pageHtml.splice(numKillBegin, 0, "<!--");
    pageHtml = pageHtml.splice(numKillEnd, 0, "-->");
    pageHtml = pageHtml.replace("<!--killBeginPoint-->", "");
    pageHtml = pageHtml.replace("<!--killEndPoint-->", "");
    //need to turn this into a whole function as this is working perfectly! :), just need to tweak positioning!, just added replace, may work
    var allHtml = header + pageHtml;
    //var fileName = objForFile.name + '.html';
    var fileName = objForFile.name// + '.html';
    var objPostObject = {
        garmentName: fileName,
        strMyHtml: pageHtml.serialize()
    };
    console.log(objPostObject);
    /*$.post("http://localhost:3000", function (data) {
        $(".result").html(data);
    });
    $.post('http://localhost:3000' + objPostObject, function () { }).done(function () {
        alert('spec posted');
    });*/
    $.ajax({
        type: "POST",
        url: 'http://172.16.14.229:3000',
        //url: 'http://localhost:3000', //?garmentName=' + fileName,
        //http://localhost/
        data: objPostObject,//{garmentName:fileName},
        dataType: 'text'

    }).done(function () {
        alert('done');
    })
    //add in error catching for if file exists
    //fs.writeFileSync(fileName, allHtml);


    //comment this out later if you are just posting the html file.  The  below function using wikihtmlToPdf in order to saved a 
    //local pdf onto the user's system
    //pdfItUsingWikihtml(objForFile);


};
// version 2, works but requires a large amount of semi-suspect functionality, less lightweight
function pdfItUsingWikihtml(objContainingInitialFilePathInName) {
    var filePath = '/wkhtmltopdf/bin/wkhtmltopdf';
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "_"
                    + (currentdate.getMonth() + 1) + "_"
                    + currentdate.getFullYear() + ""
                    + currentdate.getHours() + "_"
                    + currentdate.getMinutes() + "_"
                    + currentdate.getSeconds();
    //child = execFile(filePath, ['file:///GitProjects/nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', "\\\\izone.hbi.net@SSL\\sites\\PLM\\gSpecs\\" + objForFile.name + '.pdf'], function (error, stdout, stderr) {
    //"C:\GitProjects\nodeTechPackProject\TechPackProject"
    child = execFile(filePath, ['file:///GitProjects/nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', objContainingInitialFilePathInName.name + datetime + '.pdf'], function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' +
                   error.signal);
        }
        console.log('Child Process stdout: ' + stdout);
        console.log('Child Process stderr: ' + stderr);
        alert('Saved - ' + objForFile.name + datetime + '.pdf');
    });

};




function pdfPageOlder(objForFile) {
    var header = $('head').html();
    var pageHtml = $('body').html();
    var allHtml = header + pageHtml;
    var fileName = 'testFile.html';
    //add in error catching for if file exists
    fs.writeFileSync('testFile.html', allHtml);

    var filePath = '/wkhtmltopdf/bin/wkhtmltopdf';
    child = execFile(filePath, ['file:///nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', objForFile.name + '.pdf'], function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' +
                   error.signal);
        }
        console.log('Child Process stdout: ' + stdout);
        console.log('Child Process stderr: ' + stderr);
    });



};

function pdfPageClassItemForPdf(indexToStopAt, incrementingVariable) {
    if (indexToStopAt == incrementingVariable) {

    }
    else {

    };

};
function pdfPageJSPDFVERSION(objForFile) {
    /*var pdf = new jsPDF('l', 'pt', 'a3')
    var pageString = '';
    var intLengthOfPage = $('.page').length;
    $('.page').each(function (index) {
        var intPageNum = index + 1;
        var strHtmlToAdd = $(this).html();
        //just dynamically construct the html then pass that strong to the current function
        pageString += strHtmlToAdd;
        //pdf.setPage(intPageNum);
        /*pdf.addHTML(strHtmlToAdd, function () {
            //var string = pdf.output('datauristring');
            //$('.preview-pane').attr('src', string);
            if (index == intLengthOfPage - 1) {
                pdf.save('addhtmlversion.pdf');
            };
        });
        //pdf.addPage();
    });
    var intPageNum = 0;
    pdf.addHTML(pageString, function () {

            pdf.save('addhtmlversion.pdf');

    });

    */
    var strHtmlStringForPdf = '';
    var intLengthOfPage = $('.page').length;

    $('.page').each(function (index) {
        var strPageHtml = $(this).html();
        strHtmlStringForPdf += strPageHtml;

    });


    var pdf = new jsPDF('l', 'pt', 'a3')
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    , source = strHtmlStringForPdf

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    , specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '.page': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            pdf.addPage()
            return true
        }
    }

    margins = {
        top: 0,
        bottom: 0,
        left: 0,
        width: 1190
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
        source // HTML string or DOM elem ref.
        , margins.left // x coord
        , margins.top // y coord
        , {
            'width': margins.width // max width of content on PDF
            , 'elementHandlers': specialElementHandlers
            //settings go here
        },
        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save('Test.pdf');
        },
        margins
      )

};

//"\\izone.hbi.net@SSL\sites\PLM\Garment Specs\test.txt"
//turning off for now

function materialSwapper(arrWithbranchIds) {
    var strMaterialsJoin = arrWithbranchIds.join([separator = ',']);
    var strMaterialsByBranchUrl = 'http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?branches=' + strMaterialsJoin + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11140734&action=ExecuteReport';
    //&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11140734&action=ExecuteReport

    $.get(strMaterialsByBranchUrl, function (data) { }).done(function (data) {
        var strMyName;
        var strMyBranch;
        var branchIndex;
        var numOriginalLength = arrWithbranchIds.length;
        $('row', data).each(function () {
            strMyName = $(this).find('Att_').text();
            strMyBranch = $(this).find('com_lcs_wc_material_LCSMaterial').attr('branchId');
            //branchIndex = arrMaterialsToGet.indexOf(strMyBranch);
            //strIdTouse = arrMaterialsToGet[branchIndex + 1];
            //$('#' + strIdTouse).text(strMyName);
            arrWithbranchIds.push(strMyName);


        });

        $('.colorCell').each(function () {
            var strItsVal = $(this).attr('material');

            if (typeof (strItsVal) != 'undefined') {

                var indexOfName = arrWithbranchIds.indexOf(strItsVal) + numOriginalLength;
                var matName = arrWithbranchIds[indexOfName];
                var strOriginalText = $(this).text();
                $(this).text(strOriginalText + '_' + matName);

            };

        });
    });
};
//Testing out the recommit, getting back into business
function rowParser(parentElement, objDocumentObject) {
    var arrOfElements = [];

    $(parentElement, objDocumentObject).each(function () {
        var objElement = {};
        var arrObjElementAttributes = [];
        $(this).find('*').each(function () {
            var strMyTag = $(this).prop('tagName');
            //objElement[strMyTag] = $(this);
            //objElement[strMyTag].value = $(this).text();
            objElement[strMyTag] = $(this).text();

            var objAttrObject = {};
            var arrAttributes = [];

        });
        arrOfElements.push(objElement);
    });
    return arrOfElements;
};

function convertRowArrayIntoHtmlTable(arrRowArray, strHeaderArrayPropertyToSearchFor, strBodyArrayPropertyToSearchFor, optionalId, optionalHeaderString) {
    var strResultingHtmlTable = '';
    if (typeof (optionalHeaderString) != 'undefined') {
        strResultingHtmlTable = optionalHeaderString;
    }
    else {
        strResultingHtmlTable = '';
    };

    if (typeof (optionalId) == 'undefined') {
        strResultingHtmlTable += '<table class="display" ><thead>';
    }
    else {
        strResultingHtmlTable += '<table class="display"  id="' + optionalId + '" ><thead>';
    };


    var objFirstObject = arrRowArray[0];
    for (var name in objFirstObject) {
        if (objFirstObject.hasOwnProperty(name)) {
            var arrTester = objFirstObject[name];
            if ($.isArray(arrTester)) {
                //var arrObj = objFirstObject[name];
                for (var l = 0; l < arrTester.length; l++) {
                    var objSimpleObj = arrTester[l];
                    strResultingHtmlTable += '<th>' + objSimpleObj[strHeaderArrayPropertyToSearchFor] + '</th>';

                };
            }
            else {
                name = name.replace(/_/g, ' ');
                strResultingHtmlTable += '<th>' + name + '</th>';
            };
        }
    }

    strResultingHtmlTable += '</thead><tbody>';
    for (var i = 0; i < arrRowArray.length; i++) {
        var objRow = arrRowArray[i];
        strResultingHtmlTable += '<tr>';
        for (var name in objRow) {

            if (objRow.hasOwnProperty(name)) {
                //var arrTester = objFirstObject[name];
                if ($.isArray(objRow[name])) {

                    for (var l = 0; l < objRow[name].length; l++) {
                        var objSimpleObj = objRow[name][l];
                        //var objSuperSimpleObj = objSimpleObj[l];
                        if (typeof (strBodyArrayPropertyToSearchFor) != 'undefined') {
                            strResultingHtmlTable += '<td>' + objSimpleObj[strBodyArrayPropertyToSearchFor] + '</td>';
                        }
                        else {
                            strResultingHtmlTable += '<td>' + 'body to search for was undefined' + '</td>';
                        };
                    };
                }
                else {
                    if (typeof (objRow[name] != 'undefined')) {

                        strResultingHtmlTable += '<td>' + objRow[name] + '</td>';

                    }
                    else {
                        strResultingHtmlTable += '<td></td>';
                    }
                };
            };

        };
        strResultingHtmlTable = strResultingHtmlTable.replace(/<td>undefined/g, "<td> ");
        strResultingHtmlTable = strResultingHtmlTable.replace(/<th>undefined/g, "<th> ");
        strResultingHtmlTable += '</tr>';

    };
    strResultingHtmlTable += '</tbody></table>';
    //console.log(strResultingHtmlTable);
    return strResultingHtmlTable;

};

//need to append a second function here which turns the objects grabbed and created from the parsing of the xml into automatic tables

function callNextDocument(arrayOfDocuments, currentIndex) {
    var nextIndex = currentIndex + 1;
    var objCheckUndefined = arrayOfDocuments[0];
    if (typeof (objCheckUndefined) != 'undefined') {
        $.ajax(
            {
                url: arrayOfDocuments[currentIndex].fullVaultUrl,
                start: function () {
                    //arrNamesOfDocumentsForSvgHold.push(objHolder, objComponent.fullVaultUrl);
                },
                complete: function (text) {
                    //var strVaultFileName = myCall.urlIcalled.substring(intPrefixLength, myCall.urlIcalled.length);
                    var strOnlySvgText = text.responseText.substring(text.responseText.indexOf('<svg'), text.responseText.length);
                    //arrSvgData.push(strOnlySvgText);
                    //var strHeaders = text.getAllResponseHeaders();
                    //console.log(strHeaders);
                    //var numIndexToUse = arrNamesOfDocumentsForSvgHold.indexOf(strVaultFileName) - 1;
                    var strMyName = arrayOfDocuments[currentIndex].name;
                    var strFileName = arrayOfDocuments[currentIndex].fileName;
                    var strRoleAObjectId = arrayOfDocuments[currentIndex].roleDocumentLink;
                    if ($('#' + strRoleAObjectId).length) {
                        $('#' + strRoleAObjectId).append(strOnlySvgText);
                    }
                    else {
                        //$('#imagesDiv').append('<h2>' + strMyName + '</h2></br><div class="row page" id="' + strRoleAObjectId + '">' + strOnlySvgText + '</div></br></br><hr>');

                    };
                    if (nextIndex < arrayOfDocuments.length) {

                        //callNextDocument(arrayOfDocuments, nextIndex);

                    }
                    else {
                        $('#imagesDiv .page').each(function () {
                            var numOfSvgs = $(this).find('svg').length;
                            var width = 0;
                            var height = 0;
                            var strClassToAdd = '';
                            var strClassToAdd2 = '';
                            if (numOfSvgs == 2) {
                                height = 396;
                                width = 306;
                                strClassToAdd = 'col-md-offset-1 col-md-5';
                                strClassToAdd2 = 'col-md-5 col-md-offset-1';
                            }
                            else if (numOfSvgs == 1) {
                                height = 792;
                                width = 612;
                                strClassToAdd = 'col-md-offset-3 col-md-6';
                            };
                            $(this).find('svg').each(function (index) {
                                $(this).attr('height', height);
                                $(this).attr('width', width);
                                if (index == 0) {
                                    $(this).addClass(strClassToAdd);
                                }
                                else if (index == 1) {
                                    $(this).addClass(strClassToAdd2);
                                };
                            });

                        });

                    };

                }
            });
    };
};
