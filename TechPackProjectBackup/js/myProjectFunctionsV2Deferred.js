/**
*Global Variables
*/
var arrDataArray = [];
var numIndexerForArray = 0;
var arrWhenDeferredArray = [];
var numOfTotalBoms = 0;
var numBomsAlreadyRan = 0;
var numOfProcessingFunctionsThatHaveRun = 0;
/**
 * Represents a Garment Product and all its corresponding manufacturing data, size, colorways etc. 
 * @constructor
 * @property {String} strName Defines the name of the Garment Product itself
 * @property {Array} arrAttributes Defines the set of attributes that would need to be pulled from the Garment Product itself for headers etc or just for general display but for which no linkage is created
 * @property {Array} arrSpecs an array of the specs that are in the garment product
 * @property {Array} arrSources an array of the Sources that are in the garment product
 * @property {Object} objColorwayProduct The linked Colorway Product Object.  Later a corresponding Class May be Created
 * @property {Object} objPatternProduct The linked Pattern Product Object.  Later a corresponding Class May be Created
 * @property {Object} objLabelProduct The linked Label 639Product Object.  Later a corresponding Class May be Created
 * @property {Object} objSellingProduct The linked Selling Product Object.  Later a corresponding Class May be Created
 * @property {Array} arrBoms an array of the BOMs that are in the garment product, these will and should be paired down to only be those coming from the active spec
 * @property {Array} arrSeasonSourceSpecCombos an array of viable combinations of season/source/spec
 * @property {Array} arrDocuments an array of the doucments that are in the garment product
 * @property {Object} objMeasurement an object containing the branch id and objectId of the LCSMeasurement class, does not contain the individual POMs etc et at this point in this object
 * @property {Object} objConstruction an object containing the branch id and objectId of the LCSConstruction class, does not contain the individual POMs etc et at this point in this object
 * @property {String} strObjectId a string denoting the objecId of the LCSProduct that is the garment product
 * @property {Object} objGSpec an object container for the active garment spec
 * @property {Object} objPSpec an object container for the active pattern spec
 * @property {Array} arrBase64Documents not sure yet if will be used
 * @property {Array} arrConstructionInfo not sure yet if will be used
 * @property {Object} objconstructionDetail container for the individual poms of objConstruction
 * @property {Object} objMeasurementDetail container for the individual poms of objMeasurement
 * @property {String} strSpecId a string denoting the objectId of the LCSFlexSpecification which is the active spec
 * @property {String} strSpecName a string denoting the name of the LCSFlexSpecification which is the active spec
 * @property {String} strActiveSeasonName a string denoting the name of the current season
 * @property {String} strMeasTableString a string representing the whole table of the measurements
 * @property {String} strBaseSize a string representing the base/sample size of the product measurements
 * @property {String} strSizeRun a string representing the whole size definition delimited by ~*~
 * @property {Array} arrDisplayKeys keys for att value lists with matching index positions in arrDisplay values
 * @property {Array} arrDisplayValues see arrDisplayKeys
 * @property {Array} arrBlockWeightsSpread
 * @property {String} strBlockWeightsSpreadTableString
 * @property {Array} arrBlockWeightsTrim
 * @property {Array} arrColorways
 * @property {Array} arrColorwayData
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

/**
 * @memberof garmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the construction sits.  All string prior to Windchill.
 * @param {Number} numConstructionBranchId takes the branch id from objConstruction (preferrably) and then turn later constructionDetail of the garmentProduct which runs this to contain all the POMs etc.
 * @param {xmlDocumentObject} constructionData responseData from an ajax Call for construction.  
 * @param {garmentProduct} objSelfReference Allows the passing of the garmentProduct presently being processed to be passed  from one function scope to another
 */
garmentProduct.prototype.getMyConstruction = function (strHostUrlPrefix, numConstructionBranchId, constructionData, objSelfReference, idToPass, headerValue) {
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
        } else if (objCurrentElement.is("sortingNumber")) {
            objCurrentRow.sortingNumber = objCurrentElement.text();
        } else if (objCurrentElement.is("IDA2A2")) {
            objCurrentRow.IDA2A2 = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiLooperThread")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiLooperThread = getValueDisplayFromKey(strKey, objSelfReference);
        } else if (objCurrentElement.is("libraryItemReference")) {
            objCurrentRow.libraryItemReference = objCurrentElement.text();
        } else if (objCurrentElement.is("detailImage")) {
            objCurrentRow.detailImage = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiGarmentUse")) {
            objCurrentRow.hbiGarmentUse = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiGarmentUseDisplay")) {
            objCurrentRow.hbiGarmentUseDisplay = objCurrentElement.text();
        } else if (objCurrentElement.is("constructionPart")) {
            objCurrentRow.constructionPart = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiNeedleColor")) {
            objCurrentRow.hbiNeedleColor = objCurrentElement.text();
        } else if (objCurrentElement.is("stitching")) {
            objCurrentRow.stitching = objCurrentElement.text();
        } else if (objCurrentElement.is("stitchingDisplay")) {
            objCurrentRow.stitchingDisplay = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiSpi")) {
            objCurrentRow.hbiSpi = objCurrentElement.text();
        } else if (objCurrentElement.is("comments")) {
            objCurrentRow.comments = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiGuageWidth")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiGuageWidth = getValueDisplayFromKey(strKey, objSelfReference);
        } else if (objCurrentElement.is("hbiLooperColor")) {
            objCurrentRow.hbiLooperColor = objCurrentElement.text();
        } else if (objCurrentElement.is("hbiNeedleThread")) {
            var strKey = objCurrentElement.text();
            objCurrentRow.hbiNeedleThread = getValueDisplayFromKey(strKey, objSelfReference);
        } else if (objCurrentElement.is("number")) {
            objCurrentRow.number = objCurrentElement.text();
        } else if (objCurrentElement.is("instruction")) {
            objCurrentRow.instruction = objCurrentElement.text();
        } else if (objCurrentElement.is("constructionPartDetail")) {
            objCurrentRow.constructionPartDetail = objCurrentElement.text();
        } else if (objCurrentElement.is("topStitch")) {
            objCurrentRow.topStitch = objCurrentElement.text();
        } else if (objCurrentElement.is("topStitchDisplay")) {
            objCurrentRow.topStitchDisplay = objCurrentElement.text();
        } else if (objCurrentElement.is("seamType")) {
            objCurrentRow.seamType = objCurrentElement.text();
        } else if (objCurrentElement.is("seamTypeDisplay")) {
            objCurrentRow.seamTypeDisplay = objCurrentElement.text();
            arrCurrentConstruction.push(objCurrentRow)
            objCurrentRow = {};
        }

    });
    // and so on for each element that we want to capture
    objSelfReference.constructionDetail = arrCurrentConstruction;
    if (objSelfReference.constructionDetail.length > 0) {
        if ($('#conMiniHeader').length) {

        }
        else {
            $('#constructionDiv').prepend('<h2 id="conMiniHeader">Constructions</h2>');
        };
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
        var strNameAttr = encodeURIComponent(headerValue);
        var constructionTableString = '<h1 headerForThisTable="' + idToPass + '">' + headerValue + '</h1><table name="' + strNameAttr + '" id="' + idToPass + '" class="display responsive col-md-12 compact cell-border construction">' + strTableHeaderString + strTableBodyString + '</table>';
        if (typeof (objSelfReference.arrConstructionTableStrings) == 'undefined') {
            objSelfReference.arrConstructionTableStrings = [];
        };
        for (var i = 0; i < objSelfReference.arrayOfConstructions.length; i++) {
            var objThisConstruction = objSelfReference.arrayOfConstructions[i];
            if (objThisConstruction.branchId == numConstructionBranchId) {
                //objSelfReference.arrConstructionTableStrings.push(constructionTableString);
                objSelfReference.arrayOfConstructions[i].tableString = constructionTableString;
            };
        };

    } else {
        //$('#constructionsLi').fadeOut();
    };

};
/**
 * @comment Still need to add logic here to deal with size variation and variable columns as a result; this is currently ran within @method getSpecComponentsForActiveSpec
 * @comment SIZE LOGIC NOW DEALT WITH
 * @memberof garmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Number} numMeasurementBranchId takes the branch id from objMeasurement (preferrably) and then turns measurementDetail of the garmentProduct which runs this to contain all the POMs etc.
 * @param {xmlDocumentObject} measurementData responseData from an ajax Call for measurement.  
 * @param {garmentProduct} objSelfReference Allows the passing of the garmentProduct presently being processed to be passed  from one function scope to another
 */
garmentProduct.prototype.getMyMeasurement = function (strHostUrlPrefix, numMeasurementBranchId, measurementData, objSelfReference) {

    var strTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml';

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
        /**
         * This block removes 99.999999 values from super high tolerance
         */
        var numVersionOfTolerance;
        numVersionOfTolerance = Number(objRow.plusTolerance);
        if (numVersionOfTolerance > 90) objRow.plusTolerance = ' ';
        numVersionOfTolerance = Number(objRow.minusTolerance);
        if (numVersionOfTolerance > 90) objRow.minusTolerance = ' ';
        /**
         * ends here
         */
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
            var numOfPom = Number(strSizePomValue);
            if (numOfPom > 9000) {
                strSizePomValue = '';
            };
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
            } else {
                strTableBodyString += '<td>' + arrSizes2[k].sizeValue + '</td>';
            }

        };

        strTableBodyString += '</tr>';
    };
    strTableBodyString += '</tbody>';
    objSelfReference.measurementTableString = '<h2>Measurements</h2><h1>'/*Measurements*/ + objSelfReference.measurement.name + '</h1><table id="measurements" class="display responsive col-md-12 compact cell-border">' + strTableHeaderString + strTableBodyString + '</table>';

};
/**
 * @comment this is currently ran within @method getSpecComponentsForActiveSpec
 * @memberof garmentProduct
 * @comment  this method returns the active spec and identifies it on the objSelfReference garment and alters that property.
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {String} strGarmentName uses the name of the garmentProduct that is calling this method
 * @param {Function} funCallback passes a function to callback after the modification of the garmentProduct being passed to this function
 * @param {Object} objForCallback provides a container for the callback function to operate on to pass into the objSelfReference object.  This is used to work around scope limitations.
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 * without further developer input but rather in other methods within the class so that no further code is necessary.
 *
 */
// this function is  NOT PRESENTLY IN USE
garmentProduct.prototype.getSpecByName = function (strHostUrlPrefix, strGarmentName, funCallback, objForCallback, objSelfReference) {
    if (typeof (strGarmentName) == 'undefined')// How can I stop working of function here?
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
    $.get(strSpecUrl, function (specData) {
    }).done(function (specData) {
        if (typeof (strSpecUrl) == 'undefined')// How can I stop working of function here?
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

            if (strSpecName.indexOf(strHbiActiveSpec) == -1 || strHbiActiveSpec) {
                objSpec.active = false;
            } else {
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
        } else {
            objForCallback = {
                arrSpecArray: arrSpecArray,
                arrSourceArray: arrSourceArray,
                arrCombinationArray: arrCombinationArray,
                activeSpecId: numActiveSpecId,
                gProdName: gProdName,
                activeSpecName: strActiveSpecName
            };
            funCallback(objForCallback, objSelfReference);
        };
    });
};

/**
 * @comment this is currently ran within @method getSpecComponentsForActiveSpec
 * @memberof garmentProduct
 * @comment this method returns the active spec and identifies it on the objSelfReference garment and alters that property.
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {String} strGarmentName uses the name of the garmentProduct that is calling this method
 * @param {Function} funCallback passes a function to callback after the modification of the garmentProduct being passed to this function
 * @param {Object} objForCallback provides a container for the callback function to operate on to pass into the objSelfReference object.  This is used to work around scope limitations.
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 * without further developer input but rather in other methods within the class so that no further code is necessary.
 *
 */
