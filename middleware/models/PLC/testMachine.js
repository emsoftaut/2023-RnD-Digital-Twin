let testMachine = {
    name: "testMachine",
    machineID: "",
    coils: {
        beltSpeed: {
            value: true,
            register: 2
        },
        jobsQueued: {
            value: true,
            register: 1
        },
        running: {
            value: true,
            register: 80
        }
    },
    sensors: {
        jobsDone: {
            value: true,
            register: 2
        },
        machineStatus: {
            value: false,
            register: 80
        },
        temperature: {
            value: true,
            register: 1
        }        
    }
}

module.exports = testMachine;