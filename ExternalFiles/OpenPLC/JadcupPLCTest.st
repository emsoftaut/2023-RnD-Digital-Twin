PROGRAM program0
  VAR
    Running AT %QX10.0 : BOOL;
    MachineStatus AT %IX10.0 : BOOL;
  END_VAR

  IF Running = TRUE THEN
    MachineStatus:= TRUE;
    ELSE 
      MachineStatus:=FALSE;
    END_IF;
END_PROGRAM


CONFIGURATION Config0

  RESOURCE Res0 ON PLC
    TASK task0(INTERVAL := T#20ms,PRIORITY := 0);
    PROGRAM instance0 WITH task0 : program0;
  END_RESOURCE
END_CONFIGURATION
