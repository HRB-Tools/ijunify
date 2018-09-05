(function () {
    'use strict';

    // Creates a File Input element, activates it and returns the result if nonempty
    const fileresult = function () {
        return new Promise(function (resolve, reject) {
            let fileInput = document.createElement('input'), reader = new FileReader();
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
        /*
        p1.then(function(value){
            return value;
        })
        */
    };
    // Typescript directory

    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            init();
        }
    };
    let init = function () {
        let text;
        let btn1 = document.querySelector('ul .nav');
        btn1.addEventListener('mousedown', function () {
            text = fileresult();
            text.then(function (value) {
                return value.split('\n');
            }).then(function (value) {
                return value.forEach(function (element) {
                    // return element.split(';');
                    console.log(element.split(';'));
                });
            }).then(function (value) {
                console.log(value);
            });
        });
    };

}());
