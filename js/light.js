export const resultArray = function (a) {
    let p1 = Promise.resolve(a);
    p1.then(function (value) {
        return value.split(/\r?\n/g).split(';');
    });
}; //
//# sourceMappingURL=light.js.map