garmentProduct.prototype.getSpecByNameButNotJustActiveSpec = function (strHostUrlPrefix, strGarmentName, funCallback, objForCallback, objSelfReference) {
    if (typeof (strGarmentName) == 'undefined')// How can I stop working of function here?
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
    $.get(strSpecUrl, function (specData) {
    }).done(function (specData) {
        if (typeof (strSpecUrl) == 'undefined')// How can I stop working of function here?
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
            objSpec.active = false;
            objSpec.ready = false;
            objSpec.name = $(this).find('Spec_Name').text();
            objSpec.idNumber = $(this).find('specLink').attr('objectId');
            objSpec.activeDevspec = $(this).find('hbiActiveDevelopmentSpec').text();
            objSpec.activeDevspecDate = $(this).find('activeDevelopmentSpecComplete').text();
            objSpec.activeSpec = $(this).find('hbiActiveSpec').text();
            objSpec.activeSpecificationCompleteDate = $(this).find('hbiActiveSpecificationComplete').text();
            objSpec.primarySource = $(this).find('hbiPrimarySource').text();
            objSpec.SpecName = $(this).find('Spec_Name').text();
            objSpec.Type = $(this).find('specLink').attr('type');
            objSpec.flexIdPath = $(this).find('flexTypeIdPath').text();
            objSpec.activeSpecNull = $(this).find('hbiActiveSpec').attr('isNull');
            objSpec.activeDevSpecNull = $(this).find('activeDevspec').attr('isNull');
            //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/TypeBasedIncludeServlet?oid=VR%3Acom.lcs.wc.specification.FlexSpecification%3A5532945&u8=1
            var strSpecName = objSpec.name;
            var strType = objSpec.Type;
            var strHbiActiveSpec = objSpec.activeSpec.substring(3, 6);
            var strHbiActiveDevSpec = objSpec.activeDevspec.substring(3, 6);
            var isItNull = objSpec.activeSpecNull;
            var isDevSpecNull = objSpec.activeDevSpecNull;
            if (isItNull == 'true') {
                isItNull = true;
            }
            else {
                isItNull = false;
            }

            //definition of active

            if (objSpec.activeSpecificationCompleteDate.length > 0 && objSpec.primarySource == 'Yes' && strSpecName.indexOf(strHbiActiveSpec) != -1 && isItNull != true) {
                objSpec.active = true;
            }
            else {
                //objSpec.active = false;
                if (objSpec.activeDevspecDate.length > 0 && strSpecName.indexOf(strHbiActiveDevSpec) != -1 && isDevSpecNull != true && strHbiActiveDevSpec.length > 0) {
                    objSpec.ready = true;
                };

            };

            numActiveSpecId = objSpec.idNumber;
            strActiveSpecName = objSpec.name;

            /*if (strSpecName.indexOf(strHbiActiveSpec) == -1 || isItNull) {
                objSpec.active = false;
                // build in conditions for other possibilities here, i.e. dev spec etc.

                // build in conditions for other possibilities here, i.e. dev spec etc.

            } else {
                if (objSpec.activeSpecificationCompleteDate.length > 0 && objSpec.primarySource == 'Yes') {
                    objSpec.active = true;
                };
                numActiveSpecId = objSpec.idNumber;
                strActiveSpecName = objSpec.name;
            };*/

            //definition of active

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
            /*var strPrimary = $(this).find('Primary_Source').text();
            objSource.primary = strPrimary == 1 ? true : false;*/
            arrSourceArray.push(objSource);
            //show viable combinations
            var objCombinationObject = {};
            objCombinationObject.sourceId = objSource.idNumber;
            objCombinationObject.sourceName = objSource.name;
            objCombinationObject.specId = objSpec.idNumber;
            objCombinationObject.specName = objSpec.name;
            objCombinationObject.activeSpecName = objSpec.name;
            //adding more conditions for what defines active 11.3.2016
            objCombinationObject.activeDevspec = objSpec.activeDevspec;
            objCombinationObject.activeDevspecDate = objSpec.activeDevspecDate;
            objCombinationObject.activeSpecificationCompleteDate = objSpec.activeSpecificationCompleteDate;
            objCombinationObject.primarySource = objSpec.primarySource;
            objCombinationObject.flexIdPath = objSpec.flexIdPath;
            //adding more conditions for what defines active 11.3.2016
            objCombinationObject.active = objSpec.active;
            objCombinationObject.ready = objSpec.ready;
            objCombinationObject.seasonId = $(this).find('Garment_Season').attr('objectId');
            objCombinationObject.seasonName = $(this).find('Garment_Season_Season_Name').text();
            objCombinationObject.patternSpec = encodeURIComponent($(this).find('hbiPatternSpec').text());
            objCombinationObject.childSpec = $(this).find('Child_Spec_Name').text();
            objCombinationObject.childSpec = objCombinationObject.childSpec.replace(/:\s*/g, "");
            objCombinationObject.parentSpec = $(this).find('Parent_Spec_Name').text();
            objCombinationObject.parentSpec = objCombinationObject.parentSpec.replace(/:\s*/g, "");
            objCombinationObject.constructionMethodCode = encodeURIComponent($(this).find('hbiConstructionMethodCode').text());
            objSelfReference.activeSeason = $(this).find('Garment_Season_Season_Name').text();
            objCombinationObject.seasonSpecCombo = "" + objCombinationObject.seasonName + " _src_" + objCombinationObject.sourceName + " _spec_" + objCombinationObject.specName
            arrCombinationArray.push(objCombinationObject);
        });
        arrSpecArray.reverse();
        arrSourceArray.reverse();
        arrCombinationArray.reverse();
        /*var numQuantityOfActiveSpecs = 0;
        for (var i = 0; i < arrSpecArray.length; i++) {
            var objLoopObj = arrSpecArray[i];
            if (objLoopObj.active == true) {
                numQuantityOfActiveSpecs++;
            };
        };*/
        console.log(arrSpecArray);
        console.log(arrSourceArray);
        console.log(arrCombinationArray);
        //$('#seasonSpecSelection').append();
        $('#seasonSpecSelection').append('</br></br>');
        for (var i = 0; i < arrCombinationArray.length; i++) {
            var objLoopObject = arrCombinationArray[i];
            var strExtraButtonClass = '';
            if (objLoopObject.active) {
                strExtraButtonClass = ' btn-success';
            } else if (objLoopObject.ready) {
                strExtraButtonClass = ' btn-warning';
            } else {
                strExtraButtonClass = ' btn-info';
            };
            if (objLoopObject.patternSpec == '') {
                objLoopObject.patternSpec = '" "';
            }
            if (objLoopObject.constructionMethodCode == '') {
                objLoopObject.constructionMethodCode = '" "';
            };
            if (objLoopObject.parentSpec == '' || typeof (objLoopObject.parentSpec) == 'undefined') {
                objLoopObject.parentSpec = '"0"';
            }
            //$('#seasonSpecSelection').append('<button class="seasonSpecButton btn col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 col-xs-offset-2 col-xs-8' + strExtraButtonClass + '" specId= ' + objLoopObject.specId + '>Season:' + objLoopObject.seasonName + ' Source:' + objLoopObject.sourceName + 'Spec:' + objLoopObject.specName + '</button></br>')
            var numOffset = 1;
            var numColSize = 10;
            $('#seasonSpecSelection').prepend('<button class="seasonSpecButton btn col-md-offset-' + numOffset + ' col-md-' + numColSize + ' col-lg-offset-' + numOffset + ' col-lg-' + numColSize + ' col-xs-offset-' + numOffset + ' col-xs-' + numColSize + '' + strExtraButtonClass + '" specId= ' + objLoopObject.specId + ' constructionMethodCode=' + objLoopObject.constructionMethodCode + ' patternSpec=' + objLoopObject.patternSpec + ' season=' + encodeURIComponent(objLoopObject.seasonName) + ' source=' + encodeURIComponent(objLoopObject.sourceName) + ' Spec_Name=' + encodeURIComponent(objLoopObject.activeSpecName) + ' parentSpec=' + objLoopObject.parentSpec + '>' + 'Season(' + objLoopObject.seasonName + ')  Spec(' + objLoopObject.specName + ')  Source(' + objLoopObject.sourceName + ')</button><br><br><br>');
            if (arrCombinationArray.length == i) {

            };
            if (i == arrCombinationArray.length - 1) {
                var numOffset = 2;
                var numColumnsToTake = 8;
                $('#seasonSpecSelection').append('<p class="lead col-sm-offset-' + numOffset + ' col-sm-' + numColumnsToTake + '  col-md-offset-' + numOffset + ' col-md-' + numColumnsToTake + ' col-lg-offset-' + numOffset + ' col-lg-' + numColumnsToTake + ' col-xl-offset-' + numOffset + ' col-xl-' + numColumnsToTake + ' ">Green buttons = Active Specifications <br> Orange Buttons = Fully developed Specs that are not the preferred active spec but are likely still in production.  <br> Teal Buttons = Specs that are incomplete i.e. not fully developed or active.</p>');
            };

        };
        if ($(".seasonSpecButton").length) {
            $('.seasonSpecButton').click(function () {
                var strSelectedSpecId = $(this).attr('specId');
                var boolIsItActive;
                var boolIsItAnAvailableOrangeSpec;
                var target = $(this);
                if (target.hasClass('btn-success')) {
                    boolIsItActive = true;
                    boolIsItAnAvailableOrangeSpec = false;
                }
                else {
                    if (target.hasClass('btn-warning')) {
                        boolIsItActive = false;
                        boolIsItAnAvailableOrangeSpec = true;
                    }
                    else {
                        boolIsItActive = false;
                        boolIsItAnAvailableOrangeSpec = false;
                    };
                };

                var strConstructionMethodCode = decodeURIComponent($(this).attr('constructionmethodcode'));
                var strPatternSpec = decodeURIComponent($(this).attr('patternspec'));
                var strActiveSourceName = decodeURIComponent($(this).attr('source'));
                var strActiveSeasonName = decodeURIComponent($(this).attr('season'));
                var strActiveSpecName = decodeURIComponent($(this).attr('Spec_Name'));
                var strParentSpec = decodeURIComponent($(this).attr('parentSpec'));
                var str1 = 'http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?';
                var str2 = '&oid=OR%3Awt.query.template.ReportTemplate%3A7360149&action=ExecuteReport';
                if (window.location.href.indexOf('appdev2') != -1) {
                    str1 = 'http://wsflexappdev2v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?';
                    str2 = '&oid=OR%3Awt.query.template.ReportTemplate%3A7360149&action=ExecuteReport'
                };

                //var strNameSubstring = nameToUse.substring(0,5);
                var fullStr = str1 + 'Garment+Product=' + encodeURIComponent(gProdName) + '&specId=' + strSelectedSpecId + str2;
                $('#complianceReport').attr('href', fullStr);

                $('#seasonSpecSelection *').remove();
                objForCallback = {
                    arrSpecArray: arrSpecArray,
                    arrSourceArray: arrSourceArray,
                    arrCombinationArray: arrCombinationArray,
                    activeSpecId: strSelectedSpecId,
                    gProdName: gProdName,
                    activeSpecName: strActiveSpecName,
                    activeSource: strActiveSourceName,
                    constructionMethodCode: strConstructionMethodCode,
                    patternSpec: strPatternSpec,
                    activeSeason: strActiveSeasonName,
                    parentSpec: strParentSpec
                };
                objSelfReference.isCurrentSpecAnActiveSpec = boolIsItActive;
                objSelfReference.isCurrentSpecAnAvailableSpec = boolIsItAnAvailableOrangeSpec;
                funCallback(objForCallback, objSelfReference);
            });
            $('.btn-success').first().focus();
        } else {
            alert('no specifications found for garment');
            runNewProduct(currentGarmentProduct);
        };
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
 * @memberof garmentProduct
 * @comment this method gets all spec components for the active spec of the garment for which is passed.  It is run as a deffered call nested within the @method getAllMyDataForMyActiveSpec within @class garmentProduct
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} objDocumentData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objConstructionData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objMeasurementData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objBomData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {Object} objProdLinkData defferred object that is passed to this function to work around the asynchronous nature of the ajax calls.  It contains all data pertaining to the object between 'obj' and 'Data' in its name
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getSpecComponentsForActiveSpec = function (strHostUrlPrefix, objDocumentData, objConstructionData, objMeasurementData, objBomData, objProdLinkData, /*objGarmentSewBomData, objPatternSewBomDataWithUsage,*/ objSelfReference) {
    var arrDocuments = [];
    var arrBoms = [];
    var arrTableDataArray = [];
    var objColorwayProduct = {};
    var objPatternProduct = {};
    var objGarmentProduct = {};
    var objLabelProduct = {};
    var objSellingProduct = {};
    var numObjectId;
    var garmentProdSpecGarmentAndPatternComponentsDOCUMENTSV3NoPatternObjectId = '32783911';
    var garmentProdSpecGarmentAndPatternComponentsDOCUMENTSV3NoPatternUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?u8&action=ExecuteReport&specId=' + objSelfReference.activeSpecId + '&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + garmentProdSpecGarmentAndPatternComponentsDOCUMENTSV3NoPatternObjectId + '&xsl1=&format=formatDelegate&delegateName=XML&jrb=wt.query.template.reportTemplateRB&sortByIndex=6&sortOrder=asc';
    var mesResaveId = '37521907';
    var measResave2Url = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?action=ExecuteReport&gSpecId=' + objSelfReference.activeSpecId + '&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + mesResaveId + '&xsl1=&format=formatDelegate&delegateName=XML&jrb=wt.query.template.reportTemplateRB&sortByIndex=6&sortOrder=asc';
    var conResaveId = '37539860 ';
    var con2Url = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?&action=ExecuteReport&gSpecId=' + objSelfReference.activeSpecId + '&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + conResaveId + '&xsl1=&format=formatDelegate&delegateName=XML&jrb=wt.query.template.reportTemplateRB&sortByIndex=6&sortOrder=asc';
    var arrOfDocumentIndexes = [];
    /**
     *first pass here gets all product relationships 
     *changes in relationship names or type names would need to be later reflected here in the naming structure 
     *using actual text names in place of flex path type ids allows us to easier alternate between instances of PLM 
     need to replicate using that approach more
     */
    $('row', objProdLinkData).each(function (index) {
        var linkedProductType = $(this).find('linkedProductType').text();
        var objLinkedProduct = {};
        numObjectId = $(this).find('garmentProductName').first().attr('objectId');
        objLinkedProduct.name = $(this).find('linkedProductNameAtt').text();
        objLinkedProduct.objectId = $(this).find('linkedProductName').attr('objectId');
        objLinkedProduct.branchId = $(this).find('linkedProductName').attr('branchId');
        objLinkedProduct.patternNo = $(this).find('Pattern_No').text();
        objLinkedProduct.cwaySequence = $(this).find('cwaySequence').text();
        if (index == 0) {
            objSelfReference.generalAttributes = [];
            objSelfReference.generalNums = [];
            var arrOfTranslations = ['Designer', 'Product_Manager', 'HBI_Division', 'Brand', 'Construction_Method_Code', 'APS_Corp_Division', 'Imperfect_Style', 'Irregular_Style', 'Pattern_Version', 'Technical_Designer'];

            $(this).find('*').each(function () {
                var strPropName = $(this).get(0).tagName;
                var numTextLength = $(this).text().length;
                //if (strPropName.indexOf('Att') != -1 && numTextLength > 1) {
                //var strCleanedPropertyName = strPropName.replace(/_/g, ' ');
                if (arrOfTranslations.indexOf(strPropName) != -1) {
                    var strValueToUse = $(this).text();
                    //objSelfReference[strCleanedPropertyName] = strValueToUse;
                    var objToPush = {};
                    var strCleanedPropertyName = strPropName.replace(/_/g, ' ');
                    objToPush.key = strCleanedPropertyName;
                    var strValueToUse = $(this).text();
                    if (objSelfReference.displayKeys.indexOf(strValueToUse) != -1 && !(isNumber(strValueToUse) && strValueToUse.indexOf('skip') == -1)) {
                        strValueToUse = getValueDisplayFromKey(strValueToUse, objSelfReference);
                    };
                    if (strValueToUse.indexOf('skip') != -1) {
                        strValueToUse = strValueToUse.replace(/skip/g, '');
                    };
                    objToPush.value = strValueToUse;
                    objSelfReference.generalAttributes.push(objToPush);

                }
            });
        }
        if (linkedProductType == "BASIC CUT & SEW - COLORWAY") {
            objLinkedProduct.type = "Colorway Product";

            if (objLinkedProduct.name.indexOf(objLinkedProduct.cwaySequence) == -1) {
                objLinkedProduct.name = objLinkedProduct.cwaySequence + ' ' + objLinkedProduct.name;
            };

            objColorwayProduct = objLinkedProduct;
            objSelfReference.colorwayProduct = objColorwayProduct;
        } else if (linkedProductType == "BASIC CUT & SEW - PATTERN") {
            $(this).find('*').each(function () {
                var arrOfTranslationsPatternAttributes = ['']
                objLinkedProduct.type = "Pattern Product";
                objPatternProduct = objLinkedProduct;
                objSelfReference.patternProduct = objPatternProduct;
                var strPropName = $(this).get(0).tagName;
                var numTextLength = $(this).text().length;
                if (arrOfTranslationsPatternAttributes.indexOf(strPropName) != -1) {
                    var strValueToUse = $(this).text();
                    var objToPush = {};
                    var strCleanedPropertyName = strPropName.replace(/_/g, ' ');
                    objToPush.key = strCleanedPropertyName;
                    if (objSelfReference.displayKeys.indexOf(strValueToUse) != -1 && !(isNumber(strValueToUse) && strValueToUse.indexOf('skip') == -1)) {
                        strValueToUse = getValueDisplayFromKey(strValueToUse, objSelfReference);
                    };
                    objToPush.value = strValueToUse;
                    objSelfReference.generalAttributes.push(objToPush);

                };
            })
        } else if (linkedProductType == "LABEL") {
            objLinkedProduct.type = "Label Product";
            objLabelProduct = objLinkedProduct;
            objSelfReference.labelProduct = objLabelProduct;
        } else if (linkedProductType == "BASIC CUT & SEW - SELLING" || linkedProductType == "Selling") {
            if (typeof (objSelfReference.sellingProduct) == 'undefined') {
                objSelfReference.sellingProduct = [];
            }
            objLinkedProduct.type = "Selling Product";
            objSellingProduct = objLinkedProduct;
            objSelfReference.sellingProduct.push(objSellingProduct);
            console.log(objSelfReference.sellingProduct);
        }
        ;

    });
    objSelfReference.objectId = numObjectId;

    if (typeof (objSelfReference.colorwayProduct) != 'undefined') {
        objSelfReference.getColorwayBoms(strHostUrlPrefix, objSelfReference);
    }
    else {
        //$('#colorwayBomLi').fadeOut();
    };

    if (typeof (objSelfReference.labelProduct) != 'undefined') {
        var strObjectIdForParam = objSelfReference.labelProduct.objectId;
        objSelfReference.getLabelBoms(strObjectIdForParam, strHostUrlPrefix, objSelfReference);
        //get label bom
    }
    else {
        //$('#labelBomLi').fadeOut();
    };

    if (typeof (objSelfReference.patternProduct) != 'undefined') {
        objSelfReference.getMoas(strHostUrlPrefix, objSelfReference, objSelfReference.objectId + "%2C" + objSelfReference.patternProduct.objectId);
    } else {
        objSelfReference.getMoas(strHostUrlPrefix, objSelfReference, objSelfReference.objectId);

    };

    var offLineTurnOff = $('#offline').val();
    var arrNamesOfDocumentsForSvgHold = [];
    var arrSvgData = [];
    var intTimesAjaxCalled = 0;
    if (offLineTurnOff != 1) {
        var numOfDocumentRows = $('row', objDocumentData).length;
        $('row', objDocumentData).each(function (index) {
            var objRow = $(this);
            var objDocument = standardRowProcessorForDocuments(objRow);
            if (objDocument) {
                if (arrOfDocumentIndexes.indexOf(objDocument.myFullId) == -1) {
                    arrOfDocumentIndexes.push(objDocument.myFullId);
                    arrDocuments.push(objDocument);
                } else {

                };
            };
        });



    };
    arrDocuments.sort(objCompareByName);
    objSelfReference.documents = arrDocuments;
    if (objSelfReference.documents == 0 && typeof (objSelfReference.patternProduct) == 'undefined') {

        $.ajax({
            url: garmentProdSpecGarmentAndPatternComponentsDOCUMENTSV3NoPatternUrl,
            type: 'get',
            async: true,
            data: {
                gSpecId: objSelfReference.activeSpecId

            }
        }).done(function (objDocumentData) {
            $('row', objDocumentData).each(function (index) {
                var objRow = $(this);
                var objDocument = standardRowProcessorForDocuments(objRow);
                if (objDocument) {
                    if (arrOfDocumentIndexes.indexOf(objDocument.myFullId) == -1) {
                        arrOfDocumentIndexes.push(objDocument.myFullId);
                        arrDocuments.push(objDocument);
                    } else {

                    };
                };
            });
            arrDocuments.sort(objCompareByName);
            objSelfReference.documents = arrDocuments;
            objSelfReference.getAndProcessDocuments(objSelfReference);
        });


    };
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
    var strMeasTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml';
    var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
    var strCurrentEnvironment = window.location.href;
    if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
        strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
    };
    if (strCurrentEnvironment.indexOf('wsflexwebprd1v') != -1) {
        strInstance = 'net.hbi.res.wsflexappprd1v.windchill';
    };
    if (typeof (objSelfReference.measurement.branchId) == 'undefined') {
        $.get(measResave2Url, function (objMeasurementData) { }).done(function (objMeasurementData) {
            var objMeasurementComp = {};
            $('row', objMeasurementData).each(function (index) {
                if (index == 0) {
                    objSelfReference.baseSize = $(this).find('baseSize').text();
                    objSelfReference.sizeRun = $(this).find('sizeRun').text();

                    var name = $(this).find('Measurements_Name').text();
                    objMeasurementComp = {};
                    objMeasurementComp.name = name;
                    objMeasurementComp.componentType = 'Measurement';
                    objMeasurementComp.ownerType = 'Garment';
                    objMeasurementComp.fileName = "";
                    objMeasurementComp.imageUrl = "<img src='' />";
                    objMeasurementComp.branchId = $(this).find('branchIdForTaskCall').text();
                };
            });
            objSelfReference.measurement = objMeasurementComp;
            var strMeasTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/measurements/FindMeasurements.xml';
            var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
            var strCurrentEnvironment = window.location.href;
            if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
                strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
            };
            if (strCurrentEnvironment.indexOf('wsflexwebprd1v') != -1) {
                strInstance = 'net.hbi.res.wsflexappprd1v.windchill';
            };
            $.ajax({
                url: strMeasTaskUrl,
                type: 'get',
                data: {
                    oid: 'VR:com.lcs.wc.measurements.LCSMeasurements:' + objSelfReference.measurement.branchId,
                    instance: strInstance,

                },
                async: true

            }).done(function (data) {
                try {
                    objSelfReference.getMyMeasurement(strHostUrlPrefix, objSelfReference.measurement.branchId, data, objSelfReference);
                    var numHeaderCount = $(objSelfReference.measurementTableString, 'th').length;
                    createComponentTable('measurementDiv', 'measurements', objSelfReference.measurementTableString, measurementTableOptions, true);

                    if ($.fn.DataTable.isDataTable('#measurements')) {
                        var table = $('#measurements').DataTable();
                        for (var i = 0; i < table.columns().length; i++) {
                            console.log(table.columns(i).cells().data());
                        };

                    }

                    $('#measurementDiv').append('<button class="btn btn-danger" id="deleteSelectedMeasurementRows">Delete Selected Measurement Rows</button>')
                    $('#measurements tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            $(this).addClass('selected');
                        };
                    });
                    $('#deleteSelectedMeasurementRows').click(function () {
                        $('#measurements').each(function () {
                            var strAttr = $(this).attr('id');
                            var table = $('#' + strAttr).DataTable();
                            var rows = table.rows('.selected').remove().draw();

                        });
                    });

                } catch (e) {
                    console.log(e);
                    console.log("measurement not found");
                    //$('#measurementsLi').fadeOut();


                };
            });


        });
    }
    else {
        $.ajax({
            url: strMeasTaskUrl,
            type: 'get',
            data: {
                oid: 'VR:com.lcs.wc.measurements.LCSMeasurements:' + objSelfReference.measurement.branchId,
                instance: strInstance,

            },
            async: true

        }).done(function (data) {
            try {
                objSelfReference.getMyMeasurement(strHostUrlPrefix, objSelfReference.measurement.branchId, data, objSelfReference);
                var numHeaderCount = $(objSelfReference.measurementTableString).find('th').length;
                //var numHeaderCount = $(objSelfReference.measurementTableString,'th').length;
                var numOfHiddenHeaders = measurementTableOptions.columnDefs[0].targets.length;
                var numVisibleHeaders = numHeaderCount - numOfHiddenHeaders;
                var i = 0;
                var arrSecondTargetSet = [];
                while (i < numHeaderCount) {
                    arrSecondTargetSet.push(i);
                    i++;
                };
                var objSecondColumnDefs = {
                    'sortable': false,
                    'searchable': false,
                    'targets': arrSecondTargetSet
                };
                measurementTableOptions.columnDefs.push(objSecondColumnDefs);
                createComponentTable('measurementDiv', 'measurements', objSelfReference.measurementTableString, measurementTableOptions, true);
                if ($.fn.DataTable.isDataTable('#measurements')) {
                    var table = $('#measurements').DataTable().column(0).data().sort().draw();
                    for (var i = 0; i < table.columns().length; i++) {
                        console.log(table.columns(i).cells().data());
                    };

                }

                $('#measurementDiv').append('<button class="btn btn-danger" id="deleteSelectedMeasurementRows">Delete Selected Measurement Rows</button>')
                $('#measurements tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    };
                });
                $('#deleteSelectedMeasurementRows').click(function () {
                    $('#measurements').each(function () {
                        var strAttr = $(this).attr('id');
                        var table = $('#' + strAttr).DataTable();
                        var rows = table.rows('.selected').remove().draw();

                    });
                });

            } catch (e) {
                console.log(e);
                console.log("measurement not found");
                //$('#measurementsLi').fadeOut();


            };
        });
    };


    var arrOfConstructions = [];
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
        arrOfConstructions.push(objConstructionComp);
    });

    if (arrOfConstructions.length == 0) {
        $.get(con2Url, function (objConstructionData) { }).done(function (objConstructionData) {
            var arrOfConstructions = [];
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
                arrOfConstructions.push(objConstructionComp);
            });


            objSelfReference.construction = objConstructionComp;
            objSelfReference.arrayOfConstructions = arrOfConstructions;
            var conStrTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml';


            var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
            var strCurrentEnvironment = window.location.href;
            if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
                strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
            };
            if (strCurrentEnvironment.indexOf('wsflexwebprd1v') != -1) {
                strInstance = 'net.hbi.res.wsflexappprd1v.windchill';
            };
            var numNumberOfConstructions = 0;
            var arrOfDeffereds = [];
            for (var i = 0; i < objSelfReference.arrayOfConstructions.length; i++) {
                var objCurrentConstruction = objSelfReference.arrayOfConstructions[i];

                var objDeferred = $.ajax({
                    url: conStrTaskUrl,
                    type: 'get',
                    data: {
                        oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + objCurrentConstruction.branchId,

                        instance: strInstance
                    }

                });
                arrOfDeffereds.push(objDeferred);

            };
            //var numNumberOfConstructions = 0;
            $.when.apply($, arrOfDeffereds).done(function (responseData) {
                //arrConstructionDetailDataContainer = arrOfDeffereds[0];
                for (var i = 0; i < arguments.length; i++) {
                    try {
                        objSelfReference.getMyConstruction(strHostUrlPrefix, objSelfReference.arrayOfConstructions[i].branchId, arguments[i], objSelfReference, 'constructionBranchId' + objSelfReference.arrayOfConstructions[i].branchId, objSelfReference.arrayOfConstructions[i].name);

                        createComponentTable('constructionDiv', 'constructionBranchId' + objSelfReference.arrayOfConstructions[i].branchId, objSelfReference.arrayOfConstructions[i].tableString, constructionTableOptions, true);


                    } catch (e) {
                        console.log(e);
                    };
                };
            }).done(function () {
                if (!$('table.construction').length) {
                    //$('#constructionsLi').fadeOut();
                };
            });



        });
    }
    else {


        objSelfReference.construction = objConstructionComp;
        objSelfReference.arrayOfConstructions = arrOfConstructions;
        var conStrTaskUrl = strHostUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/construction/FindConstructionInfo.xml';


        var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
        var strCurrentEnvironment = window.location.href;
        if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
            strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
        };
        if (strCurrentEnvironment.indexOf('wsflexwebprd1v') != -1) {
            strInstance = 'net.hbi.res.wsflexappprd1v.windchill';
        };
        var numNumberOfConstructions = 0;
        var arrOfDeffereds = [];
        for (var i = 0; i < objSelfReference.arrayOfConstructions.length; i++) {
            var objCurrentConstruction = objSelfReference.arrayOfConstructions[i];

            var objDeferred = $.ajax({
                url: conStrTaskUrl,
                type: 'get',
                data: {
                    oid: 'VR:com.lcs.wc.construction.LCSConstructionInfo:' + objCurrentConstruction.branchId,

                    instance: strInstance
                }

            });
            arrOfDeffereds.push(objDeferred);

        };
        $.when.apply($, arrOfDeffereds).done(function (responseData) {
            for (var i = 0; i < arguments.length; i++) {
                try {
                    objSelfReference.getMyConstruction(strHostUrlPrefix, objSelfReference.arrayOfConstructions[i].branchId, arguments[i], objSelfReference, 'constructionBranchId' + objSelfReference.arrayOfConstructions[i].branchId, objSelfReference.arrayOfConstructions[i].name);

                    createComponentTable('constructionDiv', 'constructionBranchId' + objSelfReference.arrayOfConstructions[i].branchId, objSelfReference.arrayOfConstructions[i].tableString, constructionTableOptions, true);


                } catch (e) {
                    console.log(e);
                };
            };
        }).done(function () {
            if (!$('table.construction').length) {
                //$('#constructionsLi').fadeOut();
            };
        });
    };
    if ($('row', objBomData).length > 0) {
        objSelfReference.boms = standardRowProcessorForBoms(objBomData, objSelfReference);
    } else {
        $.ajax({
            url: 'http://wsflexwebprd1v/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction',
            type: 'get',
            data: {
                oid: 'OR:wt.query.template.ReportTemplate:44169912',
                action: 'ExecuteReport',
                gSpecId: objSelfReference.activeSpecId,
                garmentProductName: objSelfReference.name,
                jrb: 'wt.query.template.reportTemplateRB',
                delegateName: 'XML'

            }
        }).done(function (data) {
            objSelfReference.boms = standardRowProcessorForBoms(data, objSelfReference);
        });

    };
    var arrGarmentSourceRows = [];
    var arrOfUniqueSizes = [];
    var arrConstructionDetailDataContainer;
    var arrMeasurementDetailDataContainer;
    var strApprovedSupplierUrlObjectId = getMyReportIdFromReportName('garmentProdSpecsGarmentAndPatternComponentsApprovedSuppliers');
    var strApprovedSupplierUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?u8&action=ExecuteReport&specId=' + objSelfReference.activeSpecId + '&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + strApprovedSupplierUrlObjectId + '&xsl1=&format=formatDelegate&delegateName=XML&jrb=wt.query.template.reportTemplateRB&sortByIndex=6&sortOrder=asc';
    var arrApprovedSupplierArray = [];
    var strApprovedSupplierTableString = '';




    $.get(strApprovedSupplierUrl, function (data) {
    }).done(function (data) {
        arrApprovedSupplierArray = rowParser('row', data);
        for (var i = 0; i < arrApprovedSupplierArray.length; i++) {
            var objThisApprovedSupplier = arrApprovedSupplierArray[i];
            var dateRedSeal = objThisApprovedSupplier.Red_Seal;
            var dateGreenSeal = objThisApprovedSupplier.Green_Seal;
            //var momentRed = moment(dateRedSeal);
            //var momentGreen = moment(dateGreenSeal);
            objThisApprovedSupplier.Green_Seal = objThisApprovedSupplier.Green_Seal.substring(0, 10);
            objThisApprovedSupplier.Red_Seal = objThisApprovedSupplier.Red_Seal.substring(0, 10);
            arrApprovedSupplierArray[i] = objThisApprovedSupplier;
        };


        if (typeof (arrApprovedSupplierArray) != 'undefined' && arrApprovedSupplierArray.length != 0) {
            strApprovedSupplierTableString = convertRowArrayIntoHtmlTable(arrApprovedSupplierArray, '', '', 'approvedSupplierTbl', '<h1>Approved Suppliers</h1>');
            objSelfReference.approvedSuppliers = arrApprovedSupplierArray;
            objSelfReference.approvedSupplierTableString = strApprovedSupplierTableString;
            $('#approvedSupplierDiv').append(objSelfReference.approvedSupplierTableString);
            //$('#approvedSupplierTbl').DataTable(approvedSupplierTableOptions);
            var tblApprovedSupplier = $('#approvedSupplierTbl').DataTable(approvedSupplierTableOptions).colReorder.order([0,1,3,4,2]);
            //$('#approvedSuppliersLi').show();
        } else {
            objSelfReference.approvedSupplierTableString = '<h1>Approved Suppliers</h1><table class="display"  id="approvedSupplierTbl" ><thead><th>Supplier</th><th>Mfg Flow</th><th>Green Seal</th><th>Red Seal</th><th>Comments</th></thead><tbody><tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr></tbody></table>'
            $('#approvedSupplierDiv').append(objSelfReference.approvedSupplierTableString);
            var tblApprovedSupplier = $('#approvedSupplierTbl').DataTable(approvedSupplierTableOptions).colReorder.order([0,1,3,4,2]);

            
            //tblApprovedSupplier.colReorder.order([0,1,3,4,2]);
            //table.colReorder.order([12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13]);
            //$('#approvedSupplierDiv').append('<p>Approved Supplier table was not found.</p>')
            //$('#approvedSuppliersLi').hide();
        };
    });

};
/**
 * @memberof garmentProduct
 * @param {xmlDocumentObject} objRoutingBom xml docuement content containing data for routing bom
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 * */
garmentProduct.prototype.getAndProcessMyRoutingBOM = function (objRoutingBom, objSelfReference) {
    console.log('routing bom is');
    console.log(objRoutingBom);
    var strFullBranchParameter = 'VR:com.lcs.wc.flexbom.FlexBOMPart:' + objRoutingBom.branchId;
    var arrOfRoutingRows = [];
    $.ajax({
        url: 'http://wsflexwebprd1v/Windchill/servlet/IE/tasks/com/lcs/wc/flexbom/FindFlexBOM.xml',
        type: 'get',
        data: {
            instance: 'net.hbi.res.wsflexappprd1v.windchill',
            skuMode: 'ALL_SKUS',
            partId: strFullBranchParameter


        }
    }).done(function (data) {
        var wcCollection = $(data).first();
        arrOfInstances = $(wcCollection).find('branchId').parent();
        var strTableString = '<table id="routing" class="display"><thead><tr><th>Comments</th><th>Manf Style</th><th>Knit</th><th>BL DY Finish</th><th>Cut Plant</th><th>Primary</th><th>Sew</th><th>Routing</th><th>Label Type</th></tr></thead><tbody>'
        $(arrOfInstances).each(function () {
            var objRoutingRow = {};
            var strTrBegin = '<tr>'
            var strTdBegin = '<td>'
            var strTrEnd = '</tr>'
            var strTdEnd = '</td>'
            strTableString += strTrBegin;
            objRoutingRow.comments_override = $(this).find('partName').text();
            strTableString += strTdBegin + objRoutingRow.comments_override + strTdEnd;
            //was changed to an object reference
            objRoutingRow.manfStyle = $(this).find('partNameNewDisplay').text();
            //was changed to an object reference
            strTableString += strTdBegin + objRoutingRow.manfStyle + strTdEnd;
            objRoutingRow.knit = $(this).find('hbiknitDisplay').text();
            strTableString += strTdBegin + objRoutingRow.knit + strTdEnd;
            objRoutingRow.bldy = $(this).find('hbiBLDYFinishDisplay').text();
            strTableString += strTdBegin + objRoutingRow.bldy + strTdEnd;
            objRoutingRow.cut = $(this).find('hbiRoutingCutPlantDisplay').text();
            strTableString += strTdBegin + objRoutingRow.cut + strTdEnd;
            objRoutingRow.primary = $(this).find('hbiPrimary').text().toUpperCase();
            strTableString += strTdBegin + objRoutingRow.primary + strTdEnd;
            objRoutingRow.sew = $(this).find('hbiRoutingSewDisplay').text();
            strTableString += strTdBegin + objRoutingRow.sew + strTdEnd;
            objRoutingRow.routing = $(this).find('hbiRouting').text();
            objRoutingRow.routing = objRoutingRow.routing.replace('hbi', '');
            strTableString += strTdBegin + objRoutingRow.routing + strTdEnd;
            objRoutingRow.labelDirection = $(this).find('hbiRoutingComments').text();
            strTableString += strTdBegin + objRoutingRow.labelDirection + strTdEnd;
            strTableString += strTrEnd;
            arrOfRoutingRows.push(objRoutingRow);
        });
        strTableString += '</tbody></table>';
        objSelfReference.routingRows = arrOfRoutingRows;
        $('#routingBomDiv').append(strTableString);
        $('#routing').DataTable(routingBomTableOptions);
        console.log(arrOfRoutingRows);
    });

};

