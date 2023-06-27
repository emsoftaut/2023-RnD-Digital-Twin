const fs = require("fs");
const savePath = "../factoryIO";
const convert = require("xml-js");
let keyList = {};
let output = {};
fs.readdir(savePath, "buffer", (err, files) => {
	if (err) console.log(err);
	else {
		files.forEach((file) =>
			fs.readFile(savePath + "/" + file, "utf8", (err, content) => {
				if (err) console.log(err);
				else saveFile = convert.xml2json(content, { compact: true, spaces: 4 });
				saveData = JSON.parse(saveFile).FactoryIO;
				driverDetails = saveData.Drivers.ModbusTCPServer;
				objectDetails = saveData.Object;
				for (let key in driverDetails) {
					if (key.startsWith("BitInput")) {
						let bitNum = key.replace("BitInput", ""); // Extracting the bit number from the key
						let pointIOKey = driverDetails[key]._attributes.PointIOKey;
						// console.log(bitNum + "    " + pointIOKey);
						keyList[pointIOKey] = "S" + bitNum; // Storing the PointIOKey in the new object
					} else if (key.startsWith("BitOutput")) {
						let bitNum = key.replace("BitOutput", ""); // Extracting the bit number from the key
						let pointIOKey = driverDetails[key]._attributes.PointIOKey;
						// console.log(bitNum + "    " + pointIOKey);
						(keyList["K" + bitNum] = pointIOKey), "test"; // Storing the PointIOKey in the new object
					}
				}
				console.log(keyList);
				let keys = Object.keys(keyList);
				// console.log(keys);
				// console.log("--------------------------------");
				// console.log(objectDetails._attributes.GroupKey);
				for (let objKey in objectDetails) {
					for (contrlKey in keyList) {
					}
				}
			})
		);
	}
});
