const localConfig = {
    IP: "TESTIP",
    port: 0,
    email: "test@example.com",
    password: "testpassword",
    machineName: "testMachine",
    scene: "testScene",
    initOffset: 80,
    machineOffset: 10,
    machines: {
        machine1: {
            machineID: "0001-Jadcup",
            machineName: "jadcupSimulationPLC"
        },
        machine2: {
            machineID: "0002-Jadcup",
            machineName: "jadcupSimulationPLC"
        }
    }
};

module.exports = localConfig;