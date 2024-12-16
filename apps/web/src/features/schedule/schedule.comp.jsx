import { useSchedule, useScheduleActions } from './provider/schedule.prov';
import ScheduleBlock from './block/schedule-block.comp';

export default function Schedule() {
  const { schedule } = useSchedule();

  const save = (e) => {
    console.log('Saving schedule...');
  }

  return (
    <>
      <button type='button' onClick={save}>
        Save Button
      </button>
      <table>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {schedule.blocks.map((block) => 
            <ScheduleBlock key={block.block} block={block} />
          )}
        </tbody>
      </table>
    </>
  );
}