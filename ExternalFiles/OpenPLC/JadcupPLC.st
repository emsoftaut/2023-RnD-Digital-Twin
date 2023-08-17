PROGRAM JadcupPLC
  VAR
    M1BConeyor1 AT %QX100.0 : BOOL := FALSE;
    M1BConeyor2 AT %QX100.1 : BOOL := FALSE;
    M1BConeyor3 AT %QX100.2 : BOOL := FALSE;
    M1BConeyorCurve1 AT %QX100.3 : BOOL := FALSE;
    M1BConeyorCurve2 AT %QX100.4 : BOOL := FALSE;
    M1BConeyorIncline AT %QX100.5 : BOOL := FALSE;
    M1BConeyorScale1 AT %QX100.6 : BOOL := FALSE;
    M1Emitter AT %QX100.7 : BOOL := FALSE;
    M1Remover AT %QX101.0 : BOOL := FALSE;
    FactoryPause AT %QX101.1 : BOOL := FALSE;
    FactoryReset AT %QX101.2 : BOOL := FALSE;
    FactoryRun AT %QX101.3 : BOOL := FALSE;
    M1TankFillValve1 AT %QW100 : INT := 0;
    M1TankDrainValve1 AT %QW101 : INT := 0;
    M1TankFillValve2 AT %QW102 : INT := 0;
    M1TankDrainValve2 AT %QW103 : INT := 0;
    FactoryPaused AT %IX100.0 : BOOL := False;
    FactoryResetting AT %IX100.1 : BOOL := False;
    FactoryRunning AT %IX100.2 : BOOL := False;
    M1RetroflectiveSensor1 AT %IX100.3 : BOOL := False;
    M1RetroflectiveSensor2 AT %IX100.4 : BOOL := False;
    M1LightArray1 AT %IW101 : INT := 0;
    M1LightArray2 AT %IW102 : INT := 0;
    M1ConveyorScale AT %IW103 : INT := 0;
    M1TankFlowMeter1 AT %IW104 : INT := 0;
    M1TankLevelMeter1 AT %IW105 : INT := 0;
    M1TankFlowMeter2 AT %IW106 : INT := 0;
    M1TankLevelMeter2 AT %IW107 : INT := 0;
    M1CaptivitySensor AT %IW108 : INT := 0;
    M1JobsQueued AT %QW081 : INT := 0;
    M1JobsStarted AT %IW080 : INT := 0;
    M1JobsDone AT %IW081 : INT := 0;
    M1Running AT %QX01.1 : BOOL := false;
  END_VAR
  VAR
    M1JobStartedCheck : BOOL := false;
    M1JobDoneCheck : BOOL := false;
  END_VAR
  VAR
    M1MachineOverride AT %QX1.2 : BOOL := false;
    M2BConeyor1 AT %QX101.4 : BOOL := FALSE;
    M2BConeyor2 AT %QX101.5 : BOOL := FALSE;
    M2BConeyor3 AT %QX101.6 : BOOL := FALSE;
    M2BConeyorCurve1 AT %QX101.7 : BOOL := FALSE;
    M2BConeyorCurve2 AT %QX102.0 : BOOL := FALSE;
    M2BConeyorIncline AT %QX102.1 : BOOL := FALSE;
    M2BConeyorScale1 AT %QX102.2 : BOOL := FALSE;
    M2Emitter AT %QX102.3 : BOOL := FALSE;
    M2Remover AT %QX102.4 : BOOL := FALSE;
    M2TankFillValve1 AT %QW104 : INT := 0;
    M2TankDrainValve1 AT %QW105 : INT := 0;
    M2TankFillValve2 AT %QW106 : INT := 0;
    M2TankDrainValve2 AT %QW107 : INT := 0;
    M2RetroflectiveSensor1 AT %IX100.5 : BOOL := False;
    M2RetroflectiveSensor2 AT %IX100.6 : BOOL := False;
    M2LightArray1 AT %IW109 : INT := 0;
    M2LightArray2 AT %IW110 : INT := 0;
    M2ConveyorScale AT %IW111 : INT := 0;
    M2TankFlowMeter1 AT %IW112 : INT := 0;
    M2TankLevelMeter1 AT %IW113 : INT := 0;
    M2TankFlowMeter2 AT %IW114 : INT := 0;
    M2TankLevelMeter2 AT %IW115 : INT := 0;
    M2CaptivitySensor AT %IW116 : INT := 0;
    M2JobsQueued AT %QW091 : INT := 0;
    M2JobsStarted AT %IW090 : INT := 0;
    M2JobsDone AT %IW091 : INT := 0;
    M2Running AT %QX02.1 : BOOL := FALSE;
  END_VAR
  VAR
    M2JobStartedCheck : BOOL := FALSE;
    M2JobDoneCheck : BOOL := FALSE;
  END_VAR
  VAR
    M2MachineOverride AT %QX2.2 : BOOL := FALSE;
  END_VAR

  (* Code can only exicute if factoryIO is running*)
  IF FACTORYRUNNING THEN
    (*RESET JOB STARTED AND DONE VALUES WHEN THE FACTORY I/O RESET BUTTON IS PRESSED*)
      IF FACTORYRESETTING = TRUE THEN
        M1JOBSSTARTED := 0;
        M1JOBSDONE := 0;
        M2JOBSSTARTED := 0;
        M2JOBSDONE := 0;
        END_IF;
      
    (*START OF MACHINE 1 CODE*)
    
    (*if the machine isnt overridden and there are jobs to do the machine is running*)
    M1Running := AND((NOT M1MACHINEOVERRIDE), (M1JOBSQUEUED >M1JOBSDONE));

    IF M1RUNNING THEN
      (*if there are jobs to do start the factory*)
      IF M1JobsQueued > M1JOBSDONE then
        M1BCONEYOR1 := TRUE;
        M1BCONEYOR2 := true;
        M1BCONEYOR3 := true;
        M1BCONEYORCURVE1 := true;
        M1BCONEYORCURVE2 := true;
        M1BCONEYORINCLINE := true;
        M1BCONEYORSCALE1 :=true;
        M1EMITTER := TRUE;
        M1Remover := true;
        END_IF;
      (*if there are still pending jobs M1Emitter is on*)
      IF M1JobsStarted < M1JobsQueued then
        M1EMITTER := true;
        END_IF;
      (*turn off emitter when enough jobs have been started*)
      IF M1JOBSSTARTED = M1JobsQueued THEN
        M1EMITTER := FALSE;
        END_IF;
        
      (*M1Retroflectivesensor1 tracks new boxes entering the machine from the emitter*)
      IF (M1RETROFLECTIVESENSOR1 = false) AND (M1JOBSTARTEDCHECK = FALSE) then
        M1JOBSSTARTED := M1JOBSSTARTED + 1;
        M1JOBSTARTEDCHECK := TRUE;
        END_IF;
        
      (*RETROFLECTIVESENSOR2 tracts boxes leaving the machine into the remover*)
      IF (M1RETROFLECTIVESENSOR2 = false) AND (M1JOBDONECHECK = FALSE) THEN
        M1JOBSDONE := M1JOBSDONE +1;
        M1JOBDONECHECK := TRUE;
        END_IF;
        
      (*RESET JOBS STARTED CHECK IF SENSOR ISNT TRIGGERED*)
      IF M1RETROFLECTIVESENSOR1 = TRUE then
        M1JOBSTARTEDCHECK :=FALSE;
        END_IF;
      (*RESET JOBS DONE CHECK IF SENSOR ISNT TRIGGERED*)
      IF M1RETROFLECTIVESENSOR2 = TRUE then
        M1JOBDONECHECK := FALSE;
        END_IF;
    ELSE
      M1BCONEYOR1 := false;
      M1BCONEYOR2 := false;
      M1BCONEYOR3 := false;
      M1BCONEYORCURVE1 := FALSE;
      M1BCONEYORCURVE2 := FALSE;
      M1BCONEYORINCLINE := FALSE;
      M1BCONEYORSCALE1 :=FALSE;
      M1REMOVER := false;
      M1EMITTER :=FALSE;
      END_IF;
    
    (*END OF MACHINE 1 CODE  *)
    (*-----------------------*)
    (*START OF MACHINE 2 CODE*)
    
    (*if the machine isnt overriddin and there are jobs to do the machine is running*)
    M2Running := AND((NOT M2MACHINEOVERRIDE), (M2JOBSQUEUED >M2JOBSDONE)); 
    
    IF M2RUNNING THEN
      (*if there are jobs to do start the factory*)
      IF M2JobsQueued > M2JOBSDONE then
        M2BCONEYOR1 := TRUE;
        M2BCONEYOR2 := true;
        M2BCONEYOR3 := true;
        M2BCONEYORCURVE1 := true;
        M2BCONEYORCURVE2 := true;
        M2BCONEYORINCLINE := true;
        M2BCONEYORSCALE1 :=true;
        M2EMITTER := TRUE;
        M2REMOVER  :=TRUE;
        END_IF;
      (*if there are still pending jobs M2Emitter is on otherwise turn off*)
      IF M2JobsStarted < M2JobsQueued then
        M2EMITTER := true;
        ELSE
        M2EMITTER := FALSE;
        END_IF;

      (*M2Retroflectivesensor1 tracks new boxes entering the machine from the emitter*)
      IF (M2RETROFLECTIVESENSOR1 = FALSE) AND (M2JOBSTARTEDCHECK = FALSE) THEN
        M2JOBSSTARTED := M2JOBSSTARTED + 1;
        END_IF;
      (*RETROFLECTIVESENSOR2 tracts boxes leaving the machine into the remover*)
      IF (M2RETROFLECTIVESENSOR2 = FALSE) AND (M2JOBDONECHECK = FALSE) THEN
        M2JOBSDONE := M2JOBSDONE +1;
        END_IF; 
    ELSE
      M2BCONEYOR1 := false;
      M2BCONEYOR2 := false;
      M2BCONEYOR3 := false;
      M2BCONEYORCURVE1 := FALSE;
      M2BCONEYORCURVE2 := FALSE;
      M2BCONEYORINCLINE := FALSE;
      M2BCONEYORSCALE1 :=FALSE;
      M2REMOVER := false;
      M2EMITTER := FALSE;
      END_IF;
    (*END OF MACHINE 2 CODE*)
    END_IF;
END_PROGRAM


CONFIGURATION Config0

  RESOURCE Res0 ON PLC
    TASK task0(INTERVAL := T#20ms,PRIORITY := 0);
    PROGRAM instance0 WITH task0 : JadcupPLC;
  END_RESOURCE
END_CONFIGURATION
