let testPLCMachine = {
    name: "testPLCMachine",
    sensors: {
        sensorone: {
            name: "sensorone",
            value: 0,
            register: 0
        },
        sensortwo: {
            name: "sensortwo",
            value: 0,
            register: 1
        },
        sensorthree: {
            name: "sensorthree",
            value: 0,
            register: 2
        },
        sensorfour: {
            name: "sensorfour",
            value: 0,
            register: 3
        }
    },
    coils: {
        coilone: {
            name: "coilone",
            value: 0,
            register: 0
        },
        coiltwo: {
            name: "coiltwo",
            value: 0,
            register: 1
        },
        coilthree: {
            name: "coilthree",
            value: 0,
            register: 2
        },
        coilfour: {
            name: "coilfour",
            value: 0,
            register: 3
        }
    }
};

module.exports = testPLCMachine;