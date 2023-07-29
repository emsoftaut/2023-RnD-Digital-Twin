const fb = require("firebase/compat/app");
require("firebase/compat/database");
require('firebase/compat/auth');
const dbconfig = require("../config/FirebaseAuthConfig");
const dbSchema = require("../config/FirebaseSchema");


fb.initializeApp(dbconfig);
const db = fb.database();

function setupFirebase(email, password)
{
    return fb.auth().signInWithEmailAndPassword(email, password);
}

function getMachineRecord(machine = null, machineModbusConnection = null) {
    if (!machine)
    {
        console.log ("Machine passed is null. Returning database");
        return db.ref(dbSchema.getPath());
    } else {
        let machineID = machine.machineID;
        console.log("Getting machine from firebase: " + dbSchema.getPath() + machineID);
        let machineRecord = db.ref(dbSchema.getPath() + machineID);

        // Check if the machineRecord exists. If so, move on. If not, send the current model to firebase, then re-establish the connection
        machineRecord.once('value', function(snapshot) {
            if (snapshot.exists()) {
                console.log('Machine ' + machineID + ' record exists')
            } else {
                console.log("Machine " + machineID + " doesn't exist, posting local model");
                database = getMachineRecord();
                machineToCommit = {};
                machineToCommit[machineID] = machineModbusConnection.toFirebaseModel();
                machineToCommit[machineID]["DateCreated"] = GetCurrentDateTime();
                machineToCommit[machineID]["machineID"] = machineID;
                database.update(machineToCommit);
                console.log("Machine successfully posted.");
            }});

        return db.ref(dbSchema.getPath() + machineID);
    }
}

function setMachine(machine, dbref) {
    throw new Error("Set Machine Not Implemented");
}

function updateMachine(values, dbref) {
    dbref.update(values).then(() => {
      }).catch((error) => {
        console.error('Error updating machine record:', error);
      });
}

function ListenFirebaseChanges(firebaseMachineConnection, FactoryIOMachineModel1, handleFirebaseChanges) {
    firebaseMachineConnection.on('value', updatedValues => {
        handleFirebaseChanges(updatedValues, FactoryIOMachineModel1, firebaseMachineConnection);
    });
}

function GetCurrentDateTime()
{
  var currentDateTime = new Date();
  return currentDateTime.toLocaleString() + " (NZT)";
}

module.exports = {
    getMachineRecord,
    setMachine,
    updateMachine,
    setupFirebase,
    ListenFirebaseChanges,
};