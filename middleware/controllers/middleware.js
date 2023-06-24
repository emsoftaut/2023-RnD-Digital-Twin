const FirebaseService = require("../services/FirebaseService.js");
const map = require("../services/mapper");
const getFactoryIOMachineModel = require("../models/middleware/baseMachine");
const ModbusService = require("../services/ModbusService.js");

// Get the name of the machine from command line argument
// command line arguments are currently handled in middleware/package.json
let MachineName = process.argv[2];

const pollFrequency = 500;
let FactoryIOMachineModel;
let FirebaseMachineConnection


function Setup() {
  FactoryIOMachineModel = getFactoryIOMachineModel(MachineName);
  FirebaseMachineConnection = FirebaseService.getMachineRecord(MachineName, FactoryIOMachineModel);
  
  console.log("Machine Setup at " + GetCurrentDateTime());
  console.log("Starting listeners");
  ListenFirebaseChanges();
  ListenModbusChanges();
}

function ListenFirebaseChanges()
{
  FirebaseMachineConnection.on('value', (updatedValues) => {
    map(updatedValues.val(), FactoryIOMachineModel);
    FactoryIOMachineModel.lastModified = GetCurrentDateTime();
    ModbusService.WriteToModbus(FactoryIOMachineModel);
    });
}

function ListenModbusChanges() {
  setInterval(function() {
    var pollResponse = ModbusService.ReadFromModbus(FactoryIOMachineModel);
    if (pollResponse)
    {
      pollResponse.lastModified = GetCurrentDateTime();
      FirebaseService.updateMachine(pollResponse, FirebaseMachineConnection);
    }
  }, pollFrequency);
};

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

Setup();