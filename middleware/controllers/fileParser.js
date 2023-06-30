const { ok } = require("assert");
const fs = require("fs");
const savePath = "../factoryIO";
const convert = require("xml-js");

generateJSONFiles();

/**
 * Main Function, creates save files for each save file in FactoryIO
 */
function generateJSONFiles() {
	fs.readdir(savePath, "buffer", (err, files) => {
		if (err) console.log(err);
		else {
			//read each file in the save path directory
			files.forEach((file) =>
				fs.readFile(savePath + "/" + file, "utf8", (err, content) => {
					if (err) console.log(err);
					//read the factory IO file converted into JSON format from its XML representation
					else saveFile = convert.xml2json(content, { compact: true, spaces: 4 });
					saveData = JSON.parse(saveFile).FactoryIO; //parse the JSON data
					//format output
					let output = { name: saveData.Description._attributes.Data, sensors: {}, coils: {} };
					//split the data into the list of all scene objects and the data from the Modbus server driver
					driverDetails = saveData.Drivers.ModbusTCPServer;
					objectDetails = saveData.Object;

					//format lists
					let driverList = getDriverList(driverDetails);
					let objList = getObjList(objectDetails);
					//write the file
					fs.writeFileSync("./models/middleware/" + output.name + ".JSON", formatOutput(driverList, output, objList));
				})
			);
		}
	});
}
/**
 *	formating function for building the JSON object
 * @param {List of Drivers used by the Modbus TCP Server} driverList
 * @param {The Current Output object to be saved} output
 * @param {A List of all objects in from the save file that have I/O Binary data} objList
 * @returns a string representation of the JSON model
 */
function formatOutput(driverList, output, objList) {
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
	return JSON.stringify(output);
}
/**
 * Generate a JSON representation of all the I/O objects in the Simulation save
 * @param {a list of every object in a save file} objectList
 * @returns returns a list of objects that have I/O binary data
 */
function getObjList(objectList) {
	let objList = {};
	for (let objKey in objectList) {
		if (checkNested(objectList[objKey], "OperatingMode", "GroupIO", "BinaryOutput", "_attributes", "Key")) {
			objList[objectList[objKey].OperatingMode.GroupIO.BinaryOutput._attributes.Key] = {
				_attributes: objectList[objKey].OperatingMode.GroupIO.BinaryOutput._attributes,
				operatingValue: objectList[objKey].ComponentIO._attributes.CurrentOperatingMode,
			};
		} else if (checkNested(objectList[objKey], "OperatingMode", "GroupIO", "BinaryInput", "_attributes", "Key")) {
			objList[objectList[objKey].OperatingMode.GroupIO.BinaryInput._attributes.Key] = {
				_attributes: objectList[objKey].OperatingMode.GroupIO.BinaryInput._attributes,
				operatingValue: objectList[objKey].ComponentIO._attributes.CurrentOperatingMode,
			};
		}
	}
	return objList;
}
/**
 * Format the list of Driver objects from a given JSON representation
 * @param {a JSON object of the Modbus Server Details} driverList
 * @returns formatted JSON representation
 */
function getDriverList(driverList) {
	let driverDetails = {};
	for (let key in driverList) {
		if (key.startsWith("BitInput")) {
			let bitNum = key.replace("BitInput", ""); // Extracting the bit number from the key
			let pointIOKey = driverList[key]._attributes.PointIOKey;
			driverDetails[pointIOKey] = { IOType: "input", bitnum: bitNum, IOKey: pointIOKey }; // Storing the PointIOKey in the new object
		} else if (key.startsWith("BitOutput")) {
			let bitNum = key.replace("BitOutput", ""); // Extracting the bit number from the key
			let pointIOKey = driverList[key]._attributes.PointIOKey;
			driverDetails[pointIOKey] = { IOType: "output", bitnum: bitNum, IOKey: pointIOKey };
		}
	}
	return driverDetails;
}
/**
 * itterate through a JSON object and see if the object contains each sub level
 * @param {a JSON object} obj
 * @param {any count of strings representing further levels in an array } Levels
 * @returns
 */
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
