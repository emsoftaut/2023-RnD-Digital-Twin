jest.mock('net');
jest.mock('jsmodbus');
jest.mock('baseMachine');

const { 
    SetupModbus,
    ReadFromModbus,
    WriteToModbus}
        = require('../../services/ModbusService');
const net = require('net');
const Modbus = require('jsmodbus');
const getMachine = require('baseMachine');
const machineMock = getMachine("");
const clientMock = Modbus.client.TCP();

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

  it('should receive the correct "readFromModbus" result', async () => {
    const expectedResult = [3, 1, 3, 1];
    const actualResult = await ReadFromModbus(machineMock);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle "writeToModbus" with correct calls to coils and registers', async () => {
    WriteToModbus(machineMock)

    expect(clientMock.writeSingleCoil).toHaveBeenCalledWith(0, true);
    expect(clientMock.writeSingleRegister.mock.calls[0][0]).toBe(1, 10);
    expect(clientMock.writeSingleRegister.mock.calls[1][0]).toBe(2, 5);        
    
    // Coils and Registers are defined in models/machineMock
  });



});