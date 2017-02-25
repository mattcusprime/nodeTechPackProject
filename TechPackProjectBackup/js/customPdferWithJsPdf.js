var frontImage = {};
var backImage = {};
function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
};
function getImageDimensions(currentWidth, currentHeight, maxWidth, maxHeight) {
    function gcdOf(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    };
    var objDimensions = {};
    if (currentWidth != currentHeight) {
        var gcd = gcdOf(currentWidth, currentHeight);
    }
    else {
        var gcd = 1;
    };
    var ratio = currentWidth / currentHeight;
    var ratioInverted = currentHeight / currentWidth;
    var heightAdder = gcd * ratioInverted;
    objDimensions.width = 0;
    objDimensions.height = 0;
    //while (width < (maxWidth - gcd) && height < (maxHeight - heightAdder)) {
    while (objDimensions.width < maxWidth && objDimensions.height < maxHeight) {
        objDimensions.width += gcd;
        objDimensions.height += heightAdder;
    };
    return objDimensions;

};

function resizeImageProportionally2Params(maxWidth, maxHeight) {
    //var maxWidth = 100;  Max width for the image 
    //var maxHeight = 100;  Max height for the image 
    var ratio = 0; // Used for aspect ratio 
    //var width = $(this).width(); // Current image width 
    //var height = $(this).height(); // Current image height 
    // Check if the current width is larger than the max 
    if (width > maxWidth) {
        ratio = maxWidth / width; // get ratio for scaling image 
        $(this).css("width", maxWidth); // Set new width 
        $(this).css("height", height * ratio); // Scale height based on ratio 
        height = height * ratio; // Reset height to match scaled image 
        width = width * ratio; // Reset width to match scaled image
    } // Check if current height is larger than max 
    if (height > maxHeight) {
        ratio = maxHeight / height; // get ratio for scaling image 
        $(this).css("height", maxHeight); // Set new height 
        $(this).css("width", width * ratio); // Scale width based on ratio 
        width = width * ratio; // Reset width to match scaled image 
        height = height * ratio; // Reset height to match scaled image
    }

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
                        if (typeof ($(strHtmlTest).attr('href')) != 'undefined') {
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
        $(strHeaderRowHtml).each(function (indexOfEacher) {
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
        return false
        //pdfThisTable(idOfTable);
    }
};

function reduceColumnsInArray(arrayToReduce, mid, secondMid, end) {

    for (var i = 0; i < arrayToReduce.length; i++) {
        var arrMiniOriginalRow = arrayToReduce[i];
        arrMiniOriginalRow = reduceArrayBySplice(arrMiniOriginalRow, mid, secondMid, end)
        arrayToReduce[i] = arrMiniOriginalRow;
    }

    return arrayToReduce;
}

function reduceArrayBySplice(arrayToSplice, mid, secondMid, end) {
    var arrFirstHalf = arrayToSplice.splice(0, mid);
    var arrSecondHalf = arrayToSplice.splice(secondMid, end)
    var arrConcatenatedArray = arrFirstHalf.concat(arrSecondHalf);
    return arrConcatenatedArray

}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
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

function checkObjectKeysForProperty(objectToCheck, propertyToCheckFor) {
    var arrOfKeys = Object.keys(objectToCheck);
    if (arrOfKeys.indexOf(propertyToCheckFor) == -1) {
        return false
    }
    else {
        return true
    }

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

function docProcessor(garmentProduct) {
    var developmentImage = 'data:image/png;base64,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';
    var hanesImageDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuIAAABYCAYAAACwLZIFAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4AoFEBcNwOoC6gAAIABJREFUeNrsvXeUHNd17vs7VdW5p2emJ09PHmQMMgmCpEhKpkiJIhVJhSdRtvxEWdazZF+/ZcnpelH32e9eU77P9iJly8uSw7VIijJJkWIWMygGAEQY5DA5p57QPZ27qs77o2q6ewgwAAIgSLe+xYAJ6K7edc7Z3/52KCGlxIEDBw5+nSAT8XJmZn5TLCzeRjq5klwuhC5d1NU+RqTxm4TDg46VHDi4RPfv/HxEzM58gfjCJ2Um30o2W4mq5kRD/d9RW/ePlFdMO1Zy8OsCzTGBAwcOfiWQNwSGrmLqLnTdh2lqUuIim42IZOoKmUx8lGyugXSqhb6eEGPjyNgiIp2ETAbyEq668jZ+47qjlAX+EpfHcIzqwMFFgq4LDENFN7zoeT+mdGEaLplJryCVfJ9IpD6AkQ8zN7eOgUFFTk0iYguQyUEqDcGgl2vfdyeXXz5KecUPHIM6cIi4AwcOHFwspDI+OTf7G8zP/y7JxU0ilaohm/MiTcTUDPT2I3tOIqYnEQsLMDKKjMWRQkFKE2HoCABFwmWbP4op/8oxqgMHFwcymQqKqcnfJpG8kWRqE4sLEQxDQdcRY+PQ14/s6UPMTsHMNHJyGpFOIw07VjYMqKyCikpYueYzgEPEHThE3IEDBw4uCuKxsDxy9AiPP97AoUOg68i8DqaJQEIqhVyII2Lz1p9zWcjlASzyvUQGAKEKCJS9jlCdmjwHDi4GCV9YiPDmvkHuv19jcgJpGpDLIiVIKVESCYjFkQsxSKcgm0YY5mmvI7Jp8HnB5+12rOrAIeIOHDhwcLEwv3ATu3c38JOH4VRPkVS/k/O3fy6EoNAHo4KsqUFUVX8Pt8spS3Hg4GJgYvzbvP66xv0/glz6tH16pr0s7O+XfiUryxEtTVBV9X3HqA5+naA4JnDgwMEljdm5r4uDh2Ahtsw1vxMRX/pZkYQryNp6ZGMz1FQfc4zqwMHFgRgaukP0nrSU8JK9KazYuGQfW3REiFISDgKJFGDWVCM7V4xQXd3jWNXBrxMcRdyBAweXNgwjKHN5qK4CJEICC3HIZ4vOWijIJX3tTEUnqoaorITycseeDhxcTGQyVkDcHIFECkwTFmahtPxECDu4Pl0LBxCqBv4yRHnlzxyDOnCIuAMHDhxcTJQFX2bdmi7CIUimIJuD0XGrIXNuBlJphG5Ygppc8uuWCy8o4pqGqKiEYMCxpwMHFxGyMhxnfVeIsiCks9YElNFBGJ+A6Byk01a/hyil39L6eimu9gVQKqvB6z3kWNSBQ8QdOHDg4GKivf0PxVd/53sYRhCJR5qmR8Tin+X48Tt44gnYuRM50I80i268CAUwweWBmjoIlpmOQR04uHgQl10WYf36BvLZegDy+Vo5O/tH4sChHeKFl+Dpp2E+ipSySMaVpfoUO5BuqIN1q8HrcRo1HThE3IEDBw4uKjwenZraQl23AIhEnqex4c8pK5sgnVYYGkSYRY5tOfWSSnKfF9atgtrqVx2DOnBwEREIJAgEeoBCbbfS0vawjDRvluHqA6KvD3bPWaRbWvXgp1WY1dbCqlXg9Y44BnXw6wanWdOBAwe/mqiomBY33qByxXZEeTkluW2bjJd8K+CFDWuR9bXfdAznwMEvH6K2tlte/4EquX4thCvtPg/sUSoWKS+guhra23N43FHHcg4cIu7AgQMHlxYhR1aUg6rap5pACGFNX5Cm1QSmuKGiDuEP9joGc+DgEiHjLi0ha8OY4RBSGna79enzkERVNUQi/yxdroxjNQcOEXfgwIGDS8mZ53PWJIYlLAlpUha/CFdCde0RfP6YYzEHDi6RvZvLBjEMMK19esaxpF431NciGxvvFG6P7ljNwa8bnBpxBw4c/OoinfQxM4OYX0DqRoGAL6svLQtASwTqq/8El/MgHwcOLp39m2pRpqIwHy8+2EeUVKWoKqKqChobEKHQnGMwB7+OcBRxBw4c/Goirwumo5+S0zPIeJwl9XupR7NAxoPlUFkL/uBRx2gOHFw6kAsLX2Z8AubnSoLnkjDa60G2d1oTjxw4cIi4AwcOHFxCMAyVWOxzxBbP+AyfgluvqoaGRnC75x2jOXBwiZBwPS9kIvH+UhJ+2j72eGHVamRtXdyxmAOHiDtw4MDBpeTIpeEilVonctmSulJhTUspeUafbG5ErmgDVc05VnPg4NKA0A2XkspEZDZr79yl/asUvhZeL6xdA/V1/+FYzIFDxB04cODgUkIuVyYHBjqIzrDsoXwFl25/K9KEWNHZj+YQcQcOLhnMz1/B4GAl6XQpPV/+O74gorUNEQ5/zzGYA4eIO3DgwMElBJHJNXLyJHJy8q0/KXR7CRREYyM0Nf0+brfTqOnAwaWCaPRbnDxJKREXokjFJUBlJTQ1j1BRftIxmAOHiDtw4MDBpYRcLiJ6+2A6Wpy4AEhhsjS4UFSWQ00VsrJ8p2MwBw4uHcjo7AfNU32QztgkXCCFRGKNIpVeP2ZDHbRFvoDLCaId/PrCGV/owIGDX01kMpczO4NILi6fuLD0hcuFrK1B1NcjAqGEYzAHDi4diPlZLyNDkM0VC1JkSXFKUyOsXgX+oKOGO/i1hqOIO3Dg4FcTsYWPMj8HmXShMXOZI/d5kU0RZHVt0jGWAweXGKLTiPFR64FcgJTLn6kp2tsQ69eB4so6xnLw6wxHEXfgwMGvHuKxMEODWxkbB91YNvZMCIGUEvx+lJZWZJmjqDlwcCnBnJ9tEyNjiOFRZGH+v0DKQkiNqGtAtq+Imy4trTomc+AQcQcOHDi4hLAY30p0BplM2ey7QMMtEg6IUAi61kM4/O+OwRw4uDQgMxm3ONX/AoMjBdK9tH8LNFwAzU2IjvbP49LyjtUcOETcgQMHDi4lxOK/RTSKxEpnCwSy5NHYAqCiHLmxSycc/rFjMAcOLg2IbLaC7kMdDA8XM1mFbmuJEAqEy6G1GZqbnnTUcAcOEXfgwIGDSwyyt/d2uf8AIrdUX2qxcIEEuzRF+kOIcN1evN45x2IOHFwiyOWrZe8JmBgrBs32nhUAPh+0d1hPw3Xg4H8DOM2aDhw4+NXDxASirw+RX561FkuOXXVDbR3U1P6V8Hh1x2AOHFwiWIxdz8kTMDlRDKxLmzyCQVi/Aerq+x1jOfjfAY4i7sCBg189JBYRc3NIwyyScLvAVAJKfR20tUJ99TOOsRw4uIQwOfan4lQvLCYKSjil7dblFbB1K9TW/Q/HWA4cIu7AgQMHlxhkLF7L+ARyNgrmkgOXhSZNFAG11da/Lo/zIBAHDi4VjI1+kKMnG2Rswd62siSQtkl5KASrVkBlxdPCsZgDh4g7cODAAZh5UzVNU5UF5UoU/isEplAVQ1EVecFJeC6nMTnxF0xNQSrDWx6IveTRobUVWlucG+fAwaWEoeH/4ODBwtM0z4iaGmR723eViooxx2AOfql+zzCFaZiqNKVLmqjL/MySu1GEIQQGCBRVySva2ftBh4g7cODgHZGYS6/Lzqe/lstkrtKNfIVUlDxC5DGFX5ESl0sd9YS8P/RW+H7iDVzYxkiZzwbkzMQXxPyCTcFLzzwFMC1yvq4L1nbd69w9Bw4uIWIz2N8gug9ANnfavpVSIirKrbGFkZY/dazl4JeJXDobTM4nP55ZTP9WLpXfbOQok6apIUwUKUwJiikkmltbdLnUaUVV5j1lvvv9FYEfe8s802dFxI28oc4MzDyaiC5+JJfKK0K1lS4pcfk8utvvmfAE3DsRIE28QshiKCvxCkUsmJKKVCx1Yy6ZC5mmYSlSJkjdwFfpj5fXh/5reV3FP6ou9azSxKahi+jQ7D8vTid+U0/m3VKxikAFEs3nzrkDngGPz/UmQiBN6UVY1w0ghQAhMpjSm1xI3JRNZQNIgUABKTH0HGXVoYlwc/UnfBX+N1Xtwqt5b8Xc6Pw35kfn/mcunXNbkZWCaVifz+N35xrWNXb4Qr4LrgroubyWmEt8fHYw+kBqIaOpPjcqoEgwRQnXEVjj4uxBrxKJxARd4CvzJ2vXVHf5ywODF+o689m8e2Fk/l/i0/HPZ5JZRXWpLLXnefxaxh1w9Wo+9y4phRdrrdqXLlEUsZDP5LdmEtl1+XTeK00TIRTyuTy+cl+uvqP+Gl+Fb5/qUo1sIhueH5t7IDoSvUFRNFRFQVifFIRAYE3okIAQkiIftNVZKa3yCGvPWKYTlt2ksOy2PLAW9j9LxpZIadc82yteSIGQYNrLVEiBECaGrpM3TGrb6p6obq76jObT0ue8DjKGOzYV/7Pp/sk7F8bn0NM6i3MpFqNJ0rMJcukshtQBxdpfUiClieZSOgIh37X+cOD7vvIAnoAXzaPi8moEqsoIhgPJQIXvac2lDrj97md95f5XNI8rdy7XKJLpdnGqt5K5+YLZLVW+OD8cjxsa66Gu5v/5hYm/rguQCM11Uc4HqefFhXwvaehCqJq8FByd1A0B5nmxrcznVWEYqqlgoihS0dzGuV6T0FR58WygC6FdGvfj7A+MvOAs753oG0AcPY7MFbe/FNJ+Iq5AruhArF0JXvevzNNw89m8e25o9uHFmfjNuVROKC7NHqUq8bhdpifgGXQFPa8LQJrSa31exTrvhYFQxII0RUUqnr4+l8pWmrphnWeGxNBNQnXBkYpIxReClWWvKqoiowPT98Sm4r+bS+Y1FFBUsN5QWG5FsUe6Srtyz/Ytet5EdSuUVQf2V7dW3eAJ+C6YaGLqupjum/7Z/Oj8DcLiYqBYHs4b8Mb95f5nUVhA4kVK71Knj1BERgqZMXLGqtR86io9a2hSgmnqqIqCN+BN1q6o3e4PB46dz+tdjMa3z48sPDo/Nt+wMBkjHU+TjqWJRWNkF7OYWR1dN6xgUWDxSMtTo6hKpaIqlYoi8IZ8OwKVwbv9lX48PjcujwtvhY9QXTkVDeVPuPzasy631u12u/s1r2tG82g5AC2fyVf17eq7ZfjAMInoIoqmWeRCmnjKApq/MtAcCPtuF1gLA5t+LdEOoSgYUhKfjJFaSGMYhkXSTImRzVG3si7UcWXn3YGKwH2qS507u31ueAf29d8xsneExEQCU8W6mSa4y71uf6V/dSDkXS0EmIa0F5y1qaUiQFEwTUlsfJ7kQtLa7EIBQ5JNp2nb0tqw/vquZxr8jS2q5k5c7A3cv7vv7hMvHSeTymGnNTB1E2mYlFUH3Vd+8aoDrVtaai9C5Nc02TP50OGnDzPdO4OvPICKQEiJKezhzFJaNhUgpGmRMSmR0sTMQnl9RWD1DSsGWja33FJRV/nkBTnwUvnW/jf7bx/aN8j8xAIujwdhE2N/hdvrq/R1ucv8XVJa608I6/oAVE0lm8iSmFskE8tg6iZCVUgvpqjrrHNvv3X7M3W++hVgxpIzi3/S+3rPDUdePIKiuHC7XNahJgRSCASmXdooEUqRiCtSsdaelEhVsYm4uVS+gZDCCiNtx1MYnUvhtCwQ8VKSLgFhKihSwVR1pP1aioB8Jkcml+fyj192S3l1WZPm03rOxqaGbqjZxWzHYjTx3+dG5m6bODnFwJu9TBwfJRPPkZxPkVxIkUmn0NFLYjIrANIxUBD4hAdf0Icn6MMd8OLyq3hDbsJN1YSbwoHKutBtqlsj3FL1zc4dK24JVqnPqC7lrMmSSCSv4dhJmJ0tWkqI5ep4ZQXU1UBFqPc9E6JcVhPZXIBstpZ8rl7qeq2YX/iSWExsQ0oNr2eEYPB1WVb2U/ze43jdc8JXdk5Bj2nkhcjlvSKbL5O5bCP5fDW5XJucm/sa6VS7UJWELCvbTSj0qAj49hAMDeDx6efiDEUmExKZTC2J+HXEFz4jE+kuqbniSmXlA/j9r+Lz9eIPjOL1nP/JMrmcSi4bJJ8NmrlcRCIgb9Yo83O/K1LplcIw/FKimS5XXAR8b4pg2TN4vD0oJKRLi+Fxx4TLk8blOvM6ic6uZGz8H2QquUbquaAwTDdNDf/TbG66S9Hcb39vMlmNTCZMLluNlG6ZSN0oFxY+K3KZGqTUpNs1S2X4h1RUPCICviG8/twvbItMxk0uHySbrcfQgxhmiLnZPxDxxW1SqAiBjsc9Jqsqv4vX2yNU1zw+3wQB/0X3SwVk0xr5fIBcvpJcrhZBjmy2k4XYl0in1qEbPhRFR4g8Hs+orKq+G4+nTyCRHu8MHu+McLny2IGNHB69VfQPwsL8MiW8+FAfBVavQa5dY596F+jzpHMRdD0owSPMvIdMZisLi5+VPs8xM1T2qKqq0wiyUigIt3cMtzuGS0vjPnO/SS6VXdG3u/eWkQMjxKbiqF43UrF8j9/nUwIVgQ5fla9DoCBNiYmJIhUECqaSs/y+oRCbjpGKpTBzOooQGHmDfMag48qO5tXXrf6xvyzQBuSHuoe+3vdGH/GpJCigupSC21gi4ootplotNAoIQS6r4/JqVLVUbu26Yf1E+7YOr3KBBEg9mw/1vdF3w7Hnj6NoFm9DVVEEBCuDoYq6yttQbPFEGtb4WSEQihWY5TI54mMxsikDUwoMPYNLVaisDQe2337Fj/3hwIZfVHzMp/SmfDq3bX5i4XvjJ8drJg6PM35sgvHeSdILKTKJLIlYEgPd5r15e1UqpYWZpXIaLlx4Al58ZT48Hhduv5uyhgpqVtRSv6r+lkC59xaPz43X76WsLmSWR8r/sjJS+ZdaPptv69vVz9HnjhKbnAchURQVhGqpeAoI1VIErc2hIIVFxhUprK8RmIaBadgRAyqmYaIbOdq2teMJ+ei4rKPFE+SsiLiRM8NDe0c4+MRBosNzSMVEURWLlCggVIGi2mU7Ui4NJLV1RbPwqA9TN5CmaUWNSEzDWuDZRI7albWV1Z3VDS6/u+dinW+mYYiFsdg3Dzy2n9fvfwO3z4tQFBSLxZHL5PCHA4SbK2uCFd57qtprv3FBiXhK3zbTG+XUyz307enDVeZBIFCkFflJYYIwkVJBSBCYljqMYkfaOt4yD/37T3H9793wxGW3XiYujF/Ibu/d28exZ48Q7YuiaBooir1OBYoqEEK110AxaLSUa+sQlLqJaS4pzpJMPEPn9g5W7lhZGW4Ltygu37GFydgf9u8eZP9D3Ugh0NyaHf8qmEhMYQWbQgg7A2PdN8sa1k4x7XcWJaQVYUnk9hUhCpvYIutyaf61/fes37GVEwywjnA722MpHkZGRyJoWtfEmuvXtvrgrNbx1KnpV488dXjHyddPMHFqgtRsklQqi64bCAPQrX0tEGi4CoGBgkAFTDTLJhLSiSzZVA6UmBV4qIKRg+NoLhVNVUklM3RevYJP1YYe9wY91arLc9aKjEyntstTJxCzM1aAZe2aQsBFIIBo74DG5hE093tzMumMW/T3/QsHD94u9+5FDg+h5HSYn4dEwrp3HleNLAtsFRWVX2f9Onjf1TpXXx3CFzxrMq5EZzdx/PirHDwcEEeOQHQGslnM+XnIpEFRKoXf1ywbGm6jaz3cdPMRLt9+1o5HGR39PG/sutd8/TVEfx8iFkckkqCpDVRV3UllBaxdg7zxIyNs3LhOBHznj/TFF8Oyv/8R0XvqWnpOIXp6EMkU5PIwP49MpSBvIBSBcLkapM+7mlDF7ZQFkWVeWLMOuX6DbrY1/79KS+tfCffyEZRyaPALPPvsvdx3P2IuCorAcHkR/+eX7tS+9MW73va6UkkfJ46/yK49O+T+g5BYgFgMZT4Ouay1l92uBioq7mJ9113mxz8RFxu71omKynPPTE5Pbaa37ylO9jRw8ADm2Cgyl0dZmEMkkgipWmeDV2umvGIH4Upobkb+xvtNtmzdIKprj3GxkUgE6ev/iezpuYFjxxGneiCfhnQaFmLW/w0dKSySh8fdIcI11+LzQZkfsWEzbN6UZO2q91HX0E02qYl9ex6SI0NviaxVhDTsrKEC7augfc3fSCE4r05kZnalHBh4XPb1rlYO7IeREdB1yOUgnbWmMHk9W9VQ8HZUFRQVYY9RlGvXIjvbfyBWrPidM2Vvcun8lr69A5x4/jhzg/NIVVjr2kpd2jxFKfgB0z7vrZ9bohZSwdB1pCmxlRaMfN46ezVJw+r6BnNVg1so0hjpHuXQk0eYG53HNC1OZL3aktdRUITF10xpeRNhC2emaaK5FBZGF9xmHmPl+1ZckBHW+QztPW8M8Op9b+ANuilUWqCgaApCU0oeqvoWP4klZul5w0opC4lhWD6zoqGCFe/v7Ip0RX6h65vumdp9Yueprb27+xk7Ns7C+DxmWsfMG+TyGUzDRJpYlQFots9WC15ZYhQ+T3EKuMUFcqksRkYnISyOEB2KMryvH8WjIBQFIRTcmouGtQ3K+hvX33nNl6++T0Pi0XM6qViS+cQ8OjoKCgoaYhnbl3Yxglq44dbPLSKu2GUKBlbEJzFREZb6mDNA4j5rpwvoOYPkQpq5xBwGeRQUVFz2u1K4hdbVmIUoZclQJa4aA9O+QotKpOJp8nmDi50XTMVSm3p29d41dmyCmB7Hu5gt2FoAOfJkJ/P0vNZLXWfd1y80EZcSr543Sc4nmTfmUBYUmyqqtq2xbagUjhJZQhQNTJKpJNnFNJWN+/CW+eTaD6zRzrYU6V2v05RhI2OQjKaYTc8V6KylLWj2BpGFLb20JqX91VKIZq0DEzDJkad2thZDL16qYZpqNpklnkmgk0ekl/QbpYQYF4+N0vbF0sPW2gf6W9boEk0Xhd+1i14K119UykUJFZf2ateWReEGOooV4SNUEX+vtpwfn/9Cz2un7j31yin6dw8wcWqcxdiivT+W3tEsUeiLobhd4GXrBCWfXwqEIVi669bPMvZpYJAiTdVYFWZeP3cfu7DwITE2AonFUg28eE6FyqC1FVlevvNd32R05GaOHH1cHj8mOHUKMTAAvX0QjSINA5FJg24UVHc8LvD64NhxOH5Kkz19Ka655iHRteHT7+naT578Dt3d3+TQQet9RkZheATiMaShI9LpQskTimJNjzh+ApKZLvL6uNyypVP4fO9O/IeGvsCe3feydx8cPIg4eQKmZyCTRZj2zfF6kQE/HD2GPNXfLK7cscjll59k5crrCZ8b6ZTR6ErRP/C47O9bTX8/DAzA+DhyYtKaGZ3JgKFbjXol89+lEKBplm29HvC54eBhRPMujeqqO2nvuJM1a2Hdut+nuuo+YrErxUMP3ysffRS5ew8in0NoKmLNWoTbA77Q6TY6ceoeThz/OidOQO9J5IlTMDAEmaRFKtPZYqZXKODxIHv7EROTIT732VE+/CHt7RTRMxPZeDlDw9/l+MnbZfcBGOiHyWkYHETMzYFhQDqF1PViu7FivS+BALKmCo4fV7juuqPcfMvf0Nr2Z3jcF3Qevpya2sxA/2NieKRZ9vZBXx9MTsLoGIxPgJEHPY9MWSR8OZ9WwBsAlxt8Hjh2Ana/EaC97QBXXwWaJtm5EzE2VrJnJVKW0K+yIHR0QGvrnwn1PJQrLS6Wi6GhH3D8xG0cOgRDQzA9gxzot4Jf0wDdtAl5Flwq0u1BKKqlzns9yKPHIRJBNNTdwZrVd8i1a02xYuVXqa1/oJCtMPHlcwaLC0miqVmbaAubRyklJYeUnKXWn5WCD6Ag3xi23zIx0VDJJLK2f7J8sJ43SMZSzMZnyZNHLbzPkpfTSvzKkqij2O9gMbSDTx1CSik0rxJr2thU43K7c+d1LQkzl01liRO3tAzbj6mFa5Nn0JSXjQCwfaGOgYGOiYYbT5nXqn44l9hyLrluqmfywPjRMffwgSGGDwwz3jNFbDpGlgwqis0Wl+xvC5ElTLN4lQbLwwgKQhxSYhjFTE8mvyQMGxj2vVYBl99NKp7GlLg01aVO1q2opWlDBPWEQjaRx8jrmKZBPm9gmhIV1a6FlZhSsS/KLNxcaxEZKKqK5nYjhETRBL6Qj8iaRqoiYVSXOn22hlNVJVHdUUtkQwQpTfKJDIYuMUyJkc8hTcM2lGITG8M2koJZErEIrKhRc7tQFIHiUnH7PdSuqCdYFUJRtdjFJOKxqdj3jrxwhNj0In6CuEq2KHYQpCkqg/uGiaxvZsNNG1XlHNL47xWaW+sJ1ZZRu6KGhYl6pGHY+quCkTeRugGGWbIgl4+c0hBICelUhoNPHSSTyFLZWNkd6WrccJ6v83hdex2NqyPkUzqGqWOYlmJr5q3gWWJagoIQKKYEIS1Hb1rrFgFCE6iaikvTME1JzYoaglV+VJc6owhh+kLeU1XtVaubOprIxTMYeR1d1zF0HUM3kYalPlilL+oyQrhExoWwznJFs1OuKHbSRi61JhVHjixN3SvUmFuvYUoDU1pNTCyp+LJI0KUdbiqAy+tCVbX592LH6PDst0+8fPzOl773PANvDpCzFW8VDRduu+QM0BSEqqKoKoqQdiZMsKS/2BVLVpmOlOiGgWHoCMMsXCeo9qEmAC+BMh9uryunaMrZl3XkTSGmZ2qIRiGnF0MEWXKYl5cjOzvB79v59pFwwsfkxB28+NLd8iePIvfuQczMvsUZFMv+pbQyHyKTQ2ZysBBDHDuG3LsPRkZvE3/YsI6a6rdVLWVyMSiGR/6Ohx+5g0cehe59JWMXi8FMqa6CacLCgvVvOgu60WC2t12t+nzPvzPZP/UdXnzxm/z7v8ChQ5DJLXufwmfLZJCZDMzOwZEjsPt1+OjHVvPlr/w9ofLPcDYp62QqaE5P/7bYv/9uXngRues16DmFkki9o8hRoCdSWsQ8n4dF+2fDY/DGbpuglSM3bUR8+ra76ey4m8kp+I8fwqGDxc9VGUZ5//uha8NpD4GRPSe+I37606/z1DOwby8ymTij6LPsceuZDPT1Ivp6oaICNm/5BI0NP+E91HPLudk2Dh48Lp5/wcuzzyO790MJ4V7a64X1u2QI07SDgjQyGkU5fhIOHwPd/Kb81KeiorPjOxfEASQTQTk39yFef/0h8eKLsHsP9PQgU6lle0EsC8vfQp5ME5nUhYNRAAAgAElEQVS0b94CiIlx2PWGNSf8+uuhsVFw9ChienrZ6xT+q2mIxgZkayQnvL94wCHnom10Hzwpn3veLZ59Dnno4Gn34K2LUWZNZDZfIM4SkJOTiDftz14dRm7bpoiP3Px9rnv/Z1i77ibcLkN1a4O1HXXUr23E0A3MtIGpGximiZE3LFHXFgetfa4WcrWKrbJKIRFSR9EUVJcLIRRUTcFX7qOmrQZ/uR+hSEMIYVa1VtHY1Yhu6OSSWYQpMU2JYeiYhokwFAwEppCo0iwKPsIqnkBKxkdGyfw4SaDKF0IRk+1b28Pnc0mpHiZrO6toa24lHUtj5i32oC/5UGmVjlrVmErRHmJpoqWw/acPVbN65wJVZbRtbSUQLjur9WHohppaSG7reaNv96GnD3P0ucPM9s+gm7rtSa3SSolECIGqaFZGQ1VQVK3gbQsHtGn5R2vLWhQbKRGmgjSsigvDNJDSFn2FioILVVrsybD5s78qQKA6iKpoKc0T8PRv/eTW59p3dN6QnE2QS+WYHYkydGCAEy+dZHZ2HhWvZSYpC5GABBRR8MKYGNS01rDh5k3Ut9VSVlWGu8JHRX1FLtxY+Uduv3vkbG+my+uKb71503dbNzV9fWFqjnwyz9zIPAP7huh97RSz0Vk8eO2YxHhLpKnYm8lSwWuaqtn6ya3UdNbirwziDfipilTFq1qqbnH7PDMXk4gvjMd3DLzWT3w8ZtVil9JbYSCkRbqmBicZPTzC/MTcX1S1VH/7Ql2PN+Td3355+1cClYHv7/g/riSTymCmTRanFhnY38fQwWGmx6NLiSUr+rY3kWmXeAg7+7A4n6D3jR6e+8dnu666/Wpz1VUrz1vqy1/uf2XLx7Y81LSp6bb5iQWMrE50OMrQoUF6Xx8kFl2w4m1bZTEBIRW7iUWio+OWLjquWEHHZR1EVjXiCXioiJRRv67uBrffNalqqlHdUn39FZ+74rH2HR1bs/Ec+XSeVDzFwO4+Bnb3M9E/YasVLntHykL8vuSlXT4XFY3l1K9tIBgqQ9M0DGkgpbnMGUhpldUUey8UhFQQhkIytkh8Lk4mmWFxJsHidALdyNmOULE/o0AoKlZdvOl6xwPJyInYcPyu3ffv/ubOf9vJ3FgU3TBQSlQK3VZYQtXlNG9qJ9LVQHVbGM3tQnVpKIpSqHtXFIFhGGTTeVJzaYa7hxjYN8jUyDQmBh7cmHYzqyIEwrSPPaHmhRBnH1jOzW5ifAI5HyvW3du5OUtZk1BTB9suQ1SUP33G15ic3M4LL+7mkUfgYDdMTyMWE8sIxjJHLMWyrwucCRD9vfDUkxAsO8pnPvPHrOg8jSjJyantvPzybv7Xv8PRo8jpaSv9fEZSKkr0sRJSPjYKBw+hzMV/i4bGMxPxXFZlz+4J7r2vhqefthS/TK40ZC58huJ3lmp0QQ4NIQ/sQ0l9YcNZkfCBgTvkz579vnj+OcTx48hoFBGPQSb7rplGeZoStlw3LHx/MQ4HupFjI+DzIrN5lPHxwt8RAKFy5PuvRazo+PCy9/jpY1L+5EHEq6/B2Dgym12+/5aR4yWCaC7LdomJCejpvZ9wuIqg9s7lOztfjonHnwzJnTuRQ0NWyYOuLw887EBcLL2nPD04KVxjfx9875+gpu4us7HhHuW9ZETOhrCeOHGPeOGFr8uXXkSc7IGpKWQ8jsxmTiOtssROpd8z7T8oZ7KrlBax93gglbRKQZbtNXtNVoUxt2xAVIV3/sIf6uc/nxM/faySV3bC4CByMWGp3qftuZI9UeifF8t2ybKs59wCys6fI3e/CV/72g3yq1/9nBKJ3O8r97yy7WNbnuvc2n5DYiZONp0iNhZn/Mgkh188THRmBhfFfqalBxiJEv0baZ3ljasjbLxpAxWt1QQr/QSCHqqaa2Yqm8O3aC4tI1RVbvjQhr9pWNP4zfmJefRUjvRCmpnROQbf7Ge0e5h4wupzdaMh7XJK7Lr0Jdu78ZCOZdn5/dcw80plIBh8sHZVzafP17ryeN3zV372qlfat6y4dmF2gWw8S2JykZOvHWf0yCixhRiqVFCFUtzDAqRUkFYYgeb20Lmjk3UfWEuwKkBZdYhwU9isW113+dlcy/jRiYFX/u3nzb1v9BLtnya5kEA37fJSVAxMdGllHHxuP1UtVTSsbqRhZT3hSBh3wA0qCJd9QpgSDRUpJdl8DgHkU3liY4tM9Uwx0TvF7PgsydgiBnlc0vJ/pi0WCztLrmkKbpcLEHlNdalGw+qGG2s764SRNwJ63ihfnIn9dWRd4+2qUDn58kli0QSmHVmJkiNzScLXhMaKy1aw7sb1rL9pPTUt1X/sD/nvU/3uKZdLPefoVlEVWd1R/Y1wa/j389lsyMgZtfHpxb9tWBe5xeXVOP7SCRajCaSpo5y2tYRdUavQsW0FGz7UxaaPbtKrWms+5y3zvqR5XDHtPJdOvKfSyeji9okTE8wORcnqGTQ0O21RoqfaHddZsswMTNO/u+9Ot9/9VFl1aM+FuCaXW9PDkcofhGpD/2Zk9fJcJr/CzBorU7OJv4h01a9uPtTMwP5hBg8Osji1aBFPWWwuXJrwoSDQpSQ2HePgE924fW4RKPfvi6yPbDsvirhHy9Wuqv10ZWulO5fNN8qcWbswufAvkQ2Rrtr2Bvrf6GOke4hcLmcfdkrhYDXIU10bpuPyTtZ/ZAMdl3cmq1uqP+H1u/arbpFQPcXUnLfcNxYpj2yrW10njIwZymf1SCaZvSWypv6u2vZquh8/yFTvFOl0xiKYS/LwUiGMUAmGA7Rta2fLJ7ZSFg7ZB7BRmOxR7IGVKLbEbEq7YEUqCEOQWkyRiCfIpXMsRhPMDs0yeniUmYEZkrFkgTbIopL+juVf6VhmU/dT3d888Ng+hvuGUVHQcCGEwJASTVEoq66kZVMzbVvbiaxvoW51TaYiEvqW6nIdV1U1qigiaZpmACFQhZI0TSOQy+YuSy9kv9y8sWlH04YmBvYOMnpkhNmRuaLkJ89DPDYz/edMjhcIZqFBs2RwjaithRUrfiAD/qllRCKfVzl54gFeeOk2nvkZvPIKpBKnEcHi2fZWCiJOY4wSiTh+HH7yMKxfd9dbibicia7jiSd289DD8PxzSMPO0vl8UFsHFeVWUBONwsRE4V4KUTJ9B1udjc4gEouXv52iyd59Y9x/f0g+8TiMT7wljSrO8FlK0q2KQG7ogmuuQVaF//W91A3JWKxWHDu6V774YjPPPo/Y+yakUm9zkCtQFoJgwCo/KKsAl4bU84hUEpFMQjqDTKet1ygpWymkXpKLMLB4GqEtIBKB9Ru+S1WN1SMxNx9h7/5h/vM/Ec88jZyz2xFUDWprobYG3C7E4DBybh6MfLHx1+43KhDkhQUYGXWzdUs5cGYiPjx4q9y1+yF+9izipZ0w0PfW9C4yGFy+jJJJZL7EPRbHJJWopBIG+pCHuuGKbXezcsXvvOfeh3e6f/F4WB472i2efqZZPv884sABS40/035QVAiV2/cuiCwrQ2gaGLrVc5BMQSqNzKYQiUWr3KMUi/FCpkOCpTZKuWzvEq5CbN4KFeH/de7nQ3Qdu984yuNPwHPPw0D/uwSD8gzBoDxdKbcXgzBNay+WBSHgQ/i8R9E06dLINayuv7GuvVY18nown8vWJqOp/z6xceo2QzE4/spxYuNxTJuQLX8Pyzu5XR7aLu9k400b2PDhrnh5pPL/8pZ5n/O41TnV7VrGoarbqr8Vbgr/cTaTqzFzRnV2MfOZucnYn7asb3IP7R2gZ18/06emSMYSJfnL0k8rUIWKKU2mo9Mceuog/grvbTs+v+Oemvaa81IGq6guWb+2/rrazjo1mUhuyCdz1ySjiT+tW1vdcOLlE5x8+RRzo7Pk9RzqUv+UHaAqQqWyIcTaD65l3fXr6by885VApf873qD3DXfwvfcVJWcXN/e/OXjg8M+Osv/R/USHptHJIWz506LFJj6vj3BTmMrWKqo7qqntqKGuo46a1upMeV3oLs2vvYois0LTZgXkMc2Aipo0pQzkjXxESIGRyV++OJX4o5nhaGBmYIa50QWm+6eY6pskOjBDJpNFxbVMahCKQFEs/lCYI65qilQ1JeH2uRL+kPeLdZ11X3S5XFJ1abz58F7S2TwuNEtpFktqkaU3ewJervnSdWz/7Pb1virveW8sUVRFevy+GH5i/orgR+tXNeDyaNJEsu+xA+TSOh7honR83FKlui/o46ovXs1VX7xqfeA8j7w5FwwdHN49sH+AbCZbCB1kUX+zFFz7zxou4tMxjvzsMHUr6x4tqw41Xshr01yqobnUOU/QswfYUx4pv69hY4SNH91SPnxgeP7pv39anHj5OKnZpK0ilCTTbeelCQ1TSmZGohz4yX7MrLn1hj+4/sG6lQ3nLdp2eVw5l8c1CAwGq4Mbmrqa6PpA1/b9j+zf/dR3nmJ6aIq8rlsbHCuLIzBYdfUKbvwvH6ZlW1uFJ+B513IkTdWkFiDmCbhjwbD/WHVz5XeaNka+4A367939wC76DvXaTrsYoFpqmkJZTYj2be1sv/Xy81YrPzMc/fbeR/fe2f3IAfpe7iVPvlAmZo/wy0ndFOJtFM25wflnX/vRa/Tv68eLt0jGpFW/5q8sZ9W1q7jut6+j64NdmnC/t3KoAHRXNvKDxnWNbLxpo3v0yNDMqz98LfTqD3eRXcjajZSi0FRplbmZZ2+AidFPMTZSOLRlaS2BUMHjRtbVImqrv8NbmvvoO/X38rv33MYzz8LQkK3AKMXaFrvMaulck4USIWm/nWJlHeSSkmKlU8nlYd8+5KHDcNXV68RSiUoiFaS39xnxw/+AV14pul6/H7FuI+y4AtatASMLr76K+OljVtkLS+VO5lsIgonMZ8JnJMl79k7yowcC/McPkdm0XT4kCiVScqlkTy59TWHqD5qGiNSj/OYX4StfLSMQfPeGzdhiWOzZOybvuVvj9dcRs9FlQsJSVlIAIuiD2npoXwkdLdDWDO2rkIEAZFIwNgKjI1YgEo0iR8dQevuR+XxRoxZLfLx4n0wpiyp2fQOsWo2orf/rwoo4deoV/uFuRbz2KszNYaJAMIhoaUZedjlsvwxRHoIHf4LYtQs5PVkscyo0TdsqbzYDi3GkafjPaP+hwS/w1DP3yr//e+jrB8Mqb5BCIhUFxe1BNjZitrXbDeVYWbrBQeToKEomY5cqKYX1RcmIVBDIgT7E0SN30N75NTR+sdKNVNonXn9tVvzzPyF//hoyOmtbWimOZJUgFRXpcSMaGxArV0F7O2Z7O7KlGSXgRaRTMDqGGJuEiWnk7BSytxf6+u39tVzfl/ZZWfhO6RTX6hrEhq2S8srnzk3hioV57fWj8q//Gg5120HFW/IsQrxtRmZJV1rKRpcK+hSKMoFIM+KOL8EnPn4vtXXdy3iKWzEUtzvmCrhj/sqyT9esrMN0WUrLnh+9iS5z9oCL03NhgXIf133pGrZ8cssVwerguwpuiqZIX9A7DUwHwoFvh1urvr3iig62fmLr5r2P7z2w675dHH3+KNIWI2WJQGllsq0aZj9uho8NkP5+gnBb+OuekPeHoaqy8yb4KW5hlIWD3YTpDjeH72ne0kLblva+QEWo482HdjM1OoUqiuvDRBIMl9FxZSe3/PktzzWuitx4TtVWc8l1PW/0HnjhH17k8DNH7EJbiQcXuhD2hGEVl1elaV0jmz60mTXXryGyqWlLsCrQfRZvtfS7T4Zbq7/dur3NSlDGs7Vjx8eHjr58xPvGA7sYPzpuz1tQSoaJFKW0d3ygT/tVq9bPTSwePfbsMXLZrE1pZAnpkHj9fmo31FPXVceFIOFvh+ZNLX+8cmDmruMvHiOTTvLWbK+JQVlZkLYtrTR1NXEpkHCAvjf66H2tD9NY2oI6y0fgFBv4FBRi03FOvtLDplu2NLRsbvulXLM74I41bWhqvuFrHxwNlAV45d9/bpcwqLZ6Z1+zrX4utRhGh+bofvIQvrD/tstu3TbcuunCPeowWBPcs+KqziOX3XpZ156HdjPaP2ofQBKXy0NlpI72HStp397h0byuc25MqWgI37fxY5v+ZOLURNfIkVFMU7ccii1xF5o1pdUqcz4bVmtaqr999e1XPaopyoHpk5MsTMbRZbHRUyB4OxI+cWz8jcM/O1wT7Zsna1hBdbFNSsEtVFo3tfLBb3yQtq3tVe+VhJ8WvHi1XPPG1qrtnzbyqubmjR+9QXRixib+drBpgkA5ayYue/oUjp9CmHbYKgoc2hqPFQ4j6uooqKJLeOH5LA/+p5unn7GaIwsvaCJ8fuSqlbBuLaxYCR4fpFKI8RF4Yxfi5Ek7xrTmzhcILOby+tmjR2HfviO8//1uvB4dl5oRfu8JTKN5KexQtm9H3PIx5JU7dNHS/HcE/M8Kj3cIf/CUPHjYahbN5s6g0glQXaC5lj2OUOZymjh27AXuvTfATx9DZtN2fb/dU7C8RqCQvaLQ2A6isQG+9nvw4Zu/+15IuBwa/oJ46MF7eeQRxImTUCDhxfew6rrLENe8D668Erm+C+obRigr243f94oIBn4uNNcCulEhUqn1pFPvJ5NeJQwjzPR0lzzYDTtfQe7bD9FoCakrkqMljicBsWYlXLYF3O7YMsMZhj31BkRnG+Jjn0B+8EbMxvpXRF3dfxXShEDoFen1wn8+UJhyIeVbVGGfD0JBUNXTJf/e3m/xr/96Fz99FDGwRMJt8lZdAzuuRF55Baxdi1JfPyKEyNsTlPJidHw1r7+OvP8+mBgHudTztJwmCkAZHobefjBMF5w7ETfHJz7Iffc9J556Cg4fhNm5kgyDWbyNlWHEFVfAtdfA+nXI+oaTIlj2cxHwv4zffwBVSaHrFWRSnaSzV5DObhZ6toHR0S66D8Irr8Ghw8jZ6UIwVWS2S0U5ZpGKtjQjN3ftEBWhs+4lI5308eMfz8oHHoCjh5cp+4X1WFUF7e3Q3gEN9Ui/3wr2VIHI5hDTUcToqDVNJToFidRp+SQz0gQfuQnx6c/ey+rVv/leLq3z8o4rJo5N7t71wB4M8miALBSkWgqw2+Ul3FJNY1eD/l5I+DuKIlWB7m0f27bFzJoHMrE0o0fGSKfTaKiFvgRdmMXGTmkVOC6ML/LCd18kHcvuvuZL15Z5/NoFG5vZtLG589ovX3N4dny2a/HJJHoqXwisBSZNGyJ03byBisbw7edEwmOptqMvHjv64j++xODeQfLk7ZETdhGz1HEpbmraa7jic5ex5trV1LbWP1HeWP5lz1k+iOdtOVPIM920sSkcrAnc3bg2ckf3YwfY9aPd9qhq+0pkceTFOxLxskrfsbpV9XgDHkS0OJHCIhzWMDV/uY/aFTUEagL7LyY5rGoOfyeytvEuf9BPbCZWEuvJYpBQ5qW2s4aymmD/pUDC50ZnvzFyYJjJk5MWaREqvpCPikiYxegiC9MLS5oES1XAWT3LdH+UiRMTxKdiHwzVlT//y7h2b7l3bM31a8XcyLw89LMjzE/OYUoDdVnqyyZGwpq3kpd5pgen2feTvSiaaA5Vh+6ojFT+4EJdY7i16vo1H1g9deqNkwz3jxQOOtWlUd1eS01nHb8ICS8cJOsjG2o6aqS3zEc6nsKQJm8tvJCG9bCdXE53u93aeetID4VD3R1XdGTqu+q96WSOTDwHb2l/OhPGjo/vOPbyCdILaStdaZPYpfktlQ0VtG1uYc21a3/hqWGqW9M7tne6hFByfXt6xcLEXNGlCXGaMvWeSLihCzk2ihgZKT4ladmbKoiWFqtEYenvZDJujh/fKR580M0jP4XpkjO2PASt7bBuPXJTF2zcgFi5+r/h9b9JKnUdo0N/IBojbp5/AQ5227XF8m30NJB9fXD4sBDve58XPAk8Hp3amr9k/fob6B9AlJfBxz4Gn7/9K6K9dfkeWLV6hkikRo5PILK507MFbjcEg+APHFympZ088QgPPngtzz6LnJ0pnhympWbi9oDbGvGJKUHPWRMvltTqSAPceCN84pN/w+pV33p3FaHvWzz+xF386H7Yt/9MiXzrvZqa4Mod8NFbkFdd/fuiveOeM72cKCpK9y3TBzd03Upr20M0NMILL8L4mEWqz1hcA3LlKsSmjf24lGKgUlX1Q3ZccScjI5BOIW79BNz2uf1i27Ztaul92779Bg7se47T9dMifH5rNr2qLicnR44+yBOP38ZPHoaTp4qfye+zbPC+axA3fgh55Y7bREvLw6cZYDuIurpxeehgA8kExOM2aRXLC8eRiPmY1VgrTfWcy1F6e77Ns8/fyY/uRx44UDJCT7WzVtK6f40RuOZ9cPNHENdeewvNLU+W3h9xuiJY/GyXbUdu2vwN0dZ5N88+Cy++CNFp+/6JkuypUlwvlWFobkbU1589CY3HwuzeMyUffRRefKl0IdrqRQ10dsDGDbBmLXR0QqThCH5/N3m9RajKNNlsh5ic3srwCAwN2lmaUUvtn5yCZMLafx/8ANz6Scn69V98r5dXVl22p7qtGl/Iiz6fhreEWSYSb8hHVVsVwarAM+dFlAoHu9d9YO0TsYn5WxYmYiRGE2ioBYa0vLZLoOLCyBv07DqFN+ijqrl6ceXVHVuC4WD3hfLVka7IhqaNzXKoe5hoz0yhnV8FGlfVseKKziNuj3v2bF83l84HT758YmDvQ3s58dJxchRFp6X8ks/lJdLVxIYPd3Hl7VfuiqyJXHkhPqPL50rXdNR+paaj9isulyajA7MM7B8kvhC3WnSXyloF+Xd9xL3LJU3NoyjWJBLs2yntJWTg8bqpDJfjUtXxi00Oy6qDE/6gr8GFy6otKqEjEgWhaqh+Nyjkf9kkfHEmdk3frv67Z/pnyJLGgwdP0Efj2ggbbt7MqZ+fZO7ZOYzidilEraZhMrR/mMa1/c9tvGmjS3Wr+i/rc1R3hmnf1kL+tRyx+bitSpnFNLHdOIc9ekmgMHR0APGgxB8Kfn/bp7Y0VV+gxlPN45oLN4f3+yp9W5XCkD0TVRUEw37cPu28vZc34MUb9JBOZJCGaTX1FcdAoGCiSolyTjUY7wxfmW9P++Xt1073zjIXXwApMKWJifG2NeLRoVlGD4+h53NW8CSXdnIehKR+bR0N6yIYeUM9Hyq+5lb1pg2R5ua1TaPTJ6aIRxPWDhUapophCqmcFaNIZ0LKwgIsxpD2CD6rjMs2r6bB6jXQ0lrYG+LwkX387d92yZ0v2yTcvkFuL1x1Ndx6G9x087UyHNqreq0mOJtkPMnqld+SGzevY8Pmo+JPv2U1fcm3D3Tk5DhyeBDVKLkHDZGf85GbEe2diNoq2HHVD3grCS94zyBSs+fUKvYs4aXUvd9vqf2h0AOF35+a3Myzz93Cd/8BGY/ZzfPCTu+CUlsLjY0WEXG5IZ+D+Vk4ehSS1jQM+YlPIr/85V2ive3P3i00ksMjt/L0U3fxnb+GiUmWVnlpDhJA1NTBV34HPvXJH8gVnV8T7rN/UJBobn2Yz7cKcfmOb5M37+T555BTE0WKZavWEhBuL7KtA3PFyo8qnpJypJaWvxJfuH0Uw/w++Tzm//1f2pVw9eDpwYBp1wFTkkFQ7PIM23V7PYhgWUYoxSyR7O37Fo8+cht/+/8h5hdKgiaXpSB/7ffg/R/4imhv+8E72ra99bNcdcUrTI4hDh8tDkUoyfZY2oY9hulcw+RovE389Ok7xd/8D2R0Znk4KUu8TqQR+btfhVtufk5s3HxOZQGiveMe2jvukWtX9wkz2yFf2gnTM3bJjy2TLamBmgod7YimpnP7XKdO7ZT/8E8ae/Zar7f0hF1FIvxlcOONyC9/KSM2bV5LuGoQXRfS7hNXVE9xQ9sjVaWuu1hcXMfA4MPizT0dPPiA1ci8YhXis59FfOjDyrn4inAkTD6RIZ/PlUScVo2BN+SlvLESRdUmz5ufbqv55Oabtyx0P3YwMD46XmBsAoFmKoXRhlIoJc2j0Lerh1w6yyfv/PiB9Td0XZDngYD11PTKhgqqm6qI9s5gSosveFwuKuvKqW4Mf/Rse/iMXF6b6Zne++q//pyDT3ZjNU2pdjmewJAGbreLhjUNvO+3ruK6O66rcL+HEtXzgdatbTf8xld/47mn/vZJ5nbPoOCznhtir6Z3ZSZSFplEcVhhMeIUikDVNISiZC42KVQ1bVaoSkNxIkBpr70sLRX4pRPx2GT8+ydfOsHiVKxQF15eF+L/Z++9w+w663vfz7vW2m32zOzpfUZTNBqVkSyNum3kJrlgYWNjCATHkINJcgOkESDnuffEpJ0cIHlyDpCbgklIgBvAghg3DAYbS5YsS7JGfTRd03vbs/tea733j7V2k2R7JG0VIK8f2ZK8Z6/19l/5/r7fhq0NbHyo7VQsFG3t+NlpdMO0ccaWMFKC6mjg6CClTeWs3rXaqzrVhevVj9zSvL3VrdU7hk4OMTenI4XL2sTnGSkpxLSFhRrrHGf/v7+GJ8/1RNuDbS9caQruoheAglQc6qiqaW1JWqgEKaSqoChZPFcUUikmMjGPSfaTbItSJIxch2PQm5eLNEzChEBKooEYRtRsIoVZS9mw/nC1f3yB8EwA05AZzOQmElUoVLRUUbW6Ws8mlMbpcYxXrqqk5HipbYibNsfkhevlbZseF4wM/6UcGkH4F5NY7ozYpaIhV65CtLR8EICjR17nqe9aRvjYWHKuWFYPd++EBx+EjZu3UlF+6K0cAlFackZuavucvP22L4iX4ogRm147DdOY/GwkjAguIk3dkzHnW7ZsZfXq2/G4j1Jcsvfi/dNzRDgGhpnWqxTqWrpcVqGjpk1YRkNc5dln23n2GaR/IbXfpEQ2NyNvuRW5eZNl3HhzYyhKHKRKMOAWR45Y/OXeXHjwgRhrVr9LON+eLk76/UVyz3f38O1vI8bGz+d0Sd0Jq1fDox+G3e95jtWrP37Fa7+s9MuypK2zUhAAACAASURBVPAJkeNOBfFECgaGoiLLy5F1y1BKSjOgh8Lp1Kmt/jrvf+Q2aUr3xYzw9DsuY2MLJZOD2emC3NyBJDRoaOh+/uVfv8APfgBpRrgsKUW++z7Egw8gt27drVTXvKPCsHS7hkRxEeR4M5lizt8exUVQVopUFOOSx3Vx3sc3/62fp76HnBi/MC1h10LIjZvgfQ/DAw98S1xC1Pctz+Oysr+muuZr5OSkIvsirT4BkEJBtK6FlpZLDy6NDO+Ur+1vlQf3I2znIrkn8/LhoYfg4YcRm7eWkmvDrjRNXhQI4LBoKYVDi+FxHyMvbxXlJY+xrPZrzM0jCosQG9q2XtZV4VDQHCpCUVIs4mljoCgKmqYhFJE1G0p1qrq3PO9vvMW5Tzhx2oJ8dmhPYAvLJRl0bSFGhXAgwtCJYV792quEFyNy08ObrpIxLnC6HTg96eTNEhwamseFy+u+ZJa90bPjnT//p5839h/uI2xEklS81tdbZCOFtUXs+K3b2bB7/Z9dKyMcIL88/6fLNtY/6cpxPR4kjIlgbnSe2aE5jJhR9Y6GuGlIxZSZxhVpAiUWxbHkmqviAKYkx8wwwNMVC+0UmCFB4rjehvj0uZmWngM9BOeDSSOobHk5K25ppmZN1dqaNVWypL6U6YEZ4no0TUTVGuuJ3ikGjw0yP77wN+WNZR+/Xv1wup1v+CoLdjg8qiUOkFSXzCwGSYdLOIWLSDxKT3sXhf9ZiDvX88bad7eWe/I8k9l8NynBMM0SpLDpK9O2uCmRWVyj0rRUyjIhIWniN0Iki5+uQuT/kK+04NHyxnKCs0Gcbhfeghx7v5pCUVM4cT1maAsT/n8MzAQsNpk07iOZRpmYU+glp9B7wNRNkS3ZYylNUbisGF9VIQY9GMQstbiYnitN6QSWBtkJBQsZGv4dpmz4hZTJyyPlIXphZQuyovyHYn62jGee2cYzzySNcBQFfEVw793wkUeH2P6updUrlJf9E3fc/gU5MJAyxC92rcRiFvNHNFYNpD5opdvf3umM6y6CIdCNTOso8acCH7KqGtwuS5awp+cfee45OPhGuuFpwXLe8x7EQw/NsXlzGa6LRKPXr7+fqenP4nZ3UVv7x8r5Ra3nN7+/iENvTMinfwhHj3HRcjdFsZhI7rkbHnt0F9V12YHPLfq3E1xE2hRhF0YFvLBiOaK6KvIWaRnJ6jW/8XaWhIxE2zJYWtLvjkQr8EFJ8d/jcupMTK7n5ZefY88e6O5MfaayEm6/Ax77SEzcdadrqdaL1PUCEYlfyDRy/ucqy6G2GsupuoQ9GArkiiNvjvPd/4A33rhIP21LrLQEsXs38sO/8Yioq/l+VuYvHN5KNJ7izJfyAicOlwvWtkJz80cv6btjYY39B17ilVdgYiItOmKPY3m5ZYjfcWceud5Lxzt73DHqG56kvuHJK7dEZRpr/EW8LHmBN5gtY/yku8CD2+1K1vil6kTS3kUmqEytOyG8GOLYc8cwDJPC2uJATWtNhcvjyDJmPMUYkhoj6ywRqgKKuKRMshEztN6DfY2HnjrM4tQCWsLZsjMkBibFVSWsum0Vbe/d+PHi6oKrBpF9S2O8Iv+PK1sqH192bJlFm1zpQ3WoIERMu/Ildh2blG+TLhYguO7NNEyxOBe4dfj0MCNnRgjHIknax2Ub6lhxy4pHAYpqili+bTmLU4vE/BEUtJSUulQIE2J6YJKBw/2Pe7zu7+aX518XrLg0RaEZF0jTplo0ZUY+IsGWmRCxEVIiJDhxIjFpf76dcCBCQV3BWMOG+lyH2xG+Cm95fdflVW6efPcP6tuW/XfVqVWuvXcdqqrQsH0ZLp/2SroRDmDGDW9wNnh3YCFMGB0naprWrM1lLCE4s8ji9MKO0qZiVUHJDvRJCHIKcnF5XehEiBElFooRDcYUQ5c5jreigrvgQo/UMTWtiQwO4jTUnxCI6irMlqZvCWnA3n0TvPiShdtNRPwKS+A3P4p85KE+sXVb05K74HQEWbv6oKyp2mamRZ6taB6pOrRwFOYXEQuBR6jg0CVuKkXqsRT23RQZ61jULUNsaANfQY/sP/e4/O6ex8XxExCNglAQ0oQVK+HTf4Ry27s+TkPjW18yFVUvUFb+ohQC4XC8c/bjTMdhvvpVTZw5+xZpIdOCzjz+MXj44b1ZM8IBpmY/K850IccmMvBdImHYFfgQmzdAafFzl/X98bgq/Av3J1RaE9eGlEaqQDTPC7U1UFf3VQAOHWznq1+B4cHUz/gKYccdKH/6xFdZueKS6N+UWKyawXGwufEzCnWFkoxcyvJSqKmYEsolOsn79vvlP/2zEF3dyTmzMkpp8JDSUvj4x+DBB/ZmzQgH5OzMg+Lk6SR0R6ZlNZQErKyoEFY1w7Jl376kLw9Ey3n5ZcSB11JBQmFakCVPDjQ0INa0/t5lGeFX4968Ds90OBy9nlwXTo8TPWLYWR5h83qplsSQlEldTlPoCAtOSTQc4ezPzxAJhrzv+ZMHF1fevjLr1pSUF7mnEyJxplRQWVJ2Vo/GnJ0vd0c7X+nEP7WYVCSVSRklEx2D1betZudv7/TnF+Z+53qsAcUhwrc8drO+cscKDVXg8DjxVfqCTq+jR7v8hSUzBvT6LG7p4AZvpmGq546c2zt4bJBoLIbExK25KaotpmpNDb6qgm8DFNeX/FnT9qYnTr9yGsNvpgMesKh3BIHJRU6/dJriZSXP55fnu67XgWLamMIEEY8QElVRUTQNPWZgSB0lwcWbNNAtOd8wMQbaB/jp37+s3Pzh7aE1d65yOVyOGP/Vlp6V8DpHSxqLN+eUeB+OheN3C0HEW5TzVw6X8wJlTVNK1YwbTlPXsWgcteT+TdQgSCSTPVNM9kyx4tYVWas/UBRhlC0rfrJ15+rHBToRf4zqtbXkV/uOKg51cclfNDv3CY4dQ87NpgR30kVQCgthWT2iqPRvOdv1Av/6r9DRkVyworIadu6E9723T6xf33JpndAM8kv+P3Lyt11APJZOcxaPQzAIoeDWS72xZCSqyGAQkSxITEXPBCArymFF00GhR93i8Btf4+n/hISgjTRh283wvvchd965W9TUvj0cQlMlqEuDN3T3fF7+9KVG8frrMDOdFklNRLBMi19661bYdfccG9puy9o5sxjwMTS4Q4yNWXzV9hOFTIPC5ObBqrVQVPLlywsqGEJMTr6L2bk0Sj0zZRCrKvgKoLISoTkkbx5+kxdeQJ48ZTlBAE438v77EY/+OpdqhNsv4Sbkh2jkAqMkQ+gnvxAKSl4VYomRQj0uGBz4JD/7qWDvq8i5Odu4T0SnbUy/JwexaRM8+N5TtK65M6sxz5HhUrq7LR5xUgxA0q4rEnl50LQcWVn90iVbeWNj/4vubpieTTnnCafY67WgPLmefb8YJ/rVsZ+EEDGhqqCmot2aQ8Wd40EPRonrUTsSbgOxbOrOhACefzZA74FeDj91CIfTYTTd3KTeiOMRnA/uan/+KF37OxNKDEmFIFOaaKpGYXEx9ZuXUddWXSA09boYrA6nI1bTWlNd0VxRn6AvVJ3aiMPluPyIuHjLP1y7Jm4A7Pc7tVgo1tC9r5vB40MoKBhAbkEuy7csp7ypLGmAFlYX/EVdW93/yC/PU2ZGp208rUgasw4cRPwROl49S/NtK51NSw/qZTsk7k5U2CeV0aTE5XVRvrySxekA00PTViTnPMiKgsCDm5A/zP5vv47m1PAWeoJ1a6vLXd6cWf6rLampqipVX86I25fzFeArbztdKobmVCOaJtypuvmkJicKCqaEsbPjDB4fJuAP1+fme85lxRBXNVlUXfiJdXe3vli3vuYrRpx8d77nQEGN74POS8mEzM7eT/tRmJ21M+mKzfJg97G6GrFyJWLe/+vs3bdLPv3DlOqiwwG33w4f+iBs237Jm0YKAZpnFKfn4kIy6S0UQkZCzUQjmnC5l+7QLNhS9kmIxHlPqapEVlZ8VvT1/Duv7UUcb0/9v7IyeP/74UMf3CoqK7JXdxEM5soXX3yCH70Ik1NpB31a+h9gzSoLb79mbVtWj5nRkb/kzGlYmEtjekhTw5ESCgth+cohCgqPXGaUxMHIiGBiKm3UZYoa0elAVNVAUSkyEPSJ736vjZ/8NGWEu9yIllXIDzwC9913ebdgPF5FyI+MR1LvYBdqJlnEnRqioAR8Jf+Epi3NiJibXyVf+NGX2fsqYmYm+b3phZIg4KZ1FnPOhrZ1S/7upbShc++jpxvGx1LYd5Giy5MA5WWIdeuQhcX/dkmDNzNTL7s6HxVTUxeYbwK7ANShgTScv8r3hJTSaSYizEJiShOH20lpQwl6OEZgyk9gLoghjRRtsrSy2QpgSp3QYphjzx4DiVJYVfj5ovqiz99IfTTiujrVP/10x74ORoZG8OBNIX0EGBh4c3NYfnMTVa2VXC8jPNFceZ5JVx4XQHKvQO5OJIH+160JUip0N2hbmJj7+95DfYx1TiARxNHJKcxh5W0rKajy/XXSuNJUo3RZyWPL1tVRVF6AiZ4UzZF2cV0kHmW8Z5yJ7jECs8HVUjfFdRjyiEDBFFbKR0EhhkFuZQE7P72Ltve1kVuSZ1FiIVFsKkOL09u64RRARXDs6aO88D+f10ZPTYyYcUPlv9rFg1uGLmLhSG50MVSmB41cM86Sx0pVRdid5zzm8roRSWUvqzDHEAkxb4XJ4Ul6D3fRd7C7PxIIF2XNaXBrsdzS3KcrV1XX16ytLi1tKH63x+u+JKdLhhbLxcQ42CJYUpqWWEriAytXIbdsgRee+Yx8/tlUPNnjhrb1yIcfgvvuvay9IjRVCp9nH4W5mDmui9G3pRmvIZRguFjEDfeS+zY9vprhQZTJSUu5L+niglBUzKJCWNGCkl90hD1PP8IrKXEguXw55h/8EfLd932VLBrhMh5V6e3+D/HC83DwYBpjusioJDQ1Fbl5Kzz08A6KC89l9Zw53fFJse81iESSF6vFeGdiANKhQW0t5vKGB8hxXxa8TRhSZWAAxkdTcX6R1CZDyc1FbNuOyM8LihPHO+RPX0b29SZ9AdHQAL/zcWhre+SyOzq/+OtybBy5uJgyJJM1WXawo7gYGmqhpmLpsJ+hwa+L7+xBtJ/IpHuUqd8rCnDPLuRD730kq0Y4wJGje2g/nrFZTCRSpLjDqaxCbtyEyLm0wn05PvYl3jyEXJi3HQw1DYUtMCMxzGAYlP/KtCqm9SuBk/bkelm+uZntH76FTe/fgubUiBNL2+GprFOCeWx6aJZTL53h1X979YnRzrFXr24s/NJquabOTT/ddaBHC89a0X37dEisBAwM3PkeVt7ZQllT6ZM36jxpWRi562iH2xFxATciKDgwtbhl5MTIrpmBGcIyjAcXDpwU1RbRtKVxylee9z/TP+/xeZ5r3NLIRO84sxNzCEybpzsx1CY6JiOnR+g/3Hd65Y4VeQ7NdU0xcBLcUqSiYxYBk4HD6aB2bW1fSV1xox6NcXjPEeYm51Ckmm7Ep4JaUjI/N0vnvk4OfPN1tx4z9OZ3LRe/2Mfe25ppl9UiwVhRz/7OmeneSaKhOJ6iPGrWVvsbN9X7lvLzTqczll/u+1hOUd5ph+JEmgnecTUlpy4lBnHGO8d5/ZtvEA/FZ1p2NG/ILcrPCo+s4tAMBS6LjUUaumBsXGF8PJm+F0KmYCFCsXCmqoBXXoFDh1M/29SM+PBjiJu377iyU1KJ4tAQqgMpYmmiJOcxBUkJUiqXdBgFgjcLvx9i0bQ1ZL+/241YVm+l8CcnPiz37rPoB8ESmdm6Hd773ifFypZPZXUVDw5+mh+/uJvTpxCmkQQxZRz4Lhdi80ZLIbSqIusQANHTbcm6x2LJcUlimgHKypE1NYiC/FNXdJ4tLMDi4gW7VgLC7YZVq2BiwsubR7z09af+f20t4u5dcPeuz4na2svDVeumYGZuE6PjiHDkoqeJdLmQJeVQUiKXfLL09z3Oq3u30XEGGYtaYydkMtwukXbfVsKmzYi6Zd/P6h0RiTjFsRNwqiN14JPJBiMAWVODXNv6kuL1DFzSA/z+rZw7lxTuSedQkkgILFoUm0MjX6esfOOvsiEuhEyIeyRHSXOpNG1tRLKMkTPD9B/qIxyNoqDZ2SCbcS5Bci1jTPVPcOQHR3DluXe4vK5PFdcUfeVqGRiX0mYGZ3f3H+onshhO4wJLKawDeIu81Lc1yKLqok/8Ehri8h0kRK6tdXgjtun+mZd79vURWbAV74SkqLiQ6lXVVLSUr9RcrgyPXXWowcZtjXMDxwcLz77Wlexc4spXbDrDkdOjnHn5DPUb61Y7PK5D13SoJW4TEyEVu+jPoluUugkGnpZbW0ROvrt3sne8MbI3TCxskE6AKZOXglVQEZoPsvcb+1A0leK64s8XVPr+QrlMVcfrf+hl4oaz0cKByPYj3z3MmZ+cIbgYpqCpmFse257fuKl+yd/hLco7U1BRgLcwh9BCHFM3EagIYRfTYuLEweJ0gDe+c5hoOIahG+2td7WuyCnM6b6uYzo2eReDIzAzk2GhCAloTigrsXjFOzvh2AnE3JxdZJcH22+GRz9aTmHulbHzGIZL2PLEUnKewSxTR7/LBS7nolSXhsGWelyIQOgeQmmwBFv1UmIVnaktqyASgUOvf012nbXmy+mE7bcgdu5ErGrJPoPS6TNf4Af/CbMzGYaOhZOz93JhIeKBB2Fj25ey/vypuWbO9VtKh2mxYWnjtxVFQdbUQm0dQrl8uk0Zi5fIYNAa37SIYBKk4nZDQQHixAnY8xSE7JiH2w27dyMfed+caFr+xct+fiBQKqamNKZnk8WhF9Rb5Xgxa5ch8nzjSzbEX9v/NZ59DhkOpNaUzJRBklXV8O73IJpbsj5/YnZ2Kx2d0D9wniGeElXB7ULWVGM21H9Q8XguLXIdi/uEP4DU9bQ70vpmUwFFj6OcG4D9B9ooKPgUTY1f4Ve0SSFJBM4EEI9FWZyZJ7c0Z6p6TVXVWOfGuBk36D7Yn7SlZFJh1Zo7Bxq6EePciT5cT7nRnI4vb/vA1o78sryfXu/+zQ3NMnx8iGg4apWcpmHcJeDAQV5JPmUNFe/XXM4bNkNyBcWaKR/0ehnCUkrH9SoUXUob75nwnn75DKH5YBKY0bS1kebty1Hd2gUclppT02vX1pVWr6nWvflewv6wzSmu2EaedSFNdE/Sc6CXhTH/v+eV+FZeW8tIRlSkjXY3ACegYJqSWDhWClDWVNF2x/+1c97hcnPkmSNY6l0CMCwRFpkAR1jlnqFgiKPPHUU3ok/c++l7i0vryz71i3bgXZwxPAtrUxpu/2yQhZkAsXCMnIUIRujSbY/SugJqV1fSezhGRA+hYaKYSkLZC6Q1F4Yeo+Ol08wNTjNwuL9r5c41NGxtasgWbvzSIoa6kPOzv838nEVDSiaTBE4NsawGMT8P+w8g/f6ktygeeI+lgnelRjiAokRRsMUXUrRfIg3GACB9ueDLPSI8niVBJYRuqrJv4BFGx9Lj4NhdROTmwK3bLNXM1w4g5q3+Sa8H8cjDcN+9G7IfPZhp5vhJOHYSImHrhBd2tD8tKCBraxA7bu9kRctns/r8+YUy9h/ooqsnXfzP4jm2qVKllIiVK2B1i34lkAoxOvEXoq8fpiZTt1lCeyLXiygugZER5NkOZP85a44cDgsXfv9u2H5L8RWdGYGFzcxPgUzAEFNsPCYWm5EoKkTZuglRWvLPS5u/iWYOvQ6vH4Bo7DzKYRLgc0vqfffuPmprn8jqnTw3Vy1PHN+rnOuFWMgunVPsObRBTk4nsq4OUVeHlpc/e+lXkKliGinjW6aoDVSbykhOTyG+/i8Qj32Z33zsWd6GR/6XOiIuzwsOSYk0JPGIXqg5nfr2D9+8Qahqu66bDLUPETaiaIojkd1L1mcIqaICg0f6MaMmnhzPS633tj5aWOX79vXqmx6Pa1ODk4x1jSBNiYpqc6XLpHhRbkEuBRUFqG6t40aep6xIDd7oOO3r0YJzwdUjHSOMdo4Q1+MoCDSnRuOWBhq2NOxRtYtHclSHalSsqKD2pjoGj54jGAzZAq12yFUKImaE6b5pBo8PteSX+3bml11DKkMhIonIhplhakr0uKGZuhQur2th9R1raoLToeG5oXmGTw4T1kM4bHM8VTKY0OI0megd49hzcapWVX5y/QNtXcU1xb8wUQzxFuLY2ZDzkXGzKRKMEovGAIkiRZJj/lJa5aqKsRU7miuHTo8RiARQE3MhScpNJ2rr5/3zLB4OEJz1MzMyx0TPVH/t2kpKl5V8Lq8k/ysOjzN8TQbWMFXO9T/C8FBmDDrDQgMGhyAhRQ1QXQs7dyG3byvJyslkSJc0DDD185ystPipplk0fp6cpcN59Lib7m4YHMrkV5Z2itWbYxUkHn4T9r5mpdy9uRZLyfbteykvy6oEtYxEnOLg610cbU8a4ekGXPJCr65CrF8PjY0PZ33OZ2Z+jZd/huzru8g+SxySGixrgLr6v7vs54TCHmYn72d6KmWnpjlVoqAAXE44eRz6elI/19iEfOA9sH7Drisu/Bod+VvZ1weG/tZ9zcuHlhbw+b73jt+3uODj2IkznOlIi/Kn8qlgWndIYSmsXgOtq9vI8WR3L4+Pfp79B5DjY6n1LETmrnG6YHUr1Ndf3jNc7lkKirw4XBc9iSVANAIn2uGHeZDj6mf7LXtpbr4f741BZ3jNgpWkK7/YTpGUGDFDA8gtyj+27r6bvhqP6J80YgbDp0fQDQtnrSTPIwXFviPCeoih9kHe+M4hUPjWhgduOp1blHvsWvdLj+va7Mjs382PzBExIzhx2crC6UFiQUG5j+JlxSgOsXAjz9NlF2smDSqhXDdDXAgRvxGdgEggUtT7eu/p4ZNDRHSLN1zDgbcol5r1NZQ1l7//7X6+ZFnJwdada/EW56GjpzhfbQtERSUWitLxagcjZ0ZeurYetnBLU8EUKiYCU5iQUAIVCqZpgcI9+e6R1rtbf++OT9xFaVOZlWy3N3PCCJd2SYhqH5/zw35e/adXeXPP4S//Qh566UwHGbfp5bfAdOgPov4whhlHKBJVE6iXoRBa2VpTu+ruNeRV5AASIw1wINN0NhHgEC6EUJnsneLgtw/w/c99lx/++TO88Z3DX5jomOyNh2K512RATUPh1CmLDzz5tmmMHboBw+PQ3QMD50DXobwSbrsd2bbxOZHvyw4TTyxeQiQKsWiGy5XBgqtp4HSDw9W15O+Nx3yitwtGhpIFmtY6UhBuN8KbA0OjiM4elClbtOSmdYgPPYqsqXk863s7GKzixR9B+1HSMeFCiqRTKQGxZi3itjuQHvdI1vfQ+Oj/kHt/nsnTLWWSncmSnM+F8iooKf8/l/2gaKBILkwUmtFQBnWbSJ/PUAjePAxDQ6l537wR+dHHPkdZ6StXvLx7+lrk8VMQ1y+IYqoJiZWcPIyKyqD05LzjWMup2cfkS69oDI2eZ4ql3/gqom09tG1A5OZm3TgRgwMfU/a9hpyzFV/tSHgGy5HbA21tUF+/57IeUlD4Y5qakR7rGFJEooYhwfqRpiGyby/82Z/D17++g0OHpn7VAoKmsDNaIqGorNhc4al1UdZQ9qnbf/O2FTc9cBMVLWV29ZBp/4ydIZKWkevEjYFJ+0vt7P/31zjz8qn24Exg/TU3xGPx/NHO8U/6J4M4cNkOht3PNHKlgqoCSuqLUVVuaAfsCiLi1qGlqgoOlwOX1/X0tX55d67rJVVTW8TFsHXXscXD8TWnf3KakRMjdiWvia+okIZNTRTVlMy9088XVhV+qHFzU//h7x/CHExXq7SQTwoQDUXpO9hL07YmVt2+6tr62IqJKoXNhSJSJomCtOLk1iVeVFv4lTW7VheHpvxPePY46HizEwUFp3CCNGy8uLAjbYK4HmfkzBhHf3gMd0GO3PjejSu8Bd7uy37PazYiMk2l0joBFEVBUVU0p3bZvNwD7QOTh753qHR2cAYDE1U4SEEkLnGjaw6jsrnqkW0f2LZHfFehr6MPBxqacNjpvDSjJ0mfJjAwCC6GOHdogPmheTp+dqayclXVYlVrFZWrK83qlqq13qLcM1fJsVHFyFiach5k0OfpceTMDMTToH+rV1qczsvqPpKdzRxXpX/+A/gXEHEjg4otQynQ7ULk50Ju7oElB9rjeqk6M4vw+8+ToJJQUQEFhcgzp2HwnPW3LheirQ151527RElJ9rH74+N/wbF2GDiX5hiIjL4KVUWuWwfbbv494XL7szrfs7P1dHaVMjRAptpl+vQriLJiqKuCIt9lOwJybPJ/ceIsBBL1OyJToXluDsIhZCgEiwGLU3zdTYibb0E0Nn0xG/0VM3MwNo4wjAuc4iSYpLoMpbH+IyLvnY1mMT7xGQ7sR46OpMJlSS5Gm63E4ULesh22bsw+g0QkptHZK+SxdkRSJEmxDxOZ7JvwuC3+8PKKy4PFVJR/ns0bHxfffyrTe5FpERHSgFQTk/D009DT7Wbvz6W49bYYGzY0UlQ4wg3Rrl4wUUjVooyUEhMTQ0hL9fm8R3oKc7pvffTmlzRV3fXqk/uYH51DlzqqUO25k0ihJrn2JTp9B3uRhsTt9rSvvGNVgdPrXMjGUCwltmpE9LrJrmkWJgIk6HitSU9xppuYOPPdeApzEIIbuu7sCgV9BHpMJzATYKJz4ltCiEg0HL0XiRtBBInbHtuIBPdlzkvyZ9OjjR5fzlcmusc/GY/cePh7/6T/f/e90cf0uRkUVGLoFFQVsurONfjKCt4RU+nxec5Vrqz8Ukl9yWeGTw8jjbRiKZtWSI/FGe+aZLxznMBCoDnXl9t9jY6MiEjjUVBICawI5AWbqKSu6POb3rdxjZTmI/NTfmaH7A0OSKGkxcetczSiR+g/0g8KeAu8Xa271hS4vO6FS3i/2IXsJddCaVOmOagCwzSJR+NE/JFqd757iM40rgAAIABJREFUJB6JeTIL/AwVhAEq0pROaZguacR9sbC+LhaO3xteCN9/9D+PlLY/exT/1KI14kKgaCqKdnmJrLySvKc3PrSpL7oYbQxMLbIwPU9cxtFw2kIIlptnF9mnFeRCYCHA3MIcfWf7KDxYRNWaKho21SsNGxtOV66oiOWV5f27tyj3i+5cd4+iKdkZ7sXFFibGLaMonXInFTGHcDBpoFFYgNi8GXa8Ky9rKWjTFDIc3ihshobMkrdUYZ9wOS0oidu55Mtdzs1/TE7PIAKBNK5sO+rvckE0hjxxAjE0aEVoN25EbtmCUl2dfSja7Ew9Z88+ytBwWmo309VEUaGiArGiBZrqsw8dO33mKEeOWIbvWzWvF+pqoKyk84qeNTH1CKc7EaHMLEeSw3txERYXwaaUxFcA992HuPnm7GQg43FVjE/A+DgW3jlVrJsQ25JFhVBViVJW9sN3/L5Q2EN/by1dZy1hqXQDL53gp7AI1t+EWLUmu0W+8YjKiTPt8vhJWFhIc5ovQmlWVAjLlo2J0tLLc+ALC0doXf1xljd8jTOn3kIePv0OkDA8bP06cxp5bsgphkaG2bhhDxWlT5CX14M756oZEuIt/k6+BaQx28/OCOMJ0zbEL3yripaqu9fv3rAwO7yQf/LFk8yMTNv0yYYFTROaXUMBTuHAH/bTsbeD8qZSVKc633zLiis2xsUSh8PQzZLAVIDIYiQJv5GZMw6A6lTR3A4Q4pfREE8cGQqB+TC9h/uJLsbJKfTsicTCmaIhUthRYZlSPVrSE6w0uSotQ8AUpo2dBISJ0+N6dHEqgH9qPo2a6fq34Hyoeez0WNvM4CxhGcGBAxOT4rpi1ty95mheWf43lvI9+eXeP2/Y2PCZqd5JRs8MYUqSsrSWTC3EYhFGTo3Ru7+3q+XWlhp3vvsaePgCpCUCY6aniy1jPBnfTm+lzeXv3/i+zc9KKXbv+8Y+znUPoOJKYtAS60UIiSZVQoEQPQf60NSfE5kPz9/y0VvFkg8diRMzcalKhDQR50esr1JMPFV+akkEz4/PM3F2vNOZ5zgZi8aWIVUtcWSYAhTQhYkWiRjF8UhciQdCjJ0dY7RjjKneSSZ6J5gf92OaJGWIHW4HmuPytq3qUI3adbVNWz+0bRZFFO79xqtMTU2h4QBhZSgUqdpQKBPQbTFkqzzXiQuBJOwP0X+oj6H2AQ7veZOS+mJn/frax1t2rHy8aevyLxXXF195AV8srjI09E3Gx2wuaTsSni5GggBhWivOnQP3vBt23E5WcaASFJ38xJpK4dQTuFvbbHU4wOkEibqUxWoG/D51cOB3GRtNUoWlBLCAuWlEKIAyNQeRkIUVf+C9sGXbl67KCu7rfpY3Xk9SwmWs7cSYe3Nh5Wqoqbo62+jQwUK5bx9KKu1wYaYz34dsWA45eSevKI7on3czPIiwsykyveoWklCKpDlXUwu77x/ippvuzkpfJ8bv5Vw/zEylnDuRYqURioIsrYTSKliKOFTP2R9y+jhyYSGNgcWSNE9ejx6vJf1es+xo1ucuqnvMn7zQypuH0oxPM1MdFAm5uci6Oqir+tQVzV9l1Tfkzju+xuQYvH4k6chKmZo1eTFDeGQUvvnvyBd/hFh30yPy7p2PsPOul8RNG+6+SpdD8kZMGItKGuzrqjPPCQOEaYfvIKHLKt6CDLNmXW3xPb+/61RkLtQSeiFANBKzCSMEipmoC7OgKi6cCExe++Y+ggtBcoq8g9WtVRVOtyt8BcdtAor7tsvDtCvaFWnaIFcrLCghrXpNQRHCgi4J5ZczIi5sxFEsGGWqb4LApB9FU9CNONiMjtYJkCqgkEtMwsiMbWRdwBIDkjomElVTMWI6ofmIHY29McjER08Pd3b8vIOQP4xEoiqCUl8p1aurKGsovlVzKkuCKmguJdi0pZ6JzlFGTg9j2JtBoNoLzapAH+8e4/TLZ6hdV/OwO999TQscL2W0S5tKH9j48MYf+6f9u+I/iDM1MI0pDTShZXyPsB24aCREz+vdqA4Fd4Fbrrx91TvCVCSmsDBxIoVrS8hiZAu0/bZRD5FM3S1OBjj787PMj857VaeyTRomMg1rawo7HmKCruuYuokRM1icDrI45Sc06ycajmMkhRUSrCECoVxZP6rWVFdv+bWt45qm5p/68Wn62weISdN+jpHcv0IoVh0AaRX0CExpYOg6MR3C4SihuQALo/MMnRjh5I9PfaZuQ+1n6tsaZM2amkZPweWxrchgsEKMT7bKef/brDbLwjAB8vNR7rwDNrVllUlEStMhIoEGafN8JyJZMikhkojylSDKKkBZWuRFzM/fKgYHFRkKJhkzUiwsAhaCIFLUerKuDrF9i5+W5s9elfXbN9gqDx2FYOi8c5jke5GfD7duh2V138r6CwwMfpj244izZ5GGLTMvZcapIJFQWozYtA4KC/7pivo7MQXDIxnS8lYmyIbikKrJkc3NiHt2QUP9I1lZU6FALqMjf8vcTGpNJUKBCRiQImDNCli1fGlf2tG5i5NnIB5PBUbS+iEAWV2B3L4JWVL8D0q274KxkT8W+w9YNKKJx2JBIBQs1h0JVqHv6lVIr/fNK3qgy6WL3Q98XBp8Tc4FofOszexjOyH22ZCqZbMdE8O2RMfHkcEQTIxB+9FdctNmyfab+8Tam1ovVyDqRm3yHaLzGXaHU9XLV5St2/6R7VHhFLzx1CEMw8AhHUlrzGJSMm3PRxDRo/S+3serX9ubv+O/vWu2cWuj58peViDE2xMBS9P0xaMxdD2e0bN0IK99gFv7SXJDCwZepiGeMij0uI4+H2Nx3p+KDiVTUpdjsmUaNqbtWQvbELfMEpmMpCp2WYu4JvCDd25DxwfE2b0dxKJxBKBpCo1bGljWVo/Ds3RZb0XVZN2G2t1DJ+uec3z/KPFo2AYOKMkL0oHC3NAs3Qe62fahzX9ZdAMzjSiqIitWVtzd9lCbjEVjvPEfh1ic89tRGyW5qS2pGWu7LwQW6NzXheJQcbhdXevuXfuOFqiU0ikySt9Exnq9mpmCxLqUUhJaCLG4EKD7dHfSaU1QUWLzr6fez7DfTkOgoSBQ0QHNEllQdDBlMnJ3pfUQTrcj3LCx3ufN9T6bX1qwW3FqTPdPE5oPokejtjqZ7cgkqNTSsllWbEWz+2ISC8cYPzfJ4LlhHK85qNlfweo7WkXrrnX9Neuq9xRU+R53eV2XlrJcmL+PcwMQCL3FGZL2Z5cb2dyE3Lhhrygvz24Fvx73yPGRWhbSSjvSeAsT0UZRWQn1y0BVlpTiFlPTn6WrGxmNZlyQlsEgIBpNQRRqqmHzJmhu2n3Vlm//IOLMWWQk+tafKS6ErVuQVVV/ktXdNDW5moMHv0XHWavg9vzZFjY7DhKKi2DNKj/5eYcvPxoeKGJ8EiYmkPHYRaJAIkMkho0bke/ZPSd8+Sez0t9AeDld3S3MzZ/vU1r17InfrGyG5Q3vDIWJx1U6uuBs1wX9SGL7bSNYbtuCzM/LqjqinJ5qpr39CdFhs7UodvxbJk/E1PqurYU1qxGa88rrC+qbnuQ97/UwOvll+YIKZzrANDKyGamchhVYSN03Ehb9cPwEHD+BPHgQ0Xeukd3BAGvXbKey/Jrqc1zdm+kSjUKXI9Z6X6vDlGZ8vHuc0TOjNk83SUiqiZnUyHbiYX5sgcNPHaawstCd48v5SWlz2T2qqlw1k0xIEyOuYxpmWuDWNsZtzzYJc7H2wA1tiF+mY2wB4U1FZkhNCzs5nzCNSYuFi0v8lV6YqJwXhc80tKQdMTev+2D6J+d2Dp8eZrhjGCMew8RAaAor71pN/baGSy6OyS8vfL6ytZr8ZT6cmmYvfz2JzxcIwtEQU91TTHRM5IfmAs03+qHQ8q4WcctHbo0139pMbmEeui1Jmyp0F7app+DASWgxzOkfn+aNb7/OqRePS9MwxVtvTtBMK1UlzydYlOIqJkwECCUhbZTEDisIHLjQcNj7Qk2KMmmoaGhoONBwoeK0P2XFoEViF1noC2tPCImZBUM8aVc1Fb13+2PbNjz21Ufndv7enTRsa0BzO9CJESeKgYGUNp/xRc6ARFQk0TM3LjRUpvpn2P/N/Xz7D7/Nnv97zyOH9xyeD8wsXlpl/djYn8r2dkTwYqqHSkoGHlBamlHvuRvKK/6frM9sOFIhjp6GwdFM106oKeMJoK4WmpuG0JYoqz08soM3jyICwVSxoLQ4kcFM7gcJsP4meO8DyLyCE1mPlum6kENj9zNwDqbGLNy9fTUoQrVOW7ufsqIUWb/8SVGQ3SI3OTj4Tb73PYv55vzxVxL3jT3OeT7M4vKfSKczeFkPi+uC2en7mBpHhoJptn5a/YY0kFJiqgqitAyxaTNi+63FeLxZiZSK+YX3ijeOWPhwyIRQ2A63UByIogpEYek7MsMYcwtrze4u5Ln+tBodK4ucHp4SpeUozaufU3Ny+7O6iE6cPMXTzyDn56x1Yl/FipCo0sx0BsqrkE0rxnA4swIfE40NX1E+/UdrxOMfR27ZdL7pbY+HmZzTtJhuRphGGRxG/MvX4dN/oPCNf3mDM6e/ya9wczgcesstLVvf92cP07i5kRhx+3YD02YMSMCEE4WR4YUAr33jVX7+zy/vii6EriqDhEWUI+A8OzMRrErcv8LGwyuC2I083toVDYQERVHRNAXVqSJUJYPqykzmhq4Ewy2SxjZCsyN1BlJITMNED+tI3UyvM78uLewPVw8cHnxpomuSiBnFiROv8FDeVEr95nrKG0ovqzimrKFs7+p3rdxxMniC6ZFpHDiSqfHEPxF/mL6DfZQ1lJ5tumWFeqNv8rp1tQW3fWxHSEg48aMT6EYcKSWK0MDGdCMsp8uQJsFIkNM/PY2iCfIqCkZq1tZWX9zbVhBCiaXyMkpyYwrJVYyKiwti45pTw+l14sr1WIaMYZDItllYbJEqmjEkpq5jxHXi8TjxSJyYGUNBokqNpLIgEkWkOF2vtKmaauQW5x7LLc4tcngcr5fUl2xbvrmR4dPDTHSPMzu8QDgSwsBAQ0VBs6Mh4rxep+YLCfG4QSgeYTEUIBqKsDi9yFTvVPtNu9dHam+q9Tlc2jseimJmulZ2d0ACupHER2Q+26LTa4VduzpFYcEbWZ9aXS9maDCpMikvEp2XQkWUlUFF5Z9LoZhLWmUzUzA8gIjFSEnlkAoyJOTcNQdy7TrYun3F1aCbIxZ1MzTwNSbH0wR0UmOdNBJ9+VBRBWUlX8zm42U8ptLR0cYbBxEz0xnc5cKGNtrcguB0IcoroKL6M2IpuOmLPS8W89Ld8w3GRi9ypwl72GUKU71tC7SukWhZjO4t+t9DTyfMz553aqSZzYU+qFsG5RUvvm1/olFNjA3/H8bHrGyColwgNAVWDYOorIJl9R/B7dKzNn96XHDiuJN9r0Eg0zeSMvMGl5qGqKtDNC5/Nw5nPGvjWVZ6ht33f07k532B5hXQfhzR1w+hxSQ8RaafF+ms/Xa2RcTjFqzn1EnEdwXMzz/KA++5i7YNTdlywH7RWm5J7qEVt7bUzI3ODwtV4ewrZ4kRx2mL+AkpU4pBEkzTZHJgilM/OUVRdfHp9Q9teLKssezjV+ftRMQ0L0RBpN8OVnGq5Xvd6Eo3l2eIC/vYkBKXy4GvwkdhbRGufDemIZMRNFNIzquiuMKxV+0NbiAcgtBckNFjo0T84YwY+fVowZngn3S+0snMuVlUW4Inx5dDUVUBAliYXNwZnY/8ti5MtxQSVYICEXsc3Ta2OaLZXNSmELi87qej/ujGqqZKevN7MUYmcdrYv4Tks6UmZdKzv4eKFZVK0y0rbvgN7nQ7w20PtongVFDODy8w0jlEJByzl5aZNFalxI4kK4yPj2M8Z1CyvLxS1dQTNa01ay+2ME2hxhK5ETVROinkBTwqWY4rpigX7CyOJ99D6fJSKtdUoQgFI2qiSjAVK0olpMM2xE2Im+hRnUg4SiwQJTC1yOzILNFgDMOwojjSrhZUhGKpS2a5Va2u2l61uop199y0vvdAT3vHzzvoPdjPZP84wTk/pi6QRqqITZJQerUPYsXmcZUCFQcqGhIT/4yfk6+cpPf1fiKhuFuoYqq2tar0HeWGZ2cQw4PIhDBJmppPsh5EUcBXhFx7E2LL1quiMCsjkfVMT1piOhkWRtpl7s2BklJEcclTYglKjzIeV5mdQcxNJcVcErZmEg0tAacT0dgEK1cjSkqvDitSJFouujsrmZrKXM9klpKJ8iqobQCvZyBbjzYNXSinTr7GkcPIkRE7M6BYtRR2VVlCKU8oAkpLoLoaUVx47gocD588c0bLVDNNKHcmjFh7CgsLYeddsLzpT7K6puZnW8XIYEqAys58Jc8RlxNZU4moq+nD6XzbmgOxuNBAb9cO5mYzrF+RRsMjVRXKypHV1Qhf3mzWOhKNaaK38185cRyGh5JOlBAyjRI1EeFXMIuLELU1UFGadQEY0dT0RZqavii3bP2meO75R/nRj5CnLQYXIQXo8QscaCGElWEE1EQqQUrk8RMwPomYnK7kD/O+x7qb3vOrGhl3+9wjWz6wucGd5+qf7pthcmAimZ8SWNlSU7Ez9FLFwGD07Dg//crPUD3a49s/evPncnI8s1k/lxHuhLSKOM+dRaTuJkM3MOIG/FJixG3sl46Ot8zLqjtXsvn9WyhrqfxSNBLbKpAo1ghFkcKVxHULopcy1FLiSlT3SjujZBtWUXee598Gjg5+66nPfY/RjoglgnEd4SnzM4u/2fFaJzNDs2hYKd1YPM5I9yQ/+tKLuD2ul+KBKKYwMFNLJhn5kWkwyMQh4dCcjxhxg8DsIvPjfjQctnRrspwOBQVdj9N3fIDqY8sIzATX5xZ7j/0ibPL1D6/fkFPsaX/2r55hsH0I3TRSeH9p2kWXloHnwEVgJsjef/w5Mm62evI8ny9eVvz58652SyLIPlSNdKDI1USm2Mk562C37r+8snxW3r6KHb9563NOr/uH8bB+jyKYtz/tlskUqQlSuKXEbZpmvh7Va/xjC41D7UMce76dnte7MYyUA2wYBoZx9da5tzjn2PLbmmuq1lb9/pYP+X97omsif/DoAJ37uxk5NcJCYMF2ctQkEE1K60JTZCoXllBMTYDJopEwr31jLwtjM/n3fvru8eo1tRWOtzLGF0M+RieQU1OIBGbYlOfNM5CbDzt3IjdcRT2Jyak/EOMTyPOjfTY+HIcDparSotTLy3/niLVuCCam7hVDYzA5lypJFykGImnDUkReHuaOHYjlTWNXrX+B4EYOHYXB4fOMFDJFWJqXWxztavbYBxQp4bnnt8mf/DS1N9OKVjOi1IoCZeUWRvxKDLZ43Cf6epAZ3PSJVWWSJgVg4f5veddRmpZnLwsQCOWKoREnQ6MQt5mKhEzCf0TCAWhcDnl5L7/jyTM5/afi0FGYX0hzKOzciq3QKhwOaF4B1TXZXTuhYDnPPPco7cczlGFlmphmMv7mcKCUlCEKC67updLU9DH53z761+Luu/5BHD22Q776Ksa+fSjn+tPipGk1GXbW1LTPlAQjtZgYhxefR7Y078ad80Wx4uoUSf8iNI8v51zzLcs/d88f3PWFfd/Yz9njnbhwIISKKZUkhbeJJURlGjrTwzPsfXIfgZnAzK7fv6shJz/3XDbfSUBEU1TU84JSMo3lSSCI+MMEZ4KYpnQCN2xm44ok7k0kqksjr8JHzbra3b4K3/PX8uWNqL7N4XF+0rQxSgrXJwUR8oerxztGvRN944SiYYsODkk8ajA3No9/YtGCH8R067A/D+Vu4yYyUnmKsHCoQrF57qKmXahpwyxsZhCBgiENwoQY7x6n783+9uVbmxpyfJ5zN/oGzyvKO7bqrtU1s4Ozww7PIXoO9GKlm9I5SKxjU0XFkCZjw6O0P3sUZ67riS2PbMkpSaPKs6E6zgRLgJmGvryYiEH2jfGUFIfD7cRXVkDFiqpENGXpNQLrailvLP+m5tEeVZwqvQf7iIViIC3efkPXr+q85OR7RnLyPZ8tqS/5bEVzRX1Fc8WpspWV3uGTw0x0TTI/Osv8+DyLk350dGumzEQ+IwkIsso7FQXVBo5Oz0xz+qdnyC/LL7z518Vs/ebG3Aujxboqpqfez9RUWqHmRXMQFm/4XbcjVq965KrMqN9fxNhIIzOzKeDrBYs4D1avhorKpRnL8biD0ZG/lZOTqRMg4zdp2ZviEsS7boWG+l+7apMdizUxMoxcWMgcXHEeVKK2FhrqhxBqdrxAPS7oOPsM+w/A2bPn0U2nZxzs/6oqNC+3HJ4rczzuYmAAZmYudrmnXqGiAtauhWX1H8zqeA8O/h09vUnHzspuJUnhrFZSAmtbIS/3HUXyxOLizfQNQCD4VrxCliG+cgXUVWdVgIme7hd56afI7u63eHDaG3m9iNY1UFEevJpnl3C7YrhLz1BaehvVtaupqzsuVqzQxJtH4MwZGBiwC6FJ0oYmGF4Si8Bi3DKR4xPIH70IJWWfEY1Nn8sqPOkXrBXVlnxxw4MbahemFz+5OLvI7NAMutTRcJJZ5WDtIt2IMdg+CAjKmkr7V9+1ZrevPHv2oRAi6nRqqKryFqveuo0DEwHmhxcwTNP1SxcRT6SeBAqmLoiF44QXw79zrQ3x0GLwQUNPlMhZtGvXwxQfPTY0fO5gL5HFcFraRiANiWHoGFJPD3VzMcz8hURdEkPoaTRMii0Lb9hnXEpaREHBiZO5kTlO/PgkxfVF/5zj89z9i7DBc/JzRu743Z2a4lT0udFZ5ocWicd1+zCUKUdFCrv40UHP0V4CcyEKywo+43S3vppfkfd8MmKMdKbG0ZYbugZLQpAotLPmWOomekRHj+na5ahrljaX/sbmD279jqfQ+9xkzyT+QT9I0ON2qu0aRkPqNzfk1m9uIBKIFU10TZ7tOdBZenZvBz0He1mcDKBH4yh2GbGJYTOe24eyTKxSFQ85LEwu8so/vkphmc9btaK82unzZhT+maahqpOj/52ZybR9YRuoaSwQEqCqDLZt2ivq6r5/VeZ0avxx+nuR/nT7xcpkiHT4wqYtUFy2NEq/WCxXDvS1MDN1ntGSssiT/66uRWxse5LKqn1Xbd3Gos0ytADxSGq8hc1gJKS99VQoK4PKyj9Hc2THGOk/94R88ce76ezMoMbMUMkjLSqvaZbD09hwZdSJM7O/xcgoLCykYeKTsZCU69+6Fm65BTye7GYjOrsfl51dmcJQ8jxpl7IyxPqbkPm5h9/x6IqES5idwbTZd5Qk93oai4SmIpoboLrir7LmpPb3fooD+1rF0aMQDNqRfZJR+QSULpHdkHn5iK0bkdWV/+81u6HLSs+IXTsdYtdOOHb8J7zw/C6xZw+yt8/e05biqLDXe1IPQpDMTHFgP6KuDh5+X9WVKLn+MrSShrJPtT20/rF4PJZ/4F9fZ3bKzuiJRI5fS97ZqhDoMs5oxxg/+/tXMXTx3K2Pbc/a1CuK8Lu9Thwu7UK+eCFtukyThbEF5gZmMXXpAyZv1LG9LLCplMl4V7IWUyAj1/rlBUpcSFBsuXVxnXDifYf66Px5J0Y8EQ80MIjZRYKqxTBjs4NIaWJK689mku3FtGE1Mu3v7RSLTFz9Jga6vehMpEgAL7DNHAX/2Dw9e7vwj/l3/SJtcM2hGOvuWffkfX94H8X1xejJfkrbGLA5cYWCsMsG/cNz/PjvfsTr/3HgucB8pNn6HoeuSBFLgCIsxiLrJlAwbeLHq2OEK/ZFJDif1eTyn1lQnv/8so01pwqXFeDCaRe0koTeXOvmznXOVq2qWLbx4Y2Pvvtz9/s/8De/xp2fuJPGrY1IRWCgJ4lEkwJe0gCpY4kDWX8XjkTpPzZA18GeYUtxNN0wjOXKjo5GOTySMcISi1AieehWViJWr0FWVH3mavVXdnV9QR46ApFwIgpj/1JSvFC+Qti0yaS87G+WZoiHKkT7ccTgUOryEOnZGxuiUr8MuW4tZnn5X121CdUNIYdGPsbgSLLQLslDYMOsTEDk5SLKShFFhT/I2th2nH1CPLUHxiczAjxCmOeVE9kmuqJAcTn4iv7tsp8ZXMxlYrhVTk1m9jVJbZfGQ7x2HWzb9iQuZ3YjuIP90N+HMM2ko5FgbEkqBBaVIGvqXhKunPl3dizm8xkbR4lGbKP+PEVJQKgq5BWBJ+/1rPXjwOtfFnt+iLSzVolzL0OUSqRCIkJzWgJFufnPXpfDa2XLbh599BH5N38TE5/8BMJmWEnYM6TpNKSgDVjQuL4+5In2Trm4UMSveFt2U13R9g9unbrp3espqSgjTsxawyg2XjsRMLRgl9FIiIE3z/HmnsMc+t4bMh5Onfciydmfud2XcrsJTQnklObgyndksqOR8KAsvr3gXIDFiQXUuPD+0kXEM4yMBGL+uhjBSrIQ73rVxS5O+t81eGKI0bOjmKZ1lDrdGjWt9eSV+NCcTgziljEolVQlb9qKU0z7AhaZhPQJrJ0iBKiwMLnIUPsw0VAoI4pijYRCJBJhsnuSqe4JGtrqy9x57mvsAV7+HJQ2ln18wwNt3WPdE1/Q4zpT56aRNtBBpA8GCioO9LhO17EetFwX3jJf17p7Wrfml+QeUh3KsFBEymFJbFEpr3K/RWY1fiKSf4UttyTv8+48zx6hKBimQSwcR4/r1+3AcHi0cIGn4NsFVQXfrr2pVq1oKp8trivKz6/wMXx8mPmROeLxuE09KjLK/tIBWWNd4/QdOUfTtuZyh9t5LjmS8Xg+Z7sssZWLODPJSOKKZtiyDXLzzly1We3ptQq3klzTadmsRNistgZWtXyAAt/S9logeLPo6oLxiXRiOTuakeZpNK+AtjbI8Y5evcNrsYqpKcFMZi2VSIcVKAoUFUFZKeT7slJ0JYeH7ufg69DeDnqMCyb3YqeKzweVVcjCov2XfcqMj/0uPd2wGLhkrGjLAAAgAElEQVTIfKZ9rrgEWlZAc/NvoanZOzhCAY8c6IehwbTzKJ3HQ4DDiSgrh+rqT+B2v31BcySqMTUF42MQjV5E0s7effl5iNJyyBL9pTkxskXs3w+HjoB+8excEiOe2K++fGR1bYQ834nrcnC53THq6r4v6upcsqzsKVFU+Ih0ueHkSZifv+AsJ0lCC/j9MDToFSubl5Pn+6XhF7+cpmpOo35DU9mWD4akaUqOPRMhtBDElEaaorqt8mLztoeiQXoOdKE6wFdeEGq5rUUoqiIVVblguy81mKo51ZHi+lK8xXl22Ccl9pjIhksEESOMf2YB/4T/Hzyl7u2/ZIZ4etmDvOqqhW8dmRcOmeAyl/KaR8QDs/8/dW8eZtdZnfn+vr33mepU1al5rpJKUmkeLFmyZNkaLFtgjIjBNhCCyWgCSZzu9O0H8tx7+zahuekb00/nkpDb3WmTiRgC2AEbhCd5QJIHydYslUqlkmpQzcOpU1Vn3tN3/9j7TCWBNZwS9P5DPCB09t7f/oZ3rfWu942v7n2v79DY5QnidhofHiwsQvUhPvRvH2Tx5sWHNJ96RlqyQkrhdzqLXYgocgYwQipIYSGFjWJrOTUNW/pdu+KUL+h//vLR3md+9B9/xMiFIQzTyCPiSKSb0UnHU/Sf6KdhVePY8nuWK/8rLfLyxvK/3PHEvV9QNWXJ63/1BinLVQrJlKplRpMEF5D7uHSkl/hUjIry4NE1H16taX7lfU1VHnOWoeGCcWW+D2Jx52E2Ay+z+fGMtOStrgtp0KRIL6riwbbT6LqBoZu/GpuHplntd7aHWtY0B+7Yd+f/fOsfDz3+7nffYfpKBNPlsdtCcYQkJTjGRY6hxszQDBPdE5hpsxXIB+IVXOp1+Jl581txFQ6y8GntWrj33meEx7cwDThzc1X0X0EM9GNnOPkuXcOpSCnQvhjWrUY01D1/3b8bmf09xkbAbXrN2EUrojDgYOVKuOOO/ULVjAX7gHqqViTjSCM9bz7nOan6fA5nubqmOBXPaDQkfvDcfl5/A5kHwkXeWFDQdC/B64OWFuzFLSeUksBNf2/Rf+VrnO4EwygE4vlVrGDQAeGLF8mignCAialHZP8ATIznIIvIKcOgaijVVdDSCDU1H6iSI2Nz7YQnENOFso8F/x+PimyoR13UdoiykluXvxwbu0t5/oWj8tgxpJ4kZ5Ymr3JwzFTO0RREUz1yafsTSmlw9pe9b4m1az9JS0sdGzYOi7/6hsb+/bl6VFZrPE89RwiwbbDFrzTP+HZe6x9cJzSPItPxJF2vn2d2dhZPXs05W8VWBF5bMBOO0PnaOfyhUlAUuWJHh1BUhWvxRh0Pnl/c0aX5tFjjira/qWisflJmz/gCdwmkAENazEZmGega2FZS599RVld++FdxPK8DiOfyWIX2oTljHXVeNvA25l+NjKqKc/98jrgLhcTCPVd0MvqN82+eJzIUyY5GqCxE6/pW2u9q39+wvKGoskct65o/vvK+5Y+l4klG+kZd8xeRtUcWgGVaXD7SS92SerFs6zKhFLnBRII/3+g7U6JHsUGY3AoVQ/N4zOZVzcs3fuwOMzmV4NgLx5mcnSRIaYZuXCAtoyAwTZ3J3gkO/9Mh0qmUuXjb4j/1Br2oeeWxbPl5Qbo183Tus6vEdjin9q07evpLfK+vfWAVobogRlqntDpI2/rWX6lNxOP3JuuX1nxu+2e3t5XXl+9887+/wWjXqAOcZU7hJ8uvRpKOJYlNxUjFUr9ZsDlOTHyNsWFEdLZwD5J5boeVFbB8BWJZx2/j9RSfMB+Pl3Lm9AUuXUImU3mbe45Agi1h6zbE9u3g9V/fMyTjAcZGtjE6hjQs5lMIsq0joQpExzJYuuQzeLQF28CkqTdLI5nju8/LqQoAVUX6fAjNU5yA5+LFN3jpRTh9KnemlJdDTS1MTkH2u+d1y/j9UFGBCAbfuTUgPOGlrzcPiF9jaKuqYOcOaG39u+JmbaIhBvr/mzI5kavSORygbHVTeFRYvgJaF13fzmMYDTlL+/z3yaOHeLwoJaVQGnyzKO/R0/MyP/gBdF3InbsVVU7j9Ogo0qVxFbTvBUogFEKUl//sV2bTqqiYEFu31vDwr83IeBT59rsIXS+gpmQ8JB2nLXtegHhDZ+a8U6CwGrKgvs9ScSXnRFbKt1i4aOm2pRUIMWOZkq43z5OIxnJKWk4k41CWhJNQS8wlObX/FMHKIBV1Za9qXo3S6iA5N/u8TpEPAJSqplmhurL/EKope9KPH93VSMt1JwlU6ah7ped0Bk5doWF5/XfK6srb/pcE4gVWv8zXJRLzj5LbmxHH9mQbI7NPI/IykQtrfD89GN7b83YPsamoo+eNpG5JPUu3LqWiseL3ip4xriv7kzX3r35spGuU4b4RyKe5SJmBxIx0DtN/rJ/YRPSR8qbQvxZ/3MmjXYhrmpzcfJbVY7Vvbq/GkuG5qRn019IYuu1sjopAyVNWUNzN0tBNzrx6BlRQ/OpTyXgKxe/BTlsIad70BvqBY1CQhcqVmDMa205iUd5SVcJb4r20eu+q7tY7mldYhoW/xENFS9Xf3OjvWKahSgtVCmELRUhNU4sOYBtXNuwKVgUfGD4/dCAZTTE1GHZrEW6ALITryCaxDAs9pWOkzLU5AJwoZWTko0xPgS2vKrULQAaDyFWrEEuWsCAgHCAS2cWhw7Wy93LuC2f0pTMPVFaO2HY3bLpz43X/bji8R14ZyErN5TcmZkk7fj8sXgSL2iBYElvQ/TOe2EU0lkeTuJrcgKpBiR8UcetlmO7ur/Paa5s4dRLSaWc+1Dja4FTXQCKZA+L5GoZlpdDQCD7f6Vu6//gEDA06xjc/b8+qqYFtW6HY3PzpyAOc6ywnPJ1HfChMLODRYNUqaG27PnUTw6iTV1FD5mllqx6ELwCaNnTL8+Vy75c5fLhSHDkKyZTj61FS4szX6mqYjrj9FPNQQU0tNDaBx/NLz4YXXGWls9y/5/PMzjzNuU4nELwWdBbuOrhp/4Z5KCRTLlhgnJLDQwuD0nxB/+zqPavF9OCMNNMG3Qe7SKd0V2I5z2JegCpUpITxyTE6D5yjor5sr7fEi23Jq+fvdTIsvEFttqKxnMqWKqbHZjBMg8KWaxeIRw363utj6V1LWts2/Eri8OsD4vm285lQPluQElnxJf/tT4lb+fd3GvJExt1TyUZFYgH4wcloom7s4hgj50ZIJJKAxMSiYUUDy7YuQ9XUaLHvGSgPDC/b2rH31P5TB5QMF0qKLADMvHNcjzPeM0r/yYHnlviXrimtChaXRysyuWanhdRRp1NBevKoI7ewwEsD00u3Lym7L74n6i8r5Z3vv4uJjlf6QGTMbWR2i7ERxKMpLh6+SHxijsmRORTV40pF5p60mNURkWm0FXLeeeqATul+GvsW76n5Nb1xeePa+o4Gj9vRbwlV3BAATSTToeRk/Avp2dTnbMWmpCLwV2VVpd/zBHxFB3q+Us/7Gz++mehUnMnBCVdbVskePhkFFYRwvkd+aXJudiOjo0LOJq7anLO4rCIEd29HNrccWbAs0sTkf7APvIHov+IkvyHPhl6Cz4foWArr1sepb7huzX57bPwv6OvP2shnf9NNsCu4XNq1a5F1tYMLTbRTJmceZziMtF1ddiFyNInMn14voqoSfJ7xW77hz372Jf7+H2DO3RoVBWXLFmhpQU5Ngpbn1SrtbI1T1tchV69EBALHbvreM3N1DI3A8LjjcosjD+uosuQRO+pqkUuXPSdCZQPFHGs5Mf5n8uh7CJePrygir7nRybxKVYPlHdDS/Ocf+O0NU9jJ5G7SqXmQJWfhLgA8PvCXgBC3XNGQP97/FM/90HGhBAgGYMsW5KIWZDqVdTDMcIOz/27ZMlizBhTl9sk9Xe/VvvRbYuvd/1k01tfKySnsrBOnkzVWJAhVA38QVG/45haaxFJACrc2KCWFoW+uub2o6xtFF8J2cFKGuCGLn4Pf+qm7Srx+NRGdjDB0foRUKo1HURFuNt4x13HWWYAAo90jvPT/vkjj8hb0pOV6wAgkloPVbgCvVSyuomlDM6nZFNGoUcCHsISJIlXSsTS9R3sZ37sa2Miv4vWBQFwK6Tq+kWclk5k6+ZH97c+JSyGMTJZKZDJu7tGZ7UAXErvIJ5pt2WLg2MD4wPv9pONpbExUNPyBIC2rm2m7o22jJ+BZEO5qWUPZa02rGmla0sj04AyGYebpxcjsN5kZm+PCwQtULar+fmlVcF1Rc8HSkRMUeWUgt/m0aJPAEwjEOnauXG6aXIzPJrj0dg+z0Vk8eN0+OVlgjGRhMzs+hxHT0W0b07DINdyIBZh7zOO3ueZDGfqCcBVfMtpOt3CpPtVU4ZoZSdu0RSKaXDUzPPv9+HRsraLasrSu/KehhsovlpQFho2UGZjun3757Etnt/Ue6UEiWbp1ydPrP7L+D+qW1N3r8XuLOk99Jf7ZxZtadl5e3Xgo4A+gp9LZWZlp3rQARVFQVQ2hKlPZMR0d/Trd3VmVkvwMUvaQKitHbNkCzY1/sCCbynR4sTx9chsXziNj82LpDG+6pRX2fQyWtH/hhoK3wcG1dF7IUiMyXGxEHs+2PITYchc0NP7vC75/JhK1xKJZSUiBnSsTZ3IuAT+yvgERKLlw0zfS06p96O2UOPA6oudi7n7BUti+zQlsTpxAzkbnVSDcZ6iuRixpR/h9N9W4Kg1TJRL+NTE1CalEtgJRsHqFcBpCW9qgqelLaN7iHmjT06vF5V6Ix/POy3m5yrIyRFsLoqbqH68jE4CwbT+2vObfZdVyNQU8Krek4RpPlMrjx4fF66/BuXPYphvIlAbhow9CIoE4dMh1r4RCHXic+dPcYqIqBr+KV1PD11jS8dcMjkAkkpuD2TVZjli8qFuWBftuZhRlNkWW/8uZk9POZY4lRU1m2sIudMfFUR6T+e6xRTmrtWTHvcs/vzO8++m3/v4wvcd7XdsFiZjHUFAE6LpBeiyNmZYoGUfmTKpXER/MS8m7GlY0PrP6/jWPD50YwohG8OPPmaS5SUETCzMa48rJAXre6pZLti7TVI/6KxUUfmD6UgrBPKGnfEi2wCYpH7QXOa5OuV5dpYAgIIVLkSoyT9xMmeUXD/fQd6w/e4B6/RoNyxpoXNVESU3pgjpbNq1pYenW5Xh8XiysbOUiA09VNOKzSboPdzM1EF5b5OO7IKrOU4zGCXmKN9YlFSU9q/asXL7jt++hfUs7XnzOO0qroJgnBGgoWLYkFk2SiiexdB2wsvYoxQfjLudZ5taFyCsG4mbLRTFKBL9oLhpmMDI688+db5xf+9Y/vsXb//S2uPTOpX3xmfjnLcNSbcMqi47ObTv36lleffY1Xnv2AKd+fIqJS5ObjLRVvxDPFKqpOFzVVEkwFERRVCc0yZFisZFoXg++Eh+qT+vK/sPhoW3yfBfo6TyAlAdUAFFbg1iz+jmqq08vyIAee/+yOHiQnM63q0Ofl8VizRr42MdOyLq6G5LzE0NDiJ4ehGHm5W2cl1Pcw0dWV8PGjRFqal9Y8A3UMjRpprNJlILDObNcvF6oqgafv/Omd4ze3m/I73xHk0fezY1jaRmsXQt3bnK02C9egugcOQpTXnG6PIRoburF6525qQfQ0wE5PPR1GZ6aF1flAUYhYNFi6FiOKC8fKPpYh6cVMTICqVT23vkaEyCgqgrR2DBJqGLiOnZh8oUKr7k9ZU54Z5u66WZb2XX+Xfm975SLE8fBcM1wFAVWrIDdu0+IsnLExV5E9t3m5R4qKpHVNceEIn71MuIAPm+XrG2A0vKrlMhQNWhugvZFj4jAzTUKy3l6ImQxlZKXxCk+kLKxvAUGYXn7b7HTppXNld/a9pnty9ftXU/DogZUd993TkI7K3cNElWoaMJDLDJHNDyDkNIFzYorVCGQ16lyULu49jeX71gZDzWHUDJyxRmHbZcYmZmN/SevcPInp5gdn/3DX+Z0sy1LWJYtbCuXIv5gkCBVV783Y15t5WmIizxvmtuPyIWtoCh5TT1Z9kxOs0K6upbFvGKRud/sO97HcNdwNuoMhkpZsWsFNUtq5hb6vZtWt/xpx84VePyaqy1u53H4HV3aZDzB8JkrTF6ewNBtrWhjLkgJVXH1PwVZ93VhO+6DsrihWUlFSc+Gj66v3vLpzXTsXIZQFAzXvElxbdYzC1kgsBAoQkUVwpVUcqgQstilP5kPvp08rxQWGc6vsBWwBfYCnz2mYYVmRmY2XXjjPO/882He/vZb9L/Xi5UwtksphdBI+Mt8cX+JDx9e/PjAkqRmU9imvWB+0x6vD9WrZqtpbqCWdZb1lfgIVgTxlWivZv/R1CSirxd0PT8JnVX2o6IClnZAQ/P/IdTiNzFKI6Vy4HWFF19BmIXszQz4kMuWI+/ehtyw9q4bOZilntKYmoTwBNLlKCtCoGQdLG3QVGhtQS5e/HlKg7EF30AVKRXFdl16yWlpS7IleiEUh8Jxs/foH/isePW1J5UDr8LwUI7ms34D8ot/iGzv+C8ypSPj0Tz9clkAHSgNYldUvoii3VR1SUTnVisnTlcyOp5r6Rf5DdYuge2Oddh3rrPRiju35OxcHcOjMDQElhuEKXn9JEiUkhKUulqoq/tv1wuzKDjnMjFMPoUUblm4aXJiNYcPreW5f0WOjuTg465dyMc/B00tf8L0DFzpxzbMa8wTBVFaiigv+1HRqwxFA0bUi0gEkUgUDJUU0mkKX7MOQhXdN/39XWdh4XqJ2FJka7W57K1ACFFkLxY3USSd+SKxkdJGsRfGcyVYWdJzz+/ueG7nF3bjCzgKchmmdlbcQ2bcJEw3jacihe0m9RQXQ9go15nRU1VF1rbX7FmyfRn1i+qwMV3gj9s35yTpVAQj3aOc+slZ+o/1/XVyLtn8y5hrqdlEc2w8+sjscORLc2OzvxePxFfD9XDE8xqUMuVLKUSB6aFThueXYOhDlqfuiMkXisYp7gFezIR4YjaxeOTcyF+H+8MkrCR+4cNGUlIRZNnODqoWVT260O9d3Vr59UUbWv+8sqVSm52aK4i6M9GVhU0ikWLozBBXTl2Jtm1sLvN4PLfccOVEmBm+tcweBgsZivlKA9PrHlz3Vcu0vxKbTDB2YQxLmgV6PjljDpn3vzgjIeblJIqzxQlX9jnLvstsdajkeicWOkCVUnqstEksHGXajKCYCqk5HSGUNEJIRVVSJZUlL5WEgo/58GFhkE7pxMJRLMNsBhakepOYTZCMJZFW/sy0szO1tDpIqDmE5lUvZdfzxARybDSvmQ5yGttAQwNy0SIIBgeKPaoyGg3x1qEZefQoYnLcNaXI6UwLQJSVIx/+GDxw/znh8d1YhDUZ3s3oOIQjV82KbLa/ugaamqG66pXbk8iQ4lrUBpk9NqVDN4hHwdRv/OCKRkO88sozPPccYmQ49641NbBrF9y3ex9jo3/B5V6wrPwagbumFPB7oK4eUdvwX/F5b27/SibX090N4TBy/qBnLk2DxUsQi9q/VtzgzlS5MvT/icEhMHX3vBLz2RtQXQWLF0Ow9PXrPv3yqAwFzqT5DaASsCRC2jdMe5BT4Q7x3LOd4oXn8xoZQVRWIffuhT17/g0zc59iZDTPHHaeBGVJwPneVVU/4Ff0EpOT/xtXBrJ64tl+FNtGbNsGd9+dupXGcCWbJJP57fzZeZ7hoxc7T62i6IqiZE1zhBv8C8GCuU3Xd9R9ct1H1o1M9Y83nnnxHKNDE2h4smlc6Z6bwpW1xU3QzPPCvrEAoDxwfMOH1hMdmWVywFEl0rIciUwsIkhLnYnL47z37FEUjzq07sMbFFUTty041BN6aeernUP9x/oxTIuyujJa1jaz4r5VFcoHTyK7kIwiKMguZj+q+CXIFwrbkOQ5obt0AJkV0VEQDlvCU6x7hq+EX7548BLxcMIpfUiJikZ5fTltG1v3h2pDr92Od69dXP3rretaqayvKFTwkAJFCjQUQGXg5BUuvHnebyT1otAQpMQvs3J9hQBcCEUulBBTTVvtn215ZMu+DQ+uo35Zfda9K9fm4mxyinSs5h18kReJF9l51Sl92Ui3QgQK0s10iEwjogKKa9e0cOkcWWLqBoqq4MOHjwAevw/Vo/ULAYoqLH954G/95X40RQMEibkEkdFpTN1cU/TNxrLU6cHwl8NDk0QjUZcclJ9RtVGwqWytoH5lPZqmOpHkVKSDiUnEzLQrFZaZU3lfrbUFFrUhVVH8Me3sPCv+4Z+gqyunCiTyHPY8fli5CvHJR3vF5i031nORSAbE0OjfyLHJAjf7fCdChEA0NSNa2hDB25ANB6RQpRSaa0nuNkgKsu6hEpDpFDI8Aenk8hv68ZmZOvne0Ql+9K9w+FB2kxbl5bD3Q/ChvXHR0vRTLlxYy7lz2aZV8ikbqgo1NYjGJkRVZf9Nv2cytYvBfpidyWLT+aeVCAZRGpoRNQ1PF3WMLUsVF7sf48pAoRX3fI5ufQNy+XKk1zt2XfuPFEghUnkdOlclGwSAZbuB7Y3hSBmeXszRoxd5+ltw8HCOIlZVDffuROzZ0yuWLPmmPH/+STl4JS8MUNyGejdDX14Gjitr/y0NpGkIUikvhqEW9fuMjuwQp05uor8PaRnZGEaAowSzawfyrs0Nt5S0ETkwmJ9tl9nkhF38ii2g2E5DsJ2fPHL3toVUk2ta09T24X//4P61D66lxBdwT2A7G2wIQJU50eus3jxkK9s3ksBSPaq1etfqipU7VlFWGUJFy6noiQzUl3jQMA2dY88f4/iPjjPaNdqVTuqltwuvGkm77diPTvLDrz/PC3/5Ew793SEuvd2DlTTbP5gjrklbKHkLXaoIqbp8nJwtrM3tv2zFytuAMkLweR9RCKdZRZFFaxKZ7Jlaceals8xNxVw4ZlHbXEvrhjYqakN/fLve3Rv0HFmxazkNKxuws5uskpWKywjcXzk/yMW3e0jNJD9blChbZdSreRDCuY8ictJ0ikdNq151wdxmQg2hn+558v5vbfi1dZRU+LJZ6JwuivNnJlPuHO4SW8qiV0ZsReKIf6gIlyLjhH7OktK8XjxeT/ZMWrAoO65vn7gwRjycm4+2sLAVMyldCg/S9kkshJCoqMSnEkx0T2KmrB1FD45NS53oGX9qZnCG/JDdAdSqW1GxaF7VzPK7lz+j+TyzpFOaPTr8l3J8AmnY8zP+OQCzag1i3foTN6oa84HXxYtfFy+93MobbyCmplyBF5nH+Qc2b0T+weeRyzoevOHDXk9V2RODK0jM5SxkrkKCCvaqFdirlt+2/VNUlPeJ2iqH75sFby7VL8Pz1XVEOAJpq+UGMtBeDh4eF1/9v73ynSO57+fxIFavQj7+OOzeVYqpC3GlHzE6UpBMyNpeK2D7A8jALfawhSMfZWQEYtFrOPmB0FSorUEuboHK0HBxqw6mKnu6kAN9eWfU1f6Xsr7O4Vz7fNelzOEAO8Vt9M1bK1Jmg1cJSFNH6mk3KXGde1s8XsoLz/eJr34VeaEnO1+FR0NsvhP+3Z/E2bp1qYxMN4uzp2F0uPDdXEogqgqlQUSo7NYH8uDBFH/xF2leetlkdOyuooDweKJUvPDjQ/zDPyBn5/JSBSCbWxGf/jRy06b9orT0lmQXpe2a9kmB7YoMO0pubs1UUVA1FUUoRW2cT5vJVcloCj1h5AQFbYmhm5j2wlEmNY9m1i2p/7V7f3eHff8f3Yffr5FGx3Z54DbkE0iy1RwpFEyEQ925waYuT6k2u2zH0skdv30vFfWVpEi7NEhQpESRzshLqZBOmJx7uZOf/vn+FQPv90alZd4WXrXqFVOmZaKjAzYloQBltWUoioh/MBCXiIzEU649T8lmBW3DRI+ZYBG63UDcSJktpm5lSxuZKEhxQagtLWyzeDhoqnfqm71HLzPcNUw6nXZjN4WKhgqq26rx+b0jt+vdNb93suOejkOt61rxKN68LT2v1C0k8VSM8UvjjHSNPpWOJatu9b6Wbq2KhxOY6Qzb05kXtmkTm475U/Fbv8cvuuqW1H5+48MbufORO6lorIA8cc15Bdp5B5ddVEQskVh2vm5LIRc6HU2TmtM/0CHsVq/4TOLf9h/rZ3Z8LqfXLeevYenPHP4KKvFIgpGeMab6w/uK/TzJmeTO7oPdjJwfvsplwMJGEx5qmmtoWdtC3bK6z6maZpFKVYn+y/uYnLjmSGeAKm1t0N7+qFA9RfuUcnDwUZ5//ku89BKEw+5cyZT4pZPd61iO/Ng++NCHdorqD3Y8vDojnlglu7vJWMlfKyMLKrQvhfb2Z27bBloeeoPK+UA818QoAJFOI6YjCN2ovL5NcqKDl15K873vOZnwqAtwPB7YfjfyM5+Bu7c6oN4wPYSnYXZ2HjTObmCOs6f3FgqaqbTG5EQl45M5Ix8xb3YFg45ue23NieJHynoVw0MwMf6Ls3zlZVBf142mXRcYE5om8Xp7pKZdY+eX+e8PczHQjY7rAuHjE3fx/AtRnn0W3n8Pkq7Ki0dD7tiBfOxRuGe7c9bH43cwMgKzc/PDCvchVfD6weu76fUqLVPISxf/TL78slf+y7/AP38bvvcvRzn89oS80PVNOT5yF8mE9/o3qJSX0ZEdvP/eWfH9H0T50fPIY8cKGsTx+GDbNvjUp+ZYsuQztzoFzLRFci6JpVsF0gYZszkzbZKMppC2rCzm1DNSxu5EJEEqmc7OPV3XmR2dw4wvrDuzoqlyyZZ27+ZHN8vV96+mqqwSQ5pZjfHCZSgKAsmbzdY3rKjv2PzoFrns7mWE/OXYWFjSKpB2ziRuw8NTnHnlNEe+8y4nf3zKnuoPf92yFvasjoxMP5OKJR1ZbVR8pX78ZQFQhPGBHHE9agoz7cQvwiF7kFHnEE5GjuhIFDNhruU2XrZuq/GJVDAdT2G5SiGFOR0bQ9dJRhKYabuuCABj8RUV024AACAASURBVPvPvv9k5xudpPWUO50UVFQ0j4bmUZG2VG/X+3u8Hr1xZdOuxhVNMlhRQjySwJZ2nlyQjYrjepqYjnP+Z12U1ZVfWLRx0S2NRSycfHD4wijJaMpRbnfvqScMBs8OUbek9nuNywMfWsh3X7ljpQjVhg4mZ5M7z7/eRWImRaFLmXMY2G5WUxFup3gRGQ16wiKV1J2utgKevI20JTMjESYvTxKbjH+6oqniOws1FlP9U2t7j/UxOxlFwYON6VRGbDUgUFHUfAskp3U5SZqJgQl6jlyksiX0btPqpruL8Sxm2vaOXpg4cHL/aQbOXnG3P/fOEkxMymsqWf3AWprWNJl5GdTForsrq1RyrW1YqAr4feDzTRVt8IYGPyoOvPoc//xtONcJQsWWtqtiooC0kM3NyCf/APHQR78qGptvzh55LvawcuIcYmy8EG/mv6jHj9LYAvWN/9dt20SDZS9TVvFEvlFJfrZWAKR1mJqGePSDQUI4vJh3j16Uf/0Nl87gBoU+L3R0IB//HPJ3fkdRVMc6XhpWqYgnwHUvlfOfQagoXs3JrN7sNTO9SYyOICM5wRUhyQbvAokMVSA6liNKSosOxEU8sYrJMMzN5Sy43f1I5Gm2o6rg9Y4LcW2tbZlMBrBttYC2VBr8GSUlhaZXQmaVaSQg0ilEOIKcnPx90dHxZ7/wTJ2eWcy77x0VTz2FOHsmN0dVBdHWivW7vwuf+ESZmuFL21aFTKZBNwqAeJZjLYQDxm9BLEGEpzbw/We/Ig+8jrx4ES5ehDd/BitX1dp3bXpSbNr4pFi1+gQNjX9KRcURgqXXpHVZyUSAmdnN6vDoN+Tx9zdx6BDiZ4eRE2NIM6c/jdeLuPNO+MiDsGtXqBjILDWTYnYigm7rePDm5PlcE77kXJLw4DR6Qt9WrHlnGZaamEz/ZmwqTpo0AQLOsyTTTPZMERuLL3wGWNOstvWtNXv+8P6woqoc/fHRbOJORcm2cropXVdqwUYIG3ET5i++Ev/skq1L1E0f32jr8RSdr59Ftw3HtwLFlROWjnSDhNhMjDeePkjviSts/Y27v7Rx3x3tDR11n1yIsZgZnf7sxbcu7p0Zmckp/EmBbTsy3L8QiI9fmnj28vt9JGYSWJhokNtM3OGMTse40jnA7Nh0Yystt+0MiQxFvjF8dojEXML9iDnZmkynbiySYOBUP5GhmcrFdy666Xul51J13T/r7jvxk5NcOTsELhkBlyM8NTDFxOXJXwpPPlDuQ9FEdvOTwil7CdcWXEUjEUlw+ienqVtSX7to482Pg54wS6+cHdIuH+0hFom6hAzwoBKLRDn23PuEasr31rfXq4pnYc0b6pbU3f/Qn3xUL68uF2898xaphO4GRjm5wkJVeYqmrDjSOXx89OIo8ZkUqsw5QAo346wgSUYTXDrawyvfeO2ZDQ+te6Z9c1u1rzQwXaz3nx4Mf7nrzQtPnfrJSWYnZpBYKKhuMc4GLJCO5r2wpV+RzuhY2GhomEmLI98/gpHSt+38rXtfrV/ReEvB09zEzAPnXjl/4MTzpxi/PIGFQ4Nx1qOz5aqoNK1s4d7f3EHL2pZc818suZtTnciRsYJMSUFbkyWQR4/CsqVzYs9eFY9681/T1IV892iY/T+t5KWfQo+b5Ja5fURKCzZugk9+Eh566Kti2S8GMb84NaUvFpOjyETsqvfLADPRXAOtTVBd1X/7MuKlh6muRPi0nNKwyKfNSEfBZmgIzp6DTZvuoK7+2s29p04d5NVXd/Ljn+Ts66UE1YO4YzP88R8g9ty/U6i57yZmZu9jYhJm57JyfhnurHDJutK2Edq1jyk5MvSAePHVA/i9yBUd3WLL1pVXR6pTX2J8LKdWIhT3O+cFHDXVsGEDVIS+XfxIOfJlRsYgmqGOyZwefX4e2x9AlFX8FL9fL3jHudkqcepkHz87WC4DJYjPP1FPReUEgKgInaC2BhEKZasKskBxxv398VHEm282Ulv9Z3SsuOY8lsfePytefnktr7wCPRcLudJ3bobf/T2UnbseEyW5QEAk0xuIhJHJxLwKXF7oLy3wexLXBLR9vU/Id488LQwTVq3s5q67Cr6fTOlecerccV54Ac6dzYHl8BScOokYGkD87CBUVm6iruEADfVQWw2+gFPJUtyxTqVRwmEYG0eOjMLUFHJiAsbHKWBu+7yILZuRX/wD2HP/zmJ8/sm+iW+OXBrGStpZCqXqHNLZ1FFyNslk7xSRyem1zRRHzGP6yvT/OPPSqfK5yVnUbIJKw7Zt4tMxun7WSe3SKrl814oFzQL7SgPTy3csr4+Go+PJWJzuwz0kjAQBAkjF5YzbuYD0Zpo1C8G/Ijc8tG6rv9R71FOi0fXmBcJzEfx4HS1rhzOVJU1a0mD43BCH/+4g/cd7H1u8abFctLGNxo7Gz1e2VH6rOCA88uiZF8888+63jzDVO4mGllWQQSqA6bnmDmfplhYLxx4++8rZx7reOE86nibrX5I1oABFqujSYGpokq5DXZTWls7Wd9Rv8Ab9g6q2MILppm5qiZn47q6D55+8cOgC6bielwUlm51UUDAMg4m+SboOdlFWX2Y0LqvfEgj5zyrXIeZu2aYwdCOYnjF29Rzu2X/iheP0nx4gno4TwIcQ0m0ysJkZm2XwzBUuvduTaFu/aKM/VHJa1ZQFReWmYalGQm8ND01jpk1XT13k9R9njARUDF1nuHOI86+dp3pRjWxd1/JYWU3p89cram8kjcDcZPSPe4/3PXX+jXNMXZnCxkJzgZaCgp7U6T/Wz9mXzhCqKTMbVjc+U15X/u89fk94IcTzVa9qLr13qZKOJ+XU0BSX3u0jFomS0ZKn4Ci69RjJMi3VNqV3vGfs5IkfH1tx5fQVTGlmoX8htFKwMJjoneD9HxwjEYkxPTQVrl1US0lFSbfq03qEKmaEEKkM8FMUJaKo2qBlWa22ZTciSOUrI0hp+23LDtmmrJ4dm9k0eGaAMy+epf94P3pKz5PolK5JhLuxqYoUgpTTgOcAARUFbMmV81dQBPiDnr3L710pa9tr/9QT8L7rDXrOaB41BgpCEXZ+Vt0yLBUhsQwrYCSNNj1pbo8MT39z4Hiv/8SPT9N9qAc9mXK58jkdI01VaVrVytq9a+m4u6NEC6i5Enw89gCXeyE8TaFwncyr4tpw9Aj4vQLTtlnU9hyVFX9LecX7+H0xPL9Y1UDqSU3EU/VMhz/Lha6n2P8SvPIK9PVmUolI6XRW4A8g25rgsUfgU5/8U2Xp0q/f0uSZm9tKeAqRTGTfr0CyO+CH+mpkTcXobRWBraiYoKFep6bGKybD2SwdOYMu57/PzcDBQ1BdfVLu2vmnoqLiB9h2CUa6Sc7GPi37B58Qh95EvPoKnDiZ+32/H3HnFvj4J+DjnygjP5trWoLZmV9nOgxG+ucsOgtmZpED/YiJydVS0xIYZoVIxDfL+NyHefudx/ju95EeFXbeu4JF7aupqyt0ER4ZfYTBoZ8bhQuAsjJoX2RTUtJd1PFNJALMzG4lm42fbzWeAyBiKgzdF5/C5+mkpKSTudg9zER+X3Sd38mhg/DKq46e+6pV49x9dzvV1f3C5zdpaHBMiFI9kE4VvFnmjGJmGl59FcrLv4Lff1YGg8exZIlIpdpJJHfRe/lLvPEm4sX9cL4rN1LBIHL1KsSjj8Kjjy0XNVWFtKxU6g6is4h06tqja1sONamnJyjXr18sLFmCbXllKrlGJGK7ee31J3jxVUgk4MEPr2DNmtLMHLENXRXvHxvjpy8pnDmbVdXJ2zMQ8RgMXMn9b1XVUF3p0GEUB4gLKSGVRkQiMBUu6DkpXAuViLs2w76PwkMfaRGV1TfdK2BbtrAtqcbC0YfPvn72yZ4jPdhmpnnQJmO7nJELNbGYHZ2l6+AFAqHAbPPS5tWeEt+YegPJLNuyhZRSMXSzND2bfqDztc4nTr94mngklj2nM23QpjS4+M5FPCUqwoNdv7xxlyfg69S86pzHoxWds+Ir802s2rPy80Y6/XQ8kmDg1CCmtJC2dFlxmZSLAoWdOTd1ldaWvbdm75oWy7KHNJ+Pi4e7mZucwTANx+0z29MlUfCQSiUZ6Oxj/NIYg6cHGb2wjLZ1rU/XL6t7urK5qtcT9L4jPMpoIOj/rtfv6VM0JSnE1eV1aUuPbdleM202p+Pp+y3TWp6YTTza83ZP45kXz3DpnUsYpo6a6a8UWXdwJyNuGJZmmZbfShuNZtJYHx6Y/m7vkV7vO995h95jvc5Bite1jpd5kEPgQcPWTQ596xATlybLd/zOrr7aZXX7A5Ulf+Xze8+oHhFVNKFr2s3J/xiGqVmGFbTTdp2RSq8PD04/0/ten//I949w6d0esAQaqpsNV93uXBvFbSg1dYvD3z7E2KVRbfdv7TnZtLbxQLA28GXN4xlRveqM4hGGpuR0Y03DUo14utVMm8sm+8M/Of/aef/Jn5zi0tFLWEj8eFGRWMIh6yBVpDQZPN3P/r/Yz5ZHt51ctXv1fl9I/KO/tORNf7CkKFlQy5TCNMygqes1tmHXRYZmnzt/8Hxr54FORxM6W/IR86rfLk0DOPWTk0z0TrLj93c813FXx2BlbcW/85V73tT8WkTRCjOMRsoIGAm9PZ0wtk/0TT7dc+QS7z37FiPnRlHRspPJaYhwFpBtS0799BSjXcOse2j94x33djzetLrpmUCp73sev7dT9XqnNK8SV1S1aEHKku1L6j/qf3j8+f/0PF1vnHff1HbfPQNOVTJA9IbGPGV4LcMq1XWjLRaN/1H44vQTF17v4q3vHiIyHMGHiiXcBS2lK1koMbFRpAYWRAbDvPWPhzn2w/epXVxLqCG0oqSyZIWv1IfmUbNryefzEQwGicViJJNJMrJTGSxkpHRS8RTpWZ3wlWkmekcxddN1MNPc97Wyyu5Z3X/LFrYiUlLkGyE5m7IXjZHOYX78n39C65rTtG9uf2rxlsU0rGi0y2rLX5RCpvx+3ys+v/eY4lEm9bS+KhVPfRopSc4kHp3onazsPz5I79FerhzvIxFNZSVOVRf0WxJUNCqaQuz4rXvZ8uiW/1IAwgGS8aWkYgi3RJybHArCbRqUWIieSzA6CgcPworVj7H5rsfYvSNCc+NfUBJ81w6GOpXy4FXrTcaiITl45W/E2c7HOfA6HD6MGL6CjMXddaJCpjlRCNiwHvGHX4Ddex6jbdG/3tIETac0MTZay8QUGFbB+2VhmdePCFWCPzB6uytqsm3R/8PyVV8R41OI6XDe7i7JE3SBAwdgYADRde4plix/Cq8PxgcRZzsRpzuRQ4NZJ1Lh1Ilh3Sr4oy/Cxx/xEZiX6bUMVSZjm5TEXPZbF2aLcaQTh4fh5VeRpt1J8yLQU9B7CXHmNHR3I0dHkboBM3OIBx/6IZVVq/Dk6YAPDin09Tv4J1stmo8UfFAe6pceT7SogZBleUmnSrGu1gqQuOvb7b/ixHHE3/8d7N6xH82HvNQL507CxW4YGYd0GhGZhX/4Jyjxd7HnAYdr0NDUy6rVS+T4uAPE8ysamf/UDXjrbYcr3j/wnFixDBQVrgzD+XNw4QKi/woykaMrCL8f1q/H/vKXYffuFlFRcRUwtQ29UdGNPJA8L9AwLcToOPIHz8LQUB+LFkMyiejvhXNn4MJFxOAoWAaU+OGhB3/ImjUfRvNIZXj4d+QPvlcpn/kO0jXA+nnfJvuxI9NZZZyrnkbOc5jM3yXLQvCxX4Pf+HXJA3tUcRN651ba0kzTDOppvT0d0z8+Mxz5PwdPX9He/vY79B0bwJISDYEQtmvp7li/W1goCFKxNIf/9h0ifZHyex7fOlTZWn8oEAr+tbdEPe71auOaqurCe3VCy7ZMYaT18sRsep+eNrZNX5l+8swLpzn/2nmunB3EljYqKhLTqZYjEFJj4vI4sck5hs8Piw0fuuPQ6t2rbV+d//WSUOCvSoMlbwm/Z66YycTK5qpvbX7krndmJ2KdtoT+U/3ZbHiufq3k+Ba3qP/hLw8M3/nInVpjR9Pg6fUtjW/+/RuEe6fm9VJkkpUeNAS2bjHWNcLkxQne93sorSmlcXnDklBT+ZLyxnKaVrV+qbq1mmBloFvV1AgIpJReRRExKaXXSBuL0nPJxtnROYa6RpjsnyR8JcxI5yixqSjSzlStXYwibFAc3KqlE3qo882umdGuYeZGZ0hMJ4hORZkZmWWsexwD0zGecCeO7WYXM0qhEoEpbeamYnQf6iExk6Ssvnyfvyywzxv00LC0nrYNbXbbxraQN+C9IVkuM216Lxy6kB46M0xkMEJyNkpsOsbMyBxjPeMYluWUv0XGWMjOlh7ys+Px8By971zEjOqEmkN7/RWBk16vl9Z1LSzZuvRIbXvtHk/Ak4wMzzwxcHLg6e6DF4hORYlNxZjsn2KybwKDJBp+13DCBunK7Ainyzc+l6TvvQGSkTRdb5zf5yv17lu8pZ3lO1acqF9Se8tW4l1vdtl97/eRmomTmE0wNxljqj9MeHASE9P5PgLXDGP+5ZiLJ5NJhs8O8vbfvcX5lztby+vKnqtf3sCSrUvk8u0dSgaATw9Of7v7cPdj/cf7SUd1ouE4kZFpxrvHSCfTqHjnbYG5UmsqkWTkwgi6btF3rJ/yurLH/UH/45VNlTStbmHZvcv+TVVL5TeLtcD9ZSUTi+5oad/+G9v6VAXOvnbaDRw9hU0fyo3JpoQHw1++fKTvqdELo8yMRkhGU8QmokwPhIkMz2BJpy9BlXlbfkZT3zVWktLGssGwTVLTKdKxNJN9E2g+D5rXg6JmrahQVQ2P14OhG5iujnYOiAssy8LUTayURSqWImUlXTsEFYSa5b3idgYg1CRCYlu2mpxLfjE5l8KwrAKxMwfe2uiJJENnholOxBg4NUiwOqh4g559qAJ/wP9YoMSP6lPRkzrxmTjScgKDxEycyMgssyMzxGJRF9Jq2EgMdEBQWVbF0ruXcMfHN7B2z9oDVe3VX75qsBub/iOPfeoZPF54/1gBMSUrQ4WrCBGNQbwXpmaQvX1w9J1KKkJPEQw6+saVFVBWCpoXYUsn2zYyDMNDyPFxxOU+GB5yNIJzxygIDdashHvvhd274N5799LccstSpDIWbSc8DdH4tXKxznuGyqF9KeK6NaSLd4nqmqd58CNfkcPDMO0Kdggtq3whM5U/PQ0XLyLSSURFFWgaMjYLE1MwOZmVnBQAzS2wayc8/Guwa/fG+SAcQPj8pqyo+FeC5V/KzPWMUovIs7cXpgWdnRCeRoRCSMtCRqYRY2MQzQP+JT4QwnBrvTnAEpuD2RmknacsJVxVGCEc/fCWNmht/21REiyqaoXUNF36PTHFtsuz+2QmS51taHS3pYlxeOctGOhHKipMR2BiFOaiueDN70c21ENpWVZHX7a1fkE++MABcfY0YmoiFznJeekY20JcvACxqKNZLgTMRWFqEjkdBtPKjeXiNti9Gx7ah7j33uXXAuEAwuvvR/GsdfYcM889MVeTlaaOOHkKhkegIgSm6fD1x0cgGs+jhfiQQiA0jyQZD9DX903OnnWy+XmrJXPmZvaD3NxxnajyMufiGnWQfBsdEapE3rkRdu6A3ffNiTvWd9yM6VAqmqq7eKh7fPj8COHBaeKROIlIgujkHGNdY5iGQUYNyOkLULJJLOG4LyNtk9mxGbpeP8/c+DTBUGinrySw01/po31zO0s2L95f017zcdWjFYDx/mMDqUvvXvKOdo+SmEuRnEky3j1KZDiCIQ2n+umCXOHy9h37OZvoXIz+E4MkptNcOtKraEFtr6/Mu7eqOcS6D2+0W9e31fpLvUWjUwargue3fnrrM6qmPG4m04z3TKDbOhpa9kySIlswuPWquaZajWsa21S/crissXRb39FeBo5f4UrnMIlU3D0tHbUziUBKC2nZ6JaO1B2Z38R0DF+pD1+pj4s1lwiE/Hj82gpFcUVL3AKilDa2ZWPqJqlomuhUjMRMguRckmQs6TIIFKSQLkZzTzahYAuBZiT19gtvdnHu5TNM9owT0xOY7j/S8KHhwXK7XTMOjsLNNdoZLWdHMpnpiWnGXxtzGhhRUT0aK7avAAulcWVjmzfgPX+DQLz20luXOPHCSYY7R0mac9hYqHjQ8KChOU6fUmS1KjMTPZMJFm6D2lx4lpM/O+5CBQ1N0di47w5Kq0q3VTZV1nsCnv7Z0ch/7T7YzRv//U0i8QjS5dNqKHhdKXJbuhJ5UimgI5i2JDoTI/J+F53vn0PDy6bhWUINoU1VzZX1Hr/3lrif3Ycv8M4/vUMyHCcaj6Gj5wnluyQAKd3MeP6T5bqFFQSpdJILR89jYeEXfhZtWoJQFbF8e0dmzOuneicfO/HCcd7/8TEs95urqHjdL2tjzYMT+ZkGgW6aDF4cpP9iP2Cj4aG+qYE1e9dS11H31WICcYBAKNB/x74Ney3dPDB5aZypgWkMaeYcV20b27SQ1vXvsTMjM187+2on5w6cZXJgAhvLbVgWbvzsWPgq2TybG5pKmVeHcMbfCQqcjnWn0VfmzGIKc5B57aY5kyJZcAw5X9SLN3cXaedJOLoSnlIEnKSc5U/OJO5LzqbQMdxnV7J3V9zCZTqtMzYwzsjAGBYGtuNRihcvPo8f1atipAxSVjK7Cyh5x66CJ9skqyoaPp+fspoylmxq585PbGLzZ+7yebwe/ZqD3dT0PT716x0oylcAGBiAmVkw9KxTbsGctm3k9BRMT0Hn2dxcLAsiy0PIYBnC53PAYTTqZNEN/WpCgKoi/AEHBKxYCQ88AJ94+BAbN+4q2uSMxnYxM+OoV1w7jwehECxfAaVlr95uIE5Z6Rj33/9VTp/6ijx5AmE58nO5xe3WUIQAPe1UJa51KSr4A1BXC3vvh0c+AQ8+9AuPU1Fb+1d0rPgSZ89DeOKaQyMApqeR09NX/bXwBaC8DLFyOdy/B6qr/udVFKVoFDk3i3Q54qLA7EZCeTnU10NTw+FiD60IBJJ2VcUhWV+/T3R3k28OBS5tIovm0jA6hhydJyOuKFBejqirQ955J+zZjWxpfTI7sPV1r8tdO74qDhz4CllX2kyVMpeIARuZSCAu9SAvXQOoqgrC64PWVvjw/fDIY3F27yn9RR9QlJW/QPuSfVy67AQNeXtYwUwPTyHCU/NSNyB8fkere9lS2L4dKqv+1uWFepFAQwOUhxCm7jQNW5Y7hlfJQv38Z8yfL6rqqvB4nW++bgM8vA95/307lcaWm/7+6Xhqy4VDXZx56RzD50ZIyiS2ix287v5qZnp23KSYy1BGkZk15pzcE8OTjAwPuykWDZ/mY9tvbKOsrmxfVVulV/UUqupcOTXkPfrd97h87DJJmcz2SamoLgjPVUCdvjEn8aC4f5eIJ7nc2cvFzkvZGnJVXSWhukqlfknd3f5S70+LuSbql9Z9btPHN9bHp6N7T/zwJKM949mzS2BjGxaWaSGlrcCt95lpXtVsWtV0d9OqJto2LJo9/9r58kB1kPGecVIzCfRkGjNtYkkrmx/X8szcojNR5maibtJ5IOOBnKfRV+C9nHdGK64meuZPzQm9pO06jkrSSYNUXMe2pUeTlixLhRPEJ2Ik9CTSPZoVbNcuVLjc4xywtVxYrmQjGekAYqRLE5GYGBiGQXw6TnwmiW3LGxZOl9LyJKZjxKfi6KaBcGGxU/w2Xfij5LFi7YKDLgPCZV4JAgQmNrqdIjoXJ56MY0urxLKk0JNGeWouQSruWN168GXBjTPQRtY98WrrBCfy1PBgo2JgkoqmSM+lkZYsudUJFQvPMT08hWVJtxFOc5vgMoFHxvI4l/V0vpHDh7ILbX+cZSht4pNxktOJPJ6T7UnHUyRnE+ik8eDL8o8N16WyEILLbCCQo4M4T6C52VkLm0Q0QTQ8g6kbZQuBJ8rry19b+6E139KTqSde+x9vcqnnMiX4kZhYhk4qqmOkr5/+ZqRMb2xyjmQkiknKoWa54NvAyIY3uTxShqE/v/SV83pVKGykknkBjCjIAeNCZfICSqUgi20VHHgZQoiNhYE0DbCsCqQAC68Vt4JGUkcnjcTO6p1nmiktN4xQXGqT5oL8THe3YZiYpgXSxoOWFyKQNVQy3XtrqNTUVLLi3hWs+8g6Ona2H6heVP3wzwXhAB6PRfvir/LEEz/gnnveYv/+St46hOg8B3Pxa5aixdWYDRlLQCKNUMJZGpJtWQjLuMrJUgJU18DGDcgH7kfcc8+gWLn6bsrKiipBKqLRh5mdReZlHK+CDaEQrFgpZWnZmdvKEc+MfcfSPxMf+dBXxMgg8qVXsjJ/mX4TRVEK1FSuqWpT1wD33Yd8+GOIu+78PC0t//CBY1NSOs599yEHB5Evv3jVN1V+TugiAFFa7jQRfuQh2L2rm1UrtlMSiBQipKQmJydhfNKhjrlvVTBnbG6YsnZDWbmmxj9m1459jI3BxYvXYIdfuzk5+0SLFsGOnfDQhxF3bfm8rG14VsnTtRaqJtW29q/Jz/7GV6SU8INnM6SFHK0oj2aU/+52/njW1sH99yMfegixY+c+Wls+GIBVVf6Qj3/saUYGEROjec8ur3pPe957iVAlcsudyL33Ix64/wjLln+UkqDz/UrLZtl+Txm11T9i1z37xI9/Amc7YWwc27qapmIXZMx/jmETwnH47OhAbL8H7rkHuXnjXlFZdUgESvRbYyBZjbHZONFIlKRMobjJPgGYGO79FfeENgsgW36rfwbiaXhdiqMJpu2cxYkU0hZXyQcl55LEpuPY0sqqkeTa4+0sb0FmOdhXg8gMUAQLA4PkZBo9pmMZxpKFWBONy5s+tPdPHnrUNOVz+rPvM3llMnsG6WkTM2lgW7YXjaJWqNrWt1XVtdetuGPfxn8eOju46dK7l7j09iVGu0eZi8WyeDITLil56Sal4KRWco6o2AV/k/kzl6y0swlrB0/Lxv+h1AAAErBJREFUrL75zNg0kwNjSMOq0xRNCVe31dC0ppnAWADh9aAqCootC5aTN+jDW+JDUxRQJJa0MRIWRtLASpkIVWb95qW0nFK6Ialf0UB5YzmqpkRu+BBT1bmq1mqaVzcRKPcjFAWhKS5IcEGhBE/AeTbFo6IIBWnbGCkdPaljpg2kcNy+nIwlSMvGSJrUtddRWlmKoqlTqiqkv9Q3WtVa2di6rhUrLfH4nQWBtFEU0Hwq3oAPze9zJrdlYaYMUvE0pmGjKmr28DdSBg0ddZRWBVFUJXGrk6imtYZFGxajp3VAQdUUpG2h+TW8AR8erxehOOVdh9IgkJYkFUuSTunuRpxz1rJNE0UoVLXUEmrIScArmjpbUhmkbmk9iwYX4y8pQVGd382OhRAEykrwBHygSISiYBs2qWgCU7ewLRBKLhxIpXSCVUGqF9fgLfEuGA+2uq36i3fs29gQjcT3lb1Rhh5NY6QMSipLqF9WR0nF9cdD/lJvpK69ujI60UzFVAhvSSBnWCFsl55VqF/u1BhFYbMhYLsd8j+PcZcBAgXScW65Nd+JMfubMpPjUN07OZQsy7QxkgYVTZUIhRkAxaPGyupDh1buXrUTFWf9GDZGTGd6LEJiJo6RNpGWUzUwdQtp59e/3OBuHhBT0fBoPhSvwFfqpayugrKaIDWtlbSua6N1fRtNq5v+TWXrdVY/NFVSW3uesrIGUVLyLhvWb6KnBy73OTzhqQnHZjsed5rA0ulsOb0gM2aZYJmFIMfz/xd3rTF2XdX5W3vv87j33Pfced152R6PH+OxzXgCwQ6PSn0QRCiER0tbkEpbKhXRVmpFQapoQf1REEWqaGjUUqpUCFVFsRSh0kZ10jaAkjQogUBIADvGj9ie8Tzu85x7Xnuv/jh3xnZsiJ3YZP+b+TFnzt5n7/Xtb33rWzbg2oDjgMbGwVPTwOgYaHYWtG8vsH/+U5iZ+StY7s0vMFdyGfUacGA/KPCBXG6L1oBhwPdB+/YBkxNH4TgtvFrj9tsXofV3qFACP/kkcO4FUM+/QgKAy9hTeF4mAxprQOyYBRYXgaWlEAf2H0D9Or3WHSfFHUfeQzq5H54DHH8eWFsH+gHIXOpTwFKBPQ80PgpUakB1CNizG9i/AOxbuAc7Z/8I6hp1J0nqca0G3r0LMk2z7SlEtk+TFJAKPD4KbJ/GLYPixfJZ/Oo7n0J56BAeeQR86iSwtg7qhyCjsw68RFl8sixQuZRdEEfHwI1xYG4ncPBgTPv3L2J45Nlr/p+2renwkV2s+ceAAH33O+Bz5wDfv3rtAMBSgJfPilQnJsFzc8CBg8ChxRj7Fm7H6E9xxrlKa5Bv8uHDv0yt5jGUiqBTp4HVVRi/d0WTPQgBKhQzWU2lBhodA/bsAub3AHv3/BP2zH/oxeAarpPS/oNv50rl3WhM3I/jx4EzL4BWLmYSqnYTaLaBIABlxEOW7ZASUBYolwNqtcyfvVwBNxrA5CRo2wywa/fjmN3+DipXLt6Uy5YlTtUmq2jsbSDn5aEsBSHFFuudLbGE4zmwchZIZT+zAZIgQhKmSGN96fIEghFAGqdArFGfHkKumAOJqxuZlYZLaOxpwPZsmNRAWgOCzmSxw3IUnJwD27WzBlmGoZMUkR8iCROIS63RAc5YWttzUBgtQjryuVu1LapjpaOH3rXE0pb0w4d+iKjXBxFBSIHyeGWgbLjJl2JLaq/mPevVvKXScPGN9Zn6f+947axaeX4Fq6cvot8K4a8HaC430W/72YWAAZ0Y6NjAmHQAvPUWi48rCE4BIgmpBJTlAJIyK/2cDa/ioThUgltyISwJGKDSKGFqYRKWLc4py7XObHvdNtglC931DoStIIWE0AOLnUHauzhSQqFehGUpCEvAaI3emo9gPUDUiUCSQEIMLPQyIJ7EBsM76phYGI+Voy7c+MSp3vTiNihbobPSgrAUSEkY5gyCcKa38YbyKA4XYeUcSCnBqUHQCuCv9+C3AkAokCLwQK4AzUiCFI294xiZGn5cWaoLAKWR4l/MLM58MQ5TsCZYjpXplVINEkCu4qAwVIJXKYKJkUYxonYf7ZUOQj+CtFR2A9IGOkoxvqeB+rb6U8qSr9j7eMfSLIgFAt8HkYBSFkyq4ZZtFIY9uIUCpMzsiTaBOFLGxvI6uhudLVcVIgEWAjpJIJhRHC5jYv6SZZK0Vas2OXT/3Bt2vydfK8DJ5yDF4HIFBoyBEoTyxBDyNQ9QgBIW0iDZ0lLrJAPngrILUxTFsD0Xw9tH4dUK99yqzS0sqUd3jb398G8cebKxZ+LQ8o9WEAUx3KKDsZ3DqE1Ujl13/BwpfHrnHbOfKdQLCLsx7NxACnItqTlduR1p8xe0yXPorY53uIwff6nK8MsZ8832wJtF5tnfE5eY+E0gHqSY3D8F6ainQYDlWHFtpvq2Q3cf+tfZI7N3adbQQYLeSgfHn3oeq6fWELcjJEFWDOq3AkTdCGmYXsblZ9QhiwzIkGa4rotSvQKn6qAyWcHk/CSm909i+uDkU+P7Jpde9iK6bozbblvCbbeBw9DG8eeP4tkf3IVnvgf6wXPA8gVwEmbNcZqtzIPamEvevJsrYTjzBC6XwZUKUKmAqmVgaQn0+sPA7NxnMTX9l8i7/VvJQnOp+AB27/o9ettbs1bjOXeLC4PRQD8EFg4A9eHPQqkEr9YYHf8u7n43YWhkgx58sMrH/gt08iS40820u5uaCiVB9WFgagpm5yzodbcDh+/4BhZf82bgZXgdTE8dxd3vLNLstmfxP49M4emnwetrQKwHVoMMdh3w6ChoaRE0OweemH4cC3vfANvS9LM3EHh+PmP4SQCCMj96QUCUZLtprA5e2Hf2ln0Dlq1x221LmNtVo0OvOcff+KaL7z8DrK0BOgVJymQ/QoK8AjDTAHbPA/MHQp7b8X6MjTwgLOelL4j14eN0550OxsaewwMP7KCHHwafOg3udgGjM3cKA7C0QI1RYGIcmJkBH3kDcMcdx+jAwRu3L1WKaWLiIf61Xx+ihYVv07GHd/D3vw9eWd5yWTPMIMsGjTfAiweB2Z3Ajp33Y/++917PnNPUzFFMzRDShLCy8ot07vw9OHtmN878BPz8aeDiKij0s33EABw3k5sN1cG7doKmpoDGxKrZvu2DGBv9D1LqpruZOTn7e9sWt8HN5dBb8zMcIC9J6sgAJCSKoyV4Q3komyCkhI4ZvWYXwUYfYTcGyAxiJoGlQBoZ6CDB9OIkKo3KMSHEVefD+NyoWfiVBdFe7YAZUHbGbJs0IyPcUh7FWhGFagFQgE41Yj9BZ6WFoOVDSDHImlB2MYhTyJyFsd1jxvacp27lkbPnyC5RqBUeKw0VXu83fcAwhGWhsacBKWR8K59dHCl+szhStGYPz0JrTRdPrnytu9K76+Lzqzj9nVNY+8kqeus9pNog7EYI2yGiXow0imHSJIsym05kzBBCwHIdWK6CnbdRKHuQroJwBQq1HEa3jWJy7zRKjTJszwYM4Hp2p1D3/sHKWcuUJppaK+2PhE3/93U/mSZJEYQMwUKBOGWwMgC8sns0V3K/JJRsCRKJ0SYf9qI7Iz96T9JP5oiQXsbmJWw4lySmlCs5Txbq3ke9qvfty23QrmcYbah9sfOb/kbv40kQbZdSBkKKLghgQxYboQCCW3a/nq84XxAKLUGUsCErCuI7om74vsiPbmcQSCAVxH1mttiwm2rOe5Xcf5ZGCh91CvnTQgpO+lHBX++9r7Xc/hxYQCrlk0DfaF0EcWp7zpNuKXefk3cfB3FikrSeBMmRoB3+QRwm27NnUAhmlca6mqvmHiqOFv8wV8idfqVOIc0Lrd/qrfU+YeJkhIhSCJGyMcrJ28/ly+7nlet8j6QMmNkyg0NQMCW9je7Hg07/HWAoYoIgSllQwkbnYIyStlrxhrxPVsarRzfnPArC4c5y+wt+M7hL2KopSKTEgAEUmJUS6OZrpb+1C86DEJwIIQId64bf7P15EiSHTGqKEJwSZXk4nZoyKek7Refh8ljpj3PezfPTvtZIo8QONoK3N5fb9yZRUrVs2fQq3r8V6oVPu6XcddlShX5Y66x3Px42o/eZWJeFBR8CKSASwQIG2jJsVKYAQ8pZtaQCUQqiBIZzyMB3OkiWKoBSDNpSX5kYZjCzGuyd9FoCBmaoQXIxHSSeYAaWKsRQTEiZoUzEVW/Iu780VvrTXMHZYnySOLZNanJggmHjRH7/tcvHV/+9t9xF0k3gt3tor7fROt9G63wLQSvYzGrCGAMTx2AhIB0bUgGl4SLGdo6jMllFdaqG4ZmhTnWi+juFevGBm2pXGScSG80lnHvhXpw9ewirF8HdNuj0mcy6bHU1YzcH3SGzDqoM0gwqZIwfduwAGo2sWGzPrmM8O/tecnIvaXl4U4B40Ctgff0ttLzySRABln1hQE05YGPDaBu1ofvQmLwXrpXi1R5+UODnfvAYP/qtBfHYE8CZF4A4BpsUsBSoVALmdgPz8+DZHaC5uY9haupzsG39yuYpyNGJE1/FqdN3cbsJaDO4aBqwZYGrVdCuPR9Dffg+OHaLXOelA3WkJc6f/SA3N36XwTZBxEQihuAI2hSZyYaXf5SGhu7FcP3ZW/4t9DplnDjxNTp95k1bloYikywQyYzFHa010Zj4NEYn/h6FfO+GnxGGNn336efw6KM7+IkngPMXQGF/kMkjULEIHFwAdu8CT80A83s/hMnJL70cp5ArRq9XwIkTX8eZs2/ijY0tf3wgA/8YGgLvnP0UDVXuo0L+Bdi5G//WU01IEgt+bwYb6x8yF5Y/zO22hyQEhXEGeB0ny4CVCjEmG/+I2tC98Io/MY4d3ky3riukKUkqWxdanwha/Q+kUToqleqQQLolHWVSEiLNVfP/7JScr0pBATYxVD98c9yJP5D0kv2sKCTiNBM8ChjNro50NV/PP1gYKf5JoexdlWnqrHR+qbvW/UwSxttZUCqkCAUz2EABBCtvPeMWnK86nvMISdE2GmUdm7Gg5f9Z5PdvJyDN6l8pZWZlUvaEEFF1svrufM371q22YY56Ua15Yf1fIj9c0imXQFJXx2sfrjZKX/l5Hntpkiqj2Qo2gnetnVz9cnu5RX7LRxQl6F7sonO+Db/pw2/66Hf8jEwRBEECqUmhXIXq8BDckgu34qI6VkW+moflWXA9G5XRSlqfHv5tu2j/r1DUAwMkhBZShsqWKTEz0lRLTo1NmiUEdNbiWWylwQ1IOjl17Y5VqSGdGvdSIsqAIDSYpDbGFpJiacnwRkH41gSlWppU26yNLUhoEtAE1sxCMgsJIm3lxDW1RCZl0knqbuIdAWhmSM66LtpCUt9y7PjFmyqN0wKR0ESkIVjDsA2QlpYMxTVSoDrWSmvtAoAgisGQ2hibJMX2K3RLuTQPqdSabWGMBEgPMklSKdEXL6qkvipDGya5AUoBEXRWVW/AzJIBKRSFyroSBKRRkgE3iTizPCKYQYW/IGjpXq35NdqQSY2VdRjlLTmFMWxnUiPESslbdiBeheH6ccFoYwsiLS3lS1ve0OEfp4lCAhcMELHO+gGQJhYwMJJhJIEusXKbDZUEaTYsL9ctbs4/iHTmWW3koMtY5vAHvoxFJ81gSZSlIjcTQNmUbnnK6QEQl2DITbk6a7ZJilhaKpTyZ9vE9Dv9idhPXq8jvT/sh2/pd4PXBBuB62/4iPxoi3lnk0mZQALCUpCKkC+7KI+X2asV/y9fzf9NvuQ+ZOfd9i1bzCDModvZzX73jegHb6LV9bdibc1Du51JVDaD/mbmwGR+4Fmaf/QZ1KpfRs59DENDj8Fxf66Al+NYURK7IGgWUhNk5mHGJls3ZSVXWO69yoODXgFnz/w1/ej4R7C6ll102ICVBPJ50HgjxMTE36FW/yKqlRPXlIW8nNEPbXS7Ozns7yWGC6IQMIAQIbvuj6k+fPzGI32i2KTWZYXQg7OTJZhBUiWQUt+0d3jJdwxsdLvz6Pf3ZUFJtJjZBYmQlFqF555AqfLKiIpup4wzZ+7hEyfeT80WEMVbQBz5HLBtuklj45/nau0rdL0youvao0EOvd529MPFwcGX+SkShZzL//gqH/JXFBA1ca83zHHUgEmLSPQIMUBKXYQUXbatVRS986Scn8u6pnGqTGpcZpZCiJgImsGSB6yJYILKqf61gbyWJuYcBA30NeZSPNEmR0r0yZKhukbc1ImWWmsbJnsWEWnaDEQQkBZdE7Nk8TEpDDqh6k1lPxlIYoKwZf9WN+Xbegedkkm0azTbTARlqZ6ypH61zr+oE45EfvTGKIx/IY317rDdPxI0fS8MQoS9EJEfD+7QWTZBGw1pKRQrRVh5C1behlfxTjqe86hy1BPSEiddz3nMKbg/dV//P0AePxAvvxVTAAAAAElFTkSuQmCC';
    var numGlobalFontSize = 7.25;
    var pageNumber = 1;
    var jsPdfOptionsObject = {
        orientation: 'landscape',
        format:'a4',
        //unit: 'in',
        fontSize: numGlobalFontSize,
        lineHeight: 0.835,
        lineWidth: 0.200025,//2mm
        textColor:'0 g',
        drawColor: '0 G'
    };
    //var jsPdfDoc = new jsPDF('landscape');
    var jsPdfDoc = new jsPDF(jsPdfOptionsObject);
    //var jsPdfDoc = new jsPDF({ orientation: 'portrait', unit: 'in', lineHeight: 2 });
    jsPdfDocDefinition = {};

    jsPdfDocDefinition.content = [];
    var garment = garmentProduct;
    
    var xMarginReset = 2.5;
    var yMarginReset = 6;
    var columnScaleFactor = 1.3;
    //this.headerSize = 0;// set by running this.header() function
    //yMarginReset = 0;
    var yFooterSize = 7.5;
    var topAndBottomMargins = yMarginReset + yFooterSize;
    //this.xPosition = xMarginReset;
    //this.yPosition = yMarginReset;
    this.xPosition = 2.5;
    this.yPosition = 6;
    var header = function () {
        //this.header = function () {
        //date
        var funcxMarginReset = 2.5;
        var xMarginResetInitial = 2.5;
        var funcyMarginReset = 6;
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var dateForStuff = m_names[curr_month] + '-' + curr_date + '-' + curr_year;
        var numHeaderFontSize = numGlobalFontSize;
        var numLogoWidth = 35;
        var numFrontBackWidth = 35;
        var numSpacer = 10;
        var numHeaderYoffset = 3.5;
        var numLineLength = 400;
        var numFooterPosition = jsPdfDoc.internal.pageSize.height - yFooterSize;
        var numFooterLinePosition = numFooterPosition - (jsPdfDoc.internal.getLineHeight() / 2);
        var strConfidentialityStatement = 'Confidential: Not to be copied or distributed without the permission of Hanesbrands, Inc.';
        var numTextWidthOfConfidential = jsPdfDoc.getTextWidth(strConfidentialityStatement);
        var numConfidentialityXPosition = (jsPdfDoc.internal.pageSize.width / 3)// - numTextWidthOfConfidential;
        //var numCurrentX = funcxMarginReset;

        //this.xPosition = funcxMarginReset;
        //this.yPosition = funcyMarginReset;

        jsPdfDoc.setTextColor(0, 0, 0);
        //jsPdfDoc.setFontSize(numHeaderFontSize);
        jsPdfDoc.addImage(hanesImageDataUri, 'PNG', funcxMarginReset, 0, numLogoWidth, 10, 'logo', 'fast');
        funcxMarginReset += numLogoWidth;
        if (frontImage) {
            funcxMarginReset += numSpacer;
            var objDimensionForImagesFront = getImageDimensions(frontImage.width, frontImage.height, numFrontBackWidth, 25)
            try{
                jsPdfDoc.addImage(frontImage.src, 'PNG', funcxMarginReset, 0, objDimensionForImagesFront.width, objDimensionForImagesFront.height, 0, 'fast');
            } catch (e) {
                console.log(e);
            }
            //jsPdfDoc.addImage(frontImage.src, 'PNG', funcxMarginReset, 0, numFrontBackWidth, 25, 'front', 'fast');
            funcxMarginReset += numFrontBackWidth;
        };
        /*if (backImage) {
            funcxMarginReset += numSpacer;
            jsPdfDoc.addImage(backImage, 'PNG', funcxMarginReset, 0, numFrontBackWidth, 25, 'back', 'fast');
            funcxMarginReset += numFrontBackWidth;
        };*/
        funcxMarginReset += numSpacer;
        jsPdfDoc.setDrawColor(0, 0, 0);
        //jsPdfDoc.setLineWidth(1.5);funcyMarginReset
        jsPdfDoc.text(funcxMarginReset, funcyMarginReset, "Product Name:" + garment.name);
        var numPatternSpecX = jsPdfDoc.getTextWidth("Product Name:" + garment.name) + funcxMarginReset + 4;
        var numPatternSpecY = funcyMarginReset;
        if (jsPdfDoc.getTextWidth("Source:" + garment.activeSource) > jsPdfDoc.getTextWidth("Product Name:" + garment.name)) {
            numPatternSpecX = jsPdfDoc.getTextWidth(jsPdfDoc.getTextWidth("Source:" + garment.activeSource) + funcxMarginReset + 4);
        };
        if (jsPdfDoc.getTextWidth("Spec:" + garment.activeSpecName) > jsPdfDoc.getTextWidth("Product Name:" + garment.name)) {
            numPatternSpecX = jsPdfDoc.getTextWidth("Spec:" + garment.activeSpecName) + funcxMarginReset + 4;
        };
        jsPdfDoc.text(numPatternSpecX, funcyMarginReset, "Pattern Spec:" + garment.patternSpec);
        jsPdfDoc.line(funcxMarginReset, funcyMarginReset + 1, numLineLength + numLineLength, funcyMarginReset + 1);
        funcyMarginReset += numHeaderYoffset;
        jsPdfDoc.text(funcxMarginReset, funcyMarginReset, "Source:" + garment.activeSource);
        jsPdfDoc.line(funcxMarginReset, funcyMarginReset + 1, numLineLength + numLineLength, funcyMarginReset + 1);
        funcyMarginReset += numHeaderYoffset;
        jsPdfDoc.text(funcxMarginReset, funcyMarginReset, "Spec:" + garment.activeSpecName);
       
        jsPdfDoc.line(funcxMarginReset, funcyMarginReset + 1, numLineLength + numLineLength, funcyMarginReset + 1);
        funcyMarginReset += numHeaderYoffset;
        //jsPdfDoc.text(funcxMarginReset, funcyMarginReset, garment.patternSpec);
        jsPdfDoc.line(funcxMarginReset, funcyMarginReset + 1, numLineLength + numLineLength, funcyMarginReset + 1);
        jsPdfDoc.line(numPatternSpecX - 2, 0, numPatternSpecX - 2, funcyMarginReset + 1);
        jsPdfDoc.text(funcxMarginReset, funcyMarginReset, dateForStuff);
        funcyMarginReset += numHeaderYoffset;
        funcyMarginReset += jsPdfDoc.internal.getLineHeight() * 2;
        topAndBottomMargins = funcyMarginReset + yFooterSize;

        
        //funcyMarginReset = funcxMarginReset;
        //this.headerSize = funcyMarginReset;
        //jsPdfDoc.setLineWidth(0.5);

        //jsPdfDoc.line(0, numFooterLinePosition, jsPdfDoc.internal.pageSize.width, numFooterLinePosition);
        jsPdfDoc.setFontType("bold");
        jsPdfDoc.text(numConfidentialityXPosition, numFooterPosition, strConfidentialityStatement);
        jsPdfDoc.text(String(pageNumber), 0, jsPdfDoc.internal.pageSize.height - 1);
        //pageNumber++;
        jsPdfDoc.setFontType("normal");
        if (!garmentProduct.isCurrentSpecAnActiveSpec && !garmentProduct.isCurrentSpecAnAvailableSpec) {
            //imgBase64DevImagego
            jsPdfDoc.addImage(developmentImage, 'PNG', 0, 0, jsPdfDoc.internal.pageSize.width, jsPdfDoc.internal.pageSize.height, 'fast');
        };
        var positions = [xMarginResetInitial, funcyMarginReset, 'undefined', jsPdfDoc.internal.getLineHeight(), 1];
        return positions;

    };
    this.amountAddedForExtraLineInText = 0;
    this.movePositions = function (xMove, yMove) {
        this.xPosition += xMove;
        this.yPosition += yMove;
    };
    this.getPageOneAttributes = function () {
        //var arrPageOneAttributes = [];
        
        var objAtt = {};
        try{
            for (var i = 0; i < garment.generalAttributes.length; i++) {

                var strKey = garment.generalAttributes[i].key.replace(/ /g, "_");
                objAtt[strKey] = garment.generalAttributes[i].value;
                //arrPageOneAttributes.push(objAtt);
            };
            //return arrPageOneAttributes
        } catch (e) {
            console.log(e);
        }
        return objAtt
    };
    this.addFrontBackImages = function (checkIfReset) {
        var arrOfImages = [];
        var arrOfHeights = [];
        var arrOfWidth = [];
        var maxWidth = jsPdfDoc.internal.pageSize.width;
        $("#frontBackImages img").each(function (index) {
            var strBaseSrcString = $(this).attr('src');
            //funcDoc.addImage(strBaseSrcString, 'PNG', 0, 0, 200, 200, index.toString(), 'fast');
            arrOfWidth.push(this.width);
            arrOfHeights.push(this.height);
            arrOfImages.push(strBaseSrcString);
            //jsPdfDoc.addPageAndReset();
        });
        if(checkIfReset){
            this.addPageAndReset('Front Back Images');
        };
        for (var i = 0; i < arrOfImages.length; i++) {
            //var numImageWidth = 150 - xMarginReset;
            var numImageWidth = 120;
            var numImageHeight = 120;
            var numXIncrement = (maxWidth - (numImageWidth * 2)) / 2;
            var numNewX = (numImageWidth * i) + numXIncrement;
            var objImageDimensionData = getImageDimensions(arrOfWidth[i], arrOfHeights[i], numImageWidth, numImageHeight);
            jsPdfDoc.addImage(arrOfImages[i], 'PNG', numNewX, this.yPosition, objImageDimensionData.width, objImageDimensionData.height, i.toString(), 'fast');
            /*if (i == arrOfImages.length - 1) {
                this.addPageAndReset();
            };*/

        };

    };
    this.pageOneAttributes = this.getPageOneAttributes();
    this.tableLineHeight = 12;
    this.nameAlert = function () {
        alert(garment.name);
    };

    
    if ($("#frontBackImages img").length) {
       // frontImage.src = $('#frontSketch img.frontImage').attr('src');
        $('#frontSketch img.frontImage').each(function () {
            var src = $(this).attr('src');
            var width = this.width;
            var height = this.height;
            frontImage.src = src;
            frontImage.width = width;
            frontImage.height = height;
        });
    }
    else {
        frontImage = false;
    };
    
    if ($("#frontBackImages img").length) {
        $('#frontSketch img.backImage').each(function () {
            var src = $(this).attr('src');
            var width = this.width;
            var height = this.height;
            backImage.src = src;
            backImage.width = width;
            backImage.height = height;
        });
    }
    else {
        backImage = false;
    };
    if (typeof (garmentProduct.approvedSuppliers) != 'undefined' && garmentProduct.approvedSuppliers.length != 0) {
        this.approvedSuppliers = garmentProduct.approvedSuppliers;
    }
    else {
        this.approvedSuppliers = false;
    };
    
    this.setXandYpositions = function (x, y) {
        this.xPosition = x;
        this.yPosition = y;
    };
    this.fullReset = function () {
        this.setXandYpositions(xMarginReset, yMarginReset);
    };
    this.resetXbutSpecifyY = function (y) {
        this.setXandYpositions(xMarginReset, y);
    };
    this.resetYbutSpecifyX = function (x) {
        this.setXandYpositions(x, yMarginReset);
    };

    this.parseThroughAndSetGreatestHeightOfRow = function (arrayOfCells, numLengthToCheck) {
        var greatestHeight = 1;
        var numTextHeight = 0;
        for (var i = 0; i < arrayOfCells.length; i++) {
            var strIterString = arrayOfCells[i];
            var objText = jsPdfDoc.getTextDimensions(strIterString);
            numTextHeight = objText.h;
            var font = jsPdfDoc.internal.getFont();
            var fontName = font.fontName;
            var fontStyle = font.fontStyle;
            var fontSize = jsPdfDoc.internal.getFontSize();
            var arrOfSplitted = jsPdfDoc.splitTextToSize(strIterString, numLengthToCheck, {
                'fontSize': fontSize,
                'fontName': fontName,
                'fontStyle': fontStyle
            });
            //var numOfTiers = Math.floor(strIterString.length / numLengthToCheck) + 1;
            var numOfTiers = arrOfSplitted.length;
            if (numOfTiers > greatestHeight) {
                greatestHeight = numOfTiers;
            };

        };
        //var totalHeight;
        //totalHeight = greatestHeight * numTextHeight;
        return greatestHeight;

    };

    this.parseThroughAndSetGreatestWidthOfRow = function (arrayOfCells, numWidthToCheck) {
        var greatestWidth = 1;
        var numTextHeight = 0;
        for (var i = 0; i < arrayOfCells.length; i++) {
            var strIterString = arrayOfCells[i];
            //var numTextWidth = jsPdfDoc.getTextWidth(strIterString);
            //numTextHeight = objText.h;
            var font = jsPdfDoc.internal.getFont();
            var fontName = font.fontName;
            var fontStyle = font.fontStyle;
            var fontSize = jsPdfDoc.internal.getFontSize();
            var arrOfSplitted = jsPdfDoc.splitTextToSize(strIterString, numWidthToCheck, {
                'fontSize': fontSize,
                'fontName': fontName,
                'fontStyle': fontStyle
            });
            //var numOfRows = Math.floor(strIterString.length / numWidthToCheck) + 1;
            var numOfRows = arrOfSplitted.length;
            if (numOfRows > greatestWidth) {
                greatestWidth = numOfRows;
            };

        };
        //var totalHeight;
        //totalHeight = greatestHeight * numTextHeight;
        return greatestWidth;

    };
    this.processTextUsingCurrentXandYPosition = function (funcText, xDeviation, yDeviation) {
        try {
            switch (arguments.length) {
                case 1:
                    jsPdfDoc.text(decodeURIComponent(funcText), this.xPosition, this.yPosition - 3);
                    break;
                case 2:
                    jsPdfDoc.text(decodeURIComponent(funcText), this.xPosition + xDeviation, this.yPosition);
                    break;
                case 3:
                    jsPdfDoc.text(decodeURIComponent(funcText), this.xPosition + xDeviation, this.yPosition + yDeviation);
                    break;
            };
        } catch (e) {
            console.log(e);
            switch (arguments.length) {
                case 1:
                    jsPdfDoc.text(funcText, this.xPosition, this.yPosition - 3);
                    break;
                case 2:
                    jsPdfDoc.text(funcText, this.xPosition + xDeviation, this.yPosition);
                    break;
                case 3:
                    jsPdfDoc.text(funcText, this.xPosition + xDeviation, this.yPosition + yDeviation);
                    break;
            };
        }
    };
    this.lastLineRanY = yMarginReset;
    this.processTextUsingCurrentXandYPositionTable = function (funcText, numMaxCharacters) {
        var arrOfStrings = [];
        if (typeof (numMaxCharacters) == 'undefined') {
            numMaxCharacters = 25;
        };
        var samplerString = '';
        var numSampler = 0;
        while (numSampler < numMaxCharacters) {
            samplerString += '1';
            numSampler++;
        };
        var numBeginStringAt = 0;
        var numFunctTextLength = funcText.length;
        //var numOfArguments = arguments.length;
        //var numFuncOffset = yOffset;
        /*if (typeof (numLineChangeRatio) == 'undefined') {
            numLineChangeRatio = 0.25;
        };*/
        var startingFontZize = jsPdfDoc.internal.getFontSize();
        var i = 0;
        var xOffest = 0;
        var numHeight = 0;

        var objText3 = jsPdfDoc.getTextDimensions(strSnippet);
        var numHeight3 = objText3.h * 4;
        var initialLinePositionForY = initialYposition - numHeight3;
        var numMinorOffset = 1.5;
        var initialLineX = this.xPosition - 2;// - numMinorOffset;
        //var secondLineX = initialLineX + xOffSetToUse;// + numMinorOffset;
        var numWidthOfText = jsPdfDoc.getTextWidth(funcText);
        var font = jsPdfDoc.internal.getFont();
        var fontName = font.fontName;
        var fontStyle = font.fontStyle;
        var fontSize = jsPdfDoc.internal.getFontSize();
        var arrTextSplitted = jsPdfDoc.splitTextToSize(funcText, numMaxCharacters, {
            'fontSize': fontSize,
            'fontName': fontName,
            'fontStyle': fontStyle
        });
        var numOfLoopIterations = arrTextSplitted.length;

        var initialYposition = this.yPosition;
        for (var i = 0; i < arrTextSplitted.length; i++) {
            var strSnippet = arrTextSplitted[i];
            jsPdfDoc.setTextColor(0, 0, 0);
            //this.yPosition += numHeight / 2;
            if (i > 0) {
                this.yPosition += this.myLineHeight;
            };
            if (this.yPosition > this.furthestYPosition) {
                this.furthestYPosition = this.yPosition;
            };
            if (this.xPosition > this.furthestXPosition) {
                this.furthestXPosition = this.xPosition;
            };
            jsPdfDoc.setFontType("normal");
            jsPdfDoc.setTextColor(0, 0, 0);
            jsPdfDoc.text(strSnippet, this.xPosition, this.yPosition);
            /*var objText = jsPdfDoc.getTextDimensions(strSnippet);
            numHeight = jsPdfDoc.internal.getLineHeight();
            var lineHeightToUse = jsPdfDoc.internal.getLineHeight();
            numBeginStringAt += numMaxCharacters;*/
        };
        this.yPosition = initialYposition;
        /*var numXOffestBack = 0.5;
        var initialLinePositionForY2 = initialLinePositionForY + furthestY;*/
        //jsPdfDoc.setLineWidth(0.6);

        var yOffsetToReturn = arrTextSplitted.length * this.myLineHeight;
        return yOffsetToReturn
    };

    this.processTableText = function (funcText, numMaxCharacters, fontType, columnWidthForRectangle) {
        var arrOfHeader = [];
        if (funcText == '') {
            while (arrOfHeader.length < numMaxCharacters.length) {
                arrOfHeader.push('_');
            };
        }
        else {
            try {
                var font = jsPdfDoc.internal.getFont();
                var fontName = font.fontName;
                var fontStyle = font.fontStyle;
                var fontSize = jsPdfDoc.internal.getFontSize();
                var arrOfHeader = jsPdfDoc.splitTextToSize(funcText, numMaxCharacters, {
                    'fontSize': fontSize,
                    'fontName': fontName,
                    'fontStyle': fontStyle
                });
            } catch (e) {
                while (arrOfHeader.length < numMaxCharacters.length) {
                    arrOfHeader.push('_');
                };
                console.log(e);
                console.log(funcText);
            };
        };
        /*if (typeof (columnWidthForRectangle) != 'undefined' && typeof (optionalMaxRowSpecification) != 'undefined') {
            var height = this.myLineHeight * optionalMaxRowSpecification;
            //jsPdfDoc.rect(this.xPosition, this.yPosition, columnWidthForRectangle, height * -1);
        };*/



        var initialYPosition = this.yPosition;
        for (var i = 0; i < arrOfHeader.length; i++) {
            var strSnippet = arrOfHeader[i];
            jsPdfDoc.setTextColor(0, 0, 0);
            //this.yPosition += numHeight / 2;
            if (i > 0) {
                this.yPosition += this.myLineHeight;
            };
            if (this.yPosition > this.furthestYPosition) {
                this.furthestYPosition = this.yPosition;
            };
            jsPdfDoc.setFontType(fontType);
            jsPdfDoc.setTextColor(0, 0, 0);
            jsPdfDoc.text(strSnippet, this.xPosition, this.yPosition);
            /*var objText = jsPdfDoc.getTextDimensions(strSnippet);
            numHeight = jsPdfDoc.internal.getLineHeight();*/
        };
        this.yPosition = initialYPosition;
        var yOffsetToReturn = arrOfHeader.length * this.myLineHeight;
        return yOffsetToReturn
    };
    this.processTextUsingCurrentXandYPositionTableForHeader = function (funcText, numMaxCharacters, fontType) {
        //funcText = decodeURIComponent(funcText);

        //var arrOfStrings = [];
        /*if (typeof (numMaxCharacters) == 'undefined') {
            numMaxCharacters = 25;
        };*/
        //var numFuncOffset = yOffset;
        /*if (typeof (numLineChangeRatio) == 'undefined') {
            numLineChangeRatio = 0.25;
        };*/
        var font = jsPdfDoc.internal.getFont();
        var fontName = font.fontName;
        var fontStyle = font.fontStyle;
        var fontSize = jsPdfDoc.internal.getFontSize();
        var arrOfHeader = jsPdfDoc.splitTextToSize(funcText, numMaxCharacters, {
            'fontSize': fontSize,
            'fontName': fontName,
            'fontStyle': fontStyle
        });
        //var numHeight = 0;
        var initialYPosition = this.yPosition;
        for (var i = 0; i < arrOfHeader.length; i++) {
            var strSnippet = arrOfHeader[i];
            jsPdfDoc.setTextColor(0, 0, 0);
            //this.yPosition += numHeight / 2;
            if (i > 0) {
                this.yPosition += this.myLineHeight;
            };
            if (this.yPosition > this.furthestYPosition) {
                this.furthestYPosition = this.yPosition;
            };
            if (this.xPosition > this.furthestXPosition) {
                this.furthestXPosition = this.xPosition;
            };
            jsPdfDoc.setFontType(fontType);
            jsPdfDoc.setTextColor(0, 0, 0);
            jsPdfDoc.text(strSnippet, this.xPosition, this.yPosition);
            /*var objText = jsPdfDoc.getTextDimensions(strSnippet);
            numHeight = jsPdfDoc.internal.getLineHeight();*/
        };
        this.yPosition = initialYPosition;
        var yOffsetToReturn = arrOfHeader.length * this.myLineHeight;
        return yOffsetToReturn
    };

    this.drawLineRectangle = function (R, G, B, width, height) {
        jsPdfDoc.setFillColor(R, G, B);
        jsPdfDoc.rect(0, this.yPosition - height, width, height, 'F');
    };

    this.logoXposition = 0;
    this.logoyposition = 0;
    this.logoWidth = 35;
    this.logoHeight = 35;
    //this.headerSize = 



    //jsPdfDoc.setHeaderFunction(this.header);

    this.footer = function () {

    };
    this.furthestYPosition = this.headerSize;
    this.furthestXPosition = xMarginReset;
    this.previousFurthestXPosition = 0;
    this.previousFurthestYPosition = 0;
    this.resetPreviousPositions = function () {
        /*this.furthestYPosition = 0;
        this.furthestXPosition = 0;*/
        this.furthestYPosition = this.headerSize;
        this.furthestXPosition = xMarginReset;
        this.previousFurthestXPosition = 0;
        this.previousFurthestYPosition = 0;
    };
    this.addPageAndReset = function (sectionName) {
        /*if (!garmentProduct.isCurrentSpecAnActiveSpec && !garmentProduct.isCurrentSpecAnAvailableSpec) {
            //imgBase64DevImagego
            jsPdfDoc.addImage(developmentImage, 'PNG', 0, 0, jsPdfDoc.internal.pageSize.width, jsPdfDoc.internal.pageSize.height, 'fast');
        };*/
        //this.furthestYPosition = yMarginReset;
        this.furthestYPosition = this.headerSize;
        //this.resetPreviousPositions();
        if (typeof (sectionName) != 'undefined') {
            //var numPage = jsPdfDoc.internal.pages.length - 1;
            jsPdfDoc.outline.add(this.node, sectionName, { pageNumber: jsPdfDoc.internal.pages.length - 1});
        };
        //this.footer();
        pageNumber++;
        jsPdfDoc.addPage();
        var positions = header();
        this.xPosition = positions[0];
        this.yPosition = positions[1];

        //this.fullReset();
        //this.header();
    };
    this.checkTextLength = function (string, limit, newFontSize) {
        if (string.length > limit) {
            jsPdfDoc.fontSize = newFontSize;
        };
    };
    this.moveOneLineDown = function (numOfMoves) {
        if (typeof (numOfMoves) == 'undefined') {
            numOfMoves = 1;
        };
        //var amountTomove = numOfMoves * jsPdfDoc.internal.getLineHeight();
        var amountTomove = numOfMoves * 6.05375;
        this.yPosition += amountTomove;
    };
    this.colors = {
        headerGray: [200, 200, 200],//same as the grey in cell.js for printHeaders
        white: [255, 255, 255],
        black: [0, 0, 0]

    };
    this.drawColorByName = function (color) {
        var arrRgb = this.colors[color];
        jsPdfDoc.setDrawColor(arrRgb);
    };
    this.fillColorByName = function (color) {
        var arrRgb = this.colors[color];
        jsPdfDoc.setFillColor(arrRgb);
    };
    this.createPageOne = function () {
        /*var positions = header();
        this.yPosition = positions[1];
        this.xPosition = positions[0];*/
        this.yPosition = 32.1075;
        this.xPosition = 2.5;

        /*this.addSizingTable();
        this.addApprovedSupplier();*/

        var strApsCorp = encodeURIComponent('APS Corp Division : ' + this.pageOneAttributes.APS_Corp_Division);
        var strConstructionMethodCode = encodeURIComponent('Construction Method Code : ' + this.pageOneAttributes.Construction_Method_Code);
        var strHbiDivision = encodeURIComponent('HBI Division : ' + this.pageOneAttributes.HBI_Division);
        var strIrregularStyle = encodeURIComponent('Irregular Style : ' + this.pageOneAttributes.Irregular_Style);
        var strImperfectStyle = encodeURIComponent('Imperfect Style : ' + this.pageOneAttributes.Imperfect_Style);
        var strBrand = encodeURIComponent('Brand : ' + this.pageOneAttributes.Brand);
        var strDesigner = encodeURIComponent('Designer : ' + this.pageOneAttributes.Designer);
        var strProdManager = encodeURIComponent('Product Manager : ' + this.pageOneAttributes.Product_Manager);
        var strTechDesigner = encodeURIComponent('Technical Designer : ' + this.pageOneAttributes.Technical_Designer);
        
        var numMidPoint = jsPdfDoc.internal.pageSize.width / 2;
        var numMidPointForLine = numMidPoint - 2;
        var numOfLines = 5;
        var numLineHeight = jsPdfDoc.internal.getLineHeight();
        var heightOfLines = numLineHeight * numOfLines;
        var numOffset = 7;
        var heightOfLinesPlusOffset = (numLineHeight + numOffset) * numOfLines;
        var numInitialLeftOfGrid = xMarginReset - 1;
        var numInitialRightOfGrid = jsPdfDoc.internal.pageSize.width - (xMarginReset * 2) + 2;
        
        //this.moveOneLineDown(this.numSizingTableRows + 3);
        
        var initialPageOneY = 32.1075;
        jsPdfDoc.rect(numInitialLeftOfGrid, this.yPosition - numLineHeight, numInitialRightOfGrid, heightOfLines);
        //this.processTextUsingCurrentXandYPosition(strApsCorp, 0, -3);
        this.processTextUsingCurrentXandYPosition(strHbiDivision);
        jsPdfDoc.line(numInitialLeftOfGrid, this.yPosition, numInitialRightOfGrid, this.yPosition);
        this.moveOneLineDown();
        jsPdfDoc.line(numInitialLeftOfGrid, this.yPosition, numInitialRightOfGrid, this.yPosition);
        this.processTextUsingCurrentXandYPosition(strApsCorp);
        //this.processTextUsingCurrentXandYPosition(strConstructionMethodCode, 0, -3);
        this.moveOneLineDown();
        jsPdfDoc.line(numInitialLeftOfGrid, this.yPosition, numInitialRightOfGrid, this.yPosition);
        //this.processTextUsingCurrentXandYPosition(strHbiDivision, 0, -3)
        this.processTextUsingCurrentXandYPosition(strDesigner);
        this.moveOneLineDown();
        jsPdfDoc.line(numInitialLeftOfGrid, this.yPosition, numInitialRightOfGrid, this.yPosition);
        this.processTextUsingCurrentXandYPosition(strProdManager);
        //this.processTextUsingCurrentXandYPosition(strIrregularStyle, 0, -3);
        this.moveOneLineDown();
        jsPdfDoc.line(numInitialLeftOfGrid, this.yPosition, numInitialRightOfGrid, this.yPosition);
        jsPdfDoc.line(numMidPointForLine, this.yPosition - heightOfLines, numMidPointForLine, this.yPosition);
        //this.processTextUsingCurrentXandYPosition(strImperfectStyle, 0, -3);
        this.processTextUsingCurrentXandYPosition(strIrregularStyle);
        this.moveOneLineDown();
        this.xPosition = numMidPoint;
        this.yPosition = initialPageOneY;
        this.processTextUsingCurrentXandYPosition(strBrand);
        this.moveOneLineDown();
        //this.processTextUsingCurrentXandYPosition(strDesigner, 0, -3);
        this.processTextUsingCurrentXandYPosition(strConstructionMethodCode);
        this.moveOneLineDown();
        this.processTextUsingCurrentXandYPosition(strTechDesigner);
        //this.processTextUsingCurrentXandYPosition(strProdManager, 0, -3);
        this.moveOneLineDown();
        //this.processTextUsingCurrentXandYPosition(strTechDesigner, 0, -3);
        this.processTextUsingCurrentXandYPosition(strImperfectStyle);


        //this.moveOneLineDown();

        this.xPosition = xMarginReset;
        this.yPosition = 70;
        //this.moveOneLineDown(3);
        jsPdfDoc.outline.add(this.node, 'General Attributes', { pageNumber: 1 });
        this.addFrontBackImages(false);
        //this.addSizingTable();
        //this.addApprovedSupplier();
        //this.addPageAndReset();
        //this.yPosition = heightOfLinesPlusOffset + yMarginReset;


        
        
       
    };

    this.drawFullPageLineAtFurthestYposition = function () {
        jsPdfDoc.setDrawColor(140, 140, 140);
        //jsPdfDoc.setLineWidth(0.5);
        jsPdfDoc.line(0, this.furthestYPosition + 2, jsPdfDoc.internal.pageSize.width, this.furthestYPosition + 2, 'FD');
    };

    this.drawFullPageLineAtCurrentYposition = function () {
        jsPdfDoc.setDrawColor(0, 0, 0);
        //jsPdfDoc.setLineWidth(0.75);
        jsPdfDoc.line(0, this.yPosition + 2, jsPdfDoc.internal.pageSize.width, this.yPosition + 2);
    };
    this.arrCurrentArrayOfWidths = [];

    this.drawRectFromPrevious = function () {
        jsPdfDoc.setDrawColor(255, 0, 0);
        jsPdfDoc.setFillColor(180, 180, 180);
        jsPdfDoc.rect(0, this.previousFurthestYPosition + 2, jsPdfDoc.internal.pageSize.width, this.furthestYPosition - this.previousFurthestYPosition, 'FD');
    };
    this.lastRowWasEvenOrOdd = 'even';
    this.currentMaxWrapWidth = 0;
    this.currentRectangleHeight = 0;
    this.myLineHeight = jsPdfDoc.internal.getLineHeight() / 3;
    this.processADataTableResponseArray = function (arrayToProcess, xOffsetPerCell) {
        var R1 = 240;
        var G1 = 240;
        var B1 = 240;
        var R2 = 255;
        var G2 = 255;
        var B2 = 255;
        var R3 = 0;
        var G3 = 0;
        var B3 = 0;
        //var yOffsetPerLine = jsPdfDoc.internal.getLineHeight();
        //var numOffset = 0;
        var rowCounter = 0;
        var numPageHeight = jsPdfDoc.internal.pageSize.height;
        var numPageWidth = jsPdfDoc.internal.pageSize.width;
        var numStaticXToUseForOffset;
        //var numLineRatio = 0.25;
        var headerWidth = 0;
        //var boolResetToNewPage = false;
        //var strFontType = "bold";
        var numLastNumOffset = 0;
        var yOffsetPerLine;
        for (var i = 0; i < arrayToProcess.length; i++) {
            var numInitialRowiY = this.yPosition;
            var arrRow = arrayToProcess[i];
            if ((this.yPosition + yOffsetPerLine) > numPageHeight) {
                //boolResetToNewPage = true;
                this.resetXbutSpecifyY(this.yPosition);
                this.addPageAndReset();
                this.resetXbutSpecifyY(this.yPosition);
                arrRow = arrayToProcess[0];
                i = i - 1;  //(pulls back a row so header can repeat without losing data
            } else {

            };
            //boolResetToNewPage = false;
            var numOfRowsWithinRow = -1;

            var strLongestString;
            var arrPlaceholder = Array.from(arrRow);
            var strFirstCell = arrPlaceholder[0].text;
            if (typeof (strFirstCell) == 'undefined') {
                strLongestString = arrPlaceholder.sort(function (a, b) { return b.length - a.length; })[0];
            }
            else {

                var arrOfTextInHeader = [];
                for (var a = 0; a < arrPlaceholder.length; a++) {
                    arrOfTextInHeader.push(arrPlaceholder[a].text);
                };
                strLongestString = arrOfTextInHeader.sort(function (a, b) { return b.length - a.length; })[0];
            };

            var numLengthOfLongestString = strLongestString.length;
            var numOfRowsForRectangle = -1;
            for (var j = 0; j < arrRow.length; j++) {
                if (j == 0) {
                    yOffsetPerLine = this.myLineHeight;
                };
                numStaticXToUseForOffset = xOffsetPerCell[j];
                var samplerString2 = '';
                var numSampler2 = 0;
                var numTextWidth = 0;
                while (numTextWidth < numStaticXToUseForOffset) {
                    samplerString2 += '1';
                    numTextWidth = jsPdfDoc.getTextWidth(samplerString2);
                    //numSampler2++;
                };

                var numOfCharactersToFitInColumn = samplerString2.length - 1;


                /*var numMinorOffset = 2;
                numOfCharactersToFitInColumn -= numMinorOffset;*/
                var numCurrentFontSize = jsPdfDoc.internal.getFontSize();
                var strTextToGet = arrRow[j].text;
                if (typeof (strTextToGet) == 'undefined') {
                    strTextToGet = arrRow[j];
                };
                strTextToGet = strTextToGet.replace(/(\r\n|\n|\r)/gm, "");
                strTextToGet = strTextToGet.replace(/\s{2,}/g, ' ');
                //var numGreaterCheck = this.processTableText(strTextToGet, numOfCharactersToFitInColumn, strFontType);
                var strFontType;
                if (arrRow == arrayToProcess[0]) {
                    strFontType = "bold";
                }
                else {
                    strFontType = "normal";
                };
                var font = jsPdfDoc.internal.getFont();
                var fontName = font.fontName;
                var fontStyle = font.fontStyle;
                var fontSize = jsPdfDoc.internal.getFontSize();
                var arrOfLargestCharacterInThisRow = jsPdfDoc.splitTextToSize(strLongestString, numStaticXToUseForOffset, {
                    'fontSize': fontSize,
                    'fontName': fontName,
                    'fontStyle': fontStyle
                });
                if (arrOfLargestCharacterInThisRow.length > numOfRowsForRectangle) {
                    numOfRowsForRectangle = arrOfLargestCharacterInThisRow.length;
                };

                var numGreaterCheck = this.processTableText(strTextToGet, numOfCharactersToFitInColumn, strFontType, numStaticXToUseForOffset);
                if (numGreaterCheck > yOffsetPerLine) {
                    yOffsetPerLine = numGreaterCheck;
                };
                this.xPosition += numStaticXToUseForOffset;
                if (j == arrRow.length - 1) {
                    this.yPosition += yOffsetPerLine;
                    this.resetXbutSpecifyY(this.yPosition);
                    //rectangle code goes here
                    if (numOfRowsForRectangle < 1) {
                        numOfRowsForRectangle = 1;
                    }
                    var rectangleHeight = numOfRowsForRectangle * yOffsetPerLine;
                    if (arrRow == arrayToProcess[0]) {
                        //header logic
                        //this.drawARowRectangles(xOffsetPerCell, yOffsetPerLine);
                        //this.resetXbutSpecifyY(this.yPosition);
                        //header logic
                    }
                    else {
                        //normal row logic

                        //var numOfCells = yOffsetPerLine / this.myLineHeight;
                        //var rectHeight = yOffsetPerLine * numOfCells;
                        /*this.resetXbutSpecifyY(this.yPosition);
                        this.drawARowRectangles(xOffsetPerCell, rectangleHeight);
                        this.resetXbutSpecifyY(this.yPosition);*/
                        //normal row logic
                    };

                    //rectangle code goes here

                };
            };
            var rowHeight = numOfRowsForRectangle * this.myLineHeight;
            this.resetXbutSpecifyY(this.yPosition);
            this.drawARowRectangles(xOffsetPerCell, rowHeight, this.yPosition);
            this.resetXbutSpecifyY(this.yPosition);
            rowCounter++;
        };
    };
    this.drawARowRectangles = function (xOffsetArray, rowHeight, numRectangleYs) {
        /*var numRectangleYs;
        if (this.yPosition < yMarginReset) {
            numRectangleYs = yMarginReset;
        }
        else {
            numRectangleYs = this.yPosition;
        };*/
        for (var e = 0; e < xOffsetArray.length; e++) {
            jsPdfDoc.rect(this.xPosition, numRectangleYs - rowHeight, xOffsetArray[e], rowHeight * -1);
            this.xPosition += xOffsetArray[e];
        };
    };
    this.arrayOfArraysToProcess = [];
    this.processColorwayDataTableResponseArray = function (objCurrentColorwayToProcess, yOffsetPerLine, numMaxCharacterLength, boolProcessForPdf) {
        var arrayToProcess = objCurrentColorwayToProcess.array;
        var strNameOfBom = objCurrentColorwayToProcess.name;
        var arrOfArraysToProcess = [];
        //var numOfColorwaysToAllow = 4;
        var numOfColorwaysToAllow;
        if ($('#maxColorways').length) {
            numOfColorwaysToAllow = Number($('#maxColorways').val());
        }
        else {
            numOfColorwaysToAllow = 4;
        };
        var numOfStaticColumnsAllow = 6;
        var numTotalNumberOfColumns = arrayToProcess[0].length;

        var numIndexer = (Math.floor((numTotalNumberOfColumns - numOfStaticColumnsAllow) / numOfColorwaysToAllow));
        if (numIndexer < 1) {
            numIndexer = 1;
        };
        var i = numOfStaticColumnsAllow;
        while (i < numTotalNumberOfColumns) {
            var arrOneColorwayTableArray = [];
            for (var j = 0; j < arrayToProcess.length; j++) {
                var arrSub = arrayToProcess[j];
                var arrStatics = arrSub.slice(0, numOfStaticColumnsAllow);
                var numBeginForColorways = i;//numOfStaticColumnsAllow //+ i + numOfColorwaysToAllow;
                var numEndForColorways = numBeginForColorways + numOfColorwaysToAllow;
                //if (numEndForColorways > arrSub.length) {
                //    numEndForColorways = arrSub.length;
                //};
                var arrColorwayColumns = arrSub.slice(numBeginForColorways, numEndForColorways);
                try {
                    var arrComboArray = arrStatics.concat(arrColorwayColumns);
                } catch (e) {
                    var arrComboArray = arrStatics;
                };
                //console.log(arrComboArray);
                arrOneColorwayTableArray.push(arrComboArray);
            };
            //col columns = 0
            var number = Number(strNameOfBom.substring(0, 3));
            var objBomObjectWithArray = {
                array: arrOneColorwayTableArray,
                name: strNameOfBom,
                numberOfBom: number
            };

            //this.arrayOfArraysToProcess.push(arrOneColorwayTableArray);
            this.arrayOfArraysToProcess.push(objBomObjectWithArray);

            //i++;
            i += numOfColorwaysToAllow;
        };
        if (boolProcessForPdf) {
            this.arrayOfArraysToProcess.sort(function (a, b) {
                return a.numberOfBom - b.numberOfBom;
            });
            for (var k = 0; k < this.arrayOfArraysToProcess.length; k++) {
                var arrToUse = this.arrayOfArraysToProcess[k].array;
                //if ((numOfStaticColumnsAllow + numOfColorwaysToAllow) > xOffsetPerCell.length) {
                var numPageWidth = jsPdfDoc.internal.pageSize.width;
                var numOfColumns = arrToUse[0].length;
                var arrOfColumnWidths = [25, 25, 25, 32, 30,30];// need to add functionality to compress around the header
                var numOfColorwayColumns = arrToUse[0].length - arrOfColumnWidths.length;
                var numSumOfAllColumns = 0;
                var strTitleText = this.arrayOfArraysToProcess[k].name;
                for (var j = 0; j < arrOfColumnWidths.length; j++) {
                    numSumOfAllColumns += arrOfColumnWidths[j];
                };
                var numOfRemainingRoom = (jsPdfDoc.internal.pageSize.width * columnScaleFactor) - numSumOfAllColumns;
                //var numOfRemainingRoom = jsPdfDoc.internal.pageSize.width - numSumOfAllColumns;
                var numOfReaminingRoomPerColumn = Math.floor(numOfRemainingRoom / numOfColorwayColumns);
                var z = 0;
                while (z < numOfColorwayColumns) {
                    arrOfColumnWidths.push(numOfReaminingRoomPerColumn);
                    z++;
                };
                //};

                //this.addPageAndReset(strTitleText);
                this.addPageAndReset(strTitleText);
                this.setLastFontSizeAndChangeToNewFontSize(8);
                this.processTextUsingCurrentXandYPosition(strTitleText);
                this.returnToLastFontSize();
                this.yPosition += (yMarginReset / 4);
                //this.processADataTableResponseArray(arrToUse, arrOfColumnWidths);
                this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrToUse, arrOfColumnWidths);
            };
        };
    };
    this.lastFontSize = 8;
    this.returnToLastFontSize = function () {
        jsPdfDoc.setFontSize(this.lastFontSize);
    };
    this.setLastFontSizeAndChangeToNewFontSize = function (newFontSize) {
        this.lastFontSize = jsPdfDoc.internal.getFontSize();
        jsPdfDoc.setFontSize(newFontSize);
    };
    var globalMargins = {
        //left: xMarginReset, top: yMarginReset, bottom: yFooterSize, width: jsPdfDoc.internal.pageSize.width
        //left: xMarginReset, top: 0, bottom: yFooterSize, width: jsPdfDoc.internal.pageSize.width
        left: xMarginReset, top: 0, bottom: 0, width: jsPdfDoc.internal.pageSize.width
    };
    this.globalJsConfigOptions = {
        printHeaders: true,
        margins: globalMargins,
        fontSize: numGlobalFontSize,
        autoSize: false
    };
    this.reprocessUsingJsPdfTable = function (x, y, arrOfTable, myWidths) {
        var arrOne = arrOfTable[0];
        var arrNewHeader = [];
        for (var i = 0; i < arrOne.length; i++) {
            var objHeader = {};
            var MyText = arrOne[i].text;
            var myWidth = myWidths[i];
            var headerForTable = {
                name: MyText,
                prompt: MyText,
                width: myWidth
            };

            //arrNewHeader[i] = MyText;
            arrNewHeader[i] = headerForTable;
        };
        arrOfTable.splice(0, 1);
        var arrOfTransformedObjects = [];
        for (var i = 0; i < arrOfTable.length; i++) {
            var arrOfValues = arrOfTable[i];
            var arrObjects = [];
            var objNewObject = {};
            for (var j = 0; j < arrNewHeader.length; j++) {

                /*objNewObject.key = arrNewHeader[j].replace(/\s/g, '_');
                objNewObject.value = arrOfValues[j];*/
                var strKey = arrNewHeader[j].name;//.replace(/\s/g, '_');
                var strValue = arrOfValues[j];
                //arrObjects.push(objNewObject);
                objNewObject[strKey] = strValue;
            };
            //arrOfTransformedObjects.push(arrObjects);
            arrOfTransformedObjects.push(objNewObject);
        };
        console.log('pause to check here')
        /*var objTable = {};
        objTable.data = arrOfTable;
        jsPdfDoc.table(x, y, arrOfTable);*/
        //var jsPdfTableConfig = {};
        //jsPdfTableConfig.printHeaders = true;
        //jsPdfTableConfig.autoSize = true;
        //jsPdfTableConfig.margins = {
        //    left:10, top:yMarginReset, bottom:yFooterSize, width:jsPdfDoc.internal.pageSize.width
        //    };
        //jsPdfTableConfig.fontSize = jsPdfDoc.internal.getFontSize();
        //jsPdfTableConfig.fontSize = 6;

        /*var margin = 0.5;
        jsPdfDoc.setDrawColor(0, 0, 0).setLineWidth(1 / 72).line(margin, margin, margin, 11 - margin).line(8.5 - margin, margin, 8.5 - margin, 11 - margin);*/

        jsPdfDoc.table(x, y, arrOfTransformedObjects, arrNewHeader, this.globalJsConfigOptions);

    };
    this.numSizingTableRows = 1;
    this.addSizingTable = function () {
        if ($("#sizeTbl").length) {
            //var arrSizeTbl = pdfThisTableV2('sizeTbl');
            /*var arrOne = arrSizeTbl[0];
            var arrTwo = [];
            for (var i = 0; i < arrOne.length; i++) {
                var MyText = arrOne[i].text;
                arrTwo[i] = MyText;
            };
            arrSizeTbl[0] = arrTwo;*/
            //jsPdfDoc.table(this.xPosition, this.yPosition, arrSizeTbl);

            //pageOneColumns.push(objContentSizeTbl);
            //pageOneColumnsSectionTwo.push(objContentSizeTbl);
            //this.processADataTableResponseArray(arrSizeTbl, arrOfColumnWidths);
            //var numMidpointY = jsPdfDoc.internal.pageSize.height / 3;
            var arrOfColumnWidths = [40, 40, 40];
            var arrSizeTbl = pdfThisTableV2('sizeTbl');
            this.numSizingTableRows = arrSizeTbl.length;
            var numMidpointY = 42;
            if(arrSizeTbl.length > 1){
            this.reprocessUsingJsPdfTable(this.xPosition, numMidpointY, arrSizeTbl, arrOfColumnWidths);
            }else{
                 var arrHeaderArray =[{style:'tableHeader',text:'Garment Size'},{style:'tableHeader',text:'Size Code'},{style:'tableHeader',text:'X Size'}];
                 var arrBlankSingleRow = ['----','----','----'];
                 arrSizeTbl = [];
                 arrSizeTbl[0] = arrHeaderArray;
                 arrSizeTbl[1] = arrBlankSingleRow;
                 this.reprocessUsingJsPdfTable(this.xPosition, numMidpointY, arrSizeTbl, arrOfColumnWidths);
                 /*jsPdfDoc.setFontSize(18);
                this.processTextUsingCurrentXandYPosition('Sizing Table \n - No data available in table.');
                jsPdfDoc.setFontSize(6);*/
            };
            //this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrSizeTbl, arrOfColumnWidths);
            //this.reprocessUsingJsPdfTable(this.xPosition, jsPdfDoc.internal.pageSize.height / 3, arrSizeTbl, arrOfColumnWidths);

        }
    };

    this.addSewBomTable = function () {
        if ($("#sewBomTable").length) {
            this.addPageAndReset('Sew Bom');
            var arrSewBomTbl = pdfThisTableV2('sewBomTable');
            console.log(arrSewBomTbl);
            //pageOneColumns.push(objContentSizeTbl);
            //pageOneColumnsSectionTwo.push(objContentSizeTbl);
            var numOfSizeColumns = arrSewBomTbl[0].length - 5;
            var arrOfColumnWidths = [25, 25, 30, 35, 45];
            var numSumOfAllColumns = 0;
            for (var i = 0; i < arrOfColumnWidths.length; i++) {
                numSumOfAllColumns += arrOfColumnWidths[i];
            };
            var numOfRemainingRoom = (jsPdfDoc.internal.pageSize.width * columnScaleFactor) - numSumOfAllColumns;
            var numOfReaminingRoomPerColumn = Math.floor(numOfRemainingRoom / numOfSizeColumns);
            var z = 0;
            while (z < numOfSizeColumns) {
                arrOfColumnWidths.push(numOfReaminingRoomPerColumn);
                z++;
            };
            jsPdfDoc.setFontSize(numGlobalFontSize);
            this.processTextUsingCurrentXandYPosition('Sew BOM');
            //this.yPosition += 20;
            jsPdfDoc.setFontSize(numGlobalFontSize);
            //this.processADataTableResponseArray(arrSewBomTbl, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrSewBomTbl, arrOfColumnWidths);

        }
    };

    this.addSourceBomTable = function () {
        if ($("#sourceBomTable").length) {
            this.addPageAndReset('Source BOM');
            var arrSourceBomTbl = pdfThisTableV2('sourceBomTable');
            console.log(arrSourceBomTbl);
            var arrOfColumnWidths = [35/*Section*/, 55/*Garment Use*/, /*Material*/65, /*Minor Category*/45, /*Description*/105,/*UOM*/45];
            //pageOneColumns.push(objContentSizeTbl);
            //pageOneColumnsSectionTwo.push(objContentSizeTbl);
            jsPdfDoc.setFontSize(numGlobalFontSize);
            this.processTextUsingCurrentXandYPosition('Sourced BOM');
            //this.yPosition += 20;
            jsPdfDoc.setFontSize(numGlobalFontSize);
            //this.processADataTableResponseArray(arrSourceBomTbl, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrSourceBomTbl, arrOfColumnWidths);
        }
    };

    this.addRoutingTable = function () {
        if ($("#routing").length) {
            this.addPageAndReset('Routing');
            var arrRoutingTbl = pdfThisTableV2('routing');
            console.log(arrRoutingTbl);
            //pageOneColumns.push(objContentSizeTbl);
            //pageOneColumnsSectionTwo.push(objContentSizeTbl);
            var arrOfColumnWidths = [30/*Manf Style*/, 60/*Knit*/, 60/*BL DY Finish */, 60/*Cut Plant */, 20/*Primary*/, 60/*Sew*/, 40/*Routing*/, 60/*Comments*/];
            jsPdfDoc.setFontSize(numGlobalFontSize);
            this.processTextUsingCurrentXandYPosition('Routing ');
            //this.yPosition += 20;
            jsPdfDoc.setFontSize(numGlobalFontSize);
            //this.processADataTableResponseArray(arrRoutingTbl, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrRoutingTbl, arrOfColumnWidths);

        }
    };

    this.addApprovedSupplier = function () {
        var arrApprovedSupplierTbl = [];
        var strEmpty = '__________'
        if ($("#approvedSupplierTbl").length) {
            arrApprovedSupplierTbl = pdfThisTableV2('approvedSupplierTbl');

        }
        else {
            arrApprovedSupplierTbl = [[{ text: 'Supplier', style: 'tableHeader' }, { text: 'Mfg Flow', style: 'tableHeader' }, { text: 'Green Seal', style: 'tableHeader' }, { text: 'Red Seal', style: 'tableHeader' }, { text: 'Comments', style: 'tableHeader' }], [strEmpty, strEmpty, strEmpty, strEmpty, strEmpty]];

        };
        var arrOfColumnWidths = [30, 30, 30, 30, 35];
        //this.processADataTableResponseArray(arrApprovedSupplierTbl, arrOfColumnWidths);
        //var numMidpointY = jsPdfDoc.internal.pageSize.height / 3;
        var numMidpointY = 42;
        this.reprocessUsingJsPdfTable(this.xPosition + (jsPdfDoc.internal.pageSize.width / 2) - 2, numMidpointY, arrApprovedSupplierTbl, arrOfColumnWidths);
        //this.reprocessUsingJsPdfTable(this.xPosition + (jsPdfDoc.internal.pageSize.width / 2) - 2, this.yPosition, arrApprovedSupplierTbl, arrOfColumnWidths);
        //this.reprocessUsingJsPdfTable(this.xPosition + (jsPdfDoc.internal.pageSize.width / 2) - 2, jsPdfDoc.internal.pageSize.height /3, arrApprovedSupplierTbl, arrOfColumnWidths);

    };

    this.addRevisionTable = function () {
        if ($("#revisionAttributeTbl").length) {

            var arrRevisionAttributeData = pdfThisTableV2('revisionAttributeTbl');
            //reducing revision table to just first most recently sorted rows
            arrRevisionAttributeData = arrRevisionAttributeData.splice(0, 11);
            this.addPageAndReset('Revision Table');
            var arrOfColumnWidths = [35,15, 20, 20, 20, 35, 205, 35];
            if(arrRevisionAttributeData.length > 1){
               

                jsPdfDoc.setFontSize(8);
                this.processTextUsingCurrentXandYPosition('Product Revisions');
                jsPdfDoc.setFontSize(6);
           
            //this.processADataTableResponseArray(arrRevisionAttributeData, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrRevisionAttributeData, arrOfColumnWidths);
            }else{
                var arrHeaderArray =[{style:'tableHeader',text:"Product Type"},{style:'tableHeader',text:'Spec'},{style:'tableHeader',text:"Rev one"},{style:'tableHeader',text:"Rev two"},{style:'tableHeader',text:"Rev three"},{style:'tableHeader',text:"Last Edited By"},{style:'tableHeader',text:"Comments"},{style:'tableHeader',text:"Last Modified"}];

                var arrBlankSingleRow = ['----','----','----','----','----','----','----','----','----'];
                arrRevisionAttributeData = [];
                arrRevisionAttributeData[0] = arrHeaderArray;
                arrRevisionAttributeData[1] = arrBlankSingleRow;
                this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrRevisionAttributeData, arrOfColumnWidths);

                /*jsPdfDoc.setFontSize(18);
                this.processTextUsingCurrentXandYPosition('Product Revisions \n - No data available in table.');
                jsPdfDoc.setFontSize(6);*/


            }


        };
    };

    this.addMeasurements = function () {
        if ($("#measurements").length) {

            
            var strHeaderValue = $('#measurementDiv h1').text();
            this.addPageAndReset(strHeaderValue);
            var arrMeasurementTbl = pdfThisTableV2('measurements');
            var numOfSizeColumns = arrMeasurementTbl[0].length - 4;
            var arrOfColumnWidths = [15, 65, 15, 20];
            var numSumOfAllColumns = 0;
            for (var i = 0; i < arrOfColumnWidths.length; i++) {
                numSumOfAllColumns += arrOfColumnWidths[i];
            };
            var numOfRemainingRoom = (jsPdfDoc.internal.pageSize.width * columnScaleFactor) - numSumOfAllColumns;
            var numOfReaminingRoomPerColumn = Math.floor(numOfRemainingRoom / numOfSizeColumns);
            var z = 0;
            while (z < numOfSizeColumns) {
                arrOfColumnWidths.push(numOfReaminingRoomPerColumn);
                z++;
            };
            //jsPdfDoc.setFontSize(8);
            this.setLastFontSizeAndChangeToNewFontSize(8);
            this.processTextUsingCurrentXandYPosition(strHeaderValue);
            this.returnToLastFontSize();
            //jsPdfDoc.setFontSize(6);
            //this.yPosition += 20;
            //this.xPosition += xMarginReset;
            //have the function below if one of the params is an array and then process that differently

            //this.processADataTableResponseArray(arrMeasurementTbl, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrMeasurementTbl, arrOfColumnWidths);
        };
    };

    this.addMeasurementImagesSubDivImg = function () {
        var selector = '#measurementImagesSubDiv img';
        this.processAnImageWithATitleInHeaderValue(selector);
    };

    this.addConstruction = function () {
        var arrOfConstructions = [];
        if ($(".construction").length) {
            //this.addPageAndReset('Constructions');
            $(".construction").each(function () {
                var strTableid = $(this).attr('id');
                var strConstructionTableName = decodeURIComponent($(this).attr('name'));
                var arrConstructionTbl = pdfThisTableV2(strTableid);
                var objConstruction = {};
                objConstruction.array = arrConstructionTbl;
                objConstruction.name = strConstructionTableName;
                arrOfConstructions.push(objConstruction);
            });
            for (var i = 0; i < arrOfConstructions.length; i++) {
                try {
                    var objCurrent = arrOfConstructions[i];

                    /*jsPdfDoc.setFontSize(30);
                    if (objCurrent.name > 40) {
                        jsPdfDoc.setFontSize(20);
                    }*/
                    //jsPdfDoc.setFontSize(8);
                    
                    //jsPdfDoc.setFontSize(6);
                    //this.yPosition += 10;
                    var numPageWidth = jsPdfDoc.internal.pageSize.width;
                    var numOfColumns = objCurrent.array[0].length;
                    var arrOfColumnWidths = [135/*Sewing Operation*/, 40/*Stitch Type Description*/, 25/*Gauge Width*/, 20/*SPI*/, 30/*Seam Trimoff Allowance*/, 30/*Garment Use*/, 30/*Needle Thread*/, 20/*Needle Visibility*/, 36/*Looper Thread*/, 20/*Looper Visibility*/];
                    //this.processADataTableResponseArray(objCurrent.array, arrOfColumnWidths);
                    this.addPageAndReset(objCurrent.name);
                    this.processTextUsingCurrentXandYPosition(objCurrent.name);
                    this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, objCurrent.array, arrOfColumnWidths);
                } catch (e) {
                    console.log('error on this.addConstruction and error was\n' + e)
                }
            };

        };
    };

    this.addConstructionDetailsImagesSubDivImg = function () {
        var selector = '#constructionImagesSubDiv img';
        this.processAnImageWithATitleInHeaderValue(selector);
    };

    this.addPlacementImagesSubDivImg = function () {
        var selector = '#placementImagesSubDiv img';
        this.processAnImageWithATitleInHeaderValue(selector);
    };
    this.addDevelopmentImages = function () {
        var selector = '#developmentImagesSubDiv img';
        this.processAnImageWithATitleInHeaderValue(selector);
    };
    this.addMarkerLayoutImagesSubDivImg = function () {
        var selector = '#markerLayoutImagesSubDiv img';
        this.processAnImageWithATitleInHeaderValue(selector);
    };
    this.currentColorwayBom = '';
    this.addColorwaysDivTables = function () {
        var arrOfColorwayBoms = [];
        if ($('#colorwaysDiv table').length) {
            $('#colorwaysDiv table').each(function () {
                var strTableid = $(this).attr('id');
                var strCwayTableName = $(this).attr('printheader');
                var arrCwayTbl = pdfThisTableV2(strTableid);
                var objCway = {};
                objCway.array = arrCwayTbl;
                objCway.name = strCwayTableName;
                arrOfColorwayBoms.push(objCway);
            });
            //console.log(arrOfColorwayBoms);
            for (var i = 0; i < arrOfColorwayBoms.length; i++) {
                var objCurrent = arrOfColorwayBoms[i];
                if (i == 0) {
                    //this.processTextUsingCurrentXandYPosition(objCurrent.name);
                    //this.addPageAndReset('Colorway Boms');
                };
                /*jsPdfDoc.setFontSize(30);
                if (objCurrent.name > 40) {
                    jsPdfDoc.setFontSize(20);
                };*/

                //jsPdfDoc.setFontSize(6);
                this.yPosition += 10;


                //var bomName = objCurrent.name;
                //var var1 = this.tableLineHeight;
                var var1 = 7;
                var var2 = 45;
                if (i == (arrOfColorwayBoms.length - 1)) {
                    //this.processColorwayDataTableResponseArray()
                    this.processColorwayDataTableResponseArray(objCurrent, var1, var2, true);
                }
                else {
                    this.processColorwayDataTableResponseArray(objCurrent, var1, var2, false);
                };

            };

        };

    };

    this.addLabelBom = function () {
        if ($("#labelBom").length) {
            this.addPageAndReset('Label BOM');
            var arrLabelBom = pdfThisTableV2('labelBom');
            //pageOneColumns.push(objContentSizeTbl);
            //pageOneColumnsSectionTwo.push(objContentSizeTbl);
            var arrOfColumnWidths = [/*Country*/55, /*Garment Use */25, /*Material*/35, /*Application*/25, /*Label Size */35, /*Fiber Code-Content */75, /*Ink Color*/20, /*Usage Per Dozen*/35, /*Usage UOM*/25, /*Std Waste Factor*/35, /*Usage Price*/25];
            //jsPdfDoc.setFontSize(8);
            this.processTextUsingCurrentXandYPosition('Label BOM');
            //this.yPosition += 20;
            //jsPdfDoc.setFontSize(6);
            //this.processADataTableResponseArray(arrLabelBom, arrOfColumnWidths);
            this.reprocessUsingJsPdfTable(this.xPosition, this.yPosition, arrLabelBom, arrOfColumnWidths);

        }
    };


    this.processTheTitleAndItsImage = function (title, image, imgX, imgY, numImageWidth, numImageHeight, tag) {
        this.addPageAndReset();
        //jsPdfDoc.setFontSize(8);
        var numIndexOf_ = title.indexOf('_');
        if (numIndexOf_ != -1) {
            title = title.substring(0, numIndexOf_);
        };
        this.processTextUsingCurrentXandYPosition(title);

        //jsPdfDoc.addImage(image, 'PNG', imgX, imgY, numImageWidth, numImageHeight, tag, 'fast');
        //compress above, no compress below
        jsPdfDoc.addImage(image, 'PNG', imgX, this.yPosition, numImageWidth, numImageHeight, tag, 'fast');

    };
    this.processAnImageWithATitleInHeaderValue = function (selector) {
        /*var funcScope = function (decodedHeader, imageSrc) {
            this.processTheTitleAndItsImage(decodedHeader, imageSrc, 10, 10, 400, 400);
        };*/
        var maxWidth = jsPdfDoc.internal.pageSize.width;
        //var maxHeight = jsPdfDoc.internal.pageSize.height - topAndBottomMargins;//-- done this needs to be changed as the size of the header
        var maxHeight = 150;
        var numCenterX = maxWidth / 2;
        //var numCenterY = maxHeight / 2;
        if ($(selector).length) {
            var arrOfImageObjectsWithTitles = [];
            $(selector).each(function (index) {
                var strTextHeader = $(this).parent().attr('headerValue');
                var width = this.width;
                var height = this.height;
                if(width != height){
                    var gcd = gcd_two_numbers(width, height);
                } else {
                    var gcd = 1;
                }
                var ratio = width / height;
                var ratioInverted = height / width;
                var heightAdder = gcd * ratioInverted;
                width = 0;
                height = 0;
                //while (width < (maxWidth - gcd) && height < (maxHeight - heightAdder)) {
                while (width < maxWidth && height < maxHeight) {
                    width += gcd;
                    height += heightAdder;
                };
                decodedHeader = decodeURIComponent(strTextHeader);
                var imageSrc = $(this).attr('src');
                var imageObject = {};
                imageObject.imageSrc = imageSrc;
                imageObject.decodedHeader = decodedHeader
                imageObject.width = width;
                imageObject.height = height;
                //this.processTheTitleAndItsImage(decodedHeader, imageSrc, 10, 10, 400, 400);
                arrOfImageObjectsWithTitles.push(imageObject);
                //funcScope(decodedHeader, imageSrc);
            });
            for (var i = 0; i < arrOfImageObjectsWithTitles.length; i++) {
                var objCurrent = arrOfImageObjectsWithTitles[i];
                //this.processTheTitleAndItsImage(objCurrent.decodedHeader, objCurrent.imageSrc, 50, 50, 150, 150);
                //var numX;
                var numX = (maxWidth - objCurrent.width) / 2;
                if (numX < 0) { numX = 0 };
                /*if (objCurrent.width < (maxWidth / 2)) {
                    numX = maxWidth / 2;
                }
                else {
                    numX = 0;
                };*/
                //this.addPageAndReset(objCurrent.decodedHeader);
                var strOutlineString = objCurrent.decodedHeader;
                var numIndexOf_ = strOutlineString.indexOf('_');
                strOutlineString = strOutlineString.substring(0, numIndexOf_);

                //jsPdfDoc.outline.add(this.node, objCurrent.decodedHeader, { pageNumber: pageNumber });
                jsPdfDoc.outline.add(this.node, strOutlineString, { pageNumber: pageNumber });
                this.processTheTitleAndItsImage(objCurrent.decodedHeader, objCurrent.imageSrc, numX, this.yPosition - yFooterSize, objCurrent.width, objCurrent.height);
                
            };
        };
    };
    this.addBlankRow = function () {
        //create manual blank row adding to avoid display issue occurring when entire row is blank in pdfing
    };
    this.pageNumber = 0;
    jsPdfDocBaselineTextSize = 6;
    jsPdfDocBaselineTextHeaderSize = 6;
    this.node = {};
    this.runAndSave = function () {
        //jsPdfDoc.outline.add(this.node, sectionName, { pageNumber: jsPdfDoc.internal.pages.length - 1 });
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var dateForStuff = m_names[curr_month] + '-' + curr_date + '-' + curr_year;
        var margin = 0.5;
        //jsPdfDoc = new jsPDF('landscape');
        jsPdfDoc.setFontSize(numGlobalFontSize)
        this.node = jsPdfDoc.outline.add(null, garment.name, null);

        //jsPdfDoc.setHeaderFunction(header);
        
        try {
            header();
            this.createPageOne();
        } catch (e) {
            console.log(e);
        };
        //var numMidPointOfPageOne = this.yPosition;
        //var numMidPointXofPage = 140;
        //jsPdfDoc.setFontSize(jsPdfDocBaselineTextSize);
        this.resetXbutSpecifyY(this.yPosition);
        //jsPdfDoc.outline.add(this.node, 'General Attributes', { pageNumber: 0 });
        
        /*var dooper = function () {
            this.header();
        };*/

        jsPdfDoc.setHeaderFunction(header);
        this.addPageAndReset('Sizing Table and Approved Suppliers');
        this.addSizingTable();
        this.addApprovedSupplier();
        //this.addPageAndReset('Front Back Images');
        //this.addFrontBackImages(false);
        //this.addPageAndReset('Revisions');
        this.addRevisionTable();
        //blocker was here
        //this.addPageAndReset('Measurements');
        this.addMeasurements();//components all add their own pages, only first few pages always show
        //this.addPageAndReset('Measurement Images');
        this.addMeasurementImagesSubDivImg();
        //this.addPageAndReset('Construction');
        this.addConstruction();
        //this.addPageAndReset('Construction Details Images');
        this.addConstructionDetailsImagesSubDivImg();
        //this.addPageAndReset('Placement Images');
        this.addPlacementImagesSubDivImg();
        //this.addPageAndReset('Marker Layout Images');
        this.addMarkerLayoutImagesSubDivImg();
        //this.addPageAndReset('Sew BOM Images');
        this.addSewBomTable();
        //this.addPageAndReset('Source BOM Images');
        this.addSourceBomTable();
        //this.addPageAndReset('Routing');
        this.addRoutingTable();
        //this.addPageAndReset('Label BOM');
        
        //this.addPageAndReset('Colorway Boms');
        this.addColorwaysDivTables();
        this.addLabelBom();
        if (!garmentProduct.isCurrentSpecAnActiveSpec && !garmentProduct.isCurrentSpecAnAvailableSpec) {
            this.addDevelopmentImages();
        };
        /*if (!garmentProduct.isCurrentSpecAnActiveSpec && !garmentProduct.isCurrentSpecAnAvailableSpec) {
            jsPdfDoc.addImage(developmentImage, 'PNG', 0, 0, jsPdfDoc.internal.pageSize.width, jsPdfDoc.internal.pageSize.height, 'fast');
        };*/
        //blocker was here
        $("#spin").hide();
        jsPdfDoc.save(garment.name + '_' + dateForStuff + '.pdf');
        
    };

};


function pdfGarmentProductFromDocProcessor(aGarmentProduct) {
    $('#spin').show();
    setTimeout(function(){
        var processor = new docProcessor(aGarmentProduct);
        processor.runAndSave();
        //processor.nameAlert();
        //console.log(processor);
    },150);

};
