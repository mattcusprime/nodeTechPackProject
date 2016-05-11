var numOfImageLoops = 0;
var docDefinition = {};

function pdfSpec(productToSpec) {
    docDefinition = {};
    docDefinition.content = [];
    var objLayoutObject = {
        hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },
        // paddingLeft: function(i, node) { return 4; },
        // paddingRight: function(i, node) { return 4; },
        // paddingTop: function(i, node) { return 2; },
        // paddingBottom: function(i, node) { return 2; }
    };
    
    //docDefinition    
    docDefinition.footer = function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
    docDefinition.header = function (currentPage, pageCount) {
            // you can apply any logic and return any valid pdfmake element

        return { text: productToSpec.name, alignment: (currentPage % 2) ? 'left' : 'right' };
    };
    docDefinition.styles = {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        }
    };

    docDefinition.pageOrientation =  'landscape';
    //};
    if ($("#revisionAttributeTbl").length) {
        var arrRevisionAttributeData = pdfThisTableV2('revisionAttributeTbl');
        var objTextObject = {};
        objTextObject = {text:'Product Revision Attributes', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentRevisionAttributeData = {
            //text: {'Product Revision Attributes', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: { headerRows: 1, body: arrRevisionAttributeData },
            layout: objLayoutObject

        }
        docDefinition.content.push(objTextObject,objContentRevisionAttributeData);
    };
    if ($("#sizeTbl").length) {
        var arrSizeTbl = pdfThisTableV2('sizeTbl');
        var objTextObject = {};
        objTextObject = {text:'Sizing Table', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentSizeTbl = {
            //text: {'Size Table', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: { headerRows: 1, body: arrSizeTbl },
            layout: objLayoutObject
        
        };
       docDefinition.content.push(objTextObject,objContentSizeTbl);
    };
    if ($("#approvedSupplierTbl").length) {
        var arrApprovedSupplierTbl = pdfThisTableV2('approvedSupplierTbl');
        var objTextObject = {};
        objTextObject = {text:'Approved Suppliers', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentApprovedSupplierTbl = {

            //text: {'Approved Suppliers', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: { headerRows: 1, body: arrApprovedSupplierTbl },
            layout: objLayoutObject


        };
        docDefinition.content.push(objTextObject,objContentApprovedSupplierTbl);
    };
    if ($("#construction").length) {
        var arrConstructionTbl = pdfThisTableV2('construction');
        var objTextObject = {};
        objTextObject =  {text:'Construction', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentConstructionTbl = {
            //text: {'Construction', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: {headerRows: 1, body: arrConstructionTbl},
            layout: objLayoutObject
        };
        docDefinition.content.push(objTextObject,objContentConstructionTbl);
    };
    if ($("#measurements").length) {
        var arrMeasurementTbl = pdfThisTableV2('measurements');
        var objTextObject = {};
        objTextObject =  {text:'Measurements', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentMeasurementTbl = {
            //text: {'Measurements', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: {headerRows: 1, body: arrMeasurementTbl},
            layout: objLayoutObject
        };
        docDefinition.content.push(objTextObject,objContentMeasurementTbl);
    };
    if ($("#labelBom").length) {
        var arrLabelBomTbl = pdfThisTableV2('labelBom');
        var objTextObject = {};
        objTextObject =  {text:'Label Bom', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentLabelBomTbl = {
            //text: {'Labels', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: {headerRows: 1, body: arrLabelBomTbl},
            layout: objLayoutObject
        };
        docDefinition.content.push(objTextObject,objContentLabelBomTbl);
    };
    if ($("#colorwaysListTable").length) {
        var arrCwayGroupTbl = pdfThisTableV2('colorwaysListTable');
        var objTextObject = {};
        objTextObject =  {text:'Colorways List', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentCwayGroupTbl = {
            //text: {'Colorway Groups', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: {headerRows: 1, body: arrCwayGroupTbl},
            layout: objLayoutObject
        };
        docDefinition.content.push(objTextObject,objContentCwayGroupTbl);
    };
    if ($("#sewBomTable").length) {
        var arrSewBomTbl = pdfThisTableV2('sewBomTable');
        var objTextObject = {};
        objTextObject =  {text:'Sew Boms', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentSewBomTbl = {
            //text: {'Sew Boms', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: {headerRows: 1, body: arrSewBomTbl},
            layout: objLayoutObject
        };
        docDefinition.content.push(objTextObject,objContentSewBomTbl);
    };
    if ($("#sourceBomTable").length) {
        var arrSourceBomTbl = pdfThisTableV2('sourceBomTable');
        var objTextObject = {};
        objTextObject =  {text:'Source Boms', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]};
        var objContentSourceBomTbl = {
            //text: {'Source Boms', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]},
            style: 'tableExample',
            table: { headerRows: 1, body: arrSourceBomTbl },
            layout: objLayoutObject,
            pageBreak: 'after'
        };
        docDefinition.content.push(objTextObject,objContentSourceBomTbl);
    };
    //docDefinition.content.images = {};
    $('#imagesDiv img').each(function (index) {
        var strTextHeader = $(this).parent().attr('headerValue');
        var decodedHeader = decodeURIComponent(strTextHeader);
        var objTextObject = {};
        objTextObject = { text: decodedHeader, fontSize: 14, bold: true, margin: [0, 0, 0, 8] };
        var strBase64String = $(this).attr('src');
        var objImageToAdd = {};
        objImageToAdd.image = strBase64String;
        objImageToAdd.fit = [450, 450];
        objImageToAdd.pageBreak = 'after';
        docDefinition.content.push(objTextObject,objImageToAdd);
    });
    /*
    $('#colorwaysDiv table').each(function () {
        var strId = $(this).attr('id');
        var arrOfValuesFromTable = [];
        var objTableObject = {};
        var objTextBreak = { text: '', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] };
        arrOfValuesFromTable = pdfThisTableV2(strId);
        objTableObject.table = {
            headerRows: 1,
            body: arrOfValuesFromTable
        }
        objTableObject.style = 'tableExample';
        objTableObject.layout = objLayoutObject;
        docDefinition.content.push(objTableObject);
        docDefinition.content.push(objTextBreak);

    });*/



    pdfMake.createPdf(docDefinition).download(productToSpec.name + '.pdf');


    // open the PDF in a new window
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF (not working in this version, will be added back in a couple of days)
    // pdfMake.createPdf(docDefinition).print();

    // download the PDF


};

function pdfThisTable(idOfTable) {
    var arrValuesArray = [];
    //definitely need to replace this by getting rows.data of the DataTable
    //the function will need to first check if it is a dataTable, if so get the rows
    //if it is will have to also pull the Api function for the header.
    $('#' + idOfTable + ' tr').each(function (index) {
        var arrSingleRowOfValues = [];
        $(this).find('th,td').each(function () {
            var strCellValue = $(this).text();
            arrSingleRowOfValues.push(strCellValue);
        });
        arrValuesArray.push(arrSingleRowOfValues);
    });
    return arrValuesArray;
};

function pdfThisTableV2(idOfTable) {
    if ($.fn.DataTable.isDataTable('#' + idOfTable)) {
        var table = $('#' + idOfTable).DataTable();
        var arrColumnVisibility = table.columns().visible();
        var arrOfIndexesOfInvisibleColumns = [];
        for (var i = 0; i < arrColumnVisibility.length; i++) {
            if (arrColumnVisibility[i]) { arrOfIndexesOfInvisibleColumns.push(i) };
        };
        var arrValues = table.rows().data();
        for (var j = 0; j < arrValues.length; j++) {
            var arrRowArr = [];
            arrRowArr = arrValues[j];
            var arrNewRowArr = [];
            for (var k = 0; k < arrRowArr.length; k++) {
                try {
                    if (arrOfIndexesOfInvisibleColumns.indexOf(k) != -1) {
                        var strHtmlTest = arrRowArr[k];
                        if (typeof ($(strHtmlTest).attr('href')) != 'undefined') {
                            var strJustStringValue = $(strHtmlTest).text();
                            arrRowArr[k] = strJustStringValue;
                        };
                        arrNewRowArr.push(arrRowArr[k]);
                    };
                }
                catch (e) {
                    if (arrOfIndexesOfInvisibleColumns.indexOf(k) != -1) {
                        arrNewRowArr.push(arrRowArr[k]);
                    };
                };
            };
            arrValues[j] = arrNewRowArr;
        };

        var strHeaderRowHtml = $('#' + idOfTable).DataTable().columns().header();
        var arrHeaderRow = [];
        $(strHeaderRowHtml).each(function (indexOfEacher) {
            if (arrOfIndexesOfInvisibleColumns.indexOf(indexOfEacher) != -1) {
                var strHeaderCellText = $(this).text();
                arrHeaderRow.push(strHeaderCellText);
            };

        });
        arrValues.unshift(arrHeaderRow);
        return arrValues;
    }
    else {
        console.log('table was not a datatable.')
        pdfThisTable(idOfTable);
    }
};

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
        //  console.log(returnDataUrl);
        // ... or get as Data URI
        //callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
};

function convertImages() {
    $('img').each(function () {
        var strUrl = $(this).attr('src');
        var strParentId = '#' + $(this).parent().attr('id');
        convertImgToDataURLviaCanvas(strUrl);
    });
};

function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
};

function base64Img(base64Img) {
    docDefinition.content.push(base64Img);
    console.log(docDefinition);
};
