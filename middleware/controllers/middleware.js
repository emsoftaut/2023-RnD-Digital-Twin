const FirebaseService = require("../services/FirebaseService.js");
const map = require("../services/mapper");
const getFactoryIOMachineModel = require("../models/baseMachine.js");
const ModbusService = require("../services/ModbusService.js");
const LocalConfig = require("../config/LocalEnvConfig.js");

// Get the name of the machine from command line argument
// command line arguments are currently handled in middleware/package.json

let machine1 = LocalConfig.machines.machine1;
let machine2 = LocalConfig.machines.machine2;

const pollFrequency = 10;
let FactoryIOMachineModel1;
let FactoryIOMachineModel2;
let FirebaseMachineConnection1;
let FirebaseMachineConnection2;

function Setup() {
  FactoryIOMachineModel1 = getFactoryIOMachineModel(machine1.machineName);
  FactoryIOMachineModel2 = getFactoryIOMachineModel(machine2.machineName);

  FirebaseService.setupFirebase().then(() => {
    console.log("Database connected");
    FirebaseMachineConnection1 = FirebaseService.getMachineRecord(machine1, FactoryIOMachineModel1);
    FirebaseMachineConnection2 = FirebaseService.getMachineRecord(machine2, FactoryIOMachineModel2);

    console.log("Machine Setup at " + GetCurrentDateTime());
    console.log("Starting listeners");
    FirebaseService.ListenFirebaseChanges(FirebaseMachineConnection1, FactoryIOMachineModel1, handleFirebaseChanges);
    FirebaseService.ListenFirebaseChanges(FirebaseMachineConnection2, FactoryIOMachineModel2, handleFirebaseChanges);

    //ListenModbusChanges();
  
    //setInterval(function() {
    //  ModbusService.WriteToModbus(FactoryIOMachineModel);
    //}, pollFrequency);  
  });
}

function handleFirebaseChanges(updatedValues, FactoryIOModel, FirebaseConnection) {
  console.log(updatedValues.val());
  map(updatedValues.val(), FactoryIOModel);
  FactoryIOModel.lastModified = GetCurrentDateTime();
  console.log(FactoryIOModel)

  testFunction(FactoryIOModel, FirebaseConnection);
}

function testFunction(FactoryIOModel, FirebaseConnection)
{
  FactoryIOModel.sensors.machineStatus = FactoryIOModel.coils.running ? "ON" : "OFF";
  FirebaseService.updateMachine(FactoryIOModel.getAnemicModel(), FirebaseConnection);
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