/**
 * @memberof garmentProduct
 * @comment this method runs a sequence of ajax calls to get all necessary data sets for running @method getSpecComponentsForActiveSpec, then it sequentially calls them
 * @param {String} strHostUrlPrefix string denoting the initial characters of the url for the domain in which the measurement sits.  All string prior to Windchill.
 * @param {Object} strSpecId objectId of active LCSFlexSpecification
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getAllMyDataForMyActiveSpec = function (strHostUrlPrefix, strSpecId, objSelfReference) {
    $('#spin').show();
    function doSomething() {
        if ($.active == 0) {
            $('#spin').hide();
            saveDataOfAllTables();
            clearInterval(IntervalId);
        };
    }
    var IntervalId = setInterval(doSomething, 200); // Time in milliseconds


    if (typeof (strSpecId) == 'undefined')// How can I stop working of function here?
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
    var strPatternSewAndBomUsageUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?specId=' + strSpecId + '+&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12076562&action=ExecuteReport';
    //add rest here.

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
    /*var arrGarSewBomData = $.ajax({
        url: strGarmentSewAndSourceBomUrls,
        type: 'get'
    });
    var arrPatSewBomData = $.ajax({
        url: strPatternSewAndBomUsageUrl,
        type: 'get'
    });*/

    var objDocData = {};
    var objConData = {};
    var objMeasData = {};
    var objBomData = {};
    var objProdLinkData = {};
    var obGarSewBomData = {};
    var objPatSewBomData = {};
    $.when(arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData/*, arrGarSewBomData, arrPatSewBomData*/).done(function (arrDocumentData, arrConstructionData, arrMeasData, arrBomData, arrProdLinkData/*, arrGarSewBomData, arrPatSewBomData*/) {
        objDocData = arrDocumentData[0];
        objConData = arrConstructionData[0];
        objMeasData = arrMeasData[0];
        objBomData = arrBomData[0];
        objProdLinkData = arrProdLinkData[0];
        /*obGarSewBomData = arrGarSewBomData[0];
        objPatSewBomData = arrPatSewBomData[0];*/
        //console.log(objDocData, objConData, objMeasData, objBomData, arrProdLinkData);
        objSelfReference.getSpecComponentsForActiveSpec(strHostUrlPrefix, objDocData, objConData, objMeasData, objBomData, objProdLinkData, /*obGarSewBomData, objPatSewBomData,*/ objSelfReference);
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
 * @param {Object} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.thenCallSpecs = function (objectForCallback, objSelfReference) {
    objSelfReference.specs = objectForCallback.arrSpecArray
    objSelfReference.sources = objectForCallback.arrSourceArray
    objSelfReference.seasonSourceSpecCombos = objectForCallback.arrCombinationArray
    objSelfReference.activeSpecId = objectForCallback.activeSpecId;
    objSelfReference.activeSpecName = objectForCallback.activeSpecName;
    objSelfReference.activeSource = objectForCallback.activeSource;
    objSelfReference.constructionMethodCode = objectForCallback.constructionMethodCode;
    objSelfReference.patternSpec = objectForCallback.patternSpec;
    objSelfReference.name = objectForCallback.gProdName;
    objSelfReference.parentSpec = objectForCallback.parentSpec;
    objSelfReference.getAllMyDataForMyActiveSpec(strUrlPrefix, objSelfReference.activeSpecId, objSelfReference);

};
/**
 * @memberof garmentProduct
 * @comment this method runs to determine, based on available spec components in the objSelfReference, what are the available report sets that
 * could be used.  Currently it is only invoked as a callback.
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getAndProcessDocuments = function (objSelfReference) {
    try {
        if (typeof (objSelfReference.documents != 'undefined')) {
            var arrdocs = objSelfReference.documents;
            if (typeof (arrdocs) != 'undefined') {

                arrWhenDeferredArray = [];
                arrDataArray = [];
                numIndexerForArray = 0;
                for (i = 0; i < arrdocs.length; i++) {
                    if (i == 0) {
                        for (x = 0; x < arrdocs.length; x++) {
                            if (x == 0) {
                                //$('#imagesDiv').append('<h1>Documents</h1>')
                            };

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
                        height: arrdocs[i].height,
                        frontBack: arrdocs[i].frontBack
                    });
                    arrWhenDeferredArray.push($.ajax({
                        type: "GET",
                        url: strSrcUrl,
                        data: {
                            header: strHeaderName,
                            myDivId: strDivIdToUse,
                            masterId: strMyMasterId
                        }
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
                        //$('#' + myDivId).append(objNewImageToAdd);

                        $('#' + myDivId).append('<h3 class="col-md-offset-1 col-md-11 row">' + decodeURIComponent(objImgMeta.name) + '</h3>');
                        $('#' + myDivId).append(objNewImageToAdd);
                        $('#' + myDivId + 'img').addClass('col-md-offset-4 col-md-6');
                        $('#' + myDivId + 'img').addClass('img-responsive');
                        $('#' + myDivId + 'img').addClass(objImgMeta.pageType);
                        $('#' + myDivId + 'img').addClass(objImgMeta.frontBack);
                        // row per image from the below
                        $('#' + myDivId + 'img').addClass('row');
                        //and centers it
                        $('#' + myDivId + 'img').addClass('center-block');
                        $('#' + myDivId + 'img').addClass('documentImage');
                        //$('#' + myDivId + 'img').attr('numWidth', objNewImageToAdd.width);
                        //$('#' + myDivId + 'img').attr('numHeight', objNewImageToAdd.height);

                    };

                }).done(function () {
                    //I swear you had something here iterating through the above 2 arrays in sequence...
                    var arrHeaderImages = [];
                    //checkForColorwayAndLabelProductsToRemoveBoms(currentGarmentProduct);
                    //this function was deleted since it was doing nothing
                    var backWidth = 900000;
                    var frontWidth = 900000;
                    var backHeight = 900000;
                    var frontHeight = 900000;
                    $('img').each(function () {
                        var urlToUse = $(this).attr('src');

                        var strParentDiv = '#' + $(this).parent().attr('id');
                        getDataUri(urlToUse, function (dataUri) {
                            var strDataImagePrefix = 'data:image/png;base64,';
                            var strFullDataUri = strDataImagePrefix + dataUri;
                            var target = $(strParentDiv).find('img');
                            var targetParent = target.parent();
                            target.attr('src', strFullDataUri);

                            if (target.hasClass('frontSketch')) {
                                if ($("#frontSketch").length) {

                                } else {
                                    $('#frontBackImages').append('<div id="frontSketch" class="col-md-6 col-sm-6 col-lg-6 col-xs-6"><div id="frontSketchFront"></div><div id="frontSketchBack"></div></div>');
                                    if (typeof (currentGarmentProduct.generalAttributes) == 'undefined' || !currentGarmentProduct.generalAttributes.length) {

                                    } else {
                                        var strGenAttributesId = 'generalAttributes';
                                        var strGenAttributesId2 = 'generalAttributes2';
                                        var strGeneralAttributesTableString = "<div id='gattributeHolder' class='col-md-3 col-sm-3 col-lg-3 col-xs-3'><table class='display' id='" + strGenAttributesId + "'><thead><tr><th> </th><th>  </th></tr></thead><tbody>"
                                        var strGeneralAttributesTableString2 = "<div id='gattributeHolder' class='col-md-3 col-sm-3 col-lg-3 col-xs-3'><table class='display' id='" + strGenAttributesId2 + "'><thead><tr><th> </th><th>  </th></tr></thead><tbody>"
                                        var objToPush1 = {};
                                        objToPush1.key = 'Construction Method Code'
                                        objToPush1.value = currentGarmentProduct.constructionMethodCode;
                                        var objToPush2 = {};
                                        objToPush2.key = 'Pattern Spec'
                                        objToPush2.value = currentGarmentProduct.patternSpec;
                                        //currentGarmentProduct.generalAttributes.push(objToPush1, objToPush2);
                                        // removed pattern spec above from the push per Wendy
                                        currentGarmentProduct.generalAttributes.push(objToPush1);
                                        for (var i = 0; i < currentGarmentProduct.generalAttributes.length; i++) {

                                            var strValue = currentGarmentProduct.generalAttributes[i].value;
                                            var strKey = currentGarmentProduct.generalAttributes[i].key;
                                            if (i <= 3) {
                                                strGeneralAttributesTableString += '<tr><td><label>' + strKey + '</label></td><td>' + strValue + '</td></tr>';
                                            }
                                            else {
                                                strGeneralAttributesTableString2 += '<tr><td><label>' + strKey + '</label></td><td>' + strValue + '</td></tr>';
                                            }
                                            //$('#frontBackImages').append('<tr><td><label> ' + strKey + ' </label></td><td>' + '<p>' + strValue + '<p></td></tr>');
                                        };

                                        strGeneralAttributesTableString += '</tbody></table></div>';
                                        strGeneralAttributesTableString2 += '</tbody></table></div>';
                                        $('#frontBackImages').append(strGeneralAttributesTableString);

                                        if (!$.fn.DataTable.isDataTable('#generalAttributes')) {
                                            $('#generalAttributes').DataTable({
                                                'dom': 't'
                                            });
                                        };
                                        if (currentGarmentProduct.generalAttributes.length > 3) {
                                            $('#frontBackImages').prepend(strGeneralAttributesTableString2);

                                            if (!$.fn.DataTable.isDataTable('#generalAttributes2')) {
                                                $('#generalAttributes2').DataTable({
                                                    'dom': 't'
                                                });
                                            };
                                        }
                                    };

                                };
                                
                                if (target.hasClass('backImage')) {
                                    targetParent.find('h3').remove();
                                    target.addClass('img-Thumbnail img-responsive');
                                    target.detach().prependTo('#frontSketchBack');
                                };
                                if (target.hasClass('frontImage')) {
                                    targetParent.find('h3').remove();
                                    target.addClass('img-Thumbnail img-responsive');
                                    target.detach().prependTo('#frontSketchFront');
                                };

                            } else if (target.hasClass('measurements')) {
                                //console.log('dat Meas!');
                                if ($("#measurementImagesSubDiv").length) {

                                } else {
                                    $('#measurementImages').append('<div id="measurementImagesSubDiv" class="col-md-12"><h1 class="col-md-12">Measurement Images</h1></div>');
                                };
                                target.addClass('img-rounded');
                                targetParent.detach().appendTo('#measurementImagesSubDiv');

                            } else if (target.hasClass('markerLayout')) {
                                //console.log('dat Meas!');
                                if ($("#markerLayoutImagesSubDiv").length) {

                                } else {
                                    $('#markerLayoutImages').append('<div id="markerLayoutImagesSubDiv" class="col-md-12"><h1 class="col-md-12">Marker Layout Images</h1></div>');
                                };
                                target.addClass('img-rounded');
                                targetParent.detach().appendTo('#markerLayoutImagesSubDiv');

                            } else if (target.hasClass('placementDetails')) {
                                //console.log('dat Meas!');
                                if ($("#placementImagesSubDiv").length) {

                                } else {
                                    $('#placementImages').append('<div id="placementImagesSubDiv" class="col-md-12"><h1 class="col-md-12">Placement Images</h1></div>');
                                };
                                target.addClass('img-rounded');
                                targetParent.detach().appendTo('#placementImagesSubDiv');

                                //} else if (target.hasClass('constructionDetails')) {
                            } else if (target.hasClass('construction')) {
                                //console.log('dat Meas!');
                                if ($("#constructionImagesSubDiv").length) {

                                } else {
                                    $('#constructionDetailsImages').append('<div id="constructionImagesSubDiv" class="col-md-12"><h1 class="col-md-12">Construction Detail Images</h1></div>');
                                };
                                target.addClass('img-rounded');
                                targetParent.detach().appendTo('#constructionImagesSubDiv');

                            } else {
                                if ($("#developmentImagesSubDiv").length) {

                                } else {
                                    $('#developmentImages').append('<div id="developmentImagesSubDiv" class="col-md-12"><h1 class="col-md-12">Development Images</h1></div>');
                                };
                                target.addClass('img-rounded');
                                targetParent.detach().appendTo('#developmentImagesSubDiv');

                            }
                            ;

                        });
                    });
                    //$('#imagesDiv *').remove();
                    /*var arrOfWidths = [];
                    var arrOfHeights = [];
                    $('img.frontImage').load(function () {
                        var myWidth = this.width;
                        var myHeight = this.height;
                       if($('img.backImage').length){
                            var yourWidth = $('img.backImage').width();
                            var yourHeight = $('img.backImage').height();
                            var maxWidth = Math.min(myWidth,yourWidth);
                            var maxHeight = Math.min(myHeight,yourHeight);
                            this.height = maxHeight;
                            this.width = maxWidth;
                            $('img.backImage').width(maxWidth);
                            $('img.backImage').height(maxHeight);
                       };
                    });
                    $('img.backImage').load(function () {
                        var myWidth = this.width;
                        var myHeight = this.height;
                       if($('img.frontImage').length){
                            var yourWidth = $('img.frontImage').width();
                            var yourHeight = $('img.frontImage').height();
                            var maxWidth = Math.min(myWidth,yourWidth);
                            var maxHeight = Math.min(myHeight,yourHeight);
                            this.height = maxHeight;
                            this.width = maxWidth;
                            $('img.frontImage').width(maxWidth);
                            $('img.frontImage').height(maxHeight);

                       };
                    });
                    var aFart;*/
                    $('.frontSketch').each(function () {
                        // use this to move over
                        //$(this).detach().appendTo('#frontSketch');
                        //use this to copy to
                        //$(this).appendTo('#frontSketch');

                    });

                }).done(function(){
                    
                    
                });

            };

        };
    } catch (e) {
        console.log(e);
    };
};
/**
 * @memberof garmentProduct
 * @comment  this method runs as a callback to generate available chunks of the report 
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.generateAvailableReportsList = function (objSelfReference) {
    $('#reportsHeader *').remove();
    $('#reportsHeader').append('<table cellpadding="0" cellspacing="0" border="0" class="display compact cell-border" id="reports"><thead><th>Sort Order</th><th>Report</th><th>Name</th></thead><tbody></tbody></table>');
    var reportTable = $('#reports').DataTable(reportsTableOptions);
    // later will need to add here a few documents that we want to exclude intentionally
    // like front back images that come from pattern products
    var sortOrder = 0;
    /*if (typeof (objSelfReference.construction.name) != 'undefined') {
        reportTable.row.add([sortOrder, '<a href="#" id="getConstructionReport">Construction</a>', objSelfReference.construction.name]);
        sortOrder++;
    };
    if (typeof (objSelfReference.measurement.name) != 'undefined') {
        reportTable.row.add([sortOrder, '<a href="#" id="getMeasurementReport">Measurements</a>', objSelfReference.measurement.name]);
        sortOrder++;
    };*/
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
        } else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimStraight) {
            strBlockWeightBomScenario = 'Spread and Trim Straight';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        } else if (boolHaveGarmentCut && boolHavePatternSpread && boolHavePatternTrimBias) {
            strBlockWeightBomScenario = 'Spread and Trim Bias';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        } else if (boolHaveGarmentCut && boolHavePatternSpread) {
            strBlockWeightBomScenario = 'Spread, Trim Straight and Trim Bias';
            reportTable.row.add([sortOrder, '<a href="#" class="blockWeights" id="generateBlockWeights">Block Weights Report</a>', strBlockWeightBomScenario]);
            sortOrder++;
        } else {
        }
        ;

    };
    /*var getAndProcessDocuments = function (objSelfReference) {
      
}*/
    objSelfReference.getAndProcessDocuments(objSelfReference);
    //getAndProcessDocuments(objSelfReference);
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

