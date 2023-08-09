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
    FactoryPause AT %QX101.2 : BOOL := FALSE;
    FactoryReset AT %QX101.3 : BOOL := FALSE;
    FactoryRun AT %QX101.4 : BOOL := FALSE;
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

  (* Code can only exicute if factoryIO is running*)
  IF FACTORYRESETTING = TRUE THEN
    M1JOBSSTARTED := 0;
    M1JOBSDONE := 0;
  END_IF;
  (*if there are jobs to do start the factory*)
  IF M1JobsQueued > M1JOBSDONE then
    M1BCONEYOR1 := TRUE;
    M1BCONEYOR2 := true;
    M1BCONEYOR3 := true;
    M1BCONEYORCURVE1 := true;
    M1BCONEYORCURVE2 := true;
    M1BCONEYORINCLINE := true;
    M1BCONEYORSCALE1 :=true;
    M1Running := true;
    M1EMITTER := TRUE;
  END_IF;
  (*when all jobs are done turn off all conveyors and the remover. then reset job trackers*)
  IF M1JobsQueued = M1JOBSDONE then
    M1BCONEYOR1 := false;
    M1BCONEYOR2 := false;
    M1BCONEYOR3 := false;
    M1BCONEYORCURVE1 := FALSE;
    M1BCONEYORCURVE2 := FALSE;
    M1BCONEYORINCLINE := FALSE;
    M1BCONEYORSCALE1 :=FALSE;
    M1REMOVER := false;

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
  IF M1RETROFLECTIVESENSOR1 = false then
    IF M1JOBSTARTEDCHECK = FALSE THEN
      M1JOBSSTARTED := M1JOBSSTARTED + 1;
      M1JOBSTARTEDCHECK := TRUE;
    END_IF;
  END_IF;

  (*RETROFLECTIVESENSOR2 tracts boxes leaving the machine into the remover*)
  IF M1RETROFLECTIVESENSOR2 = false THEN
    IF M1JOBDONECHECK = FALSE THEN
      M1JOBSDONE := M1JOBSDONE +1;
      M1JOBDONECHECK := TRUE;
    END_IF;
  END_IF;
  IF M1RETROFLECTIVESENSOR1 = TRUE then
    M1JOBSTARTEDCHECK :=FALSE;
  END_IF;
  IF M1RETROFLECTIVESENSOR2 = TRUE then
    M1JOBDONECHECK := FALSE;
  END_IF;

END_PROGRAM


CONFIGURATION Config0

  RESOURCE Res0 ON PLC
    TASK task0(INTERVAL := T#20ms,PRIORITY := 0);
    PROGRAM instance0 WITH task0 : JadcupPLC;
  END_RESOURCE
END_CONFIGURATION
