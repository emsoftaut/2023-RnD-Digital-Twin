let base = {
    sensors: {},
    coils: {},
    getCoilValues: function() {
        Keys = Object.keys(this.coils);
        Values = [Keys.length];
        Keys.forEach((Key) => {
            Values[this.coils[Key].register] = this.coils[Key].value;
        });
        return Values;
    },
    setSensorValues: function(valueArray) {
        let counter = 0;
        Keys = Object.keys(this.sensors);
        Keys.forEach((Key) => {
            this.sensors[Key].value = valueArray[counter];
            counter++;
        });
    },
    getSensorValues: function() {
        Keys = Object.keys(this.sensors);
        Values = [Keys.length];
        Keys.forEach((Key) => {
            Values[this.sensors[Key].register] = this.sensors[Key].value;
        });
        return Values;
    },
    getAnemicModel: function() {
        const anemicModel = {};

        for (const key in this) {
            if (typeof this[key] !== 'function') {
                anemicModel[key] = this[key];
            }
          }
        
        return anemicModel;
    }
}

/*
function pollSensors() {
  modbusClient.readDiscreteInputs(0, 10).then((response) => {
    console.log(response.response.body.valuesAsArray);
    console.log(previousSensorValues);
    for (let i = 0; i < 10; i++) {
      const currentValue = response.response.body.valuesAsArray[i];
      if (currentValue !== previousSensorValues[i]) {
        console.log(`Sensor ${i + 0} changed: ${currentValue}`);
        previousSensorValues[i] = currentValue;
      }
    }
  }).catch((error) => {
    console.error('Error reading sensors:', error);
  });
};
*/

function getMachine(machineName) {
    const machineModelImport = require("./" + machineName);
    return {...base, ...machineModelImport};
}

module.exports = getMachine;