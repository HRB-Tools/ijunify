import { fileresult } from './fileio';
import { resultArray } from './light';
document.onreadystatechange = function(){
    if ( document.readyState == 'complete' ){
        init();
    }
};
let init = function(){
    let text, arr;
    let btn1 = document.querySelector('ul .nav');
    btn1.addEventListener('mousedown', function (){
        text = fileresult();
        text.then(function(value){
            return value.split('\n');
        }).then(function(value){
            return value.forEach(function(element) {
                // return element.split(';');
                console.log(element.split(';'));
            });
        }).then(function (value){
            console.log(value);
        });
    });
};