var numOfImageLoops = 0;
var docDefinition = {};

function pdfSpec(productToSpec) {
	var sizeVar = 50;
	docDefinition = {};
	docDefinition.content = [];
	docDefinition.pageMargins = [40, 80, 40, 40];
	var backImageSrc = $('#frontSketch img:first').attr('src');
	var frontImageSrc = $('#frontSketch img:last').attr('src');

	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var dateForStuff = m_names[curr_month] + '-' + curr_date + '-' + curr_year;
	var objLayoutObject = {
		hLineWidth : function(i, node) {
			return (i === 0 || i === node.table.body.length) ? 2 : 1;
		},
		vLineWidth : function(i, node) {
			return (i === 0 || i === node.table.widths.length) ? 2 : 1;
		},
		hLineColor : function(i, node) {
			return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
		},
		vLineColor : function(i, node) {
			return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
		},
		paddingLeft: function(i, node) { return 4; },
		paddingRight: function(i, node) { return 4; },
		paddingTop: function(i, node) { return 2; },
		paddingBottom: function(i, node) { return 2; }
	};
	docDefinition.footer = function(currentPage, pageCount) {
		return currentPage.toString() + ' of ' + pageCount + ' Confidential: Not to be copied or distributed without the permission of Hanesbrands, Inc.';
	},
	docDefinition.pageSize = {
		width : 500,
		height : 900
	};
	docDefinition.pageOrientation = 'landscape';
	docDefinition.styles = {
		header : {
			fontSize : 18,
			bold : true,
			margin : [0, 0, 0, 10]
		},
		subheader : {
			fontSize : 16,
			bold : true,
			margin : [0, 0, 0, 0]
		},
		tableExample : {
			margin : [0, 0, 20, 0],
			alignment : 'center'
		},
		tableHeader : {
			bold : true,
			fontSize : 15,
			color : 'white',
			fillColor : 'black'
		}
	};

	var numObjStandardWidth = 500;
	var objPageOneContent = {};
	if ($("#frontBackImages img").length) {
		objHanesImage = {
			image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAAAnCAYAAAD0HF+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxMEZFNDFFREVDMzExRTRBQ0Q0QkRBNjA2RjVBRUFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxMEZFNDFGREVDMzExRTRBQ0Q0QkRBNjA2RjVBRUFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjEwRkU0MUNERUMzMTFFNEFDRDRCREE2MDZGNUFFQUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjEwRkU0MURERUMzMTFFNEFDRDRCREE2MDZGNUFFQUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7mL3ryAAAUCUlEQVR42uxb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',
			fit : [100, 100]
		};
		var objDateObject = {

			text : productToSpec.name + '\nPublished on ' + dateForStuff,
			fontSize : 12,
			bold : true,
			margin : [0, 0, 0, 8]
		};
		docDefinition.content.push(objDateObject);

		docDefinition.content.push(objHanesImage);
		var pageOneColumns = [];
		var objImageColumns = {};
		objImageColumns.columns = [];
		$("#frontBackImages img").each(function() {
			var strBaseSrcString = $(this).attr('src');
			objImageToPass = {
				image : strBaseSrcString,
				fit : [100, 100]
			};
			objImageColumns.columns.push(objImageToPass);

		});

		pageOneColumns.push(objImageColumns);

	};

	if ($("#generalAttributes").length) {
		var arrGattrTbl = pdfThisTableV2('generalAttributes');
		for (var i = 0; i < arrGattrTbl.length; i++) {
			var arrLittle = arrGattrTbl[i];

			for (var j = 0; j < arrLittle.length; j++) {
				var strReplace = arrLittle[j];
				if ( typeof (strReplace) === 'string') {
					strReplace = strReplace.replace(/<label>/g, ' ');
					strReplace = strReplace.replace(/<\/label>/g, ' ');
				};
				arrLittle[j] = strReplace;
			};
			arrGattrTbl[i] = arrLittle;

		};
		var objTextObject = {};
		objTextObject = {
			text : 'General Attributes',
			fontSize : 14,
			bold : true,
			pageBreak : 'before',
			margin : [0, 0, 0, 0]
		};
		var objGattributeContent = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrGattrTbl
			},
			layout : objLayoutObject

		};
		pageOneColumns.push(objGattributeContent);
	};

	if ($("#sizeTbl").length) {
		var arrSizeTbl = pdfThisTableV2('sizeTbl');
		var objTextObject = {};
		objTextObject = {
			text : 'Sizing Table',
			fontSize : 14,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		var objContentSizeTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrSizeTbl
			},
			layout : objLayoutObject
			

		};
		pageOneColumns.push(objContentSizeTbl);
	};
	objPageOneContent.columns = pageOneColumns;
	docDefinition.content.push(objPageOneContent);
	if ($("#approvedSupplierTbl").length) {
		var arrApprovedSupplierTbl = pdfThisTableV2('approvedSupplierTbl');
		var objContentApprovedSupplierTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrApprovedSupplierTbl
			},
			layout : objLayoutObject,
		    pageBreak : 'after'
		};
		docDefinition.content.push(objContentApprovedSupplierTbl);
	};
	if ($("#revisionAttributeTbl").length) {
		var arrRevisionAttributeData = pdfThisTableV2('revisionAttributeTbl');
		//reducing revision table to just first most recently sorted rows
		arrRevisionAttributeData = arrRevisionAttributeData.splice(0,10);
		var objTextObject = {};
		objTextObject = {
			text : 'Product Revision Attributes',
			fontSize : 14,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		var objContentRevisionAttributeData = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrRevisionAttributeData
			},
			layout : objLayoutObject

		}
		docDefinition.content.push(objTextObject, objContentRevisionAttributeData);
	};
	if ($("#measurements").length) {
		var arrMeasurementTbl = pdfThisTableV2('measurements');
		var objTextObject = {};
		objTextObject = {
			text : 'Measurements',
			fontSize : 14,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		var objContentMeasurementTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrMeasurementTbl
			},
			layout : objLayoutObject
		};
		docDefinition.content.push(objTextObject, objContentMeasurementTbl);
	};
	$('#measurementImagesSubDiv img').each(function(index) {
		var strTextHeader = $(this).parent().attr('headerValue');
		var decodedHeader = decodeURIComponent(strTextHeader);
		var objTextObject = {};
		objTextObject = {
			text : decodedHeader,
			fontSize : 10,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		//objTextObject.pageBreak = 'before';
		var numA4Width = 500;
		var numA4Height = 500
		var objImageToAdd = $(this);
		resizeImageProportionally(numA4Width, numA4Height, 0, objImageToAdd);
		var objImageToPass = {};
		objImageToPass.image = objImageToAdd[0].src;
		var numMaxWidth = 500;
		var numMaxHeight = 700;
		var numBackUpSmallerMaxWidth = 200;
		if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = objImageToAdd[0].width;

		} else if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass.fit = [numMaxWidth, numMaxHeight];
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = numMaxWidth;
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass = {
				image : objImageToPass.image,
				width : numBackUpSmallerMaxWidth
			};
		}
		;

		docDefinition.content.push(objTextObject, objImageToPass);

	});
	if ($("#construction").length) {
		var arrConstructionTbl = pdfThisTableV2('construction');
		var objTextObject = {};
		objTextObject = {
			text : 'Construction',
			fontSize : 14,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		var objContentConstructionTbl = {
			style : 'tableExample',
			table : {
				widths: [200,'*','*','*','*','*','*','*','*','*'],
				headerRows : 1,
				body : arrConstructionTbl
			},
			layout : objLayoutObject
			
		};
		docDefinition.content.push(objContentConstructionTbl);
	};

	$('#constructionImagesSubDiv img').each(function(index) {
		var strTextHeader = $(this).parent().attr('headerValue');
		var decodedHeader = decodeURIComponent(strTextHeader);
		var objTextObject = {};
		objTextObject = {
			text : decodedHeader,
			fontSize : 10,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		//objTextObject.pageBreak = 'before';
		var numA4Width = 500;
		var numA4Height = 500
		var objImageToAdd = $(this);
		resizeImageProportionally(numA4Width, numA4Height, 0, objImageToAdd);
		var objImageToPass = {};
		objImageToPass.image = objImageToAdd[0].src;
		var numMaxWidth = 500;
		var numMaxHeight = 700;
		var numBackUpSmallerMaxWidth = 200;
		if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = objImageToAdd[0].width;

		} else if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass.fit = [numMaxWidth, numMaxHeight];
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = numMaxWidth;
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass = {
				image : objImageToPass.image,
				width : numBackUpSmallerMaxWidth//,
			};
		}
		;

		docDefinition.content.push(objTextObject, objImageToPass);

	});
	$('#placementImagesSubDiv img').each(function(index) {
		var strTextHeader = $(this).parent().attr('headerValue');
		var decodedHeader = decodeURIComponent(strTextHeader);
		var objTextObject = {};
		objTextObject = {
			text : decodedHeader,
			fontSize : 10,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		//objTextObject.pageBreak = 'before';
		var numA4Width = 500;
		var numA4Height = 500
		var objImageToAdd = $(this);
		resizeImageProportionally(numA4Width, numA4Height, 0, objImageToAdd);
		var objImageToPass = {};
		objImageToPass.image = objImageToAdd[0].src;
		var numMaxWidth = 500;
		var numMaxHeight = 700;
		var numBackUpSmallerMaxWidth = 200;
		if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = objImageToAdd[0].width;
		} else if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass.fit = [numMaxWidth, numMaxHeight];
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = numMaxWidth;

		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass = {
				image : objImageToPass.image,
				width : numBackUpSmallerMaxWidth//,
			};
		}
		;

		docDefinition.content.push(objTextObject, objImageToPass);

	});
	$('#markerLayoutImagesSubDiv img').each(function(index) {
		var strTextHeader = $(this).parent().attr('headerValue');
		var decodedHeader = decodeURIComponent(strTextHeader);
		var objTextObject = {};
		objTextObject = {
			text : decodedHeader,
			fontSize : 10,
			bold : true,
			margin : [0, 0, 0, 0]
		};
		//objTextObject.pageBreak = 'before';
		var numA4Width = 500;
		var numA4Height = 500
		var objImageToAdd = $(this);
		resizeImageProportionally(numA4Width, numA4Height, 0, objImageToAdd);
		var objImageToPass = {};
		objImageToPass.image = objImageToAdd[0].src;
		var numMaxWidth = 500;
		var numMaxHeight = 700;
		var numBackUpSmallerMaxWidth = 200;
		if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = objImageToAdd[0].width;

		} else if (objImageToAdd[0].width < numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass.fit = [numMaxWidth, numMaxHeight];
		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height < numMaxHeight) {
			objImageToPass.width = numMaxWidth;

		} else if (objImageToAdd[0].width >= numMaxWidth && objImageToAdd[0].height >= numMaxHeight) {
			objImageToPass = {
				image : objImageToPass.image,
				width : numBackUpSmallerMaxWidth//,
			};
		}
		docDefinition.content.push(objTextObject, objImageToPass);

	});

	$('#colorwaysDiv table').each(function() {
		var strId = $(this).attr('id');
		var arrOfValuesFromTable = [];
		var objTableObject = {};
		var objTextBreak = {
			text : '',
			fontSize : 14,
			bold : true,
			pageBreak : 'before',
			margin : [0, 0, 0, 0]
		};
		arrOfValuesFromTable = pdfThisTableV2(strId);
		objTableObject.table = {
			headerRows : 1,
			body : arrOfValuesFromTable
		}
		objTableObject.style = 'tableExample';
		objTableObject.layout = objLayoutObject;
		docDefinition.content.push(objTableObject);
		docDefinition.content.push(objTextBreak);

	});
	if ($("#sewBomTable").length) {
		var arrSewBomTbl = pdfThisTableV2('sewBomTable');
		var objTextObject = {};
		objTextObject = {
			text : 'Sew Boms',
			fontSize : 14,
			bold : true,
			pageBreak : 'before',
			margin : [0, 0, 0, 0]
		};
		var objContentSewBomTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrSewBomTbl
			},
			layout : objLayoutObject
		};
		docDefinition.content.push(objTextObject, objContentSewBomTbl);
	};
	if ($("#sourceBomTable").length) {
		var arrSourceBomTbl = pdfThisTableV2('sourceBomTable');
		var objTextObject = {};
		objTextObject = {
			text : 'Source Boms',
			fontSize : 14,
			bold : true,
			pageBreak : 'before',
			margin : [0, 0, 0, 0]
		};
		var objContentSourceBomTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrSourceBomTbl
			},
			layout : objLayoutObject,
			pageBreak : 'after'
		};
		docDefinition.content.push(objTextObject, objContentSourceBomTbl);
	};

	if ($("#labelBom").length) {
		var arrLabelBomTbl = pdfThisTableV2('labelBom');
		var objTextObject = {};
		objTextObject = {
			text : 'Label Bom',
			fontSize : 14,
			bold : true,
			pageBreak : 'before',
			margin : [0, 0, 0, 0]
		};
		var objContentLabelBomTbl = {
			style : 'tableExample',
			table : {
				headerRows : 1,
				body : arrLabelBomTbl
			},
			layout : objLayoutObject
		};
		docDefinition.content.push(objTextObject, objContentLabelBomTbl);
	};
	pdfMake.createPdf(docDefinition).download(productToSpec.name + '  ' + dateForStuff + '.pdf');
};

