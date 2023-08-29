const callbacks = {};

const socketMock = {
    connect: jest.fn(),
    on: jest.fn((event, callback) => {
      callbacks[event] = callback;
      if (event === 'connect')
      {
        callback();
      } else if (event =='close')
      {
        callback();
      }
    }),
    triggerEvent: function(event, ...args) {
        if (callbacks[event]) {
          callbacks[event](...args);
        }
      }
  };
  
  module.exports = {
    Socket: jest.fn(() => socketMock)
  };