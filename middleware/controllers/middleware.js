const FirebaseService = require("../services/FirebaseService.js");
const getFactoryIOMachineModel = require("../models/baseMachine.js");
const ModbusService = require("../services/ModbusService.js");
const localConfig = require("../config/LocalEnvConfig.js");

const machines = localConfig.machines;

let factoryIOMachineModels = [];
let firebaseMachineConnections = [];
let offset = localConfig.initOffset;
let machineOffset = localConfig.machineOffset;

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
  let sensorOffset = offset;
  let coilOffset = offset;
  let counter = 0;
  for (const machine in machines) {
    let machineModel = getFactoryIOMachineModel(machines[machine].machineName, sensorOffset, coilOffset);
    factoryIOMachineModels.push(machineModel);
    factoryIOMachineModels[counter].machineID = machines[machine].machineID;

    let machineRecord = FirebaseService.getMachineRecord(machines[machine], factoryIOMachineModels[counter]);
    firebaseMachineConnections.push(machineRecord);

    sensorOffset += machineOffset;
    coilOffset += machineOffset;
    counter++;
  }
}

function SetupListeners()
{
  console.log("Setting up listeners");
  for (let i = 0; i < firebaseMachineConnections.length; i++)
  {
    try {
      FirebaseService.ListenFirebaseChanges(firebaseMachineConnections[i], factoryIOMachineModels[i], handleFirebaseChanges);
      ListenModbusChanges(firebaseMachineConnections[i], factoryIOMachineModels[i]);  
    } catch(error) {
      console.log("Error with setting up listeners");
      throw new Error(error);
    }
  }
}


function ListenModbusChanges(firebaseMachineConnection, factoryIOMachine) {
  setInterval(function() {
    ModbusService.ReadFromModbus(factoryIOMachine).then((pollResponse) => {
      let newValues = checkForChanges(factoryIOMachine.getSensorValues(), toFirebaseModel(factoryIOMachine.sensorOffset, pollResponse), factoryIOMachine.sensorOffset);
      
      if (newValues)
      {
        try {
          console.log("New values detected in Modbus");
          console.log(newValues);
          factoryIOMachine.setSensorValues(newValues);
          firebaseModel = factoryIOMachine.toFirebaseModel();
          firebaseModel.lastModified = GetCurrentDateTime();
          FirebaseService.updateMachine(firebaseModel, firebaseMachineConnection);  
        } catch (error) {
          console.log("Error attempting to send modbus changes");
          throw new Error(error);
        }
      }
    });
  }, pollFrequency);
};

function checkForChanges(currentSensorValues, newSensorValues, sensorOffset)
{
  let sensorCount = Object.keys(currentSensorValues).length;

  let sensorChangeFound = false;
  for (let i = 0; i < sensorCount; i++) {
    const currentValue = newSensorValues[i+sensorOffset];
    if (currentValue !== currentSensorValues[i+sensorOffset]) {
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

function toFirebaseModel(sensorOffset, pollResponse)
{
  let newSensorValues = {}
  for (let i = 0; i < pollResponse.length; i++)
  {
    newSensorValues[sensorOffset + i] = pollResponse[i];
  }
  return newSensorValues;
}

function handleFirebaseChanges(updatedValues, FactoryIOModel) {
  console.log("Firebase values changed");
  FactoryIOModel.toModbusModel(updatedValues.val());
  FactoryIOModel.validateModel();
  FactoryIOModel.lastModified = GetCurrentDateTime();
  ModbusService.WriteToModbus(FactoryIOModel);
}

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

function gracefulTerminate(error)
{
  console.log("Something bad happened. Terminating process");
  for (let i = 0; i < firebaseMachineConnections.length; i++)
  {
    factoryIOMachineModels[i].toClearValuesModel();
    let firebaseModel = factoryIOMachineModels[i].toFirebaseModel();
    FirebaseService.updateMachine(firebaseModel, firebaseMachineConnections[i]); 
  }
}

function handleError(type) {
  return (error) => {
    console.error(`Received ${type}. Logging error and performing cleanup...`);
    console.error(error);
    gracefulTerminate();
    process.exit(1);
  };
}

process.on('SIGINT', () => {
  gracefulTerminate();
  process.exit(1);
});

process.on('uncaughtException', handleError("Uncaught Exception"));
process.on('unhandledRejection', handleError("Uncaught Exception"));

Setup();