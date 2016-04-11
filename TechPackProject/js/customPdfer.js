function pdfSpec(productToSpec) {
    var arrRevisionAttributeData = pdfThisTable('revisionAttributeTbl')//.DataTable().rows().data();
    var arrGarmentHeader = pdfThisTable('garmentHeader');
    //sizeTbl,approvedSupplierTbl,
    var arrSizeTbl = pdfThisTable('sizeTbl');
    var arrApprovedSupplierTbl = pdfThisTable('approvedSupplierTbl');

    var docDefinition = {
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

