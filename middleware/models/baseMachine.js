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
    setSensorValues: function(values) {
        for (const reg in values)
        {
            for (const sensor in this.sensors)
            {
                if (this.sensors[sensor].register == reg)
                {
                    this.sensors[sensor].value = values[reg];
                }
            }
        }
    },
    getSensorValues: function() {
        Keys = Object.keys(this.sensors);
        Values = {};
        Keys.forEach((Key) => {
            Values[this.sensors[Key].register] = this.sensors[Key].value;
        });
        return Values;
    },
    toFirebaseModel: function() {
        const anemicModel = {};
        for (const key in this) {
            if (key == "sensors" || key == "coils") 
            {
                anemicModel[key] = {};
                for (const bitValue in this[key]) 
                {
                    anemicModel[key][bitValue] = this[key][bitValue].value;
                }
            } else if (typeof this[key] !== 'function') {
                anemicModel[key] = this[key];
            }
        }
        return anemicModel;
    },
    toModbusModel: function(firebaseModel) {
        for (const key in this.coils)
        {
            this.coils[key].value = firebaseModel.coils[key];
        }
    }
}

function getMachine(machineName) {
    console.log("Getting " + machineName);
    const machineModelImport = require("./PLC/" + machineName);
    return {...base, ...machineModelImport};
}

module.exports = getMachine;