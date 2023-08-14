const FirebaseService = require("../services/FirebaseService.js");
const getFactoryIOMachineModel = require("../models/baseMachine.js");
const ModbusService = require("../services/ModbusService.js");
const localConfig = require("../config/LocalEnvConfig.js");

const machines = localConfig.machines;

let factoryIOMachineModels = [];
let firebaseMachineConnections = [];
let offset = localConfig.offset;

const pollFrequency = 1000;

function Setup() {
  ModbusService.SetupModbus(localConfig.IP, localConfig.port, offset);
  FirebaseService.setupFirebase(localConfig.email, localConfig.password).then(() => {
    SetupModelsAndConnections(machines);
    SetupListeners();
  });
}

function SetupModelsAndConnections(machines)
{
  let counter = 0;
  for (const machine in machines) {
    let machineModel = getFactoryIOMachineModel(machines[machine].machineName);
    factoryIOMachineModels.push(machineModel);
    factoryIOMachineModels[counter].machineID = machines[machine].machineID;

    let machineRecord = FirebaseService.getMachineRecord(machines[machine], factoryIOMachineModels[counter]);
    firebaseMachineConnections.push(machineRecord);
    counter++;
  }
}

function SetupListeners()
{
  for (let i = 0; i < firebaseMachineConnections.length; i++)
  {
    FirebaseService.ListenFirebaseChanges(firebaseMachineConnections[i], factoryIOMachineModels[i], handleFirebaseChanges);
    ListenModbusChanges(firebaseMachineConnections[i], factoryIOMachineModels[i]);
  }
}

function ListenModbusChanges(firebaseMachineConnection, factoryIOMachine) {
  setInterval(function() {
    let sensorCount = Object.keys(factoryIOMachine.sensors).length;

    ModbusService.ReadFromModbus(sensorCount).then((pollResponse) => {
      let newValues = checkForChanges(factoryIOMachine.getSensorValues(), toFirebaseModel(pollResponse));
      
      if (newValues)
      {
        factoryIOMachine.setSensorValues(newValues);
        firebaseModel = factoryIOMachine.toFirebaseModel();
        firebaseModel.lastModified = GetCurrentDateTime();
        FirebaseService.updateMachine(firebaseModel, firebaseMachineConnection);
      }
    });
  }, pollFrequency);
};

function checkForChanges(currentSensorValues, newSensorValues)
{
  let sensorCount = Object.keys(currentSensorValues).length;

  let sensorChangeFound = false;
  for (let i = 0; i < sensorCount; i++) {
    const currentValue = newSensorValues[i+offset];
    if (currentValue !== currentSensorValues[i+offset]) {
      sensorChangeFound = true;
      break;
    }
  }

  if (sensorChangeFound)
  {
    return newSensorValues
  } else {
    return null;
  }
    
}

function toFirebaseModel(pollResponse)
{
  let newSensorValues = {}
  for (let i = 0; i < pollResponse.length; i++)
  {
    newSensorValues[offset + i] = pollResponse[i];
  }
  return newSensorValues;
}

function handleFirebaseChanges(updatedValues, FactoryIOModel) {
  console.log("Firebase values changed");
  FactoryIOModel.toModbusModel(updatedValues.val());
  FactoryIOModel.lastModified = GetCurrentDateTime();
  ModbusService.WriteToModbus(FactoryIOModel);
}

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

Setup();