function pdfThisTable(idOfTable) {
	var arrValuesArray = [];
	//definitely need to replace this by getting rows.data of the DataTable
	//the function will need to first check if it is a dataTable, if so get the rows
	//if it is will have to also pull the Api function for the header.
	$('#' + idOfTable + ' tr').each(function(index) {
		var arrSingleRowOfValues = [];
		$(this).find('th,td').each(function() {
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
			if (arrColumnVisibility[i]) {
				arrOfIndexesOfInvisibleColumns.push(i)
			};
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
						if ( typeof ($(strHtmlTest).attr('href')) != 'undefined') {
							var strJustStringValue = $(strHtmlTest).text();
							arrRowArr[k] = strJustStringValue;
						};
						arrNewRowArr.push(arrRowArr[k]);
					};
				} catch (e) {
					if (arrOfIndexesOfInvisibleColumns.indexOf(k) != -1) {
						arrNewRowArr.push(arrRowArr[k]);
					};
				};
			};
			arrValues[j] = arrNewRowArr;
		};

		var strHeaderRowHtml = $('#' + idOfTable).DataTable().columns().header();
		var arrHeaderRow = [];
		$(strHeaderRowHtml).each(function(indexOfEacher) {
			if (arrOfIndexesOfInvisibleColumns.indexOf(indexOfEacher) != -1) {
				var strHeaderCellText = $(this).text();
				var objToPush = {};
				objToPush.text = strHeaderCellText;
				objToPush.style = 'tableHeader';
				arrHeaderRow.push(objToPush);
			};

		});
		arrValues.unshift(arrHeaderRow);
		return arrValues;
	} else {
		console.log('table was not a datatable.')
		pdfThisTable(idOfTable);
	}
};