/**
 * @memberof garmentProduct 
 * @comment used to obtain the display values for different attribute value lists from PLM
 * @comment  this method runs as a callback to generate available chunks of the report 
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getMyValueLists = function (strUrlPrefix, arrListIds, objSelfReference) {
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=2381876%2C102771%2C2381693&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport
    var strUrl1 = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?attValueListId=';
    //var strUrl2 = '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10596321&action=ExecuteReport';
    var strUrl2 = '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A' + getMyReportIdFromReportName(garmentProdSpecsAndSuchAttributeValueListCall) + '&action=ExecuteReport';
    var strInStringForQuery = '';
    objSelfReference.displayValues = [];
    objSelfReference.displayKeys = [];
    for (var i = 0; i < arrListIds.length; i++) {
        if (i != arrListIds.length - 1) {
            strInStringForQuery += arrListIds[i] + "%2C";
        } else {
            strInStringForQuery += arrListIds[i];
        }
    };
    var strFullUrl = strUrl1 + strInStringForQuery + strUrl2;
    var strFullurl2 = 'http://wsflexwebprd1v/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction';
    /*$.get(strFullUrl, function (data) {
    }).done(function (data) {
        $('row', data).each(function () {
            objSelfReference.displayValues.push($(this).find('Display').text());
            objSelfReference.displayKeys.push($(this).find('Value_Key').text());

        });
        //console.log(objSelfReference.displayValues, objSelfReference.displayKeys);
    });*/
    $.ajax({
        url: strFullurl2,
        type: 'GET',
        data: {
            //oid: strColors,
            attValueListId: arrListIds.toString(),
            oid: 'OR:wt.query.template.ReportTemplate:10596321',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        },
        xhrFields: {
            withCredentials: true
        }
    }).done(function (data) {
        $('row', data).each(function () {
            objSelfReference.displayValues.push($(this).find('Display').text());
            objSelfReference.displayKeys.push($(this).find('Value_Key').text());
        });
    });



};
/**
 * @memberof garmentProduct 
 * @comment used to obtain spread blockweights spread, this method is DEPRECATED
 * @comment  this method runs as a callback to generate available chunks of the report 
 * @param {string} strUrlPrefix present base domain
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
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
        $.get(fullSpreadUrl, function (data) {
        }).done(function (data) {
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
    } else {
        if ($('#spreadReport').length) {
            spreadBomTableOptions.data = objSelfReference.blockWeightSpread;
            $('#blockWeightSpreadDiv').append(strSpreadLocalHeaderStringEmptyBody);
            $('#spreadReport').DataTable(spreadBomTableOptions);
        };
    };
};
/**
 * @memberof garmentProduct 
 * @comment used to obtain spread blockweights trim, this method is DEPRECATED
 * @comment  this method runs as a callback to generate available chunks of the report 
 * @param {string} strUrlPrefix present base domain
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
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
        $.get(fullReportString, function (result) {
        }).done(function (result) {
            $('row', result).each(function () {
                var objRow = {};
                //objRow.
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
    } else {
        if ($('#trimReport').length) {
            $('#blockWeightTrimDiv').append(strLocalHeaderStringEmptyBody);
            trimBomTableOptions.data = objSelfReference.blockWeightTrim
            $('#trimReport').DataTable(trimBomTableOptions);
        };
    };
};
/**
 * @memberof garmentProduct 
 * @comment used to obtain save garment file as a local json object
 * @comment  this method runs as a callback to generate available chunks of the report 
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.saveMe = function (objSelfReference) {
    var garmentProductString = JSON.stringify(objSelfReference);
    fs.writeFile(objSelfReference.name + '.json', garmentProductString, function (err) {
        if (err)
            throw err;
        alert('saved ' + objSelfReference.name);
    });
};

/** original method used to get colorway BOMs, I believe this is deprecated and not used in favor of the findFlexBOM method
 * @memberof garmentProduct 
 * @param {string} strUrlPrefix present base domain
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getColorwayBoms = function (strUrlPrefix, objSelfReference) {
    objSelfReference.colorwayProduct.boms = [];
    var strBeginUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction'//objectId=<param>&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A10734353&action=ExecuteReport';
    var strTrimCwayBomString = '<h2>Colorway BOM</h2><table id="colorwayReport" class="display responsive col-md-12 compact cell-border"><thead><tr>';
    //<th>Part Name</th><th>Desc</th><th>Garment Use</th><th>Material</th>';</tr></thead><tbody>';
    var strTrimCwaysTableString = '<h1>Colorways</h1><h2>Colorways by Group</h2> <button id="swapSwatch">Show Swatches</button><table id="colorwaysListTable" class="display responsive col-md-12 compact cell-border"><thead><tr><th>Colorway Group</th><th>Colorway Name</th></tr></thead><tbody>';
    var strOidPrefix = 'OR:wt.query.template.ReportTemplate:';
    var strSkuOidUrl = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayBoms);
    var strBranchOidUrl = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayBomsV2AllColors);
    var strDefColorways = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAndColorwayColorways);
    var strDefAllGarmentMaterials = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecGarmentAllBomMaterials);
    var strDefgarmentProdSpecBomsOfColorwayProduct = strOidPrefix + getMyReportIdFromReportName(garmentProdSpecBomsOfColorwayProduct);
    var arrMaterialsToGet = [];
    var arrColumns = ['Grouping', 'Part Name', 'Garment Use', 'Material'];
    var arrColorwayObjects = [];
    var arrGroupings = [];
    var objDefferedAllGarmentMaterials = $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            specId: objSelfReference.activeSpecId,
            oid: strDefAllGarmentMaterials,
            //oid: 'OR:wt.query.template.ReportTemplate:11146551',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    }).done(function (dataGarmentMaterials) {
        console.log('\n begin material data from garment proudct \n' + dataGarmentMaterials);
        //material parsing from garment goes here
        var arrOfJustMaterialsMaterialNames = [];
        var arrOfGarmentUsePlusMaterial = [];
        var arrOfJustMaterialBranchIdsFromGarment = [];
        var arrOfJustMaterialMasterIdsFromGarment = [];
        var arrOfJustMaterialObjectIdsFromGarment = [];
        var arrOfComboStrings = [];
        var arrOfJustMaterialNamesPlusGarmentUse = [];
        $('row', dataGarmentMaterials).each(function (index) {
            //later get alternates from this too
            var objMaterialWithGarmentUse = {};
            var numMaterialObjectId = $(this).find('Garment_Product_Child_Material').attr('objectId');
            var numMaterialBranchId = $(this).find('Garment_Product_Child_Material').attr('branchId');
            var numMaterialMasterId = $(this).find('childMasterId').text();
            var strMaterialName = $(this).find('Material').text();
            var strGarmentUse =  $(this).find('garmentUseId').text();
            var strGarmentUseSew =  $(this).find('garmentUseIdnum__').text();
            var strGarmentUseCut =  $(this).find('garmentUseIdnum__1').text();
            var strGarmentUseSourced =  $(this).find('garmentUseIdnum_').text();
            var strBomTypeDisplay =   $(this).find('bomTypeDisplay').text();
            if(strBomTypeDisplay.includes('2374344')){
                strGarmentUse = strGarmentUseSew;
            }else if(strBomTypeDisplay.includes('2373681')){
                strGarmentUse = strGarmentUseCut;
            }else if(strBomTypeDisplay.includes('16700041')){
                strGarmentUse = strGarmentUseSourced;
            }else{
                console.log('bom type not found for combo strings.');
            };

            var numGarmentCheck = Number(strGarmentUse);
            var strComboString = strMaterialName + '_' + strGarmentUse;
            objMaterialWithGarmentUse.name = strMaterialName;
            objMaterialWithGarmentUse.garmentUseId = strGarmentUse;

            //if (arrOfComboStrings.indexOf(strComboString) == -1 && numGarmentCheck != 0) {
            //excluding 0 for numCheck makes blank garment uses not work which may be desired 
            if (arrOfComboStrings.indexOf(strComboString) == -1) {
                arrOfComboStrings.push(strComboString);
                arrOfJustMaterialNamesPlusGarmentUse.push(objMaterialWithGarmentUse);
            };
            if (arrOfJustMaterialObjectIdsFromGarment.indexOf(numMaterialObjectId) == -1) {
                arrOfJustMaterialObjectIdsFromGarment.push(numMaterialObjectId);
            };
            if (arrOfJustMaterialBranchIdsFromGarment.indexOf(numMaterialBranchId) == -1) {
                arrOfJustMaterialBranchIdsFromGarment.push(numMaterialBranchId);
            };
            if (arrOfJustMaterialsMaterialNames.indexOf(strMaterialName) == -1) {
                arrOfJustMaterialsMaterialNames.push(strMaterialName);
            };
            if (arrOfJustMaterialMasterIdsFromGarment.indexOf(numMaterialMasterId) == -1) {
                arrOfJustMaterialMasterIdsFromGarment.push(numMaterialMasterId);
            };
            /*if(arrOfJustMaterialNamesPlusGarmentUse.indexOf(objMaterialWithGarmentUse) == -1){
                arrOfJustMaterialNamesPlusGarmentUse.push(objMaterialWithGarmentUse);
        }*/


        });
        objSelfReference.arrOfJustMaterialsMaterialNames = arrOfJustMaterialsMaterialNames;
        objSelfReference.arrOfJustMaterialBranchIdsFromGarment = arrOfJustMaterialBranchIdsFromGarment;
        objSelfReference.arrOfJustMaterialMasterIdsFromGarment = arrOfJustMaterialMasterIdsFromGarment;
        objSelfReference.arrOfJustMaterialNamesPlusGarmentUse = arrOfJustMaterialNamesPlusGarmentUse;
        objSelfReference.arrOfComboStrings = arrOfComboStrings;

        $.ajax({
            url: strBeginUrl,
            type: 'get',
            data: {
                objectId: objSelfReference.colorwayProduct.objectId,
                oid: strDefColorways,
                //oid: 'OR:wt.query.template.ReportTemplate:10777566',
                format: 'formatDelegate',
                xsl2: '',
                xsl2: '',
                delegateName: 'XML',
                action: 'ExecuteReport'
            }
        }).done(function (dataLocalColorways) {
            //begin processing the colorways of the colorway product
            
            $('row', dataLocalColorways).each(function (index) {
                var objRow = {};
                objRow.cwayGrouping = $(this).find('cwayGroupDescription').text();
                objRow.specName = $(this).find('specName').text();
                objRow.colorwayName = $(this).find('Colorway_Name').text();
                objRow.Sku_ARev_Id = $(this).find('Sku_ARev_Id').text();
                objRow.skuBranchId = $(this).find('skuBranchId').text();
                objRow.skuObjectId = $(this).find('skuObjectId').text();
                objRow.scMasterId = $(this).find('scMasterId_branchSourceToSeaonLink').text();
                objRow.skuMasterId = $(this).find('skuMasterId').text();
                objRow.parentProductArevId = $(this).find('Product_ARev_Id').text();
                objRow.parentProductObjectId = $(this).find('Colorway_Product_Name_Link').attr('objectId');
                objRow.parentProductName = $(this).find('Colorway_Product_Name_Link').text();
                objRow.parentProductBranchId = $(this).find('Colorway_Product_Name_Link').attr('branchId');
                strTrimCwaysTableString += '<tr>' + '<td>' + objRow.specName + '</td>' + '<td>' + objRow.colorwayName + '</td>' + '</tr>'
                arrColumns.push(objRow.colorwayName);
                arrColorwayObjects.push(objRow);
                if (arrGroupings.indexOf(objRow.cwayGrouping) == -1) {
                    arrGroupings.push(objRow.cwayGrouping);
                    //arrGroupingsTableStrings.push(initCwayString0 + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + initCwayString0_5 + objRow.specName.replace(/\//g, "-").replace(/:/g, " ").replace(/&/g, "and") + initCwayString1 + objRow.specName.replace(/\s/g, "_").replace(/:/g, "").replace(/\//g, "_").replace(/&/g, "_") + initCwayString2 + '<th id="SKU_' + objRow.Sku_ARev_Id + '_Spec_' + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + '">' + objRow.colorwayName + '</th>');
                } else {
                    var numActualIndex = arrGroupings.indexOf(objRow.cwayGrouping);
                    //arrGroupingsTableStrings[numActualIndex] = arrGroupingsTableStrings[numActualIndex] + '<th id="SKU_' + objRow.Sku_ARev_Id + '_Spec_' + objRow.specName.replace(/\s/g, "_").replace(/:/g, "") + '">' + objRow.colorwayName + '</th>';
                };
            });
            if (typeof (objSelfReference.colorwayProduct) != 'undefined') {
                objSelfReference.colorwayProduct.colorways = arrColorwayObjects;
            };


            //end processing the colorways of the colorway product
            //begin individual colorway boms
            $.ajax({
                url: strBeginUrl,
                type: 'get',
                data: {
                    objectId: objSelfReference.colorwayProduct.objectId,
                    oid: strDefgarmentProdSpecBomsOfColorwayProduct,
                    //oid: 'OR:wt.query.template.ReportTemplate:10777566',
                    format: 'formatDelegate',
                    xsl2: '',
                    xsl2: '',
                    delegateName: 'XML',
                    action: 'ExecuteReport'
                }
            }).done(function (cBomData) {
                console.log('\n data from colorway boms \n');

                //did the code for sorting but had a bug, not yet
                //var arrOfCBoms = [];
                $('row', cBomData).each(function () {
                    var numActualBranch = $(this).find('com_lcs_wc_flexbom_FlexBOMPart').attr('branchId');
                    var numScMasterIdForIngoEngineCall = $(this).find('scMasterId_branchIdSourceToSeason').text();
                    var sourceName = $(this).find('bomname').text();
                    var strBomName = $(this).find('sourcingConfigAttOne').text();
                    var strFullPartString = numActualBranch;
                    /*var cWayObject = {};
                    cWayObject.numActualBranch = $(this).find('com_lcs_wc_flexbom_FlexBOMPart').attr('branchId');
                    cWayObject.numScMasterIdForIngoEngineCall = $(this).find('scMasterId_branchIdSourceToSeason').text();
                    cWayObject.sourceName = $(this).find('bomname').text();
                    cWayObject.strBomName = $(this).find('sourcingConfigAttOne').text();
                    cWayObject.name = cWayObject.strBomName;
                    cWayObject.strFullPartString = numActualBranch;
                    arrOfCBoms.push(cWayObject);
                    */
                    console.log(strFullPartString);
                    numOfTotalBoms++;
                    constructOneColorwayBom(strUrlPrefix, strFullPartString, strBomName, sourceName, numScMasterIdForIngoEngineCall, objSelfReference);
                    
                });

                /*function sortArrOfCBomsByName(a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                };
                arrOfCBoms.sort(sortArrOfCBomsByName);
                for(var i = 0; i < arrOfCBoms.length;i++){
                    var cWayObjectInstance = arrOfCBoms[i];
                    //cWayObjectInstance.
                    constructOneColorwayBom(cWayObjectInstance.strUrlPrefix, cWayObjectInstance.strFullPartString, cWayObjectInstance.strBomName, cWayObjectInstance.sourceName, cWayObjectInstance.numScMasterIdForIngoEngineCall, objSelfReference);
                }*/



                //begin reading each bom from colorway product here


            }); //end close individual colorway Boms


        });//end cclose of single colorways


    })


};
/** original method used to get Label BOMs.  Does not filter down the label BOMs just grabs all BOMs on the label product.
 * @memberof garmentProduct 
 * @param {number} labelProductObjectId oid of the linked Label Product
 * @param {string} strUrlPrefix present base domain
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
garmentProduct.prototype.getLabelBoms = function (labelProductObjectId, strUrlPrefix, objSelfReference) {
    //WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=1217726+&format=formatDelegate&delegateName=HTMLWithSorting&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport
    //http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=1217726&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport
    var strGetUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?objectId=' + labelProductObjectId + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11057483&action=ExecuteReport';
    var arrLabelData = [];
    $.get(strGetUrl, function (data) {
    }).done(function (data) {
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
/** original method used to get Moas owned by the product, also performs logic around display and keeping certain rows based on spec
 * @memberof garmentProduct 
 * @param {string} strUrlPrefix present base domain
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 * @param {array} objectIdsToPass an array of the ids of the owning attributes of the moas.  Identifies which to pull and which to not pull
 */
