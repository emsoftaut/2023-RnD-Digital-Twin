let jadcupSimulationPLC = {
    name: "jadcupSimulationPLC",
    coils: {
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
    }
}


module.exports = function createModelInstance() {
    return JSON.parse(JSON.stringify(jadcupSimPLC));
};