const fbMachineConnection = require("../services/firebase.js");
const map = require("../services/mapper");
const getMachineModel = require("../models/middleware/baseMachine");
const modbusClient = require("../services/modbusConnection.js");

// Get the name of the machine from command line argument
let machineNameArgument = process.argv[2];

machineFBRecord = fbMachineConnection.getMachine(machineNameArgument);
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

machineFBRecord.once('value', function(snapshot) {
  if (snapshot.exists()) {
      console.log('Machine ' + machineNameArgument + ' record exists')
  } else {
      console.log("Machine doesn't exist, posting");
      database = fbMachineConnection.getMachine();
      machineToCommit = {};
      machineToCommit[machineNameArgument] = machineFactoryIOHandler.getAnemicModel();
      database.update(machineToCommit);
      machineFBRecord = fbMachineConnection.getMachine(machineNameArgument);
      console.log("Machine successfully posted");
  }
});

machineFBRecord.on('value', (updatedValues) => {
  console.log(updatedValues);
  machineValues = updatedValues.val();
  innerMachineModel = getMachineModel(machineNameArgument);
  map(machineValues, innerMachineModel);
  modbusClient.writeMultipleCoils(0, innerMachineModel.getCoilValues());
  });
