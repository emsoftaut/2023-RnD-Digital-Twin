let jadcupSimulationPLC = {
	name: "jadcupSimulationPLC",
	coils: {
		jobsQueued: {
			value: 0,
			register: 1,
			valueType: "BYTE",
		},
		override: {
			value: false,
			register: 2,
			valueType: "BIT",
		},
	},
	sensors: {
		jobsStarted: {
			value: 0,
			register: 0,
			valueType: "BYTE",
		},
		jobsDone: {
			value: 0,
			register: 1,
			valueType: "BYTE",
		},
		running: {
			value: 0,
			register: 2,
			valueType: "BIT",
		},
		WaterLevel: {
			value: 0,
			register: 3,
			valueType: "BYTE",
		},
		totalWeight: {
			value: 0,
			register: 4,
			valueType: "BYTE",
		},
	},
};

module.exports = function createModelInstance() {
	return JSON.parse(JSON.stringify(jadcupSimulationPLC));
};
