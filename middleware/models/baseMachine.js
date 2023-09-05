let base = {
    machineID: "",
    sensors: {},
    coils: {},
    lastModified: "",
    sensorOffset: 0,
    coilOffset: 0,
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
                    if (this.sensors[sensor].variableType == "f")
                        this.sensors[sensor].value = values[reg] / 100;
                    else if (this.sensors[sensor].variableType == "b")
                        this.sensors[sensor].value = Boolean(values[reg]);
                    else
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
            } else if (key == "sensorOffset" || key == "coilOffset") {
                continue;
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

function getMachine(machineName, sensorOffset, coilOffset) {
    console.log("Getting " + machineName);
    let machineModelImport = require("./PLC/" + machineName);
    let toReturnImport = machineModelImport();
    base.sensorOffset = sensorOffset;
    base.coilOffset = coilOffset;
    combinedMachine = {...base, ...toReturnImport};

    for (const key in toReturnImport.sensors)
    {
        toReturnImport.sensors[key].register += sensorOffset;
    }
    for (const key in toReturnImport.coils)
    {
        toReturnImport.coils[key].register += coilOffset;
    }

    return {...base, ...toReturnImport};
}

module.exports = getMachine;