garmentProduct.prototype.getMoas = function (strUrlPrefix, objSelfReference, objectIdsToPass) {
    var strUrlToCall = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?prodIds=' + objectIdsToPass + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11138313&action=ExecuteReport'
    var strRevisionIdsToget = '';
    var strUserIdsToGet = '';
    $.get(strUrlToCall, function (data) {
    }).done(function (data) {
        var arrMoaData = rowParser('row', data);
        objSelfReference.moaArray = arrMoaData;
        var arrOfRevIds = [];
        var arrOfUserIds = [];
        for (var i = 0; i < objSelfReference.moaArray.length; i++) {
            var objThisLoopObject = objSelfReference.moaArray[i];
            if (objThisLoopObject.Rev_one != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_one;
                arrOfRevIds.push(objThisLoopObject.Rev_one);
            };
            if (objThisLoopObject.Rev_two != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_two;
                arrOfRevIds.push(objThisLoopObject.Rev_two);
            };
            if (objThisLoopObject.Rev_three != '0') {
                strRevisionIdsToget += ',' + objThisLoopObject.Rev_three;
                arrOfRevIds.push(objThisLoopObject.Rev_three);
            };
            if (objThisLoopObject.Last_Edited_By != '0' && typeof (objThisLoopObject.Last_Edited_By) != 'undefined') {
                strUserIdsToGet += ',' + objThisLoopObject.Last_Edited_By;
                arrOfUserIds.push(objThisLoopObject.Last_Edited_By);
            };

            objThisLoopObject.Spec = objThisLoopObject.Spec.replace(/hbi/g, "");
            if (objThisLoopObject.Last_Modified.length > 10) {
                objThisLoopObject.Last_Modified = objThisLoopObject.Last_Modified.substring(0, 10);
            };
            if (objThisLoopObject.Product_Type.includes('1157890')) {
                objThisLoopObject.Product_Type = "Garment";
            } else if (objThisLoopObject.Product_Type.includes('2377400')) {
                objThisLoopObject.Product_Type = "Pattern";
            }
            ;

        };
        strRevisionIdsToget = arrOfRevIds.toString();
        strUserIdsToGet = arrOfUserIds.toString();

        var strUrlToCallForRevisionDisplays = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?revisionIds=' + strRevisionIdsToget + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12131345&action=ExecuteReport';
        $.get(strUrlToCallForRevisionDisplays, function (data2) {
        }).done(function (data2) {
            var arrMoaDataWithDisplays = rowParser('row', data2);

            for (var i = 0; i < objSelfReference.moaArray.length; i++) {
                var objThisLoopObjectFromGarment = objSelfReference.moaArray[i];
                for (var j = 0; j < arrMoaDataWithDisplays.length; j++) {


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



                }
                objSelfReference.moaArray[i] = objThisLoopObjectFromGarment;
            }

        }).done(function () {
            //var strUrlForUsers = 'http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?userIds=' + strUserIdsToGet + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12134557&action=ExecuteReport';
            var strUrlForUsers = 'http://wsflexappdev2v/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?userIds=' + strUserIdsToGet + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12134557&action=ExecuteReport';
            if (window.location.href.indexOf('wsflexwebprd1') != -1) {
                strUrlForUsers = 'http://wsflexwebprd1v/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?userIds=' + strUserIdsToGet + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A12134557&action=ExecuteReport';
            };
            //garmentProdSpecGarmentAndPatternComponentsUserIds
            //getMyReportIdFromReportName('garmentProdSpecGarmentAndPatternComponentsUserIds');
            var arrUserArray = [];
            $.get(strUrlForUsers, function (data3) {
            }).done(function (data3) {
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
                        if (objThisLoopObject.Product_Type == 'Pattern') {
                            if (objSelfReference.patternSpec.indexOf(objThisLoopObject.Spec) != -1) {
                                objSelfReference.activePatternSpecSpecNumber = Number(objThisLoopObject.Spec);
                            };
                        };
                    };

                };

                for (var i = 0; i < objSelfReference.moaArray.length; i++) {
                    var objThisLoopObject = objSelfReference.moaArray[i];

                    if (objThisLoopObject.Table_Name == "Revision Attribute") {
                        if (objThisLoopObject.Product_Type == 'Garment') {
                            //var specNum = Number(objSelfReference.activeSpecName.substring(0, 2));
                            var specNum = Number(objThisLoopObject.Spec);
                            var thisSpecNum = objSelfReference.activeSpecName.substring(0, 3);
                            thisSpecNum = Number(thisSpecNum);
                            //PATTERN SPEC BUG IS HERE 
                            if (specNum <= thisSpecNum) {
                                arrRevisionAttributeArray.push(objThisLoopObject);
                            };

                        }
                        else if (objThisLoopObject.Product_Type == 'Pattern') {
                            //var specNum = Number(objSelfReference.patternSpec.substring(0, 2));
                            var specNum = Number(objThisLoopObject.Spec);
                            var parentSpecNum = Number(objSelfReference.parentSpec);

                            //PATTERN SPEC BUG IS HERE 

                            //if (specNum <= objSelfReference.activePatternSpecSpecNumber) {
                            if (specNum <= parentSpecNum) {
                                arrRevisionAttributeArray.push(objThisLoopObject);
                            };

                        };
                        /*if ((objSelfReference.activeSpecName.indexOf(objThisLoopObject.Spec) != -1 && objThisLoopObject.Product_Type == 'Garment') || (objSelfReference.patternSpec.indexOf(objThisLoopObject.Spec) != -1 && objThisLoopObject.Product_Type == 'Pattern')) {
                            //objThisLoopObject.Spec = objThisLoopObject.Product_Type + '-' + objThisLoopObject.Spec;
                            arrRevisionAttributeArray.push(objThisLoopObject);
                        };*/

                    } else if (objThisLoopObject.Table_Name == "Sizing Table") {
                        arrSizeTableArray.push(objThisLoopObject);
                    }
                    ;

                };
                var strRevisionAttributeTableString = convertRowArrayIntoHtmlTable(arrRevisionAttributeArray, '', '', 'revisionAttributeTbl', '<h1>Product Revisions</h1>');
                strRevisionAttributeTableString = strRevisionAttributeTableString.replace(/<td>0<\/td>/g, '<td><\/td>');
                var strSizeTableString = convertRowArrayIntoHtmlTable(arrSizeTableArray, '', '', 'sizeTbl', '<h1>Sizing</h1>');

                objSelfReference.revisionAttributes = arrRevisionAttributeArray;
                objSelfReference.sizeTable = arrSizeTableArray;
                objSelfReference.RevisionAttributeTableString = strRevisionAttributeTableString;
                objSelfReference.SizeTableString = strSizeTableString;
                $('#sizeTableDiv').append(objSelfReference.SizeTableString);
                $('#prodRevisionDiv').append(objSelfReference.RevisionAttributeTableString);
                //sizeTbl
                var sizeTable = $('#sizeTbl').DataTable(sizeTableOptions).order([[4, 'asc']]);
                //order should be [Garment Size 3, Pattern Sizes 14, Size Code 4, X Size 13]
                sizeTable.colReorder.order([3,14,4,13,0,1,2,5,6,7,8,9,10,11,12]);
                //sizeTable.order([[4, 'asc']]).draw(false);
                sizeTable.order([[4, 'asc']]).draw();
                var table = $('#revisionAttributeTbl').DataTable(revisionTableTableOptions);
                table.colReorder.order([12, 0, 1, 2, 3, 4, 5, 6, 7, /*8,*/ 9, 10, 11,8, 13,14]);
                //table.column(11).data().sort();
                //table.order([[11, 'desc']]).draw(false);
                table.order([[10, 'desc']]).draw();
                //table.colReorder = false;

                //var aFart = 1;
                //var aFart = 2;

            });

        });

    });

};
/**
 * Gets information specifc to certain colors in the system that may not already be obtained on the BOM.  It takes the garment product as an input, scans its colorway boms and gets the relevant colors
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
function processColors(objSelfReference) {
    var strBeginUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction'
    var strOidPrefix = 'OR:wt.query.template.ReportTemplate:';
    var strColors = strOidPrefix + getMyReportIdFromReportName(colorsByColorId);
    var strColorIds = objSelfReference.allColorwayBomColorIds.toString();
    $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            oid: strColors,
            colorId: strColorIds,
            //oid: 'OR:wt.query.template.ReportTemplate:11146551',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    }).done(function (data) {

        for (var i = 0; i < objSelfReference.colorwayProduct.boms.length; i++) {
            var arrCurrentBom = objSelfReference.colorwayProduct.boms[i];
            for (var j = 0; j < arrCurrentBom.rows.length; j++) {
                var arrCurrentRow = arrCurrentBom.rows[j];
                for (var k = 0; k < arrCurrentRow.variations.length; k++) {
                    var objCurrentVariations = arrCurrentRow.variations[k];
                    var strColorId = objCurrentVariations.colorId;
                    if (typeof (strColorId) != 'undefined') {
                        $("com_lcs_wc_color_LCSColor", data).each(function () {
                            var objectId = $(this).attr('objectId');
                            if (objectId == strColorId) {
                                var strPrintCode = $(this).parent().find('hbiPrintCode').text();
                                //objSelfReference.colorwayProduct.boms[i].rows[j].variations[k].materialColorId = strColorSpecificDyeCodeOrColorVersionMaterial;
                                objSelfReference.colorwayProduct.boms[i].rows[j].variations[k].printCode = strPrintCode;


                            };
                        });
                    };
                };
            };
        };

        numOfProcessingFunctionsThatHaveRun++;
        if (numOfProcessingFunctionsThatHaveRun == 2) {
            numOfProcessingFunctionsThatHaveRun = 0;
            cwayProductBomsToTable(objSelfReference);
        };
    });
};

/**
 * Gets information specifc to certain material colors in the system that may not already be obtained on the BOM.  It takes the garment product as an input, scans its colorway boms and gets the relevant colors
 * @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
 */
