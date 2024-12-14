import { useSchedule } from './provider/schedule.prov';

export default function Schedule() {
  const { schedule } = useSchedule();
  
  return (
    <div>
      {schedule.lessons.map((s) => 
        <p>{s.lesson_id}</p>
      )}
    </div>
  );
}