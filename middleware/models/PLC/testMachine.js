let testMachine = {
    name: "testMachine",
    machineID: "",
    coils: {
        beltSpeed: {
            value: true,
            register: 2,
            valueType: "BIT"
        },
        jobsQueued: {
            value: 0,
            register: 1,
            valueType: "BYTE"
        },
        running: {
            value: true,
            register: 0,
            valueType: "BIT"
        }
    },
    sensors: {
        jobsDone: {
            value: 0,
            register: 1,
            valueType: "BYTE"
        },
        jobsStarted: {
            value: 0,
            register: 0,
            valueType: "BYTE"
        },
        machineStatus: {
            value: false,
            register: 3,
            valueType: "BIT"
        },
        temperature: {
            value: true,
            register: 2,
            valueType: "BIT"
        }        
    }
}


module.exports = function createModelInstance() {
    return JSON.parse(JSON.stringify(testMachine));
};