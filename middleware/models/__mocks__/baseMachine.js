let machineMock = {
    coils: {
        running: {
            value: true,
            register: 0,
            valueType: "BIT"
        },
        jobsQueued: {
            value: 10,
            register: 1,
            valueType: "BYTE"
        },
        beltSpeed: {
            value: 5,
            register: 2,
            valueType: "BYTE"
        }
    }
  };

  function getMachine(machineName) {
    return machineMock;
}
  
  module.exports = getMachine;