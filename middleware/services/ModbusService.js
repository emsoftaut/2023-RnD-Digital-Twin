const Modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);

const localIP0 = '172.29.15.197';
const localIP1 = '192.168.1.132';
const localIP2 = 'localhost';
const localIP3 = '120.0.0.1';
const localIP4 = 'LOCAL';

const port1 = 502;
const port2 = 61561;
//const ip = '172.29.15.197';
//const ip = '192.168.1.132';
const ip = localIP1;
const IOport = port1;

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
  let coils = FactoryIOMachineModel.coils;
  for (let coil of Object.values(coils))
  {
    client.writeSingleCoil(coil.register, coil.value)
    .catch((error) => {
      console.log("Error occurred Writing Coils");
      HandleModbusError(error);
    });
  }
}

async function ReadFromModbus(FactoryIOMachineModel)
{
  try {
    sensorCount = Object.keys(FactoryIOMachineModel.sensors).length;

    sensorValues = FactoryIOMachineModel.getSensorValues();
  
    const response = await client.readDiscreteInputs(0, sensorCount);
    let sensorChangeFound = false;
      for (let i = 0; i < sensorCount; i++) {
        const currentValue = response.response.body.valuesAsArray[i];
        if (currentValue !== sensorValues[i]) {
          sensorChangeFound = true;
          console.log(`Sensor ${i} changed: ${currentValue}`);
          sensorValues[i] = currentValue;
          FactoryIOMachineModel.setSensorValues(sensorValues);
        }
      }
    if (sensorChangeFound)
    {
      console.log("Returning values");
      return FactoryIOMachineModel.getAnemicModel();
    }
  } catch (error) {
    console.log("Error occurred reading from sensors");
    HandleModbusError(error);
  }

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