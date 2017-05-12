//Global Variables
var arrGarmentProductsArrayForTypeAhead = [];
/*var strDomString = '<"top"fp>rt<"bottom"l><"clear">';
search turned off
*/
var strDomString = '<"top"p>rt<"bottom"l><"clear">';
var strDomRevisionString = '<"top"p>rlt<"bottom"><"clear">';
var strCwayBomDomString = 'l<"top"fp>rt<"bottom"l><"clear">';
//var strDomMeasurementString = 'Brtip';//use this one if Wendy wants to turn off measurement search
// comment the above one with the B in to turn undo button on
var strDomMeasurementString = 'rtip';
var strDomSizingString = 'rtip';
var arrButtons = ['copy', {
	extend : 'pdf',
	text : 'Save section as PDF',
	exportOptions : {
		modifier : {
			page : 'current'
		},
		filename : 'testing filename'
	}
}];
//var arrButtonsMasurementButtons = ['colvis'];
var arrButtonsNoButtons = [];
// maybe put a second DOM string???
// table options
var constructionTableOptions = {
	'pageLength' : 50,
	'order' : [[0, 'asc']],
	'columnDefs' : [{
		'visible' : false,
		'targets' : [0, 11]
	},
	{
		'targets' : [0,1,2,3,4,5,6,7,8,9,10,11],
		'sortable':false
	}],
	'buttons' : arrButtonsNoButtons,
	'responsive' : false,
	'dom' : strDomString,
	'paging' : true
};
var measurementTableOptions = {
	'pageLength' : 50,
	//'order' : [[0, 'asc']],
	'dom': strDomMeasurementString,
	//'buttons': arrButtonsMasurementButtons,
	"buttons":[
            /*{
                text: 'Save',
                action: function ( e, dt, node, config ) {
                    //alert( 'Button activated' );
					//console.log($(dt).attr('id'));
					var strId = $(node).parent().find('a.dt-button').attr('aria-controls');
					saveStateOfTable(strId);
					//alert('state saved')
					//console.log();

                }
			},*/
			{
                text: 'Reload',
                action: function ( e, dt, node, config ) {
                    var strId = $(node).parent().find('a.dt-button').attr('aria-controls');
					loadStateOfTable(strId);
					//alert('state saved')
                }
            }
        ],
	"columnDefs" : [{
		"targets" : [0, 3, 4, 7, 8],
		//"targets" : [3, 4, 7, 8],
		"visible" : false,
		"searchable" : false
	}],
	'responsive' : false,
	'paging' : true
	//'ordering' : false
};
/*var sewBomTableOptions = {

	"columnDefs" : [{
		"targets" : [0, 1, 2, 3, 4, 5,7,8,11,13,14,15,16,18,19,20],
		"visible" : false,
		"searchable" : false
	}],
	'buttons' : arrButtonsNoButtons,

};*/
var routingBomTableOptions = {
	"pageLength" : 1000,
	"dom" : strDomString,
    'buttons': arrButtonsNoButtons,
	'order':[[1,'asc'],[2,'asc'],[3,'asc'],[4,'asc'],[5,'desc'],[6,'asc'],[7,'asc'],[8,'asc']]
	

};
var sewBomTableOptions = {
	"pageLength" : 1000,
	"dom" : strDomString,
    'buttons': arrButtonsNoButtons,
	'columnDefs': [{
	    'targets': [0],
	    'orderData': [0],
		'visible': false
	}]

};
var sourceBomTableOptions = {
	"pageLength" : 1000,
	"dom" : strDomString,
	'buttons' : arrButtonsNoButtons,
	'columnDefs': [{
	    'targets': [0,1],
	    'orderData': [1,0],
	},
	{
	    'targets': [0,1],
		'visible': false
	}]

};
var colorwayListTableOptions = {

	'paging' : false,
	'length' : 1000,
	'dom' : strDomString,
	'buttons' : arrButtonsNoButtons,
	'columnDefs': [{
	    'targets': [0,1,2],
	    'orderData': [0,1,2],
		"sortable":false
	}]

};
var cwayReportTableOptions = {
	'responsive' : false,
	'pageLength' : 100,
	'dom': strDomString,
	'columnDefs': [{
	    'targets': [0, 1,2],
	    'orderData': [0, 1,2],
		"sortable":false
	}],
	'buttons' : arrButtonsNoButtons
};
var colorwayBomTableOptions = {

	'pageLength' : 100,
	'dom': strCwayBomDomString,
	'columnDefs' : [{
		'visible' : false,
		'targets': [0, 1,2],
        'orderData': [0,1,2]
	}],
	'responsive' : false,
	'buttons': arrButtonsNoButtons,
    'colReorder':true

};
var spreadBomTableOptions = {

	'scrollY' : 600,
	'paging' : false,
	'length' : 1000,
	'dom' : strDomString,
	//'data': '',
	'columns' : [{
		'data' : 'pCodeSpread'
	}, {
		'data' : 'cMethCodeSpread'
	}, {
		'data' : 'manfOptionSpread'
	}, {
		'data' : 'sortValue'
	}, {
		'data' : 'shadeSpread'
	}, {
		'data' : 'sizeSpread'
	}, {
		'data' : 'pMastSpread'
	}, {
		'data' : 'conWidthSpread'
	}, {
		'data' : 'numGarmentsSpread'
	}, {
		'data' : 'muSpread'
	}, {
		'data' : 'totLengthSpread'
	}, {
		'data' : 'plySpread'
	}, {
		'data' : 'useYdDzSpread'
	}, {
		'data' : 'usageLBDZSpread'
	}],
	'order' : [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
	'responsive' : false,
	"columnDefs" : [{
		"targets" : [3],
		"visible" : false,
		"searchable" : false
	}],
	'buttons' : arrButtons
};
var trimBomTableOptions = {

	'scrollY' : 700,
	'paging' : false,
	'length' : 1000,
	//'data': '',
	"dom" : strDomString,
	'columns' : [{
		'data' : 'pCode'
	}, {
		'data' : 'cMethCode'
	}, {
		'data' : 'manfOption'
	}, {
		'data' : 'shade'
	}, {
		'data' : 'sortValue'
	}, {
		'data' : 'size'
	}, {
		'data' : 'trimPatternNumAndVersion'
	}, {
		'data' : 'numGarments'
	}, {
		'data' : 'trimCutWidth'
	}, {
		'data' : 'totLength'
	}, {
		'data' : 'useYdDz'
	}, {
		'data' : 'usageLBDZ'
	}],
	'order' : [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc'], [4, 'asc']],
	'responsive' : false,
	"columnDefs" : [{
		"targets" : [4],
		"visible" : false,
		"searchable" : false
	}],
	'buttons' : arrButtonsNoButtons
};
var labelBomTableOptions = {
	//"data": arrLabelData,
	"pageLength" : 1000,
	"dom" : strDomString,
	'buttons' : arrButtonsNoButtons

};
var sizeTableOptions = {

    "order": [[11, "asc"]],
    "dom":strDomSizingString,
	"columnDefs" : [{
		"targets" : [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12],
		"visible" : false,
		"searchable" : false
	},
	
	{
		"targets" : [3,13,14],
		"visible" : true,
		"searchable" : false,
		"sortable":false
	}],
	'buttons' : arrButtonsNoButtons,
	'colReorder': true
};
var numRevisionsToGet = 10;
var revisionTableTableOptions = {

    "order": [[10, "desc"]],
	"dom" : strDomRevisionString,
	"columnDefs" : [{
		"targets" : [0, 2, 3, 4, 11,13,14],
		"visible" : false,
		"searchable" : false
},
	{
		"targets" : [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
		"sortable" : false
}],
	"pageLength" : numRevisionsToGet,
	'buttons': arrButtonsNoButtons,
	'colReorder': true
};
var reportsTableOptions = {

	'pageLength' : 5,
	"dom" : strDomString,
	"tableTools" : {
		"sSwfPath" : "C:/nodeTechPackProject/TechPackProject/js/copy_csv_xls_pdf.swf"
	},
	"responsive" : false,
	"columnDefs" : [{
		"targets" : [0],
		"visible" : false,
		"searchable" : false
	}],
	'buttons' : arrButtonsNoButtons
};
var approvedSupplierTableOptions = {
	"pageLength" : 1000,
	"dom" : strDomString,
	'buttons' : arrButtonsNoButtons,
    'colReorder':true
};

// table options
//
/**

 * @param {Object} objCurrentGarmentProduct is the garment product passed to the function for which to create the releated products div
 * @example var garment = new garmentProduct();
 * //invoke then the methods to get it's relationships
 * createRelatedProductsDiv(garment);
 */
function createRelatedProductsDiv(objCurrentGarmentProduct) {
	//$('#relationships').fadeOut().remove();
    $('#garmentHeader *').remove();
    $('#topLeftNav *').remove();
	var strSpecsDivString = appendBootStrapDivPage('relationships', 1);
	var strTableString = '<h1>Product Relationships</h1><table class="table" id="tblRelationships"><tr><th>Relationship</th><th>Product</th></tr><tbody>';
	if ( typeof (objCurrentGarmentProduct.colorwayProduct) != 'undefined') {
	    strTableString = strTableString + "<tr><td>Colorway Product</td><td>" + objCurrentGarmentProduct.colorwayProduct.name + "</td></td>";

	};
	if ( typeof (objCurrentGarmentProduct.patternProduct) != 'undefined') {
		strTableString = strTableString + "<tr><td>Pattern Product</td><td>" + objCurrentGarmentProduct.patternProduct.name + "</td></td>";
		$('#seasonSpecHeadersDiv').html('<p class="mb-0 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10"><i>Season</i> (' + objCurrentGarmentProduct.activeSeason + ') <i>Spec</i> (' + objCurrentGarmentProduct.activeSpecName + ') </p><p class="mb-0 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10"><i>Garment</i> (' + objCurrentGarmentProduct.name + ') </p><p class="mb-0 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10"><i>Pattern</i> (' + objCurrentGarmentProduct.patternProduct.name + ')</p>');
		//$('#garmentFormContainer').fadeIn();
		$('nav,li,#topLeftNav,#seasonSpecHeadersDiv,hr').fadeIn();
		//$('#runNew,.clearThisComponentOnNewGarmentLoad,nav,li').fadeIn();
	} else {
	    $('#seasonSpecHeadersDiv').html('<p class="mb-0 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10"><i>Season</i> (' + objCurrentGarmentProduct.activeSeason + ') <i>Spec</i> (' + objCurrentGarmentProduct.activeSpecName + ') </p><p class="mb-0 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10"><i>Garment</i> (' + objCurrentGarmentProduct.name + ')</p><br>');

		//$('#garmentFormContainer').fadeIn();
		$('nav,li,#topLeftNav,#seasonSpecHeadersDiv,hr').fadeIn();
		//$('#runNew,.clearThisComponentOnNewGarmentLoad,nav,li').fadeIn();
	};
	if ( typeof (objCurrentGarmentProduct.labelProduct) != 'undefined') {
		strTableString = strTableString + "<tr><td>Label Product</td><td>" + objCurrentGarmentProduct.labelProduct.name + "</td></td>";
	};
	if ( typeof (objCurrentGarmentProduct.sellingProduct) != 'undefined') {
		//NOT YET READY TILL SELLING SPEC IS FURTHER ALONG
		
		//strTableString = strTableString + "<tr><td>Selling Product</td><td>" + objCurrentGarmentProduct.sellingProduct.name + "</td></td>";
		
		//NOT YET READY TILL SELLING SPEC IS FURTHER ALONG

		//SELLING PRODUCT NEEDS TO BE CHANGED TO PROCESS AN ARRAY OF SELLING PRODUCTS
	};
	strTableString = strTableString + "</tbody></table>";
	//$('head').append(strSpecsDivString);
	$('#garmentHeader').append(strTableString);

	//$('#navbar ul').first().append("<li><a href='#garmentHeader'>Relationships</a></li>");

};

/**
 * @param {String} strId is the id of an element on the page to pass to the function to create a pdf from the element.
 * It is an experimental functionality and works with sporadic success.
 */
function pdfFromHtml(strId) {

	var doc = new jsPDF('landscape');
	var tblFromHtml = document.getElementById(strId);
	//doc.fromHTML(tblFromHtml);
	for (var i = 0; i < currentGarmentProduct.base64DocumentArray.length; i++) {
		var objLoopObject = {};
		objLoopObject = currentGarmentProduct.base64DocumentArray[i];
		doc.addImage(objLoopObject.imageBase.src, 'PNG', 0, 0, 200, 200);
		doc.addPage();

	};

	doc.save('imageTest.pdf');

};
/**
 * convertImgToBase64
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat='image/png']
 * @author HaNdTriX
 * @example
 convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
 console.log('IMAGE:',base64Img);
 })
 */

function convertImgToBase64(url, callback, outputFormat) {
	$('canvas').remove();
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		callback.call(this, dataURL);
		// Clean up
		canvas = null;
	};
	img.src = url;
}

/**
 * Creates a simple 0 configuration table.   The length of arrHeaderObjects will deterimine the number of columns in the table.
 * @param {String} strTableId is the id to give to the table as a string
 * @param {Array} arrHeaderObjects is an array that will populate the number of columns and headers with the text values in that array.
 */

//not using in GP class, move to table creation for report pages
function createBaseDataTableHtml(strTableId, arrHeaderObjects) {
	var strTableString = '<table id="' + strTableId + '" class="col-xs-12 col-md-8"> <thead><tr>';
	for (var i = 0; i < arrHeaderObjects.length; i++) {
		var strHeaderString = arrHeaderObjects[i];
		strTableString = strTableString + '<th>' + strHeaderString + '</th>';

	};
	strTableString = strTableString + '</tr></thead><tbody></tbody></table>';
	return strTableString;

};

/*
 /**
 * Returns a div string that contains a 'page' -> container -> article string with the article having a class of col-md-4 col-sm-6 col-xs-12
 * @param {String} strDivId is the id to give to the Div as a string
 * @param {Number} numRows is an array that will populate the number of rows that will be contained in the bootstrapped rows
 * @return {String} strDivString this string is an html div string that is the full bootstrapped div with a fluid container.
 */
function appendBootStrapDivPage(strDivId, numRows) {
	var strBaseDiv = '<div id="' + strDivId + '" class="page">';
	var strMidDiv = '<div class="container-fluid">';
	var strRow = ""
	for (var i = 0; i < numRows; i++) {
		strRow = strRow + '<div class="row"></div>';

	};
	var strDivString = strBaseDiv + strMidDiv + strRow + "</div></div>";
	return strDivString;

}

// get base 64 image functions were removed from here due to lack of use and correct function/usage.
/**
 * function used in the Typeahead from Twitter, used to populate matches for a typeahead field
 * @param {Array} arrStrings an Array of strings to use for matching against the regex
 * need to change this to be just the function and then later on instantiate variables like substring matcher dynamically
 */
var substringMatcher = function(arrStrings) {
	return function findMatches(q, cb) {
		var matches, substringRegex;
		// an array that will be populated with substring matches
		matches = [];
		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');
		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(arrStrings, function(i, str) {
			if (substrRegex.test(str)) {
				// the typeahead jQuery plugin expects suggestions to a
				// JavaScript object, refer to typeahead docs for more info
				matches.push({
					value : str
				});
			}
		});
		cb(matches);
	};
};

/*
 @param url from which to get data
 @param {String} strFunctionUrl jquery selector string for element which will receive the typeahead functionality
 @param {String} strJquerySelector jquery selector string to use on the document element within the xml response to populate the array for the typeahead
 @param {Array} arrDataDocumentSelector is an array to store the result which will be used for the data source for the typeahead
 */
function applyTypeAheadToElement(strFunctionUrl, strJquerySelector, arrDataDocumentSelector) {
	arrGarmentProductsArrayForTypeAhead = [];
	$.ajax({
		url : strFunctionUrl

	}).done(function(data) {
		$(arrDataDocumentSelector, data).each(function() {
			var gProdName = $(this).text();
			gProdName = gProdName.substring(3, 1000);
			arrGarmentProductsArrayForTypeAhead.push(gProdName);
		});
		$(strJquerySelector).typeahead({
			hint : true,
			highlight : true,
			minLength : 2
		}, {
			name : 'gProd',
			displayKey : 'value',
			source : substringMatcher(arrGarmentProductsArrayForTypeAhead)
		});
		$('#loadingInfo').parent().fadeIn();
		$(strJquerySelector).focus();
	});

};

//allows for slow animated scroll; takes no param should just be fired after the document and relevant links are loaded.
function makeMeSCrollSlow() {
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop' : $target.offset().top - 100
		}, 900, 'swing', function() {
			window.location.hash = target;
		});
	});
};

