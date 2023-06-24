let base = {
    sensors: {},
    coils: {},
    lastModified: "",
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

function getMachine(machineName) {
    console.log("Getting " + machineName);
    const machineModelImport = require("./" + machineName);
    return {...base, ...machineModelImport};
}

module.exports = getMachine;