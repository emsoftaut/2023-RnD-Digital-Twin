const fb = require("firebase/compat/app");
require("firebase/compat/database");
require('firebase/compat/auth');
const dbconfig = require("../config/FirebaseAuthConfig");
const dbSchema = require("../config/FirebaseSchema");
const localConfig = require("../config/LocalEnvConfig");


fb.initializeApp(dbconfig);
const db = fb.database();

function setupFirebase()
{
    return fb.auth().signInWithEmailAndPassword(localConfig.email, localConfig.password);
}

function getMachineRecord(machineID = null, machineFactoryIOHandler = null) {
    if (!machineID)
    {
            return db.ref(dbSchema.getPath());
    } else {
        let machineRecord = db.ref(dbSchema.getPath() + machineID);

        // Check if the machineRecord exists. If so, move on. If not, send the current model to firebase, then re-establish the connection
        machineRecord.once('value', function(snapshot) {
            if (snapshot.exists()) {
                console.log('Machine ' + machineID + ' record exists')
            } else {
                console.log("Machine doesn't exist, posting local model");
                database = getMachineRecord();
                machineToCommit = {};
                machineToCommit[machineID] = machineFactoryIOHandler.getAnemicModel();
                database.update(machineToCommit);
                machineFBRecord = getMachineRecord(machineID);
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
        console.log('Machine record updated successfully');
      }).catch((error) => {
        console.error('Error updating machine record:', error);
      });
}

module.exports = {
    getMachineRecord,
    setMachine,
    updateMachine,
    setupFirebase
};