import Schedule from './features/schedule/schedule.comp';
import { ScheduleProvider } from './features/schedule/provider/schedule.prov';

export default function App() {  
  return (
    <ScheduleProvider>
      <Schedule />
    </ScheduleProvider>
  );
}