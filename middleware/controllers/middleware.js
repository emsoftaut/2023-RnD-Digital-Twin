const FirebaseService = require("../services/FirebaseService.js");
const map = require("../services/mapper");
const getFactoryIOMachineModel = require("../models/middleware/baseMachine");
const ModbusService = require("../services/ModbusService.js");

// Get the name of the machine from command line argument
// command line arguments are currently handled in middleware/package.json
let MachineName = process.argv[2];

const pollFrequency = 10;
let FactoryIOMachineModel;
let FirebaseMachineConnection



function Setup() {
  FactoryIOMachineModel = getFactoryIOMachineModel(MachineName);

  FirebaseService.setupFirebase().then(() => {
    console.log("Database connected");
    FirebaseMachineConnection = FirebaseService.getMachineRecord(MachineName, FactoryIOMachineModel);

    console.log("Machine Setup at " + GetCurrentDateTime());
    console.log("Starting listeners");
    ListenFirebaseChanges();
    ListenModbusChanges();
  
    setInterval(function() {
      ModbusService.WriteToModbus(FactoryIOMachineModel);
    }, pollFrequency);  
  });
}

function ListenFirebaseChanges()
{
  FirebaseMachineConnection.on('value', (updatedValues) => {
    console.log(updatedValues.val());
    map(updatedValues.val(), FactoryIOMachineModel);
    FactoryIOMachineModel.lastModified = GetCurrentDateTime();
    });
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