jest.mock('net');
jest.mock('jsmodbus');

const { 
    SetupModbus,
    ReadFromModbus} 
        = require('../../services/ModbusService');
const net = require('net');
const Modbus = require('jsmodbus');

console.log(Modbus);

describe('Modbus Service', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    net.Socket.mockClear();
    Modbus.client.TCP.mockClear();
  });

  it('should set up Modbus with given IP, Port, and Offset', () => {
    const ip = '192.168.1.1';
    const port = 502;
    const offset = 10;

    SetupModbus(ip, port, offset);

    expect(net.Socket().connect).toHaveBeenCalledWith({ host: ip, port: port });
  });

  it('should handle "connect" event correctly', () => {
    const ip = '192.168.1.1';
    const port = 502;
    const offset = 10;

    console.log = jest.fn();

    SetupModbus(ip, port, offset);

    expect(console.log).toHaveBeenCalledWith('Connected to Modbus server on ' + ip + ": " + port);
  });

  it('should handle "error" event correctly', () => {
    const ip = '192.168.1.1';
    const port = 502;
    const offset = 10;
    const mockError = 'Test error';

    console.error = jest.fn();

    SetupModbus(ip, port, offset);

    net.Socket().triggerEvent('error', mockError);

    expect(console.error).toHaveBeenCalledWith("Error:", mockError);
  });

  it('should handle "close" event correctly', () => {
    const ip = '192.168.1.1';
    const port = 502;
    const offset = 10;

    console.log = jest.fn();

    SetupModbus(ip, port, offset);

    net.Socket().triggerEvent('close');

    expect(console.log.mock.calls[1][0]).toBe("Connection closed.");
  });

  it('should handle "readFromModbus" correctly', async () => {
    const result = await ReadFromModbus(4);

    expect(result).toEqual([3, 1, 3, 1]);
  });
});