function processMaterialColors(objSelfReference) {
    var strBeginUrl = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction'
    var strOidPrefix = 'OR:wt.query.template.ReportTemplate:';
    var strMatlColors = strOidPrefix + getMyReportIdFromReportName(materialColorsByMaterialColorIds);
    var strMaterialIds = objSelfReference.allColorwayBomMaterialColorIds.toString();
    $.ajax({
        url: strBeginUrl,
        type: 'get',
        data: {
            specId: objSelfReference.activeSpecId,
            oid: strMatlColors,
            materialColorId: strMaterialIds,
            //oid: 'OR:wt.query.template.ReportTemplate:11146551',
            xsl2: '',
            xsl2: '',
            format: 'formatDelegate',
            delegateName: 'XML',
            action: 'ExecuteReport'
        }
    }).done(function (data) {




        for (var i = 0; i < objSelfReference.colorwayProduct.boms.length; i++) {
            var arrCurrentBom = objSelfReference.colorwayProduct.boms[i];
            for (var j = 0; j < arrCurrentBom.rows.length; j++) {
                var arrCurrentRow = arrCurrentBom.rows[j];
                for (var k = 0; k < arrCurrentRow.variations.length; k++) {
                    var objCurrentVariations = arrCurrentRow.variations[k];
                    var strMymaterialColorId = objCurrentVariations.materialColorId;
                    $("com_lcs_wc_material_LCSMaterialColor", data).each(function () {
                        var objectId = $(this).attr('objectId');
                        if (objectId == strMymaterialColorId) {
                            var strColorSpecificDyeCodeOrColorVersionMaterial = $(this).parent().find('dyeCodeAndColorVersion').text();
                            //objSelfReference.colorwayProduct.boms[i].rows[j].variations[k].materialColorId = strColorSpecificDyeCodeOrColorVersionMaterial;
                            objSelfReference.colorwayProduct.boms[i].rows[j].variations[k].ColorSpecificDyeCodeOrColorVersionMaterial = strColorSpecificDyeCodeOrColorVersionMaterial;
                        };
                    });
                };
            };
        };
        numOfProcessingFunctionsThatHaveRun++;
        if (numOfProcessingFunctionsThatHaveRun == 2) {
            numOfProcessingFunctionsThatHaveRun = 0;
            try{
                cwayProductBomsToTable(objSelfReference);
            }catch(e){
                console.log(e);
                alert('Special characters were found in colorway grouping name, please remove them or colorway data may show incorrectly.')
            }
        };
    });
};
/** Performs transformation of responsedata for colorway BOMs into variation rows with columns etc.
* @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
*/
function cwayProductBomsToTable(objSelfReference) {
    //header row + colorways of bom is title row
    //store a position variable for each colorway header
    //have this function process them into multiple tables
    //sort the rows with a compare function by sotringNum and branchId
    //convert fiber content into display value
    //look up materialcolor information for all skus
    //maybe already have that somewhere?
    //look up print value for print
    //have this parse through all BOMS for the branch ids of all colors and material colors, then make 2 query calls to put together all the context specific data
    //alert("I DONE FIRED!")

    for (var i = 0; i < objSelfReference.colorwayProduct.boms.length; i++) {
        var arrMyColorways = objSelfReference.colorwayProduct.boms[i].colorways;
        var strBomName = objSelfReference.colorwayProduct.boms[i].name;
        var strBomNameForId = objSelfReference.colorwayProduct.boms[i].name + '_bompartId_' + objSelfReference.colorwayProduct.boms[i].partId;
        var arrPositionIndex = [];
        var numOfColorways = arrMyColorways.length;
        var numOfColorwaysIndex = numOfColorways - 1;
        /* last working version of header
        var arrHeaderRow = ['Section', 'Sorting Number', 'Branch Id', 'In Garment Product', 'Part Name', 'Material', 'Description', 'Garment Use', 'Comments', 'Fiber Content'];
        */
        var arrHeaderRow = ['Section', 'Sorting Number', 'Branch Id', 'In Garment Product', 'Part Name', 'Material', 'Description', 'Garment Use', 'Comments', 'Supplier','Fiber Content'];
        var numOfStaticColumns = arrHeaderRow.length;
        var numOfStaticColumnsIndex = numOfStaticColumns - 1;
        var arrTableRows = [];
        for (var r = 0; r < arrMyColorways.length; r++) {
            arrHeaderRow.push(arrMyColorways[r].colorwayName);
            arrPositionIndex.push(arrMyColorways[r].skuMasterId);
        };
        var numTotalNumberOfColumns = arrHeaderRow.length;

        for (var j = 0; j < objSelfReference.colorwayProduct.boms[i].rows.length; j++) {
            var objSingleTableRow = {};
            objSingleTableRow.arrSingleTableRowData = [];
            var objCurrentRow = objSelfReference.colorwayProduct.boms[i].rows[j];
            objSingleTableRow.noMaterial = objCurrentRow.noMaterial;
            objSingleTableRow.selected = objCurrentRow.selected;
            //removal of fiber content for cut section
            if(objCurrentRow.section != 'hbilabel'){
                objCurrentRow.fiberContent = '------'
            };
            if(objCurrentRow.section != 'cutPartSpread'){
                objCurrentRow.supplier = '------'
            };

            //removal of fiber content for cut section
            objSingleTableRow.arrSingleTableRowData.unshift(objCurrentRow.section, objCurrentRow.sortingNum, objCurrentRow.branchId, objCurrentRow.selected, objCurrentRow.partName, objCurrentRow.material, objCurrentRow.materialDescription, objCurrentRow.garmentUse, objCurrentRow.designComments, objCurrentRow.supplier, objCurrentRow.fiberContent);
            //removal of fiber content for cut section
            //if(objSingleTableRow.arrSingleTableRowData[0] == 'cutPartSpread' ){objSingleTableRow.arrSingleTableRowData[9] = '------'}
            //removal of fiber content for cut section
            var arrVariations = objSelfReference.colorwayProduct.boms[i].rows[j].variations;

            for (var k = 0; k < arrVariations.length; k++) {
                var objCurrentVariation = arrVariations[k];
                var strColorSpecific = objCurrentVariation.ColorSpecificDyeCodeOrColorVersionMaterial;
                var skuMasterId = objCurrentVariation.skuMasterId;
                var strPrintCode = objCurrentVariation.printCode;
                //Changed due to FLEX bug in FindFLex BOM seems to not always accurately update colorDescription
                //var strColorDescription = objCurrentVariation.colorDescription;
                var strColorDescription = objCurrentVariation.colorName;

                if (typeof (strColorSpecific) == 'undefined') {
                    strColorSpecific = ' ';
                } else {
                    strColorSpecific = ' _ ' + strColorSpecific;
                }

                if (typeof (strPrintCode) == 'undefined' || strPrintCode.length < 2) {
                    strPrintCode = ' ';
                } else {
                    strPrintCode = ' _ ' + strPrintCode;
                }

                if (typeof (strColorDescription) == 'undefined') {
                    strColorDescription = ' ';
                } else {
                    //Removes pattern of MC or PC or CC and then 5 numbers from the color name and replaces first hyphen
                    strColorDescription = strColorDescription.replace(/[C,D,H,M,P,Y][C,G,K,S,W]\W\d{5}\W/g,'');
                    strColorDescription = strColorDescription.replace(/[-]\W/g,'');
                };


                var strVariationCellValue = strColorDescription + strColorSpecific + strPrintCode;
                var numColumnToUse = Number(arrPositionIndex.indexOf(skuMasterId)) + numOfStaticColumns;
                objSingleTableRow.arrSingleTableRowData[numColumnToUse] = strVariationCellValue;


            };
            /*for (var m = numOfStaticColumns; m < numOfStaticColumns + numOfColorways; m++) {
                var strCurrentVal = objSingleTableRow.arrSingleTableRowData[m];
                if (typeof (strCurrentVal) == 'undefined' || isNaN(strCurrentVal)) {
                    objSingleTableRow.arrSingleTableRowData[k] = '--';
                };


            };*/

            arrTableRows.push(objSingleTableRow.arrSingleTableRowData);


        };
        console.log(arrTableRows);
        var arrOfTitleObjectsForTable = [];
        for (var q = 0; q < arrHeaderRow.length; q++) {
            var strHeaderValue = arrHeaderRow[q];
            var objTitle = {
                title: strHeaderValue
            };
            arrOfTitleObjectsForTable.push(objTitle);
        };
        var numOfLoops = 1;
        var arrColorwaysAlreadyRan = [];
        var arrStuffToHide = [];
        var numMaxAllowedColumns = (numOfColorways + numOfStaticColumns) * numOfLoops;
        var arrOfColumnsForInitialHide = [0, 1, 2, 3];
        var numForM = arrOfColumnsForInitialHide.length + 1;
        var numOfTimesRanForColorway = 0;
        var strEncodedBomName = strBomNameForId.replace(/\s/g, "_").replace(/:/g, "").replace(/\//g, "_").replace(/&/g, "_");
        strBomName = strBomName.replace(/:/g, "").replace(/\//g, "_").replace(/&/g, "_");
        var strHeaderSection = '<h2 bomChild="' + strEncodedBomName + '">' + strBomName + '</h2>';
        var strThisTableSimpleString = '<table id="' + strEncodedBomName + '" class="display tblCbomTable" printHeader="' + strBomName + '"></table>';
        if (!$('#maxColorways').length) {
            $('#colorwaysDiv').append('<br><div class="form-group"><label for="maxColorways">Input maximum number of colorways per page for PDF output here.</label><input id="maxColorways" value="4" type="number"></input></div>');
        };
        var strJsText = "javascript:makeMeScrollToDefinedTarget('#cwayGroupingNew',50,-200);";
        //var strBackLink = '<a href="' + strJsText + '">All Boms</a>';
        $('#colorwaysDiv').append(strHeaderSection + strThisTableSimpleString);
        var colorwayBomTableOptions2 = {
            'data': arrTableRows,
            'columns': arrOfTitleObjectsForTable,
            'pageLength': 100,
            'dom': strCwayBomDomString,
            'colReorder': true,
            'columnDefs': [{
                'visible': false,
                'targets': arrOfColumnsForInitialHide,
                'orderData': arrOfColumnsForInitialHide
            }]//,
            //'responsive': false,
            //'buttons': arrButtonsNoButtons

        };
        var cWayTable = $('#' + strEncodedBomName).DataTable(colorwayBomTableOptions2);
        cWayTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var node = this.node();
            var boolIsItInGarment = data[3];
            if (boolIsItInGarment) {
                $(node).addClass('selected');
            };

            // ... do something with data(), or this.node(), etc
        });
        cWayTable.draw();

    };
    $('#colorwaysDiv').prepend('<br><br><br><button class="btn btn-danger" id="deleteGarmentBomRows">Delete Selected Rows for Extra Materials</button><br><br><br>');
    $('.tblCbomTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $(this).addClass('selected');
        };
    });
    try{
        $('.tblCbomTable').each(function () {
            var table = $(this).DataTable();
            var arrOrder = table.colReorder.order();
            var arrSortingObjects = [];
            var initialPositionIndexer = 11;
            var arrInitialPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            for (var i = initialPositionIndexer; i < arrOrder.length; i++) {
                //arrToSelect.push(arrOrder[i]);
                var node = table.columns(arrOrder[i]).header();
                var text = $(node).text();
                var index = arrOrder[i];
                var objSort = {
                    name: text,
                    currentPosition: index
                };
                arrSortingObjects.push(objSort);
            };
            //var arrInitialPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            function compareNames(a, b) {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            };

            arrSortingObjects.sort(compareNames);
            for (var i = 0; i < arrSortingObjects.length; i++) {
                arrInitialPositions.push(arrSortingObjects[i].currentPosition);
            };
            table.colReorder.order(arrInitialPositions);

            //var arrHeader = table.columns(arrToSelect).header();
            var aFart = 1;
            var aFart2 = 1;
        });
    }catch(e){
        console.log(e);
    };

    $('#deleteGarmentBomRows').click(function () {
        $('.tblCbomTable').each(function () {
            var strAttr = $(this).attr('id');
            var table = $('#' + strAttr).DataTable();
            var rows = table.rows('.selected').remove().draw();

        });
    });
    if (typeof (objSelfReference.colorwayProduct.boms) != 'undefined') {
        var strHeaderString = '</button><table class="display" id="cwayGroupingNew"><thead><tr><th>Select BOM</th><th>Colorway Group</th><th>Colorway</th></tr></thead><tbody>';
        var strEndTableString = '</tbody></table><button id="bomRemover" class="btn-danger">Remove Highlighted BOMs</button>';
        var strTableString = strHeaderString;
        for (var i = 0; i < objSelfReference.colorwayProduct.boms.length; i++) {
            var objCurrentBom = objSelfReference.colorwayProduct.boms[i];
            for (var j = 0; j < objCurrentBom.colorways.length; j++) {
                var objCurrentCway = objCurrentBom.colorways[j];
                var strBeginCell = '<td>';
                var strEndCell = '</td>';
                var strBeginRow = '<tr>';
                var strEndRow = '</tr>';
                var strSelectCellCway = '<a href="#" class="selectColorwayRow">Select Colorway</a>';
                var strSelectCellBom = '<a href="#" class="selectBomRow">Select BOM</a>';
                var strBomId = objCurrentBom.partId;
                var strBomName = objCurrentBom.name;
                //strBomName = strBomName.replace(/:/g, "").replace(/\//g, "_").replace(/&/g, "_");
                var strBomNameForId = strBomName + '_bompartId_' + strBomId;
                var strEncodedBomName = strBomNameForId.replace(/\s/g, "_").replace(/:/g, "").replace(/\//g, "_").replace(/&/g, "_");
                var strLinkBegin = '<a href="#" class="groupingLink" bPartId="' + strEncodedBomName + '" bName="' + strBomName + '">';
                var strLinkEnd = '</a>';

                strTableString += strBeginRow + strBeginCell + strSelectCellBom + strEndCell + strBeginCell + strLinkBegin + objCurrentBom.name + strLinkEnd + strEndCell + strBeginCell + objCurrentCway.colorwayName + strEndCell + strEndRow;
            }
        };
        strTableString += strEndTableString;
        //$('#cwayGrouing').remove();
        var strNotificationText = '<h4 class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Colorway Groupings with zero colorways selected within PLM will not show in the table above but may still have BOMs below.  Those BOMs will have data by colorway variation.</h4>'
        $('#colorwaysListDiv').append(strTableString);
        $('#colorwaysListDiv').append(strNotificationText);
   
        
        
        $('#cwayGroupingNew').DataTable(cwayReportTableOptions);
        $('.groupingLink').click(function (e) {
            e.preventDefault();
            var strBname = $(this).attr('bPartId');//.substring(0,3);
            //var target = this.hash;
            var $target;
            $('#colorwaysDiv h2').each(function () {
                var strCompare = $(this).attr('bomChild');
                //var strCompare = $(this).text();
                if (strBname == strCompare) {
                    console.log('yes');
                    $target = $(this);
                    $('html, body').stop().animate({
                        'scrollTop': $target.offset().top - 200
                    }, 1100, 'swing', function () {
                        window.location.hash = target;
                    });
                } else {
                    console.log('no');
                };
            });
        });
        $('#bomRemover').click(function () {
            var arrOfBomsToRemove = [];
            $('#cwayGroupingNew tr').each(function () {
                if ($(this).hasClass('selected')) {
                    var idToGet = $(this).find('.groupingLink').attr('bPartId');
                    if (arrOfBomsToRemove.indexOf(idToGet) == -1) {
                        arrOfBomsToRemove.push(idToGet);

                    };
                    $(this).remove();
                }
                else {

                };
                for (var i = 0; i < arrOfBomsToRemove.length; i++) {
                    var strRemovalStringBoms = '#' + arrOfBomsToRemove[i] + '_wrapper';
                    $(strRemovalStringBoms).remove();
                    $('#colorwaysDiv h2').each(function () {
                        var strCompare = $(this).attr('bomChild');
                        if (strCompare == arrOfBomsToRemove[i]) {
                            $(this).remove();
                        };
                    });

                };

            });
        });
        /*$('.selectColorwayRow').click(function (e) {
            e.preventDefault();
            if ($(this).parent().parent().hasClass('selected')) {
                $(this).parent().parent().removeClass('selected');
            } else {
                $(this).parent().parent().addClass('selected');
            };
            
        });*/
        $('.selectBomRow').click(function (e) {
            e.preventDefault();
            var idToUse = $(this).parent().parent().find('.groupingLink').attr('bPartId');
            $('#cwayGroupingNew tr').each(function () {
                var idToCompare = $(this).find('.groupingLink').attr('bPartId');
                if (idToUse == idToCompare) {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    };
                };

            });
            /*if ($(this).parent().parent().hasClass('selected')) {
                $(this).parent().parent().removeClass('selected');
            } else {
                $(this).parent().parent().addClass('selected');
            };*/

        });
        /*$('#cwayGroupingNew tbody').not('.groupingLink').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
            };
        });*/

    };

};

