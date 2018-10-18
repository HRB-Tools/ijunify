"use strict";
exports.__esModule = true;
exports.dataLogic = function (arr, errorFunction, boolFn) {
    var a = {
        outArr: [],
        restArr: []
    };
    arr.forEach(function (element) {
        element = errorFunction(element);
        var importLine = boolFn(element);
        var outDir = importLine ? a.outArr : a.restArr;
        outDir.push(element);
    });
    return a;
};
