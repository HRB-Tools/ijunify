(function () {
    'use strict';

    // Creates a File Input element, activates it and returns the result if nonempty
    const fileresult = function () {
        return new Promise(function (resolve, reject) {
            let fileInput = document.createElement('input'), reader = new FileReader();
            fileInput.setAttribute('type', 'file');
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () { reader.readAsText(this.files[0]); });
            reader.addEventListener('loadend', function () {
                if (this.result !== '') {
                    resolve(this.result);
                }
                else {
                    reject(this.result);
                }
            });
            fileInput.click();
        });
    };

    // CSV Splitter -> returns a two dimensional array
    const resultArray = function (value) {
        let temp = value.split('\n'), arr = [];
        if (temp.length >= 1) {
            temp.forEach(function (element) {
                arr.push(element.split(';'));
            });
        }
        return arr;
    };
    const csvArray = function (arr) {
        let csvArray = [];
        arr.forEach(element => csvArray.push(element.join(';')));
        return csvArray.join('\n');
    };

    // Classifier -> evaluates the header and extracts the required export data
    // new comment
    const classify = function (arr) {
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

    const dataLogic = function (arr, errorFunction, boolFn) {
        let a = {
            outArr: [],
            restArr: []
        };
        arr.forEach(function (element) {
            element = errorFunction(element);
            let importLine = boolFn(element);
            let outDir = importLine ? a.outArr : a.restArr;
            if (element !== undefined) {
                outDir.push(element);
            }
        });
        return a;
    };

    // Custom Module that handles each line and makes corrections
    const lighte = function (element) {
        if (element.length != 31 && element.length < 116) {
            return undefined;
        }
        let forbidden = ['2502', '2552', '2072'];
        let skr04 = {
            noBU: ["1181", "1184", "1185", "1186", "5110", "5111", "5112", "5113", "5114", "5115", "5116", "5117", "5118", "5119", "5130", "5131", "5132", "5133", "5134", "5135", "5136", "5137", "5138", "5139", "5160", "5162", "5163", "5166", "5167", "5170", "5171", "5175", "5176", "5189", "5191", "5192", "5300", "5301", "5302", "5303", "5304", "5305", "5306", "5307", "5308", "5309", "5400", "5401", "5402", "5403", "5404", "5405", "5406", "5407", "5408", "5409", "5420", "5421", "5422", "5423", "5424", "5425", "5425", "5426", "5427", "5428", "5429", "5430", "5435", "5440", "5505", "5506", "5507", "5508", "5509", "5540", "5541", "5542", "5543", "5544", "5545", "5546", "5547", "5548", "5549", "5550", "5553", "5560", "5565", "5710", "5711", "5714", "5715", "5717", "5718", "5720", "5721", "5722", "5723", "5724", "5725", "5726", "5727", "5731", "5734", "5736", "5738", "5741", "5743", "5746", "5748", "5750", "5751", "5754", "5755", "5760", "5761", "5780", "5781", "5784", "5785", "5788", "5790", "5791", "5792", "5793", "5794", "5798", "5906", "5908", "5910", "5913", "5915", "5920", "5921", "5923", "5925", "5926", "5930", "5933", "5935", "5940", "5941", "5943", "5945", "5946", "5951"],
            aV: ["1181", "1184", "1185", "1186", "5110", "5111", "5112", "5113", "5114", "5115", "5116", "5117", "5118", "5119", "5130", "5131", "5132", "5133", "5134", "5135", "5136", "5137", "5138", "5139", "5160", "5162", "5163", "5166", "5167", "5170", "5171", "5175", "5176", "5189", "5191", "5192", "5300", "5301", "5302", "5303", "5304", "5305", "5306", "5307", "5308", "5309", "5400", "5401", "5402", "5403", "5404", "5405", "5406", "5407", "5408", "5409", "5420", "5421", "5422", "5423", "5424", "5425", "5425", "5426", "5427", "5428", "5429", "5430", "5435", "5440", "5505", "5506", "5507", "5508", "5509", "5540", "5541", "5542", "5543", "5544", "5545", "5546", "5547", "5548", "5549", "5550", "5553", "5560", "5710", "5711", "5714", "5715", "5717", "5718", "5720", "5721", "5722", "5723", "5724", "5725", "5726", "5727", "5731", "5734", "5736", "5738", "5741", "5743", "5746", "5748", "5750", "5751", "5754", "5755", "5760", "5761", "5780", "5781", "5784", "5785", "5788", "5790", "5791", "5792", "5793", "5794", "5798", "5906", "5908", "5910", "5913", "5915", "5920", "5921", "5923", "5925", "5926", "5930", "5933", "5935", "5940", "5941", "5943", "5945", "5946", "5951"],
            aM: ["3260", "3270", "3271", "3272", "4100", "4105", "4110", "4120", "4125", "4130", "4135", "4136", "4139", "4140", "4150", "4160", "4165", "4186", "4300", "4301", "4302", "4303", "4304", "4305", "4306", "4307", "4308", "4309", "4310", "4311", "4312", "4313", "4314", "4315", "4316", "4317", "4318", "4319", "4330", "4335", "4336", "4337", "4338", "4339", "4339", "4340", "4341", "4342", "4343", "4344", "4345", "4346", "4347", "4348", "4349", "4400", "4400", "4401", "4402", "4403", "4404", "4405", "4406", "4407", "4408", "4409", "4410", "4564", "4565", "4566", "4569", "4574", "4575", "4576", "4579", "4610", "4611", "4612", "4613", "4614", "4615", "4616", "4620", "4621", "4622", "4623", "4624", "4625", "4626", "4630", "4631", "4632", "4633", "4634", "4635", "4636", "4640", "4641", "4642", "4643", "4644", "4645", "4646", "4650", "4651", "4652", "4653", "4654", "4655", "4656", "4660", "4661", "4662", "4663", "4664", "4665", "4666", "4670", "4671", "4672", "4673", "4674", "4675", "4676", "4680", "4681", "4682", "4683", "4684", "4686", "4687", "4705", "4710", "4711", "4720", "4721", "4723", "4724", "4725", "4726", "4729", "4731", "4736", "4738", "4741", "4742", "4743", "4746", "4748", "4750", "4751", "4760", "4761", "4780", "4781", "4790", "4791", "4834", "4836", "4841", "4842", "4844", "4845", "4848", "4861", "4862", "4865", "4866", "4867", "4941", "4945", "4947", "4948", "6281", "6285", "6286", "6387", "6884", "6885", "6888", "6931", "6932", "6933", "6934", "6935", "6936", "6937", "6938", "6939"]
        };
        let auto = function (skr) {
            let arr = [];
            skr.aV.forEach(function (item) { arr.push(item); });
            skr.aM.forEach(function (item) { arr.push(item); });
            return arr;
        }; // Klont Automatikkonten aus dem SKR-Objekt
        let a = auto(skr04); // Im Fall von SKR 03 entsprechend aendern!
        for (let j = 0; j < a.length; j++) {
            if (a[j] == element[7] && element[8] != '' && element[8] != '40') {
                element[8] = "";
            }
            else if (a[j] == element[6] && element[8] != '' && element[8] != '40') {
                element[8] = "";
            }
        } // Entfernt den Schluessel bei Automatikkonten
        if (element[8] == '10' || element[8] == "10" || element[8] == '"10"') {
            console.log(element[8]);
            element[8] = '0';
        } // Korrigiert falsche Verwendung von BU-10
        if (forbidden.indexOf(element[6]) > -1) {
            element[6] = element[6].slice(0, element[6].length - 1) + '0';
        } // Konto
        if (forbidden.indexOf(element[7]) > -1) {
            element[7] = element[7].slice(0, element[7].length - 1) + '0';
        } // Gegenkonto
        return element;
    };
    const lightBool = function (element) {
        // Insert custom logic if need be (only)
        return element !== undefined && element !== null;
    };

    const filedownload = function (arr, filename) {
        let blob = new Blob([arr], { type: 'text/csv; charset=utf-8' });
        let link = document.createElement("a");
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // new comment

    // Init when document is loaded
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            init();
        }
    };
    let init = function () {
        let text;
        // Adds EventListeners to each item
        let btn1 = document.querySelector('ul .nav');
        btn1.addEventListener('mousedown', function () {
            text = fileresult();
            text.then(function (csvFile) {
                return resultArray(csvFile);
            }).then(function (arr2d) {
                return dataLogic(arr2d, lighte, lightBool);
            }).then(function (arr2d) {
                let information = classify(arr2d.outArr);
                if (arr2d.outArr.length > 0) {
                    let name = `EXTF_${information.wj}_${information.vom + information.bis}.csv`;
                    let csv = csvArray(arr2d.outArr);
                    filedownload(csv, name);
                }
                if (arr2d.restArr.length > 0) {
                    let name = `EXTF_${information.wj}_${information.vom + information.bis}_rest.csv`;
                    let csv = csvArray(arr2d.restArr);
                    filedownload(csv, name);
                }
            });
        });
    };
    // .then(function (arr2d) {
    //     let information = classify(arr2d);
    //     console.log(information);
    //     return arr2d;
    // })

}());
