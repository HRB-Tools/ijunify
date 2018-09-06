export const dataLogic = function(arr, errorFunction, boolFn){
    console.log("Module logic");
    let a = {
        outArr : [],
        restArr : []
    };
    arr.forEach(function(element){
        element = errorFunction(element);
        let importLine = boolFn(element);
        let outDir = importLine ? a.outArr : a.restArr;
        outDir.push(element);
    });
    console.log(a);
    return a;
};