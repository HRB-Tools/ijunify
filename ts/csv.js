"use strict";
// CSV Splitter -> returns a two dimensional array
exports.__esModule = true;
exports.resultArray = function (value) {
    var temp = value.split('\n'), arr = [];
    if (temp.length >= 1) {
        temp.forEach(function (element) {
            arr.push(element.split(';'));
        });
    }
    return arr;
};
exports.csvArray = function (arr) {
    var csvArray = [];
    arr.forEach(function (element) { return csvArray.push(element.join(';')); });
    return csvArray.join('\n');
};
