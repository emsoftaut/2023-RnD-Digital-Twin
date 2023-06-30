const { ok } = require("assert");
const fs = require("fs");
const savePath = "../factoryIO";
const convert = require("xml-js");

generateJSONFiles();

function generateJSONFiles() {
	fs.readdir(savePath, "buffer", (err, files) => {
		if (err) console.log(err);
		else {
			files.forEach((file) =>
				fs.readFile(savePath + "/" + file, "utf8", (err, content) => {
					let output = { name: "", sensors: {}, coils: {} };
					if (err) console.log(err);
					else saveFile = convert.xml2json(content, { compact: true, spaces: 4 });
					saveData = JSON.parse(saveFile).FactoryIO;
					output.name = saveData.Description._attributes.Data;
					// console.log(output);
					driverDetails = saveData.Drivers.ModbusTCPServer;
					objectDetails = saveData.Object;
					let driverList = {};
					for (let key in driverDetails) {
						if (key.startsWith("BitInput")) {
							let bitNum = key.replace("BitInput", ""); // Extracting the bit number from the key
							let pointIOKey = driverDetails[key]._attributes.PointIOKey;
							driverList[pointIOKey] = { IOType: "input", bitnum: bitNum, IOKey: pointIOKey }; // Storing the PointIOKey in the new object
						} else if (key.startsWith("BitOutput")) {
							let bitNum = key.replace("BitOutput", ""); // Extracting the bit number from the key
							let pointIOKey = driverDetails[key]._attributes.PointIOKey;
							driverList[pointIOKey] = { IOType: "output", bitnum: bitNum, IOKey: pointIOKey }; // Storing the PointIOKey in the new object
						}
					}
					let objList = {};
					for (let objKey in objectDetails) {
						if (checkNested(objectDetails[objKey], "OperatingMode", "GroupIO", "BinaryOutput", "_attributes", "Key")) {
							objList[objectDetails[objKey].OperatingMode.GroupIO.BinaryOutput._attributes.Key] = {
								_attributes: objectDetails[objKey].OperatingMode.GroupIO.BinaryOutput._attributes,
								operatingValue: objectDetails[objKey].ComponentIO._attributes.CurrentOperatingMode,
							};
						} else if (checkNested(objectDetails[objKey], "OperatingMode", "GroupIO", "BinaryInput", "_attributes", "Key")) {
							objList[objectDetails[objKey].OperatingMode.GroupIO.BinaryInput._attributes.Key] = {
								_attributes: objectDetails[objKey].OperatingMode.GroupIO.BinaryInput._attributes,
								operatingValue: objectDetails[objKey].ComponentIO._attributes.CurrentOperatingMode,
							};
						}
					}
					objectKeys = Object.keys(objList);
					driverKeys = Object.keys(driverList);
					for (let oKey in objectKeys) {
						for (let dKey in driverKeys) {
							if (driverKeys[dKey] === objectKeys[oKey]) {
								if (driverList[driverKeys[dKey]].IOType == "input") {
									output.sensors["I" + driverList[driverKeys[dKey]].bitnum] = {
										name: objList[objectKeys[oKey]]._attributes.Name,
										value: objList[objectKeys[oKey]].operatingValue,
										register: driverList[driverKeys[dKey]].bitnum,
									};
								} else {
									output.coils["o" + driverList[driverKeys[dKey]].bitnum] = {
										name: objList[objectKeys[oKey]]._attributes.Name,
										value: objList[objectKeys[oKey]].operatingValue,
										register: driverList[driverKeys[dKey]].bitnum,
									};
								}
							}
						}
					}
					fs.writeFileSync("./models/middleware/" + output.name + ".JSON", JSON.stringify(output));
				})
			);
		}
	});
}

function checkNested(obj /*, level1, level2, ... levelN*/) {
	var args = Array.prototype.slice.call(arguments, 1);

	for (var i = 0; i < args.length; i++) {
		if (!obj || !obj.hasOwnProperty(args[i])) {
			return false;
		}
		obj = obj[args[i]];
	}
	return true;
}
