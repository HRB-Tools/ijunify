"use strict";
exports.__esModule = true;
exports.filedownload = function (arr, filename) {
    var blob = new Blob([arr], { type: 'text/csv; charset=utf-8' });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
// new comment 
