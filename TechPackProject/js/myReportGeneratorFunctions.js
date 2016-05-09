//Global Variables
var arrGarmentProductsArrayForTypeAhead = [];
var strDomString = '<"top"B>rt<"bottom"flp><"clear">';
var arrButtons = ['copy', {
    extend: 'pdf',
    text: 'Save section as PDF',
    exportOptions: {
        modifier: {
            page: 'current'
        },
        filename: 'testing filename'
    }
}];
var arrButtonsNoButtons = [];
// maybe put a second DOM string???
// table options
var constructionTableOptions = {
    'pageLength': 50,
    'order': [[0, 'asc']],
    'columnDefs': [
        { 'visible': false, 'targets': [0, 11] }
    ],
    //'buttons': arrButtons,
    'responsive': false,
    'dom': strDomString,
    'paging': true
};
var measurementTableOptions = {
    'pageLength': 50,
    'order': [[0, 'asc']],
    'dom': strDomString,
    //'buttons': arrButtons,
    "columnDefs": [
        {
            "targets": [0, 3, 4, 7, 8],
            "visible": false,
            "searchable": false
        }
    ],
    'responsive': false,
    'paging': true
};
var sewBomTableOptions = {

    "columnDefs": [
        {
            "targets": [0, 1, 2, 3, 4, 5, 7, 8, 11, 13, 15, 14, 16, 17, 18, 19, 20],
            "visible": false,
            "searchable": false
        }
    ],
    'buttons': arrButtons,

};
var colorwayListTableOptions = {

    'paging': false,
    'length': 1000,
    'dom': strDomString
    //'buttons': arrButtons,

};
var cwayReportTableOptions = {
    'responsive': false,
    'pageLength': 100,
    'dom': strDomString
    //'buttons': arrButtons
};
var colorwayBomTableOptions = {

    'pageLength': 100,
    'dom': strDomString,
    'columnDefs': [
        { 'visible': false, 'targets': 0 }
    ],
    'responsive': false
    //'buttons': arrButtons

};
var spreadBomTableOptions = {

    'scrollY': 600,
    'paging': false,
    'length': 1000,
    'dom': strDomString,
    //'data': '',
    'columns': [
        { 'data': 'pCodeSpread' },
     { 'data': 'cMethCodeSpread' },
     { 'data': 'manfOptionSpread' },
     { 'data': 'sortValue' },
     { 'data': 'shadeSpread' },
     { 'data': 'sizeSpread' },
     { 'data': 'pMastSpread' },
     { 'data': 'conWidthSpread' },
     { 'data': 'numGarmentsSpread' },
     { 'data': 'muSpread' },
     { 'data': 'totLengthSpread' },
     { 'data': 'plySpread' },
     { 'data': 'useYdDzSpread' },
     { 'data': 'usageLBDZSpread' }


    ],
    'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc']],
    'responsive': false,
    "columnDefs": [
        {
            "targets": [3],
            "visible": false,
            "searchable": false
        }
    ]
    //'buttons': arrButtons
};
var trimBomTableOptions = {

    'scrollY': 700,
    'paging': false,
    'length': 1000,
    //'data': '',
    "dom": strDomString,
    'columns': [
            { 'data': 'pCode' },
            { 'data': 'cMethCode' },
            { 'data': 'manfOption' },
            { 'data': 'shade' },
            { 'data': 'sortValue' },
            { 'data': 'size' },
            { 'data': 'trimPatternNumAndVersion' },
            { 'data': 'numGarments' },
            { 'data': 'trimCutWidth' },
            { 'data': 'totLength' },
            { 'data': 'useYdDz' },
            { 'data': 'usageLBDZ' }
    ],
    'order': [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc'], [4, 'asc']],
    'responsive': false,
    "columnDefs": [
        {
            "targets": [4],
            "visible": false,
            "searchable": false
        }
    ],
    'buttons': arrButtons
};
var labelBomTableOptions = {
    //"data": arrLabelData,
    "pageLength": 50,
    "dom": strDomString,
    'buttons': arrButtons

};
var sizeTableOptions = {

    "order": [[11, "asc"]],
    "columnDefs": [
        {
            "targets": [0, 1, 2, 5, 6, 7, 8, 9, 10, 11],
            "visible": false,
            "searchable": false
        }
    ]
    //'buttons': arrButtons
};
var revisionTableTableOptions = {

    "order": [[10, "desc"], [0, "asc"], [1, "desc"]],
    "dom": strDomString,
    "columnDefs": [
        {
            "targets": [2, 3, 4, 11],
            "visible": false,
            "searchable": false
        }
    ],
    "pageLength": 10,
    //'buttons': arrButtons
};
var reportsTableOptions = {

    'pageLength': 5,
    "dom": strDomString,
    //"tableTools": {
    //    "sSwfPath": "C:/nodeTechPackProject/TechPackProject/js/copy_csv_xls_pdf.swf"
    //},
    "responsive": false,
    "columnDefs": [
        {
            "targets": [0],
            "visible": false,
            "searchable": false
        }

    ]//,
    //'buttons': arrButtonsNoButtons
};
var approvedSupplierTableOptions = {

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
    var strSpecsDivString = appendBootStrapDivPage('relationships', 1);
    var strTableString = '<h1>Relationships</h1><table class="table" id="tblRelationships"><tr><th>Relationship</th><th>Product</th></tr><tbody>';
    if (typeof (objCurrentGarmentProduct.colorwayProduct) != 'undefined') {
        strTableString = strTableString + "<tr><td>Colorway Product</td><td>" + objCurrentGarmentProduct.colorwayProduct.name + "</td></td>";
    };
    if (typeof (objCurrentGarmentProduct.patternProduct) != 'undefined') {
        strTableString = strTableString + "<tr><td>Pattern Product</td><td>" + objCurrentGarmentProduct.patternProduct.name + "</td></td>";
        $('#topLeftNav').html(objCurrentGarmentProduct.name + '<br> Pattern: ' + objCurrentGarmentProduct.patternProduct.name);
    }
    else {
        $('#topLeftNav').text(objCurrentGarmentProduct.name);
    };
    if (typeof (objCurrentGarmentProduct.labelProduct) != 'undefined') {
        strTableString = strTableString + "<tr><td>Label Product</td><td>" + objCurrentGarmentProduct.labelProduct.name + "</td></td>";
    };
    if (typeof (objCurrentGarmentProduct.sellingProduct) != 'undefined') {
        strTableString = strTableString + "<tr><td>Selling Product</td><td>" + objCurrentGarmentProduct.sellingProduct.name + "</td></td>";
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
    img.onload = function () {
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
var substringMatcher = function (arrStrings) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(arrStrings, function (i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({ value: str });
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
        url: strFunctionUrl

    }).done(function (data) {
        $(arrDataDocumentSelector, data).each(function () {
            var gProdName = $(this).text();
            gProdName = gProdName.substring(3, 1000);
            arrGarmentProductsArrayForTypeAhead.push(gProdName);
        });
        $(strJquerySelector).typeahead({
            hint: true,
            highlight: true,
            minLength: 2
        },
   {
       name: 'gProd',
       displayKey: 'value',
       source: substringMatcher(arrGarmentProductsArrayForTypeAhead)
   });
        $(strJquerySelector).focus();
    });


};


//allows for slow animated scroll; takes no param should just be fired after the document and relevant links are loaded.
function makeMeSCrollSlow() {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 100
        }, 900, 'swing', function () {
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
    if (typeof (localStorage.getItem(strCheckFor)) == 'undefined') {
        //alert('nothing');
    }
    else {
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
function createComponentTable(strParentJquerySelectorJustStringNoPound, strChildJquerySelectorForTableJustStringNoPound, strTableString, options, removableRows) {
    //var tableString = objGarmentProductWithMeasurementDetailString.measurementTableString;
    //http://localhost:59193/DataTables-1.10.7/extensions/TableTools/swf/copy_csv_xls_pdf.swf
    $('#' + strParentJquerySelectorJustStringNoPound + ' *').remove();
    $('#' + strParentJquerySelectorJustStringNoPound).append(strTableString);
    if (typeof (options) != 'undefined') {
        var table = $('#' + strChildJquerySelectorForTableJustStringNoPound).DataTable(options);
    }
    else {
        var table = $('#' + strChildJquerySelectorForTableJustStringNoPound).DataTable();
    } ''
    /*{
        pageLength: 50,
        order: [[0, 'asc']],
        columnDefs: [
            { visible: false, targets: 0 }
        ],
        responsive: false,
        dom: 'ft',
        tableTools: {
            "sSwfPath": "C:/nodeTechPackProject/TechPackProject/js/copy_csv_xls_pdf.swf"
        },
        paging: true
        
        
        
    });*/



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
    var strParsedStringOfUrl = window.location.href;
    if (strParsedStringOfUrl.indexOf('dontRunPrompt') != -1) {
        return false;
    };
    var strInput1 = '<input id="usr" placeholder="User Name" type="text" name="username"></input>';
    var strInput2 = '<input id="pwd" placeholder="Password" type="password" name="password"></input>';
    var strInput3 = '<button class="closer">Close Application</button>';
    var strInput4 = strInput1 + strInput2;// + strInput3;
    var strReportsXmlSuffix = 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/invokeAction?oid=OR%3Awt.query.template.ReportTemplate%3A12143436&action=ProduceReport&u8=1'


    var strUrlPrefixWithPass;

    $(strInput4).confirm(function (e) {


        $('#loadingInfo').parent().fadeIn();


        //e.preventDefault();
        var strUser = $('#usr').val();
        var strPwd = $('#pwd').val();
        localStorage.setItem('mattAppUser', strUser);
        localStorage.setItem('mattAppPass', strPwd);
        strUrlPrefixWithPass = 'http://' + strUser + ':' + strPwd + '@wsflexwebprd1v.res.hbi.net/'
        //strUrlPrefixWithPass = 'https://' + strUser + ':' + strPwd + '@plmqa.hanes.com/'
        //strUrlPrefixWithPass = 'http://wsflexwebprd1v.res.hbi.net/';
        var strCurrentEnvironment = window.location.href;
        if (strCurrentEnvironment.indexOf('plmqa.hanes') != -1) {
            //arrOfAttributeValueListIds = ['2381876', '102771', '2381693', '17436676', '100575'];
            //strUrlPrefixWithPass = 'https://plmqa.hanes.com/';
            strUrlPrefixWithPass = 'https://' + strUser + ':' + strPwd + '@plmqa.hanes.com/';
        };
        //strUrlPrefixWithPass = 'https://@plmqa.hanes.com/';
        strReportsXmlUrl = strUrlPrefixWithPass + strReportsXmlSuffix;
        //$.get(strReportsXmlUrl, function (data) { }).done(function (data) {
        var strBase64 = btoa(strUser + ":" + strPwd);
        $.ajax({
            url: strReportsXmlUrl,
            //headers:['Access-Control-Allow-Origin'],
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + strBase64, 'Access-Control-Allow-Origin');
            }

        }).done(function (data) {

            $('row', data).each(function () {
                var strObjectId = $(this).find('report').attr('objectId');
                var strReportName = $(this).find('report').text();
                arrReportsArray.push(strObjectId, strReportName);

            });

        }).done(function () {
            var gProdQueryUrlObjectId = getMyReportIdFromReportName('Garment Products For Typeahead');
            gProdQueryURL = strUrlPrefix + 'Windchill/servlet/WindchillAuthGW/wt.enterprise.URLProcessor/invokeAction?oid=OR%3Awt.query.template.ReportTemplate%3A' + gProdQueryUrlObjectId + '&action=ProduceReport&u8=1';
            applyTypeAheadToElement(gProdQueryURL, '#gProd', 'Garment_Product_Name');
            currentGarmentProduct.getMyValueLists(strUrlPrefixWithPass, arrAttributeValueListArray, objCurrentGarmentProduct);
            $('#loadingInfo').parent().fadeOut().delay(500);
            $('#garmentFormContainer').fadeIn();
        });



    });
};


function runNewProduct(wipeThisGarmentProductOut) {
    for (var property in wipeThisGarmentProductOut) {
        if (wipeThisGarmentProductOut.hasOwnProperty(property)) {
            if (wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.sortingArray && wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.displayKeys && wipeThisGarmentProductOut[property] != wipeThisGarmentProductOut.displayValues) {
                wipeThisGarmentProductOut[property] = undefined;
            };
        };
    };
    $('#runNew,.clearThisComponentOnNewGarmentLoad,nav').fadeOut();
    $('#garmentFormContainer').fadeIn();
    $('#gProd').val('').focus();


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
    $('td').each(function () {
        var strBackupColor = $(this).attr('backupBgColor');
        if (typeof (strBackupColor) != 'undefined') {
            $(this).css('background-color', strBackupColor);
        };
    });

};

function getMyReportIdFromReportName(reportName) {
    var numIndexOfReportName = arrMasterReportIndexer.indexOf(reportName);
    var numIndexOfId = numIndexOfReportName - 1;
    var strObjectIdOfReport = arrMasterReportIndexer[numIndexOfId];
    return strObjectIdOfReport;
};



function readSingleFile(evt, objGarmentProduct) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onloadend = function (e) {
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

    $(idSelector + " tbody tr").dblclick(function () {
        $(this).remove();
        var lastClassOfRow = '';
        var thisClassOfRow = '';
        $(idSelector + " tbody tr").each(function () {
            if ($(this).hasClass('even')) {
                thisClassOfRow = 'even';
            }
            else if ($(this).hasClass('odd')) {
                thisClassOfRow = 'odd';
            };

            if (thisClassOfRow == 'even' && lastClassOfRow == 'even') {
                //lastClassOfRow = 'even';
                $(this).removeClass('even').addClass('odd');
            }
            else if (thisClassOfRow == 'odd' && lastClassOfRow == 'odd') {
                //lastClassOfRow = 'odd';
                $(this).removeClass('odd').addClass('even');
            };

            if ($(this).hasClass('even')) {
                lastClassOfRow = 'even';
            }
            else if ($(this).hasClass('odd')) {
                lastClassOfRow = 'odd';
            };
            //this effectively fixed redrawing based on row removal.

        });
        alert('row removed');
        //var table = $(idSelector);
        //table.draw();
        //table.row( $(this).parents('tr') ).remove().draw();


    });

};