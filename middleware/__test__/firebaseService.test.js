jest.mock('../config/LocalEnvConfig');

const FirebaseService = require("../services/FirebaseService");
const localConfig = require("../config/LocalEnvConfig");
const getFactoryIOMachineModel = require("../models/baseMachine.js");

describe("Friebase Service testing", () => {
  it("Logs into Firebase", () => {
    FirebaseService.setupFirebase(localConfig.email, localConfig.password);
  });
  describe("verify record reciving", () => {
    it("Correctly acknowledges that a null machine has been passed in Get Machine Record", () => {
      const logSpy = jest.spyOn(global.console, "log");
      FirebaseService.getMachineRecord();
      expect(logSpy).toHaveBeenCalledWith(
        "Machine passed is null. Returning database"
      );
    });
    it("correctly acknowledge that a machine has been passed and ID is correct", () => {

      const logSpy = jest.spyOn(global.console, "log");
      let machine = localConfig.machines.machine1;
      let machineModel = getFactoryIOMachineModel(machine.machineName, 1, 1);
      machineModel.machineID = machine.machineID;

      FirebaseService.getMachineRecord(machine, machineModel);

      expect(logSpy).toHaveBeenCalledWith("Getting jadcupSimulationPLC");
      expect(logSpy).toHaveBeenCalledWith(
        "Getting machine from firebase: factory_io/data/0001-Jadcup"
      );
    });
  });
});
