const Modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);

//const ip = '172.29.15.197';
const ip = '192.168.1.132';
const IOport = 502;
console.log("Connecting to modbus");

socket.connect({ host: ip, port: IOport });

socket.on('connect', async () => {
    console.log('Connected to Modbus server on ' + ip + ": " + IOport);
});

socket.on('error', (error) => {
    console.error('Error:', error);
  });
  
socket.on('close', () => {
    console.log('Connection closed.');
  });

function WriteToModbus(FactoryIOMachineModel)
{
  client.writeMultipleCoils(0, FactoryIOMachineModel.getCoilValues())
    .catch((error) => {
      console.log("Error occurred Writing Coils");
      HandleModbusError(error);
    });
}

function ReadFromModbus(FactoryIOMachineModel)
{
  sensorCount = Object.keys(FactoryIOMachineModel.sensors).length;

  sensorValues = FactoryIOMachineModel.getSensorValues();

  client.readDiscreteInputs(0, sensorCount).then((response) => {
    for (let i = 0; i < sensorCount; i++) {
      const currentValue = response.response.body.valuesAsArray[i];
      if (currentValue !== sensorValues[i]) {
        console.log(`Sensor ${i} changed: ${currentValue}`);
        sensorValues[i] = currentValue;
        FactoryIOMachineModel.setSensorValues(sensorValues);
        return FactoryIOMachineModel.getAnemicModel();
      }
    }
  }).catch((error) => {
    console.log("Error occurred reading from sensors");
    HandleModbusError(error);
  });
}

function HandleModbusError(error) {
  if (error.err == "Offline") {
    throw new Error(OfflineErrorMessage);
  } else {
    throw new Error(error.message)
  }
}

let OfflineErrorMessage = "ModbusService could not connect. Please make sure your scene is active, and you've chosen the correct port and IP in Modbus Service.\n";
OfflineErrorMessage += "If you are using FactoryIO, you can find your IP and Port in FactoryIO -> Drivers -> Configuration";

module.exports = {
  WriteToModbus,
  ReadFromModbus
};