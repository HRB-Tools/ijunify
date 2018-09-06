import { fileresult } from './fileio';
import { resultArray } from './csv';
import { classify } from './classify';
import { dataLogic } from "./logic";
import { lighte, lightBool } from "./lighte";
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
//# sourceMappingURL=index.js.map