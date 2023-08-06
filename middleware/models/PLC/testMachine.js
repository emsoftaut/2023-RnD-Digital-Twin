let testMachine = {
    name: "testMachine",
    machineID: "",
    coils: {
        beltSpeed: {
            value: true,
            register: 82,
            valueType: "BIT"
        },
        jobsQueued: {
            value: true,
            register: 81,
            valueType: "BYTE"
        },
        running: {
            value: true,
            register: 80,
            valueType: "BIT"
        }
    },
    sensors: {
        jobsDone: {
            value: true,
            register: 81,
            valueType: "BYTE"
        },
        machineStatus: {
            value: false,
            register: 80,
            valueType: "BIT"
        },
        temperature: {
            value: true,
            register: 82,
            valueType: "BIT"
        }        
    }
}

module.exports = testMachine;