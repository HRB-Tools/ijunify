import { fileresult } from './fileio';
import {csvArray, resultArray} from './csv';
import { classify } from './classify';
import { dataLogic } from "./logic";
import { lighte, lightBool } from "./lighte";
import { filedownload } from "./filedownload";

// Init when document is loaded
document.onreadystatechange = function(){
    if ( document.readyState == 'complete' ){
        init();
    }
};


let init = function(){
    console.log("Main - Init function");
    let text;

    // Adds EventListeners to each item
    let btn1 = document.querySelector('ul .nav');
    btn1.addEventListener('mousedown', function (){
        text = fileresult();
        text.then(function(csvFile) {
            return resultArray(csvFile);
        }).then(function (arr2d) {
            return dataLogic(arr2d, lighte, lightBool);
        }).then(function (arr2d) {
            console.log(arr2d.outArr);
            let information = classify(arr2d.outArr);
            console.log(information);
            if ( arr2d.outArr.length > 0 ){
                let name = `EXTF_${information.wj}_${information.vom+information.bis}.csv`;
                let csv = csvArray(arr2d.outArr);
                filedownload(csv, name);
            }
            if ( arr2d.restArr.length > 0 ){
                let name = `EXTF_${information.wj}_${information.vom+information.bis}_rest.csv`;
                let csv = csvArray(arr2d.restArr);
                filedownload(csv, name);
            }
        })
    });

};
// .then(function (arr2d) {
//     let information = classify(arr2d);
//     console.log(information);
//     return arr2d;
})