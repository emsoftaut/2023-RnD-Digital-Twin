const Modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);

const ip = '172.29.15.197';
//const ip = '192.168.1.144';
const IOport = 502;
console.log("Connecting to modbus");

socket.on('connect', async () => {
    console.log('Connected to Factory I/O Modbus server on ' + ip + ": " + IOport);
});

socket.on('error', (error) => {
    console.error('Error:', error);
  });
  
socket.on('close', () => {
    console.log('Connection closed.');
  });

socket.connect({ host: ip, port: IOport });

module.exports = client;