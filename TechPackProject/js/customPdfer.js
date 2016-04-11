function pdfSpec(productToSpec) {
    var arrRevisionAttributeData = $('#revisionAttributeTbl').DataTable().rows().data();
    var arrValuesArray = [];
    //for (var i = 0; i < arrRevisionAttributeData.length; i++) {
    $('#revisionAttributeTbl tr').each(function (index) {
        //var arrRow = arrRevisionAttributeData[i];
        var arrSingleRowOfValues = [];
        //for (var j = 0; j < arrRow.length; j++) {
        $(this).find('th,td').each(function () {
            var strCellValue = $(this).text();
            arrSingleRowOfValues.push(strCellValue);
        });

        //};
        arrValuesArray.push(arrSingleRowOfValues);
    });
    //};
    console.log(arrValuesArray);
    var docDefinition = {
        content: []
    };
    docDefinition.content.push({ text: productToSpec.name });
    docDefinition.content.push({
        table: {
            headerRows: 1,
            body: arrValuesArray
        }
    });
    pdfMake.createPdf(docDefinition).download();


    // open the PDF in a new window
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF (not working in this version, will be added back in a couple of days)
    // pdfMake.createPdf(docDefinition).print();

    // download the PDF
    

};