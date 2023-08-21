const Modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);
let offset;

console.log("Connecting to modbus");

function SetupModbus(ip, IOport, inputOffset)
{
  offset = inputOffset;
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
}

function WriteToModbus(FactoryIOMachineModel)
{
  let coils = FactoryIOMachineModel.coils;

    try {
    for (let coil of Object.values(coils))
    {
      if (coil.valueType == "BYTE")
      {
        client.writeSingleRegister(coil.register, coil.value);
      }
      else {
        client.writeSingleCoil(coil.register, coil.value);
      }
    }
  }
    catch (error) {
      console.log("Error occurred Writing Coils");
      HandleModbusError(error);
    }
  }
  
async function ReadFromModbus(sensorCount)
{
  try {
    const modbusDisResp = await client.readDiscreteInputs(offset, sensorCount);
    const modbusDiscrete = modbusDisResp.response.body.valuesAsArray;
    const modbusRegResp = await client.readInputRegisters(offset, sensorCount);
    const modbusRegisters = modbusRegResp.response.body.valuesAsArray;

    let modbusResponse = modbusDiscrete;
    for (let i = 0; i < sensorCount; i++)
    {
      if (modbusRegisters[i] > modbusDiscrete[i])
      {
        modbusResponse[i] = modbusRegisters[i];
      }
    }

    return modbusResponse;
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
  ReadFromModbus,
  SetupModbus
};