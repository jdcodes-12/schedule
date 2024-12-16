import { useReducer } from 'react';
import { ACTION, initState, reducer } from './schedule-block.reducer';
import LessonRow from '../rows/lesson-row/lesson-row.comp';

export default function ScheduleBlock({ block: b }) {
  const [block, dispatch] = useReducer(reducer, initState(b));

  // TODO: Implement adding a new row (TBD -> with all null fields);


  // ??: Do I edit state here - EDIT_SNAPSHOT from provider (for when I hit SAVE?)

  // TODO: Implement DND - need dragStart, dragOver, dragX? need to prevent event on mouseOver I think?
    // remember to use the dataTranser.X synatx


  const sortedLessons = 
    Array
      .from(block.lessons)
      .sort(([currentIndex], [nextIndex]) => currentIndex - nextIndex)
      .map(([_, lessons]) => lessons);

  return (
    <>
      {sortedLessons.map((l) => 
        <LessonRow key={l.lesson_id} lesson={l} />
      )}
    </>
  );
}