//prepopulates the elemSelector field based on a check of local storage for param 0
/*
 @param url from which to get data
 @param {String} strCheckFor checks against localStorage to see if the string exists or is saved.
 @param {String} strJqSelectorToPopulateIfStorageExists is a jquery selector string used to populate an input based on the existence of the localStorage item

 */
function checkStorageFor(strCheckFor, strJqSelectorToPopulateIfStorageExists) {
	if ( typeof (localStorage.getItem(strCheckFor)) == 'undefined') {
		//alert('nothing');
	} else {
		//alert(localStorage.getItem('lastGarmentRan'));
		$(strJqSelectorToPopulateIfStorageExists).val(localStorage.getItem(strCheckFor));
	};
};
/*
 * @param {String} strParentJquerySelectorJustStringNoPound, it must have measurementDetail
 * @param {String} strChildJquerySelectorForTableJustStringNoPound, it must have measurementDetail
 * @param {Object} garmentProduct, it must have measurementDetail
 * @param {String} strTableString is the table string to pass that will be appended and made into a DataTable
 */
function createComponentTable(strParentJquerySelectorJustStringNoPound, strChildJquerySelectorForTableJustStringNoPound, strTableString, options, dontRemove) {
	if ( typeof (dontRemove) == 'undefined'|| dontRemove == false) {
		$('#' + strParentJquerySelectorJustStringNoPound + ' *').remove();
	};
    
        $('#' + strParentJquerySelectorJustStringNoPound).append(strTableString);
        if (!$.fn.DataTable.isDataTable('#' + strChildJquerySelectorForTableJustStringNoPound)) {
            var table = $('#' + strChildJquerySelectorForTableJustStringNoPound).DataTable(options);
        } else {
            console.log('#' + strChildJquerySelectorForTableJustStringNoPound + ' table has already been initialized.');
            $('#' + strChildJquerySelectorForTableJustStringNoPound).parent().remove();
            $('h1[headerForThisTable="' + strChildJquerySelectorForTableJustStringNoPound + '"]').not('h1[headerForThisTable="' + strChildJquerySelectorForTableJustStringNoPound + '"]:last').each(function () {
                var strMyheaderValue = $(this).attr('headerForThisTable');
                if (strMyheaderValue == strChildJquerySelectorForTableJustStringNoPound) {
                    $(this).remove();
                };
            });
            var table = $('#' + strChildJquerySelectorForTableJustStringNoPound).DataTable(options);
        }

	

};

