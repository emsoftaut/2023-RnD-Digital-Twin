let jadcupMachine = {
    name: "jadcupMachine",
    sensors: {
        FactoryIOPaused: {
            name: "FactoryIOPaused",
            value: 0,
            register: 0
        },
        FactoryIOReset: {
            name: "FactoryIOReset",
            value: 0,
            register: 1
        },
        FactoryIORunning: {
            name: "FactoryIORunning",
            value: 0,
            register: 2
        },
        RetroflectiveSensor5: {
            name: "RetroflectiveSensor5",
            value: 0,
            register: 3
        },
        CapacitiveSensor5: {
            name: "CapacitiveSensor5",
            value: 0,
            register: 4
        },
        ConveyorScale5: {
            name: "ConveyorScale5",
            value: 0,
            register: 5
        }
    },
    coils: {
        BeltConveyor2m0: {
            name: "BeltConveyor2m0",
            value: 0,
            register: 0
        },
        BeltConveyor2m5: {
            name: "BeltConveyor2m5",
            value: 0,
            register: 1
        },
        BeltConveyor4m5: {
            name: "BeltConveyor4m5",
            value: 0,
            register: 2
        },
        Tank0Fill: {
            name: "Tank0Fill",
            value: 0,
            register: 3
        },
        Tank5Fill: {
            name: "Tank5Fill",
            value: 0,
            register: 4
        },
        Tank0Discharge: {
            name: "Tank0Discharge",
            value: 0,
            register: 5
        },
        Tank5Discharge: {
            name: "Tank5Discharge",
            value: 0,
            register: 6
        }
    }
};

module.exports = jadcupMachine;