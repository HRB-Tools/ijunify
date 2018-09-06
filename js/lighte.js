// Custom Module that handles each line and makes corrections
export const lighte = function (element) {
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
export const lightBool = function (element) {
    // Insert custom logic if need be (only)
    return element !== undefined;
};
//# sourceMappingURL=lighte.js.map