/*
 *
 */

function compare(a, b) {
	if (a.sortingNumber < b.sortingNumber)
		return -1;
	if (a.sortingNumber > b.sortingNumber)
		return 1;
	return 0;
};


function getLogin(arrAttributeValueListArray, objCurrentGarmentProduct, arrReportsArray) {
	var strInput1 = '<input id="usr" placeholder="User Name" type="text" name="username"></input>';
	var strInput2 = '<input id="pwd" placeholder="Password" type="password" name="password"></input>';
	var strInput3 = '<button class="closer">Close Application</button>';
	var strInput4 = strInput1 + strInput2;
	var strReportsXmlSuffix = 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/invokeAction?oid=OR%3Awt.query.template.ReportTemplate%3A12143436&action=ProduceReport&u8=1'
	var strCacheReportUrl;
	var strUrlPrefixWithPass;
	//var strBase64 = btoa('reportuser' + ":" + 'reportuser');
	//var strUser = $('#usr').val();
	//var strPwd = $('#pwd').val();
	//localStorage.setItem('mattAppUser', strUser);
	//localStorage.setItem('mattAppPass', strPwd);
	//strUrlPrefixWithPass = 'http://' + strUser + ':' + strPwd + '@wsflexwebprd1v.res.hbi.net/'
	var strCurrentEnvironment = window.location.href;
	var numIndexOfWindChill = strCurrentEnvironment.indexOf('Windchill');
	//strUrlPrefixWithPass = strCurrentEnvironment.substring(0, numIndexOfWindChill);
	//strReportsXmlUrl = strUrlPrefixWithPass + strReportsXmlSuffix;
	//var numReportCheck = typeof (objParsedObject.report);
	//strCacheReportUrl = (numReportCheck != 'undefined') ? strReportsXmlUrl : 'cachedReports.xml';
	strCacheReportUrl = 'cachedReports.xml';
	if (window.location.href.indexOf('wsflexwebprd1v') != -1) {
		strCacheReportUrl = 'prodCachedReports.xml';
	};
	$.ajax({
			url : strCacheReportUrl,
			crossDomain : true,
			xhrFields : {
				withCredentials : true
			},
			type : "GET"//,
			//beforeSend : function(xhr) {
			//	xhr.setRequestHeader("Authorization", "Basic " + strBase64, 'Access-Control-Allow-Origin');
			//}
		}).done(function(data) {
			$('row', data).each(function() {
			    var strObjectId = $(this).find('report').attr('objectId').trim();
				var strReportName = $(this).find('report').text().replace(/(\r\n|\n|\r)/gm, "").trim();
				arrReportsArray.push(strObjectId, strReportName);
				objMasterReportObject[strReportName] = strObjectId;
				if (arrReportsThatIRun.indexOf(objMasterReportObject[strReportName]) != -1) {
					console.log(objMasterReportObject);
				};
			});
		}).done(function() {
			var gProdQueryUrlObjectId = getMyReportIdFromReportName('Garment Products For Typeahead');
			gProdQueryURL = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/invokeAction?oid=OR%3Awt.query.template.ReportTemplate%3A' + gProdQueryUrlObjectId + '&action=ProduceReport&u8=1';
			var numGprodCheck = typeof (objParsedObject.product);
			var prodQueryCachedUrl;
			prodQueryCachedUrl = (numGprodCheck == 'undefined') ? gProdQueryURL : 'cachedGarmentProducts.xml';
			applyTypeAheadToElement(prodQueryCachedUrl, '#gProd', 'Garment_Product_Name');

			currentGarmentProduct.getMyValueLists(strUrlPrefixWithPass, arrAttributeValueListArray, objCurrentGarmentProduct);

			$('#loadingInfo').parent().fadeOut().delay(500);
			$('#garmentFormContainer').fadeIn();

		});
};
function runNewProduct(wipeThisGarmentProductOut) {

	window.location.reload();
	/*for (var property in wipeThisGarmentProductOut) {
		if (wipeThisGarmentProductOut.hasOwnProperty(property)) {
			if (wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.sortingArray && wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.displayKeys && wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.displayValues) {
				wipeThisGarmentProductOut[property] = undefined;
			};
		};
	};
	$('#runNew,.clearThisComponentOnNewGarmentLoad,nav,#topLeftNav,hr').fadeOut();
	var strGPname = $('#topLeftNav').text();
	strGPname = strGPname.replace(/GP\W/g,'');
	$('#garmentFormContainer').fadeIn();
	$('#gProd').val('').focus();*/

};
/*
 Step 1 In your html file, add a Input tag block like below:
 <input id="export_file" type="file" nwsaveas style="display:none" nwworkingdir=""/>
 Step 2 Add a new function in your javascript file like below:
 */
