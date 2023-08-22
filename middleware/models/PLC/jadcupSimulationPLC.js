let jadcupSimulationPLC = {
	name: "jadcupSimulationPLC",
	coils: {
		jobsQueued: {
			value: 0,
			register: 1,
			valueType: "BYTE",
		},
		override: {
			value: true,
			register: 2,
			valueType: "BIT",
		},
	},
	sensors: {
		jobsDone: {
			value: 0,
			register: 1,
			valueType: "BYTE",
		},
		jobsStarted: {
			value: 0,
			register: 0,
			valueType: "BYTE",
		},
		running: {
			value: 0,
			register: 2,
			valueType: "BIT",
		},
	},
};

module.exports = function createModelInstance() {
	return JSON.parse(JSON.stringify(jadcupSimulationPLC));
};
