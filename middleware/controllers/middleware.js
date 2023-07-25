const FirebaseService = require("../services/FirebaseService.js");
const map = require("../services/mapper");
const getFactoryIOMachineModel = require("../models/baseMachine.js");
const ModbusService = require("../services/ModbusService.js");
const LocalConfig = require("../config/LocalEnvConfig.js");

const machines = LocalConfig.machines;

let factoryIOMachineModels = [];
let firebaseMachineConnections = [];


const pollFrequency = 10;

function Setup() {
  FirebaseService.setupFirebase().then(() => {
    SetupModelsAndConnections(machines);
    SetupListeners();

    //ListenModbusChanges();
  
    //setInterval(function() {
    //  ModbusService.WriteToModbus(FactoryIOMachineModel);
    //}, pollFrequency);  
  });
}

function SetupModelsAndConnections(machines)
{
  let counter = 0;
  for (const key in machines) {
    let machineModel = getFactoryIOMachineModel(machines[key].machineName);
    factoryIOMachineModels.push(machineModel);
    factoryIOMachineModels[counter].machineID = key;

    let machineRecord = FirebaseService.getMachineRecord(machines[key], factoryIOMachineModels[counter]);
    firebaseMachineConnections.push(machineRecord);
    counter++;
  }
}

function SetupListeners()
{
  for (let i = 0; i < firebaseMachineConnections.length; i++)
  {
    FirebaseService.ListenFirebaseChanges(firebaseMachineConnections[i], factoryIOMachineModels[i], handleFirebaseChanges);
  }
}

function handleFirebaseChanges(updatedValues, FactoryIOModel, FirebaseConnection) {
  map(updatedValues.val(), FactoryIOModel);
  FactoryIOModel.lastModified = GetCurrentDateTime();

  testFunction(FactoryIOModel, FirebaseConnection);
}

function testFunction(FactoryIOModel, FirebaseConnection)
{
  FactoryIOModel.sensors.machineStatus = FactoryIOModel.coils.running ? "ON" : "OFF";
  FirebaseService.updateMachine(FactoryIOModel.getAnemicModel(), FirebaseConnection);
  console.log("Updated machine " + FactoryIOModel.machineID + " Successfully");
}

function ListenModbusChanges() {
  setInterval(function() {
    ModbusService.ReadFromModbus(FactoryIOMachineModel).then((pollResponse) => {
      if (pollResponse)
      {
        console.log("Poll response found:" + pollResponse);
        pollResponse.lastModified = GetCurrentDateTime();
        FirebaseService.updateMachine(pollResponse, FirebaseMachineConnection);
      }
    });
  }, pollFrequency);
};

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

Setup();