function saveFile(name, tableDataSourceElementId) {
	var table = $(tableDataSourceElementId).DataTable();
	var data = table.data();
	fs.writeFileSync("blockSpread.csv", data);
	alert('file saved!')

};
/*
 Step 3 Save your file where ever you like by using saveFile(name,data) function like below:

 ...

 _exportCSV="you data to save";

 saveFile('#export_file',_exportCSV);

 */

function switchToSwatches() {
	$('td').each(function() {
		var strBackupColor = $(this).attr('backupBgColor');
		if ( typeof (strBackupColor) != 'undefined') {
			$(this).css('background-color', strBackupColor);
		};
	});

};

function getMyReportIdFromReportName(reportName) {
	/*var numIndexOfReportName = arrMasterReportIndexer.indexOf(reportName);
	 var numIndexOfId = numIndexOfReportName - 1;
	 var strObjectIdOfReport = arrMasterReportIndexer[numIndexOfId];*/
    strObjectIdOfReport = objMasterReportObject[reportName];
    
	if ( typeof (strObjectIdOfReport) == 'undefined') {
	    console.log(reportName + ' report not found.');
	};
	return strObjectIdOfReport;
};

function readSingleFile(evt, objGarmentProduct) {
	//Retrieve the first (and only!) File from the FileList object
	var f = evt.target.files[0];

	if (f) {
		var r = new FileReader();
		r.onloadend = function(e) {
			var contents = e.target.result;
			var objFunctionObject;
			objFunctionObject = JSON.parse(contents);
			var keyNames = Object.keys(objFunctionObject);
			for (var i = 0; i < keyNames.length; i++) {
				var strPropName = keyNames[i];
				var objPropValue = $(objFunctionObject).prop(strPropName);
				$(objGarmentProduct).prop(strPropName, objPropValue);
			};
			console.log(objFunctionObject, objGarmentProduct);
			objGarmentProduct.generateAvailableReportsList(objGarmentProduct);
			//$('body').append(contents);
			//console.log(currentGarmentProduct);
			/*alert("Got the file.n"
			 + "name: " + f.name + "n"
			 + "type: " + f.type + "n"
			 + "size: " + f.size + " bytesn"
			 + "starts with: " + contents.substr(1, contents.indexOf("n"))
			 );*/
		}
		r.readAsText(f);
	} else {
		alert("Failed to load file");
	}
};
function createGprodQuery() {

};

