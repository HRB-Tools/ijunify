(function () {
    'use strict';

    // Creates a File Input element, activates it and returns the result if nonempty
    const fileresult = function () {
        console.log("Module fileio - returns Promise");
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
    };

    // CSV Splitter -> returns a two dimensional array
    const resultArray = function (value) {
        console.log("Module csv");
        let temp = value.split('\n'), arr = [];
        if (temp.length >= 1) {
            temp.forEach(function (element) {
                arr.push(element.split(';'));
            });
        }
        console.log(arr);
        return arr;
    };

    // Classifier -> evaluates the header and extracts the required export data
    const classify = function (arr) {
        console.log("Module classify");
        let details = {
            wj: null,
            vom: null,
            bis: null,
        };
        details.wj = parseInt(arr[0][12].slice(0, 4));
        details.vom = arr[0][14].slice(4);
        details.bis = arr[0][15].slice(4);
        return details;
    };

    const dataLogic = function (arr, errorFunction, boolFn) {
        console.log("Module logic");
        let a = {
            outArr: [],
            restArr: []
        };
        arr.forEach(function (element) {
            element = errorFunction(element);
            let importLine = boolFn(element);
            let outDir = importLine ? a.outArr : a.restArr;
            outDir.push(element);
        });
        console.log(a);
        return a;
    };

    // Custom Module that handles each line and makes corrections
    const lighte = function (element) {
        let forbidden = ['2502', '2552', '2072'];
        if (element[8] == '10') {
            element[8] = '0';
        } // korrigiert falsche Verwendung von BU-10
        if (forbidden.includes(element[6])) {
            console.log("before: " + element[6]);
            element[6] = element[6].slice(0, element[6].length - 1) + '0';
            console.log("after: " + element[6]);
        } // Konto
        if (forbidden.includes(element[7])) {
            console.log("before: " + element[7]);
            element[7] = element[7].slice(0, element[7].length - 1) + '0';
            console.log("after: " + element[7]);
        } // Gegenkonto
        return element;
    };
    const lightBool = function (element) {
        if (element === undefined) {
            console.log("element undefined!");
        }
        return element !== undefined;
    };

    // Init when document is loaded
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            init();
        }
    };
    let init = function () {
        console.log("Main - Init function");
        let text;
        // Adds EventListeners to each item
        let btn1 = document.querySelector('ul .nav');
        btn1.addEventListener('mousedown', function () {
            text = fileresult();
            text.then(function (csvFile) {
                return resultArray(csvFile);
            }).then(function (arr2d) {
                let information = classify(arr2d);
                console.log(information);
                return arr2d;
            }).then(function (arr2d) {
                return dataLogic(arr2d, lighte, lightBool);
            });
        });
    };

}());