function getDataUri(url, callback) {
	var image = new Image();

	image.onload = function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.naturalWidth;
		// or 'width' if you want a special/scaled size
		canvas.height = this.naturalHeight;
		// or 'height' if you want a special/scaled size

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
	$('img').each(function() {
		var strUrl = $(this).attr('src');
		var strParentId = '#' + $(this).parent().attr('id');
		convertImgToDataURLviaCanvas(strUrl);
	});
};

function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
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

function resizeImageProportionally(maxWidth, maxHeight, ratio, imageToResize) {
	var width = $(imageToResize).width();
	// Current image width
	var height = $(imageToResize).height();
	// Current image height

	// Check if the current width is larger than the max
	if (width > maxWidth) {
		ratio = maxWidth / width;
		// get ratio for scaling image
		//$(imageToResize).css("width", maxWidth); // Set new width
		//$(imageToResize).css("height", height * ratio);  // Scale height based on ratio
		$(imageToResize).css("naturalWidth", maxWidth);
		// Set new width
		$(imageToResize).css("naturalHeight", height * ratio);
		// Scale height based on ratio
		height = height * ratio;
		// Reset height to match scaled image
		width = width * ratio;
		// Reset width to match scaled image
	}

	// Check if current height is larger than max
	if (height > maxHeight) {
		ratio = maxHeight / height;
		// get ratio for scaling image
		//$(imageToResize).css("height", maxHeight);   // Set new height
		//$(imageToResize).css("width", width * ratio);    // Scale width based on ratio
		$(imageToResize).css("naturalHeight", maxHeight);
		// Set new height
		$(imageToResize).css("naturalWidth", width * ratio);
		// Scale width based on ratio
		width = width * ratio;
		// Reset width to match scaled image
		height = height * ratio;
		// Reset height to match scaled image
	}

};

