const clientMock = {
    readDiscreteInputs: jest.fn().mockResolvedValue({
        response: {
            body: {
                valuesAsArray: [0, 1, 0, 1]
            }
        }
    }),
    readInputRegisters: jest.fn().mockResolvedValue({
        response: {
            body: {
                valuesAsArray: [3, 0, 3, 0]
            }
        }
    }),
    writeSingleRegister: jest.fn().mockResolvedValue({
        response:{
            body:{
                valuesAsArray: [0, 1, 0, 1]
            }
        }
    }),
    writeSingleCoil: jest.fn().mockResolvedValue({
        response:{
            body:{
                valuesAsArray: [3, 0, 3, 0]
            }
        }
    }),
}


module.exports = {
    client: {
      TCP: jest.fn(() => clientMock)
    }
  };