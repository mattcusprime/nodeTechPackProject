var numOfImageLoops = 0;
var docDefinition = {};
function pdfSpec(productToSpec) {
    var arrRevisionAttributeData = pdfThisTable('revisionAttributeTbl')//.DataTable().rows().data();
    var arrGarmentHeader = pdfThisTable('garmentHeader');
    //sizeTbl,approvedSupplierTbl,
    var arrSizeTbl = pdfThisTable('sizeTbl');
    var arrApprovedSupplierTbl = pdfThisTable('approvedSupplierTbl');

    docDefinition = {
        content: [
            { text: productToSpec.name },
            /*{
                table: {
                    headerRows: 1,
                    body: arrGarmentHeader
                }
            },
            	{ text: 'Sizing Table', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
            {
                table: {
                    headerRows: 1,
                    body: arrSizeTbl
                }
            },
            	{ text: 'Product Revisions', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
            {
                table: {
                    headerRows: 1,
                    body: arrRevisionAttributeData
                }
            },
            	{ text: 'Approved Suppliers', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
            {
                table: {
                    headerRows: 1,
                    body: arrApprovedSupplierTbl
                }
            }
            */
        ],
        pageOrientation: 'landscape'
    };

    //docDefinition.content.push({ text: productToSpec.name });
    docDefinition.content.push({
        text: 'Garment Header', fontSize: 14, bold: true, margin: [0, 0, 0, 8]
    });
    docDefinition.content.push({
        table: {
            headerRows: 1,
            body: arrGarmentHeader,
            pageBreak: 'before'
        }
    });
    docDefinition.content.push({
        text: 'Sizing Table', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]
    });
    docDefinition.content.push({
        table: {
            headerRows: 1,
            body: arrSizeTbl,
            pageBreak: 'before'
        }
    });
    docDefinition.content.push({
        text: 'Product Revisions', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]
    });
    docDefinition.content.push({
        table: {
            headerRows: 1,
            body: arrRevisionAttributeData,
            pageBreak: 'before'
        }
    });
    docDefinition.content.push({
        text: 'Approved Suppliers', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8]
    });
    docDefinition.content.push({
        table: {
            headerRows: 1,
            body: arrApprovedSupplierTbl,
            pageBreak: 'before'
        }
    });
    /*$('img').each(function(){
		var strSrc = $(this).attr('src');
		docDefinition.content.push({
			image: strSrc
		
		});
	});*/


    pdfMake.createPdf(docDefinition).download();


    // open the PDF in a new window
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF (not working in this version, will be added back in a couple of days)
    // pdfMake.createPdf(docDefinition).print();

    // download the PDF


};

function pdfThisTable(idOfTable) {
    var arrValuesArray = [];
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

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
        console.log(returnDataUrl);
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

