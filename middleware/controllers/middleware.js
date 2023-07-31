const FirebaseService = require("../services/FirebaseService.js");
const getFactoryIOMachineModel = require("../models/baseMachine.js");
const ModbusService = require("../services/ModbusService.js");
const localConfig = require("../config/LocalEnvConfig.js");

const machines = localConfig.machines;

let factoryIOMachineModels = [];
let firebaseMachineConnections = [];


const pollFrequency = 1000;

function Setup() {
  ModbusService.SetupModbus(localConfig.IP, localConfig.port)
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
    ModbusService.ReadFromModbus(factoryIOMachine).then((pollResponse) => {
      if (pollResponse)
      {
        pollResponse.lastModified = GetCurrentDateTime();
        FirebaseService.updateMachine(pollResponse, firebaseMachineConnection);
      }
    });
  }, pollFrequency);
};

function handleFirebaseChanges(updatedValues, FactoryIOModel, FirebaseConnection) {
  console.log("Firebase values changed");
  FactoryIOModel.toModbusModel(updatedValues.val());
  FactoryIOModel.lastModified = GetCurrentDateTime();
  ModbusService.WriteToModbus(FactoryIOModel);
}

function testFunction(FactoryIOModel, FirebaseConnection)
{
  FactoryIOModel.sensors.machineStatus = FactoryIOModel.coils.running ? "ON" : "OFF";
  FirebaseService.updateMachine(FactoryIOModel.toFirebaseModel(), FirebaseConnection);
  console.log("Updated machine " + FactoryIOModel.machineID + " Successfully");
}

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

Setup();