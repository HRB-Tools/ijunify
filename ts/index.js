"use strict";
exports.__esModule = true;
var fileio_1 = require("./fileio");
var csv_1 = require("./csv");
var classify_1 = require("./classify");
var logic_1 = require("./logic");
var lighte_1 = require("./lighte");
var filedownload_1 = require("./filedownload");
// Init when document is loaded
document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        init();
    }
};
var init = function () {
    var text;
    // Adds EventListeners to each item
    var btn1 = document.querySelector('ul .nav');
    btn1.addEventListener('mousedown', function () {
        text = fileio_1.fileresult();
        text.then(function (csvFile) {
            return csv_1.resultArray(csvFile);
        }).then(function (arr2d) {
            return logic_1.dataLogic(arr2d, lighte_1.lighte, lighte_1.lightBool);
        }).then(function (arr2d) {
            var information = classify_1.classify(arr2d.outArr);
            if (arr2d.outArr.length > 0) {
                var name_1 = "EXTF_" + information.wj + "_" + (information.vom + information.bis) + ".csv";
                var csv = csv_1.csvArray(arr2d.outArr);
                filedownload_1.filedownload(csv, name_1);
            }
            if (arr2d.restArr.length > 0) {
                var name_2 = "EXTF_" + information.wj + "_" + (information.vom + information.bis) + "_rest.csv";
                var csv = csv_1.csvArray(arr2d.restArr);
                filedownload_1.filedownload(csv, name_2);
            }
        });
    });
};
// .then(function (arr2d) {
//     let information = classify(arr2d);
//     console.log(information);
//     return arr2d;
// })
