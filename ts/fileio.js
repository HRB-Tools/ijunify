"use strict";
// Creates a File Input element, activates it and returns the result if nonempty
exports.__esModule = true;
exports.fileresult = function () {
    return new Promise(function (resolve, reject) {
        var fileInput = document.createElement('input'), reader = new FileReader();
        fileInput.setAttribute('type', 'file');
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        fileInput.addEventListener('change', function () { reader.readAsText(this.files[0]); });
        reader.addEventListener('loadend', function () {
            if (this.result !== '') {
                resolve(this.result);
            }
            else {
                reject(this.result);
            }
        });
        fileInput.click();
    });
};
