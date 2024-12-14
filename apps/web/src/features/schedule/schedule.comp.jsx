import { useSchedule } from './provider/schedule.prov';
import LessonRow from './rows/lesson-row/lesson-row.comp';

// Need to make schedule block component here.
export default function Schedule() {
  const { schedule } = useSchedule();

  return (
    <table>
      <thead>
        <th>Date</th>
        <th>Training Day</th>
        <th>Time Slot</th>
        <th>Lesson Name</th>
        <th>Location</th>
        <th>Primary Instructor</th>
        <th>Guest Instructor</th>
        <th>Equipment</th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        {schedule.lessons.map((l) => 
          <LessonRow lesson={l} />
        )}
      </tbody>
    </table>
  );
}