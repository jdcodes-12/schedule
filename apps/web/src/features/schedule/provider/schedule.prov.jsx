import { createContext, useContext, useEffect, useReducer } from 'react';
import { ACTION, initState, scheduleReducer } from './schedule-prov.reducer';
import * as API from '../schedule.api';

const ScheduleContext = createContext(null);
const { Provider: ScheduleState } = ScheduleContext;

const ScheduleDispatchContext = createContext(null);
const { Provider: ScheduleDispatch } = ScheduleDispatchContext;

// Hooks to expose schedule & related dipsatch actions to update state.
export const useSchedule = () => useContext(ScheduleContext);
export const useScheduleActions = () => useContext(ScheduleDispatchContext);

export function ScheduleProvider({ children }) {
  const [schedule, dispatch] = useReducer(scheduleReducer, initState);

  const fetchScheduleData = async () => {
    const scheduleBlocks = await API.getLessons();
    
    dispatch({ 
      type: ACTION.INIT_SCHEDULE,
      payload: { scheduleBlocks }
    });
  }

  useEffect(() => {
    fetchScheduleData();
  }, []);

  return (
    <ScheduleState value={{ schedule, fetchScheduleData }}>
      <ScheduleDispatch value={dispatch}>
        {children}
      </ScheduleDispatch>
    </ScheduleState>
  )
}