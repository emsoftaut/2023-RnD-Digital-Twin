# 2023-RnD-Digital-Twin

## Introduction

This solution is the 2023 AUT Final Year project for BCIS team 'Jadcup Digital Twin'.

Our Team Members as follows:
* Jane Jung
* Myles Hosken
* Yeran Edmonds
* Joshua Ladowsky
* Harshil Patel

This is a full digital solution for a website dashboard that connects to, and manipulates factory machines and their controllers.
This project is broken into multiple parts.

* **Frontend** : This is the website dashboard that contains the running information and sends data directly to the factories. 
* **Firebase** : This holds the key data used for the dashboard and the factory controllers.
* **Middleware** : Maintains the connection and data transfer between firebase and the factory controllers.
* **Factory Controllers**
This is logic controller code for how a factory runs. Data set on the frontend is sent through firebase, through the middleware, and received here to control how the factory operates
* **Factory Floor** : As part of the deliverables of this project, we have included FactoryIO scenes to represent digital twins of the Jadcup factory floor.


## Installation Guide
This solution includes multiple components that each require individual installation.

### Frontend Website

### Firebase

### Middleware

Middleware requires to major steps before it is configured.
1. Setting up the Configuration.
2. Mapping Factory Controller inputs/outputs.


#### 1. Setting up the Configuration
The configuration for this is saved in the middleware/config folder as LocalEnvConfig.js

The config requires the connection variables of the destination device, credentials for logging into firebase, and the set of current machines for which we import their models.

```
const localConfig = {
    IP: "192.168.1.10",
    port: 502,
    email: "admin", // Email address used to log into Firebase 
    password: "root", // Password used to log into Firebase
    initOffset: 0, // Initial offset for the modbus addresses
    machineOffset: 0, // Individual
    machines: {
        machine1: {
            machineID: "Arduino1", // ID as it will appear in Firebase
            machineName: "Arduino/ArduinoTest" // The path of the machine model we import, which maps values to registers.
        },
        machine2: {
            machineID: "0002-Jadcup",
            machineName: "PLC/jadcupSimulationPLC"
        }
    }
};
module.exports = localConfig;
```

#### 2. Mapping Factory Controller inputs/outputs.
Mappings are saved in middleware/models, and are used to map registers/value locations to values, for ease of use on the frontend.
For example, the following

```
let testMachine = {
    name: "testMachine",
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
        machineStatus: {
            value: false,
            register: 0,
            valueType: "BIT"
        }        
    }
}

// Return an instance so we can run more than one copy of the same machine
module.exports = function createModelInstance() {
    return JSON.parse(JSON.stringify(testMachine));
};
```

The middleware handles listening to firebase changes, listening to factory controller changes, and syncing the data between the two.
It does this by mapping inputs received by firebase and the factory controller, and translating between the two.

For example, on firebase we may have values for whether a machine is running, and how many jobs are queued.
The factory controller doesn't care about the name of the value, it just sees this information as bools and bytes. So we map 'isRunning' to a bit, at a specific register, then send that via modbus to the factory controller.

The same happens in reverse. When a factory has a set amount of jobsDone, it saves this as an int, with no further information. That gets polled by the middleware modbus service, saved to a value, then uploaded to firebase.

**NOTE:** Because of how factory controllers work, we have defined dashboard Input (user-modifiable data) as coils, and defined dashboard Output(read-only data) as sensors. 

* ***Coils***
    * Modifiable by Web dashboard.
    * Read-only to the Factory Controller.
* ***Sensors***
    * Read-only by the Web dashboard.
    * Modifiable by the Factory Controller.


### Factory Controller
This project uses OpenPLC to both create and run PLC Structured text files for controlling factories.

In order to use the structured text files in this project correctly, you'll need to install the OpenPLC Runtime. Follow the given instructions here:
https://openplcproject.com/docs/installing-openplc-runtime-on-windows/

If you want to install and create your own structured text files
https://openplcproject.com/docs/installing-openplc-editor/

Once you have your structured text file, you can load up the structured text files in the ExternalFiles/OpenPLC folder.

Before you run your program, you will need to have your Factory environment set up. In this project. We set FactoryIO as a slave device. Make sure you set it as a slave device, starting from the input address '100'. Also make sure to use your localhost or your current IP, and port 503 for FactoryIO (FactoryIO uses port 502 as a client and 503 as a server).

From there, OpenPLC should be ready to go.
**Note:** OpenPLC Runtime will need to start running AFTER you have set up your factory.

### Factory Environment
This project uses FactoryIO to simulate the factory.

**Note**: You will need either a Modbus licence or an Ultimate licence in order to use Factory IO for this project. Otherwise, it will not work.

Please follow the installation guide here:
https://docs.factoryio.com/installing/

Once you have done this, you can load the FactoryIO scenes from ExternalFiles/FactoryIO.

Once you have it loaded, you will need to set FactoryIO to a Modbus TCP Server. this can be done in the top left file -> drivers.
After that, the configuration should be set. You can turn your factory on.

## Components

## User Authentication

## Main Functionalities

## FAQ

## Glossary