function makeMyRowsClickableToRemove(idSelector) {
	//var table = $(idSelector).DataTable(tableOptions);
	//retool this to alter actual data using the DataTables spec
	$(idSelector + " tbody tr").dblclick(function() {
		$(this).remove();
		var lastClassOfRow = '';
		var thisClassOfRow = '';
		$(idSelector + " tbody tr").each(function() {
			if ($(this).hasClass('even')) {
				thisClassOfRow = 'even';
			} else if ($(this).hasClass('odd')) {
				thisClassOfRow = 'odd';
			}
			;

			if (thisClassOfRow == 'even' && lastClassOfRow == 'even') {
				//lastClassOfRow = 'even';
				$(this).removeClass('even').addClass('odd');
			} else if (thisClassOfRow == 'odd' && lastClassOfRow == 'odd') {
				//lastClassOfRow = 'odd';
				$(this).removeClass('odd').addClass('even');
			}
			;

			if ($(this).hasClass('even')) {
				lastClassOfRow = 'even';
			} else if ($(this).hasClass('odd')) {
				lastClassOfRow = 'odd';
			}
			;
			//this effectively fixed redrawing based on row removal.

		});
		alert('row removed');
		//var table = $(idSelector);
		//table.draw();
		//table.row( $(this).parents('tr') ).remove().draw();

	});

};
var lastStateSave = {};
function saveStateOfTable(strId){
	//$(".dataTable").each(function(){
		//var strId = $(this).attr('id');
		var table = $('#' + strId).DataTable();
		var myData = table.data();
		var arrOfSelected = table.rows().nodes();
		lastStateSave[strId] = myData;
		lastStateSave[strId + '_Nodes'] = arrOfSelected;
	//});
	alert('State saved.');
};
function saveDataOfAllTables(){
	$(".dataTable").each(function(){
		var strId = $(this).attr('id');
		var table = $('#' + strId).DataTable();
		var myData = table.data();
		var arrOfSelected = table.rows().nodes();
		lastStateSave[strId] = myData;
		//lastStateSave[strId + '_Nodes'] = arrOfSelected;
	});
};
function loadStateOfTable(strId){
	//$(".dataTable").each(function(){
		//var strId = $(this).attr('id');
		var myData = lastStateSave[strId];
		var myNodes = lastStateSave[strId + '_Nodes'];
		var table = $('#' + strId).DataTable();
		table.clear().rows.add(myData).draw();
		table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var oldNode = myNodes[rowLoop];
			var newNode = table.row(rowIdx).node();
			if($(oldNode).is('.selected')){
				$(newNode).addClass('selected');
			};
		} );
		table.draw();

		//console.log(myData	);
		
	//});
	alert('State loaded.');
};