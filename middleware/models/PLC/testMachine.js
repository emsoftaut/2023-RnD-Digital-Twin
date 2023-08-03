let testMachine = {
    name: "testMachine",
    machineID: "",
    coils: {
        beltSpeed: {
            value: true,
            register: 82
        },
        jobsQueued: {
            value: true,
            register: 81
        },
        running: {
            value: true,
            register: 80
        }
    },
    sensors: {
        jobsDone: {
            value: true,
            register: 82
        },
        machineStatus: {
            value: false,
            register: 80
        },
        temperature: {
            value: true,
            register: 81
        }        
    }
}

module.exports = testMachine;