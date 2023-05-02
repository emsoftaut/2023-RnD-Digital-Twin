const fbMachineConnection = require("../services/firebase.js");
const map = require("../services/mapper");
const getMachineModel = require("../models/middleware/baseMachine");
const modbusClient = require("../services/modbusConnection.js");

// Get the name of the machine from command line argument
let machineNameArgument = process.argv[2];

const machineFBRecord = fbMachineConnection.getMachine(machineNameArgument);
const machineFactoryIOHandler = getMachineModel(machineNameArgument);

sensorValues = machineFactoryIOHandler.getSensorValues();

function pollSensors() {
  sensorCount = Object.keys(machineFactoryIOHandler.sensors).length;
  console.log(sensorCount);

  modbusClient.readDiscreteInputs(0, sensorCount).then((response) => {
    for (let i = 0; i < sensorCount; i++) {
      const currentValue = response.response.body.valuesAsArray[i];
      if (currentValue !== sensorValues[i]) {
        console.log(`Sensor ${i} changed: ${currentValue}`);
        sensorValues[i] = currentValue;
        machineFactoryIOHandler.setSensorValues(sensorValues);
        machineFBRecord.update(machineFactoryIOHandler.getAnemicModel()).then(() => {
          console.log('Machine record updated successfully');
        }).catch((error) => {
          console.error('Error updating machine record:', error);
        });
      }
    }
  }).catch((error) => {
    console.error('Error reading sensors:', error);
  });
};

setInterval(pollSensors, 1000);


machineFBRecord.on('value', (updatedValues) => {
  machineValues = updatedValues.val();
  innerMachineModel = getMachineModel(machineNameArgument);
  map(machineValues, innerMachineModel);
  modbusClient.writeMultipleCoils(0, innerMachineModel.getCoilValues());
  });