/** Performs Newer method to obtain colorway BOM by running FindFLexBOM which returns the WC collection using the base api
* @param {string} strUrlPrefix present base domain
* @param {string} partIdStringForInfoEngine use for the bompart id parameter to infoendinge
* @param {string} nameOfBomForSection names the section on the page after the fact
* @param {string} sourceName name of the source in which the bom is sitting and being queried for
* @param {string} scMasterIdForInfoEngine the master id of the sourcing config to use as a parameter to the infoengine task
* @param {garmentProduct} objSelfReference takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed sequentially after all spec data for a garmentProduct constructor is called
*/
function constructOneColorwayBom(strUrlPrefix, partIdStringForInfoEngine, nameOfBomForSection, sourceName, scMasterIdForInfoEngine, objSelfReference) {
    var strColorwayBomTaskUrl = strUrlPrefix + 'Windchill/servlet/IE/tasks/com/lcs/wc/flexbom/FindFlexBOM.xml';
    var strInstance = 'net.hbi.res.wsflexappdev1v.windchillAdapter';
    var strCurrentEnvironment = window.location.href;
    var arrOfColorwayObjects = objSelfReference.colorwayProduct.colorways;
    var objBom = {};
    // will be six, need to test with 2var numMaxNumberOfColorways = 6;
    var numMaxNumberOfColorways = 2;
    objSelfReference.allColorwayBomColorIds = [];
    objSelfReference.allColorwayBomMaterialColorIds = [];
    objBom.colorways = [];
    objBom.partId = partIdStringForInfoEngine;
    var arrOfSkuMasterIdsForBom = [];
    var arrOfSkuMasterNamesForBom = [];
    //var arrHeaderRow = ['Sorting Number', 'Branch Id', 'Part Name', 'Garment Use', 'Material', 'Design Comments', 'Fiber Content'];
    for (var x = 0; x < objSelfReference.colorwayProduct.colorways.length; x++) {
        if (objSelfReference.colorwayProduct.colorways[x].scMasterId == scMasterIdForInfoEngine) {
            var objColorway = objSelfReference.colorwayProduct.colorways[x];
            objColorway.bomNum = Math.floor(objBom.colorways.length / numMaxNumberOfColorways);
            objBom.colorways.push(objColorway);
            arrOfSkuMasterIdsForBom.push(objSelfReference.colorwayProduct.colorways[x].skuMasterId);
            arrOfSkuMasterNamesForBom.push(objSelfReference.colorwayProduct.colorways[x].colorwayName);
        };

    };
    var numberOfColorways = objBom.colorways.length + 1;
    var numNumberOfColorwayBomsToCreate = Math.floor(numberOfColorways / numMaxNumberOfColorways) + 1;
    objBom.numNumberOfColorwayBomsToCreate = numNumberOfColorwayBomsToCreate;
    var objOfNewlyCreatedDataFilledColorwayObjects = {};
    objOfNewlyCreatedDataFilledColorwayObjects.arrSkuIds = [];
    objOfNewlyCreatedDataFilledColorwayObjects.arrColorwayObjects = [];
    objBom.name = nameOfBomForSection;
    objBom.scMasterIdForInfoEngine = scMasterIdForInfoEngine;
    objBom.source = sourceName;
    if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
        strInstance = 'net.hbi.res.wsflexappqa1v.windchillAdapter';
    };
    if (strCurrentEnvironment.indexOf('wsflexwebprd1v') != -1) {
        strInstance = 'net.hbi.res.wsflexappprd1v.windchill';
    };
    $.ajax({
        url: strColorwayBomTaskUrl,
        type: 'get',
        dataType: 'xml',
        data: {
            partId: 'VR:com.lcs.wc.flexbom.FlexBOMPart:' + partIdStringForInfoEngine,
            instance: strInstance,
            skuMode: 'ALL_SKUS',
            scMasterId: scMasterIdForInfoEngine
        },
        async: true
    }).done(function (data) {
        var arrBomRows = [];
        var arrOfInstances = [];
        var wcCollection = $(data).first();
        var arrOfColorwaysWithData = [];
        numBomsAlreadyRan++;
        arrOfInstances = $(wcCollection).find('branchId').parent();
        //console.log('combo strings')
        //console.log(objSelfReference.arrOfComboStrings);
        $(arrOfInstances).each(function (index) {
            var objRowObject = {};
            objRowObject.noMaterial = false;
            objRowObject.selected = false;
            objRowObject.variations = [];
            objRowObject.partName = $(this).find('partName').text();;
            objRowObject.garmentUse = $(this).find('hbiGarmentUseDisplay').text();;
            objRowObject.material = $(this).find('materialName').text();
            objRowObject.materialDescription = $(this).find('hbiItemDescription').text();
            //objRowObject.material = objRowObject.material + '-' + objRowObject.materialDescription;
            //objRowObject.designComments = $(this).find('hbiComments').first().text();
            objRowObject.designComments = $(this).find('hbiColorwayBomComments').first().text();
            objRowObject.fiberContent = $(this).find('fiberCodeContent').text();
            objRowObject.fiberContent = getValueDisplayFromKey(objRowObject.fiberContent, objSelfReference);
            objRowObject.sortingNum = $(this).find('sortingNumber').text();
            objRowObject.branchId = $(this).find('branchId').text();
            objRowObject.section = $(this).find('section').text();
            objRowObject.childId = $(this).find('childId').text();
            objRowObject.supplier = $(this).find('supplierName').text();
            var strGarmentUseId = $(this).find('hbiGarmentUse').text();
            var strComboString =  objRowObject.material + '_' + strGarmentUseId;
            objRowObject.sortIndex = objRowObject.section + objRowObject.sortingNum;

            if (objRowObject.childId == '20240') {
                objRowObject.noMaterial = true;
            }
            //else if (objSelfReference.arrOfJustMaterialMasterIdsFromGarment.indexOf(objRowObject.childId) == -1) {
            else if (objSelfReference.arrOfComboStrings.indexOf(strComboString) == -1) {
               
                objRowObject.selected = true;
            };

            var arrOfVariationData = $(this).find('*[NAME]');
            for (var r = 0; r < arrOfSkuMasterIdsForBom.length; r++) {
                var numCurrentSku = arrOfSkuMasterIdsForBom[r];
                var objCurrentVariationObject = {};
                var arrOfSkusRanSoFar = [];
                var arrOfVariationsForOnlyThisSku = [];
                for (var i = 0; i < arrOfVariationData.length; i++) {
                    var name = $(arrOfVariationData[i]).attr('NAME');
                    var arrOfDetailForVariation = name.split("$");
                    var skuMasterId = arrOfDetailForVariation[2];
                    if (skuMasterId == numCurrentSku) {
                        arrOfVariationsForOnlyThisSku.push(arrOfVariationData[i]);
                    }
                };
                var objCurrentVariationObject = {};
                objCurrentVariationObject.skuMasterId = numCurrentSku;
                objCurrentVariationObject.colorwayName = arrOfSkuMasterNamesForBom[r];
                for (var i = 0; i < arrOfVariationsForOnlyThisSku.length; i++) {
                    var arrOfDetailForVariation = [];
                    var name = $(arrOfVariationsForOnlyThisSku[i]).attr('NAME');
                    var arrOfDetailForVariation = name.split("$");
                    var attributeName = arrOfDetailForVariation[0];
                    var variationType = arrOfDetailForVariation[1];
                    var value = $(arrOfVariationsForOnlyThisSku[i]).text();
                    objCurrentVariationObject[attributeName] = value;
                    if (attributeName == 'colorId') {
                        var numIndex = objSelfReference.allColorwayBomColorIds.indexOf(value);
                        if (numIndex == -1) {
                            objSelfReference.allColorwayBomColorIds.push(value);
                        }
                    } else if (attributeName == 'materialColorId') {
                        var numIndex = objSelfReference.allColorwayBomMaterialColorIds.indexOf(value);
                        if (numIndex == -1) {
                            objSelfReference.allColorwayBomMaterialColorIds.push(value);
                        }
                    }

                };
                objRowObject.variations.push(objCurrentVariationObject);
            };
            arrBomRows.push(objRowObject);
        });
        function objCompareByskuMasterId(a, b) {
            if (a.skuMasterId < b.skuMasterId)
                return -1;
            if (a.skuMasterId > b.skuMasterId)
                return 1;
            return 0;
        };

        function objCompareBysortIndex(a, b) {
            if (a.sortIndex < b.sortIndex)
                return -1;
            if (a.sortIndex > b.sortIndex)
                return 1;
            return 0;
        };
        arrBomRows.sort(objCompareBysortIndex);
        objBom.rows = arrBomRows;
        objSelfReference.colorwayProduct.boms.push(objBom);

        if (numOfTotalBoms == numBomsAlreadyRan) {
            //put callback function here
            console.log(numBomsAlreadyRan + ' out of ' + numOfTotalBoms);
            numOfTotalBoms = 0;
            numBomsAlreadyRan = 0;
            processMaterialColors(objSelfReference);
            processColors(objSelfReference);
        };
    });

}

/*

 * @param {String} strkey key value of item in list to be passed to key array to get back display
 * @param {Object} objGarmentProduct takes the same garmentProduct which is calling the method.  This is used to work around scope limitations and is generally performed
 * @return {String} strvalue return the display value from the key
 */
function getValueDisplayFromKey(strkey, objGarmentProduct) {
    var numIndexPositionOfKeyInKeyArray = objGarmentProduct.displayKeys.indexOf(strkey);
    if (numIndexPositionOfKeyInKeyArray != -1) {
        var strvalue = objGarmentProduct.displayValues[numIndexPositionOfKeyInKeyArray];
    }
    else {
        var strvalue = '';
    }
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

        } else {
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
        data: objPostObject, //{garmentName:fileName},
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
    var datetime = currentdate.getDate() + "_" + (currentdate.getMonth() + 1) + "_" + currentdate.getFullYear() + "" + currentdate.getHours() + "_" + currentdate.getMinutes() + "_" + currentdate.getSeconds();
    //child = execFile(filePath, ['file:///GitProjects/nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', "\\\\izone.hbi.net@SSL\\sites\\PLM\\gSpecs\\" + objForFile.name + '.pdf'], function (error, stdout, stderr) {
    //"C:\GitProjects\nodeTechPackProject\TechPackProject"
    child = execFile(filePath, ['file:///GitProjects/nodeTechPackProject/TechPackProject/testFile.html?dontRunPrompt', objContainingInitialFilePathInName.name + datetime + '.pdf'], function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
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
            console.log('Signal received: ' + error.signal);
        }
        console.log('Child Process stdout: ' + stdout);
        console.log('Child Process stderr: ' + stderr);
    });

};

