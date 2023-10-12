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
    M1RetroflectiveSensor3 AT %IX100.5 : BOOL := False;
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
    M1WaterLevel AT %IW83 : INT := 0;
    M1Running AT %IX010.2 : BOOL := false;
  END_VAR
  VAR
    M1JobStartedCheck : BOOL := TRUE;
    M1JobDoneCheck : BOOL := TRUE;
    M1WeightCheck : BOOL := TRUE;
  END_VAR
  VAR
    M1MachineOverride AT %QX10.2 : BOOL := false;
    M1EmergencyStop AT %QX10.3 : BOOL := false;
    M1TotalWeight AT %IW84 : INT := 0;
  END_VAR
  VAR
    M1RealTimeClock : RTC;
    M1trackedTimeEnd : DT;
    M1trackedTimestart : DT;
    M1TimerCounter : INT := 0;
    M1TotalTime : TIME;
  END_VAR
  VAR
    M1AverageTime AT %IW85 : INT := 0;
  END_VAR
  VAR
    M1TimerSensorCheck : BOOL := false;
  END_VAR
  VAR
    M1QueueCheck AT %IW86 : INT := 0;
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
    M2RetroflectiveSensor1 AT %IX100.6 : BOOL := TRUE;
    M2RetroflectiveSensor2 AT %IX100.7 : BOOL := TRUE;
    M2RetroflectiveSensor3 AT %IX101.0 : BOOL := TRUE;
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
    M2WaterLevel AT %IW93 : INT := 0;
    M2Running AT %IX11.4 : BOOL := FALSE;
  END_VAR
  VAR
    M2JobStartedCheck : BOOL := TRUE;
  END_VAR
  VAR
    M2JobDoneCheck AT %QX11.6 : BOOL := TRUE;
  END_VAR
  VAR
    M2TimerSensorCheck : BOOL := TRUE;
    M2WeightCheck : BOOL := TRUE;
  END_VAR
  VAR
    M2TotalWeight AT %IW94 : INT := 0;
    M2MachineOverride AT %QX11.4 : BOOL := FALSE;
    M2EmergencyStop AT %QX11.5 : BOOL := FALSE;
  END_VAR
  VAR
    M2TrackedTimeStart : DT;
    M2TrackedTimeEnd : DT;
    M2NewTime : TIME;
    M2TotalTime : TIME;
    M2TimerCounter : INT := 0;
  END_VAR
  VAR
    M2AverageTime AT %IW95 : INT := 0;
  END_VAR
  VAR
    M2RealTimeClock : RTC;
  END_VAR
  VAR
    M2QueueCheck AT %IW96 : INT := 0;
  END_VAR
  VAR
    TimeMod : INT := 234;
    WaterMod : INT := 7;
  END_VAR

  (*RESET JOB STARTED AND DONE VALUES WHEN THE FACsTORY I/O RESET BUTTON IS PRESSED*)
  IF FACTORYRESETTING = TRUE THEN
    M1JOBSSTARTED := 0;
    M1JOBSDONE := 0;
    M2JOBSSTARTED := 0;
    M2JOBSDONE := 0;
    END_IF;
  (* Code can only exicute if factoryIO is running*)
  IF FACTORYRUNNING THEN
    (*START OF MACHINE 1 CODE*)
        IF(M1emergencyStop) then
        M1JOBSSTARTED := 0;
        M1JOBSDONE := 0;
        END_IF;
      IF (NOT(M1QUEUECHECK = M1JOBSQUEUED)) THEN
        M1JOBSSTARTED := 0;
        M1JOBSDONE  :=0;
        M1QUEUECHECK := M1JOBSQUEUED;
        END_IF;
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
      (*if there are still pending jobs M1Emitter is on otherwise turn off*)
        IF M1JOBSQUEUED > M1JOBSSTARTED then
          M1EMITTER := true;
          ELSE
          M1EMITTER := FALSE;
          END_IF;
        
        (*M1Retroflectivesensor1 tracks new boxes entering the machine from the emitter*)
        IF (M1RETROFLECTIVESENSOR1 = FALSE) AND (M1JOBSTARTEDCHECK = FALSE) THEN
          M1JOBSTARTEDCHECK :=TRUE;
          M1JOBSSTARTED := M1JOBSSTARTED + 1;
          M1RealTimeClock(CDT => M1TrackedTimeStart);
          END_IF;
          (*track average speed of boxes passing through the conveyor*)
        IF (NOT M1RETROFLECTIVESENSOR2) AND (NOT M1TIMERSENSORCHECK) THEN
          M1RealTimeClock(CDT => M1TrackedTimeEnd);
          M1TOTALTIME := ADD_TIME(M1TOTALTIME, SUB_DT_DT(M1TRACKEDTIMEEND, M1TRACKEDTIMESTART));
          M1TIMERCOUNTER := M1TIMERCOUNTER +1;
          M1AVERAGETIME := (TIME_TO_INT(M1TOTALTIME)/M1TIMERCOUNTER) *  TimeMod;
          M1TIMERSENSORCHECK := TRUE;
          END_IF;
        IF (M1RETROFLECTIVESENSOR2) AND (M1TIMERSENSORCHECK) THEN
          M1TIMERSENSORCHECK := FALSE;
          END_IF;
      (*M1Retroflectivesensor1 tracks new boxes entering the machine from the emitter*)
      IF (M1RETROFLECTIVESENSOR1 = false) AND (M1JOBSTARTEDCHECK = FALSE) then
        M1JOBSSTARTED := M1JOBSSTARTED + 1;
        M1JOBSTARTEDCHECK := TRUE;
        END_IF;
        
      (*RETROFLECTIVESENSOR3 tracts boxes leaving the machine into the remover*)
      IF (M1RetroflectiveSensor3 = false) AND (M1JOBDONECHECK = FALSE) THEN
        M1JOBSDONE := M1JOBSDONE +1;
        M1JOBDONECHECK := TRUE;
        END_IF;
      IF (M1RETROFLECTIVESENSOR3 = TRUE) THEN
        M1JOBDONECHECK := FALSE;
        END_IF;
        
      (*RESET JOBS STARTED CHECK IF SENSOR ISNT TRIGGERED*)
      IF M1RETROFLECTIVESENSOR1 = TRUE then
        M1JOBSTARTEDCHECK :=FALSE;
        END_IF;

      M1TANKFILLVALVE1 := REAL_TO_INT((-(COS(INT_TO_REAL(M1LIGHTARRAY1)))/2.0)*1000.0);
      M1TANKDRAINVALVE1 := REAL_TO_INT(((SIN(INT_TO_REAL(M1LIGHTARRAY1)))/2.0)*1000.0);
      M1TANKFILLVALVE2 := REAL_TO_INT((-(COS(INT_TO_REAL(M1LIGHTARRAY2)))/2.0)*1000.0);
      M1TANKDRAINVALVE2 := REAL_TO_INT(((SIN(INT_TO_REAL(M1LIGHTARRAY2)))/2.0)*1000.0);
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
      M1TANKDRAINVALVE1 := 1000;
      M1TANKDRAINVALVE2 := 1000;
      END_IF;
      
    M1wATERLEVEL := ((M1TANKLEVELMETER1 + M1TANKLEVELMETER2) /2)* WaterMod;
    IF (M1CONVEYORSCALE > 0) AND (NOT M1WEIGHTCHECK) THEN
      M1WEIGHTCHECK := TRUE;
      M1TOTALWEIGHT := (M1TOTALWEIGHT + M1CONVEYORSCALE) * 10;
    ELSIF (M1CONVEYORSCALE = 0) AND M1WEIGHTCHECK THEN
      M1WEIGHTCHECK := FALSE;
      END_IF;
    (*END OF MACHINE 1 CODE  *)
    (*-----------------------*)
    (*START OF MACHINE 2 CODE*)
    IF(M2EMERGENCYSTOP) THEN
        M2JOBSSTARTED :=0;
        M2JOBSDONE:=0;
        END_IF;
      IF (NOT(M2QUEUECHECK = M2JOBSQUEUED)) THEN
        M2JOBSSTARTED := 0;
        M2JOBSDONE  :=0;
        M2QUEUECHECK := M2JOBSQUEUED;
        END_IF;
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
      IF M2JOBSQUEUED > M2JOBSSTARTED then
        M2EMITTER := true;
        ELSE
        M2EMITTER := FALSE;
        END_IF;
      
      (*M2Retroflectivesensor1 tracks new boxes entering the machine from the emitter*)
      IF (M2RETROFLECTIVESENSOR1 = FALSE) AND (M2JOBSTARTEDCHECK = FALSE)  THEN
        M2JOBSTARTEDCHECK :=TRUE;
        M2JOBSSTARTED := M2JOBSSTARTED + 1;
        M2RealTimeClock(CDT => M2TrackedTimeStart);
        END_IF;
        (*track average speed of boxes passing through the conveyor*)
      IF (NOT M2RETROFLECTIVESENSOR2) AND (NOT M2TIMERSENSORCHECK) THEN
        M2RealTimeClock(CDT => M2TrackedTimeEnd);
        M2TOTALTIME := ADD_TIME(M2TOTALTIME, SUB_DT_DT(M2TRACKEDTIMEEND, M2TRACKEDTIMESTART));
        M2TIMERCOUNTER := M2TIMERCOUNTER +1;
        M2AVERAGETIME := (TIME_TO_INT(M2TOTALTIME)/M2TIMERCOUNTER) * TimeMod;
        M2TIMERSENSORCHECK := TRUE;
        END_IF;
      IF (M2RETROFLECTIVESENSOR2) AND (M2TIMERSENSORCHECK) THEN
        M2TIMERSENSORCHECK := FALSE;
        END_IF;
      (*RETROFLECTIVESENSOR3 tracts boxes leaving the machine into the remover*)
     IF (M2RetroflectiveSensor3 = false) AND (M2JOBDONECHECK = FALSE) THEN
        M2JOBSDONE := M2JOBSDONE +1;
        M2JOBDONECHECK := TRUE;
        END_IF;
      IF (M2RETROFLECTIVESENSOR3 = TRUE) THEN
        M2JOBDONECHECK := FALSE;
        END_IF;
      (*RESET JOBS STARTED CHECK IF SENSOR ISNT TRIGGERED*)
      IF M2RETROFLECTIVESENSOR1 = TRUE then
        M2JOBSTARTEDCHECK :=FALSE;
        END_IF;
      (*RESET JOBS DONE CHECK IF SENSOR ISNT TRIGGERED*)
      IF M2RETROFLECTIVESENSOR3 AND M2JOBDONECHECK then
        M2JOBDONECHECK := FALSE;      
        END_IF;
      M2TANKFILLVALVE1 := REAL_TO_INT(((-(COS(INT_TO_REAL(M2LIGHTARRAY1)))/2.0)+0.5)*1000.0);
      M2TANKDRAINVALVE1 := REAL_TO_INT((((SIN(INT_TO_REAL(M2LIGHTARRAY1)))/2.0)+0.5)*1000.0);
      M2TANKFILLVALVE2 := REAL_TO_INT(((-(COS(INT_TO_REAL(M2LIGHTARRAY2)))/2.0)+0.5)*1000.0);
      M2TANKDRAINVALVE2 := REAL_TO_INT((((SIN(INT_TO_REAL(M2LIGHTARRAY2)))/2.0)+0.5)*1000.0);
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
    (*output value setting*)
    M2WATERLEVEL := ((M2TANKLEVELMETER1 + M2TANKLEVELMETER2) /2) * WaterMod;
    IF (M2CONVEYORSCALE > 0) AND (NOT M2WEIGHTCHECK) THEN
      M2WEIGHTCHECK := TRUE;
      M2TOTALWEIGHT := (M2TOTALWEIGHT + M2CONVEYORSCALE) * 10;
    ELSIF (M2CONVEYORSCALE = 0) AND M2WEIGHTCHECK THEN
      M2WEIGHTCHECK := FALSE;
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
