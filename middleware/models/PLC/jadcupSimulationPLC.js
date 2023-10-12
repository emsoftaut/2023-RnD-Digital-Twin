let jadcupSimulationPLC = {
	name: "jadcupSimulationPLC",
	coils: {
		jobsQueued: {
			value: 0,
			register: 1,
			valueType: "BYTE",
			variableType: "i"
		},
		override: {
			value: false,
			register: 2,
			valueType: "BIT",
			variableType: "b"
		},
		estop: {
			value: false,
			register: 3,
			valueType: "BIT",
			variableType: "b"
		}
	},
	sensors: {
		jobsStarted: {
			value: 0,
			register: 0,
			valueType: "BYTE",
			variableType: "i"
		},
		jobsDone: {
			value: 0,
			register: 1,
			valueType: "BYTE",
			variableType: "i"
		},
		running: {
			value: false,
			register: 2,
			valueType: "BIT",
			variableType: "b"
		},
		waterLevel: {
			value: 0,
			register: 3,
			valueType: "BYTE",
			variableType: "f"
		},
		totalWeight: {
			value: 0,
			register: 4,
			valueType: "BYTE",
			variableType: "f"
		},
		averageSpeed: {
			value:0,
			register:5,
			valueType: "BYTE",
			variableType: "f"
		}
	},
	validateModel: function() {
		if ((this.coils.jobsQueued > 0) && (this.override == true))
		{
			console.log("Validation failed");
			this.error = { error: "Jobs cannot start until machine has started running"};
		}

		if (this.sensors.jobsDone > this.sensors.jobsStarted)
			this.error = { error: "Jobs done exceeds jobs started."};
    }
};

module.exports = function createModelInstance() {
	return JSON.parse(JSON.stringify(jadcupSimulationPLC));
};
