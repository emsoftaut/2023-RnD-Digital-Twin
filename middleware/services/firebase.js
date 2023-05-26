const fb = require("firebase/compat/app");
require("firebase/compat/database");
const dbconfig = require("../config/config");
const dbSchema = require("../config/schema");

fb.initializeApp(dbconfig);
const db = fb.database();

console.log("Connected to Realtime Database: " + dbSchema.getPath());

function getMachine(machineID = null) {
    if (!machineID)
    {
            return db.ref(dbSchema.getPath());
    } else {
            return  db.ref(dbSchema.getPath() + machineID);
    }
}

function setMachine(machine, dbref) {
    throw new Error("Set Machine unhandled");
}

function updateMachine(machine, dbref) {
    throw new Error("Update Machine unhandled");
    dbref.update(machine);
}

module.exports = {
    getMachine,
    setMachine,
    updateMachine
};