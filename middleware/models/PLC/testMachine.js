let testMachine = {
    name: "testMachine",
    coils: {
        beltSpeed: {
            value: 0,
            register: 2,
            valueType: "BYTE"
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
        //jobsStarted: {
        //    value: 0,
        //    register: 0,
        //    valueType: "BIT"
        //},
        machineStatus: {
            value: false,
            register: 0,
            valueType: "BIT"
        },
        temperature: {
            value: false,
            register: 2,
            valueType: "BIT"
        }        
    }
}


module.exports = function createModelInstance() {
    return JSON.parse(JSON.stringify(testMachine));
};