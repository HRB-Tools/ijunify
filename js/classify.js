// Classifier -> evaluates the header and extracts the required export data
export const classify = function (arr) {
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
//# sourceMappingURL=classify.js.map