function pdfPageClassItemForPdf(indexToStopAt, incrementingVariable) {
    if (indexToStopAt == incrementingVariable) {

    } else {

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
    // source can be HTML-formatted string,                        or a reference
    // to an actual DOM element from which the text will be scraped.
    , source = strHtmlStringForPdf

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID",                        "div", "span" etc.)
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
    pdf.fromHTML(source// HTML string or DOM elem ref.
    , margins.left// x coord
    , margins.top// y coord
    , {
        'width': margins.width// max width of content on PDF
        ,
        'elementHandlers': specialElementHandlers
        //settings go here
    }, function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins)

};

//"\\izone.hbi.net@SSL\sites\PLM\Garment Specs\test.txt"
//turning off for now

function materialSwapper(arrWithbranchIds) {
    var strMaterialsJoin = arrWithbranchIds.join([separator = ',']);
    var strMaterialsByBranchUrl = 'http://wsflexwebprd1v.res.hbi.net/Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/URLTemplateAction?branches=' + strMaterialsJoin + '&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11140734&action=ExecuteReport';
    //&format=formatDelegate&delegateName=XML&xsl1=&xsl2=&oid=OR%3Awt.query.template.ReportTemplate%3A11140734&action=ExecuteReport

    $.get(strMaterialsByBranchUrl, function (data) {
    }).done(function (data) {
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
/** Takes the response data from a querybuilder query and auto creates a generic object 
* @param {node} parentElement 
* @param {objComponent} returns a javascript object
*/
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
    } else {
        strResultingHtmlTable = '';
    };

    if (typeof (optionalId) == 'undefined') {
        strResultingHtmlTable += '<table class="display" ><thead>';
    } else {
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
            } else {
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
                        } else {
                            strResultingHtmlTable += '<td>' + 'body to search for was undefined' + '</td>';
                        };
                    };
                } else {
                    if (typeof (objRow[name] != 'undefined')) {

                        strResultingHtmlTable += '<td>' + objRow[name] + '</td>';

                    } else {
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
        $.ajax({
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
                } else {
                    //$('#imagesDiv').append('<h2>' + strMyName + '</h2></br><div class="row page" id="' + strRoleAObjectId + '">' + strOnlySvgText + '</div></br></br><hr>');

                };
                if (nextIndex < arrayOfDocuments.length) {

                    //callNextDocument(arrayOfDocuments, nextIndex);

                } else {
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
                        } else if (numOfSvgs == 1) {
                            height = 792;
                            width = 612;
                            strClassToAdd = 'col-md-offset-3 col-md-6';
                        };
                        $(this).find('svg').each(function (index) {
                            $(this).attr('height', height);
                            $(this).attr('width', width);
                            if (index == 0) {
                                $(this).addClass(strClassToAdd);
                            } else if (index == 1) {
                                $(this).addClass(strClassToAdd2);
                            }
                            ;
                        });

                    });

                };

            }
        });
    };
};
/** checks if n is a number
* @param {objet} n
* @returns {boolean} 
*/
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function fillUndefinedPropertiesWithSpaces(objectToClean) {
    var arrOfProperties = Object.keys(objectToClean);
    for (var i = 0; i < arrOfProperties.length; i++) {
        var presentPropName = arrOfProperties[i];
        var presentPropValue = objectToClean[presentPropName];
        if (typeof (presentPropValue) == 'undefined') {
            objectToClean[presentPropName] = ' ';
        };
    }
    return objectToClean

}
/**
 * @param {row} dataRow takes a row of data containing the data for the object
 * @returns {objComponent} returns a document object
*/
function standardRowProcessorForDocuments(dataRow) {
    var strFileNameString = $(dataRow).find('Application_Data').text();
    var numCheckForPng = strFileNameString.indexOf('png');
    var objComponent = {};
    if (numCheckForPng == -1) {
        return false;
    } else {
        var strImgViewerPrefix1 = 'http://wsflexappdev2v/Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
        var strImgViewerPrefix2 = '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:';
        var strImgViewerPrefix3 = "https://res.hbi.net/dfs/BrandedApparel/Activewear/FlexApp/QA/Prod/";
        var name = $(dataRow).find('Document_Master_Name').text();
        var strpSpecId = $(dataRow).find('patternSpecId').text();
        var strgSpecId = $(dataRow).find('garmentSpecId').text();
        var strCompSpecId = $(dataRow).find('comRefSpecId').text();
        var strApplicationDataPartOneOfLink = $(dataRow).find('documentNotMasterDocumentOid').text();
        var strDocumentIdPartTwoOfLink = $(dataRow).find('DocumentIdPartTwoOfLink').text();
        var strMyFullId = strDocumentIdPartTwoOfLink + "_" + strApplicationDataPartOneOfLink;
        if (window.location.href.indexOf('webprd1') != -1) {
            strImgViewerPrefix1 = 'http://wsflexwebprd1v/Windchill/rfa/jsp/image/ImageViewer.jsp?imageUrl=&appDataOid=OR:wt.content.ApplicationData:';
        };
        strImgViewerPrefix1 = strImgViewerPrefix1 + strDocumentIdPartTwoOfLink + '&contentHolderOid=OR:com.lcs.wc.document.LCSDocument:' + strApplicationDataPartOneOfLink;

        if ($(dataRow).is('row:first')) {
            var objGSpec = {};
            var objPSpec = {};
            objGSpec.currentGarmentSpecId = $(dataRow).find('garmentSpecId').text();
            objPSpec.currentGarmentSpecId = $(dataRow).find('patternSpecId').text();
            objGSpec.name = $(dataRow).find('gSpecName').text();
            objPSpec.name = $(dataRow).find('pSpecName').text();
        };
        //objComponent = {};
        objComponent.name = name;
        objComponent.name = decodeURIComponent(objComponent.name);
        objComponent.myFullId = strMyFullId;

        objComponent.componentType = 'Document';
        objComponent.masterId = $(dataRow).find('Document_Master').attr('objectId');
        objComponent.documentType = $(dataRow).find('Component_Type').text();
        objComponent.fileName = $(dataRow).find('fileName').text();
        /*
        May be a fix for image issue.
        objComponent.fileName = decodeURIComponent(objComponent.fileName);
        
        */
        objComponent.vaultFileName = $(dataRow).find('fileNameOnVault').text();
        objComponent.pageType = $(dataRow).find('pageType').text();
        objComponent.pageLayout = $(dataRow).find('pageLayout').text();
        objComponent.pageDescription = $(dataRow).find('pageDescription').text();
        objComponent.number = $(dataRow).find('number').text();
        objComponent.ownerId = $(dataRow).find('ownerId').text();
        objComponent.specMasterReferenceId = $(dataRow).find('specMasterReferenceId').text();
        objComponent.garmentSpecMasterId = $(dataRow).find('garmentSpecMasterId').text();
        objComponent.patternSpecMasterId = $(dataRow).find('patternSpecMasterId').text();
        if (objComponent.garmentSpecMasterId == objComponent.specMasterReferenceId) {
            objComponent.ownerType = 'Garment';
        } else if (objComponent.patternSpecMasterId == objComponent.specMasterReferenceId) {
            objComponent.ownerType = 'Pattern';
        };

        objComponent.fullVaultUrl = strImgViewerPrefix3 + objComponent.vaultFileName + '.png';
        //objComponent.fullVaultUrl = strImgViewerPrefix1;

        objComponent.seqeuence = $(dataRow).find('Unique_Sequence_Number').text();
        //objComponent.imgSrcUrl = objComponent.seqeuence + " " + objComponent.fileName;
        objComponent.imgSrcUrl = strImgViewerPrefix1;
        objComponent.dataUri = 'initial value';
        objComponent.description = $(dataRow).find('Description').text();
        var strStartPointSubString = objComponent.description.substring(11, objComponent.description.length);
        var numLengthStartPoint = strStartPointSubString.search('x') + 1;
        var numNumCharsOfWidth = numLengthStartPoint - 1;
        var numWidth = strStartPointSubString.substring(0, numNumCharsOfWidth);
        var numLength = strStartPointSubString.substring(numLengthStartPoint, strStartPointSubString.length);
        objComponent.width = numWidth;
        objComponent.height = numLength;
        objComponent.roleDocumentLink = $(dataRow).find('roleDocumentLink').text();
        var roleB = $(dataRow).find('roleBObjectRef_key_id').text();

        //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="img-responsive hideImg" src="' + strImgViewerPrefix3 + objComponent.vaultFileName + '" /></div>';
        //changing the imgviewer prefix variable here alters protocol and where the file is being grabbed from
        objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><iframe width="100%" height="1200" class="img-responsive hideImg" src="' + strImgViewerPrefix1 + '"></iframe></div>';

        //objComponent.image = '<div class="item" <h2>' + objComponent.name + '-' + objComponent.fileName + '</h2></br><img width="' + objComponent.width + '" height="' + objComponent.length + '" class="sponsive hideImg" src="' + objComponent.fullVaultUrl +  '" /></div>';
        objComponent.cell = Number(objComponent.description.substring(6, 5));
        if (objComponent.garmentSpecMasterId == objComponent.specMasterReferenceId) {
            objComponent.ownerType = 'Garment';
        } else if (objComponent.patternSpecMasterId == objComponent.specMasterReferenceId) {
            objComponent.ownerType = 'Pattern';
        };


        if (objComponent.pageType == 'frontSketch' && objComponent.cell == 1) {
            objComponent.frontBack = 'frontImage';

        }
        else if (objComponent.pageType == 'frontSketch' && objComponent.cell == 2) {
            objComponent.frontBack = 'backImage';

        } else {
            objComponent.frontBack = 'neither';
        };

        if (objComponent.ownerType == 'Pattern' && objComponent.pageType == 'frontSketch') {
            return false;
        } else {
            //arrDocuments.push(objComponent);
            return objComponent;
        };

        if (index == numOfDocumentRows - 1) {

        };

    };

};
/**
 * @param {row} dataRow takes a row of data containing the data for the object
 * @returns {objComponent} returns a bom object
*/
function standardRowProcessorForBoms(bomData, objSelfReference) {
    var arrBoms = [];
    objSelfReference.hasCutBom = false;
    objSelfReference.cutBranch = undefined;
    $('row', bomData).each(function () {
        var dataRow = $(this);
        var objBomComponent = {};
        var name = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Name').text();
        var strpBomSpecId = $(this).find('pSpecId').text();
        var strgBomSpecId = $(this).find('gSpecId').text();
        var strBomCompSpecId = $(this).find('comRefSpecId').text();
        var strFlexBomType = $(this).find('Flex_Type_Type_Name').text();
        var strFlexTypePath = $(this).find('com_lcs_wc_flexbom_FlexBOMPart_Flex_Type_Id_Path').text();
        var strSewOrSource = $(this).find('sewOrSource').text();
        var boolIsItSourcedBom = false;
        var boolIsItOldSourcedBomSetupForSew = false;
        var boolIsItNewSewBom = false;
        if (strFlexTypePath.includes('16700041')) {
            boolIsItSourcedBom = true;
            if (strSewOrSource.includes('sew')) {
                boolIsItOldSourcedBomSetupForSew = true;
            } else {
                boolIsItOldSourcedBomSetupForSew = false;
            };
        } else if (strFlexTypePath.includes('2374344')) {
            boolIsItNewSewBom = true;

        };

        objBomComponent = {};
        objBomComponent.name = name;
        objBomComponent.branchId = $(this).find('Branch_Identifier').text();
        objBomComponent.fileName = "";
        objBomComponent.componentType = 'BOM';
        objBomComponent.imageUrl = "<img src='' />";
        objBomComponent.flexType = strFlexBomType;
        objBomComponent.flexTypePath = strFlexTypePath;

        var regPprod = new RegExp("Pattern");
        var regGprod = new RegExp("Garment");
        if (regPprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Pattern';
        } else if (regGprod.test(strFlexBomType)) {
            objBomComponent.ownerType = 'Garment';
        }
        ;
        //arrTableDataArray.push(objBomComponent);
        arrBoms.push(objBomComponent);
        //if (objBomComponent.flexType == 'Garment Routing Table') {
        if (objBomComponent.flexTypePath.includes('10661203')) { //this is the end of the flex type path for "Garment Routing Table"
            //$('#revi')
            objSelfReference.getAndProcessMyRoutingBOM(objBomComponent, objSelfReference);
        } else if (objBomComponent.flexTypePath.includes('2373681')) {//this is the end of the flex type path for "Garment Cut"
            objSelfReference.hasCutBom = true;
            objSelfReference.cutBranch = objBomComponent.branchId;
        } else if (objBomComponent.flexTypePath.includes('2374607')) {//this is the end of the flex type path for "Pattern Product Sew BOM"
            objSelfReference.hasAPatternSewBom = true;
            objSelfReference.patternSewBranch = objBomComponent.branchId;
        } else if (objBomComponent.flexTypePath.includes('2374344') && strSewOrSource.indexOf('source') == -1) {//this is the end of the flex type path for "Garment Sew"
            objSelfReference.hasAGarmentSewBom = true;
            objSelfReference.garmentSewBranch = objBomComponent.branchId;
            //}else if(objBomComponent.flexType == "Garment Sew" && objBomComponent.name.indexOf('Source') != -1){
            //}else if((objBomComponent.flexType == "Garment Sew" && objBomComponent.name.indexOf('Source')) != -1 || (objBomComponent.flexType == "Garment Sourced")){            
        } else if (objBomComponent.flexTypePath.includes('16700041') /*//this is the end of the flex type path for "Garment Sew"*/|| (objBomComponent.flexTypePath.includes('2374344') && strSewOrSource.indexOf('sew') == -1)) {
            objSelfReference.hasAGarmentSourceBom = true;
            objSelfReference.bomSourceBranch = objBomComponent.branchId;
        };

        if(objBomComponent.flexTypePath.includes('2374344') && strSewOrSource.length < 1){
            var strName = objBomComponent.name;
            strName = strName.toLowerCase();
            var regSewPattern = new RegExp('[Ss][Ee][Ww]/g')
            var regSourcePattern = new RegExp('[Ss][Oo][Uu][Rr][Cc][Ee]/g')
            var isItSource = strName.includes('source');
            var isItSew = strName.includes('sew');
            //var afart = 'fart';
            if(isItSew){
                objSelfReference.hasAGarmentSewBom = true;
                objSelfReference.garmentSewBranch = objBomComponent.branchId;
            }else if(isItSource){
                objSelfReference.hasAGarmentSourceBom = true;
                objSelfReference.bomSourceBranch = objBomComponent.branchId;
            }
        };



    });
    if (objSelfReference.hasAGarmentSourceBom) {
        var objSourcedObject = {};
        $.ajax({
            url: 'http://wsflexwebprd1v/Windchill/servlet/IE/tasks/com/lcs/wc/flexbom/FindFlexBOM.xml',
            type: 'get',
            data: {
                instance: 'net.hbi.res.wsflexappprd1v.windchill',
                skuMode: 'ALL_SKUS',
                //sizeMode: 'ALL_SIZE1',
                partId: 'VR:com.lcs.wc.flexbom.FlexBOMPart:' + objSelfReference.bomSourceBranch

            }
        }).done(function (sourcedData) {
            var wcCollectionSource = $(sourcedData).first();
            var arrOfSourceInstances = $(wcCollectionSource).find('branchId').parent();
            objSelfReference.sourceBomTableString = '<h1>Sourced BOM</h1><table class="display" id="sourceBomTable" ><thead><th>Sorting Number</th><th>Section</th><th>Garment Use</th><th>Material</th><th>Description</th><th>Minor Category</th><th>Supplier</th></thead><tbody>';
            $(arrOfSourceInstances).each(function () {
                var objGarmentSourceRow = {};
                objGarmentSourceRow.sortingNumber = $(this).find('sortingNumber').text();
                objGarmentSourceRow.section = $(this).find('section').text();
                /*var firstLetter = objGarmentSourceRow.section.substring(0, 1).toUpperCase();
                var restOfWord = objGarmentSourceRow.section.substring(1, objGarmentSourceRow.section.length);
                objGarmentSourceRow.section = firstLetter + restOfWord;*/
                objGarmentSourceRow.garmentUseId = $(this).find('hbiGarmentUse').text();
                objGarmentSourceRow.Garment_Use = $(this).find('hbiGarmentUseDisplay').text();
                objGarmentSourceRow.minorCategory = $(this).find('hbiMinorCategory').text();
                var majorCategory = $(this).find('hbiMajorCategory').text();
                if(majorCategory == 'thread'){
                    objGarmentSourceRow.minorCategory = ' '
                };
                objGarmentSourceRow.supplier = $(this).find('supplierName').text();
                if(objGarmentSourceRow.section != 'garmentCut'){
                    objGarmentSourceRow.supplier = '------';
                };
                objGarmentSourceRow.description = $(this).find('hbiItemDescription').text();
                objGarmentSourceRow.materialName = $(this).find('materialName').text();
                objGarmentSourceRow.uom = $(this).find('hbiUsageUOM').text();
                objGarmentSourceRow = fillUndefinedPropertiesWithSpaces(objGarmentSourceRow);
                objSelfReference.sourceBomTableString += '<tr>';
                var strTdBegin = '<td>';
                var strTdEnd = '</td>';
                objSelfReference.sourceBomTableString += strTdBegin + objGarmentSourceRow.sortingNumber + strTdEnd + strTdBegin + objGarmentSourceRow.section + strTdEnd + strTdBegin + objGarmentSourceRow.Garment_Use + strTdEnd + strTdBegin + objGarmentSourceRow.materialName + strTdEnd + strTdBegin + objGarmentSourceRow.description + strTdEnd + strTdBegin + objGarmentSourceRow.minorCategory.toUpperCase() + strTdEnd + strTdBegin + objGarmentSourceRow.supplier + strTdEnd;
                objSelfReference.sourceBomTableString += '</tr>';
            });
            objSelfReference.sourceBomTableString += '</tbody></table>';
            $('#sourceBomDiv').append(objSelfReference.sourceBomTableString);
            $('#sourceBomTable').DataTable(sourceBomTableOptions);
        });

    };
    if (objSelfReference.hasAGarmentSewBom && objSelfReference.hasAPatternSewBom) {
        var objSewBomObject = {};
        $.ajax({
            url: 'http://wsflexwebprd1v/Windchill/servlet/IE/tasks/com/lcs/wc/flexbom/FindFlexBOM.xml',
            type: 'get',
            data: {
                instance: 'net.hbi.res.wsflexappprd1v.windchill',
                skuMode: 'ALL_SKUS',
                sizeMode: 'ALL_SIZE1',
                partId: 'VR:com.lcs.wc.flexbom.FlexBOMPart:' + objSelfReference.patternSewBranch

            }
        }).done(function (patternData) {
            var wcCollectionPattern = $(patternData).first();
            var arrOfPatternInstances = $(wcCollectionPattern).find('branchId').parent();
            var arrOfFlatSize = [];
            objSelfReference.patternSewData2 = [];
            objSelfReference.sewSizes = [];
            $(arrOfPatternInstances).each(function () {
                var objPatternSewRow = {};

                objPatternSewRow.garmentUseId = $(this).find('hbiGarmentUse').text();
                objPatternSewRow.garmentUseDisplay = $(this).find('hbiGarmentUseDisplay').text();
                objPatternSewRow.uom = $(this).find('hbiUOM').text();
                objPatternSewRow.accessorySize = $(this).find('hbiAccessorySize').text();
                objPatternSewRow = fillUndefinedPropertiesWithSpaces(objPatternSewRow);
                objPatternSewRow.sizes = [];
                objPatternSewRow.sizeData = [];
                var arrOfVariationData = $(this).find('*[NAME]');

                for (var i = 0; i < arrOfVariationData.length; i++) {
                    var name = $(arrOfVariationData[i]).attr('NAME');
                    var strVariationLevelValue = $(arrOfVariationData[i]).first().text();
                    arrVariationDetails = name.split('$');
                    var strField = arrVariationDetails[0];
                    var strVariationType = arrVariationDetails[1];
                    var strVariationName = arrVariationDetails[2];
                    var strSizeLookUp = 'size' + strVariationName;
                    var numIndexOfLookup = objSelfReference.sortingArray.indexOf(strSizeLookUp);
                    var objSizeObject = {};
                    objSizeObject.sortingIndex = numIndexOfLookup;
                    objSizeObject.sizeName = strVariationName;

                    if (arrOfFlatSize.indexOf(strVariationName) == -1) {
                        //objSelfReference.sewSizes[numIndexOfLookup] = strVariationName;
                        objSelfReference.sewSizes.push(objSizeObject);
                        arrOfFlatSize.push(strVariationName);
                    };
                    var objVariationObject = {
                        VariationType: strVariationType,
                        VariationName: strVariationName,
                        VariationFieldName: strField,
                        VariationLevelValue: strVariationLevelValue
                    };
                    objVariationObject = fillUndefinedPropertiesWithSpaces(objVariationObject);
                    objPatternSewRow.sizeData.push(objVariationObject);
                };
                //objPatternSewRow = fillUndefinedPropertiesWithSpaces(objPatternSewRow);
                objSelfReference.sewSizes.sort(objCompareBysortingIndex);
                objSelfReference.patternSewData2.push(objPatternSewRow);

            });
            $.ajax({
                url: 'http://wsflexwebprd1v/Windchill/servlet/IE/tasks/com/lcs/wc/flexbom/FindFlexBOM.xml',
                type: 'get',
                data: {
                    instance: 'net.hbi.res.wsflexappprd1v.windchill',
                    skuMode: 'ALL_SKUS',
                    sizeMode: 'ALL_SIZE1',
                    partId: 'VR:com.lcs.wc.flexbom.FlexBOMPart:' + objSelfReference.garmentSewBranch

                }
            }).done(function (garmentData) {
                var wcCollectionGarment = $(garmentData).first();
                var arrOfGarmentInstances = $(wcCollectionGarment).find('branchId').parent();
                objSelfReference.garmentSewData2 = [];
                $(arrOfGarmentInstances).each(function () {
                    var objGarmentSewRow = {};
                    for (var r = 0; r < objSelfReference.sewSizes.length; r++) {
                        var objCurrent = objSelfReference.sewSizes[r];
                        var strCurrent = objCurrent.sizeName;
                        objGarmentSewRow[strCurrent] = '';
                    };
                    objGarmentSewRow.sortingNumber = $(this).find('sortingNumber').text();
                    objGarmentSewRow.garmentUseId = $(this).find('hbiGarmentUse').text();
                    objGarmentSewRow.Garment_Use = $(this).find('hbiGarmentUseDisplay').text();
                    objGarmentSewRow.minorCategory = $(this).find('hbiMinorCategory').text();
                    objGarmentSewRow.description = $(this).find('hbiItemDescription').text();
                    objGarmentSewRow.materialName = $(this).find('materialName').text();
                    objGarmentSewRow.uom = $(this).find('hbiUsageUOM').text();
                    objGarmentSewRow = fillUndefinedPropertiesWithSpaces(objGarmentSewRow);
                    //objGarmentSewRow.dimensions = [];
                    for (var i = 0; i < objSelfReference.patternSewData2.length; i++) {
                        var arrPatternVariationRow = objSelfReference.patternSewData2[i].sizeData;
                        var strCurrentPatternBranch = objSelfReference.patternSewData2[i].garmentUseId;
                        var strCurrentPatternUom = objSelfReference.patternSewData2[i].uom;
                        for (var j = 0; j < arrPatternVariationRow.length; j++) {
                            var objPatternRowToCompare = arrPatternVariationRow[j];
                            if (strCurrentPatternBranch == objGarmentSewRow.garmentUseId && strCurrentPatternUom == objGarmentSewRow.uom) {
                                var strSizeName = objPatternRowToCompare.VariationName;
                                var objDimensionDataObject = {};
                                objDimensionDataObject.dimension = strSizeName;
                                objDimensionDataObject.dimensionType = objPatternRowToCompare.VariationType;
                                objDimensionDataObject.attribute = objPatternRowToCompare.VariationFieldName;
                                objDimensionDataObject.value = objPatternRowToCompare.VariationLevelValue;
                                objGarmentSewRow[strSizeName] = objPatternRowToCompare.VariationLevelValue;
                            };
                        };


                        if (strCurrentPatternBranch == objGarmentSewRow.garmentUseId && strCurrentPatternUom == objGarmentSewRow.uom) {
                            //objGarmentSewRow = fillUndefinedPropertiesWithSpaces(objGarmentSewRow);
                            objSelfReference.garmentSewData2.push(objGarmentSewRow);
                        };
                    }

                });

            }).done(function () {

                objSelfReference.sewBomTableString = '<h1>Sew BOMs</h1><table class="display" id="sewBomTable" ><thead><th>Sorting Number</th><th>Garment Use</th><th>Material</th><th>Description</th><th>Minor Category</th><th>Usage UOM</th>';
                for (var k = 0; k < objSelfReference.sewSizes.length; k++) {
                    //var strCurrentSize = objSelfReference.sewSizes[k];
                    var objCurrentSize = objSelfReference.sewSizes[k];
                    var strCurrentSize = objCurrentSize.sizeName;
                    if (typeof (strCurrentSize) != 'undefined') {
                        objSelfReference.sewBomTableString += '<th class="size' + encodeURIComponent(strCurrentSize) + '" >' + strCurrentSize + '</th>'
                    };

                };
                objSelfReference.sewBomTableString += '</thead><tbody>';
                var arrManualProperties = ["sortingNumber", "materialName", "description", "minorCategory", "Garment_Use", "uom", "garmentUseId", 'dimensions'];
                for (var k = 0; k < objSelfReference.garmentSewData2.length; k++) {

                    var objToParse = objSelfReference.garmentSewData2[k];
                    var arrOfProperties = Object.keys(objToParse);
                    var strTdBegin = '<td>';
                    var strTdEnd = '</td>';
                    objSelfReference.sewBomTableString += '<tr>';
                    objSelfReference.sewBomTableString += strTdBegin + objToParse.sortingNumber + strTdEnd + strTdBegin + objToParse.Garment_Use + strTdEnd + strTdBegin + objToParse.materialName + strTdEnd + strTdBegin + objToParse.description + strTdEnd + strTdBegin + objToParse.minorCategory.toUpperCase() + strTdEnd + strTdBegin + objToParse.uom.toUpperCase() + strTdEnd;
                    for (var q = 0; q < arrOfProperties.length; q++) {
                        var strValue = arrOfProperties[q];
                        var value = objToParse[strValue];
                        if (arrManualProperties.indexOf(strValue) == -1) {
                            objSelfReference.sewBomTableString += strTdBegin + value + strTdEnd;
                        };

                    };

                    objSelfReference.sewBomTableString += '</tr>';

                };
                objSelfReference.sewBomTableString += '</tbody></table>';
                $('#sewBomDiv').append(objSelfReference.sewBomTableString);
                $('#sewBomTable').DataTable(sewBomTableOptions);
                return arrBoms;
            });

        });
    };

};
/** function for sorting an array by name
*
*/
function objCompareByName(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
};
/** function for sorting an array by sortingIndex
*
*/
function objCompareBysortingIndex(a, b) {
    if (a.sortingIndex < b.sortingIndex)
        return -1;
    if (a.sortingIndex > b.sortingIndex)
        return 1;
    return 0;
};

