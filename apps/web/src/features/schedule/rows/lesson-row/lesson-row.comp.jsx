import { useState } from 'react';
import EditRow from '../edit-row/edit-row.comp';

export default function LessonRow({ lesson }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => setIsEditing(!isEditing);

  return isEditing ? (
    <EditRow lesson={lesson} toggleEditMode={toggleEditMode} /> 
  ) : (
    <tr className='schedule-row'>
      <td>{lesson?.date}</td>
      <td>{lesson?.training_day}</td>
      <td>{lesson?.time_slot}</td>
      <td>{lesson?.name}</td>
      <td>{lesson?.location}</td>
      <td>{lesson?.primary_instructor_name}</td>
      <td>{lesson?.guest_instructor_name}</td>
      <td>{lesson?.uniform_and_equipment}</td>
      <td>
        <button onClick={toggleEditMode}>
          E
        </button>
      </td>
      <td>
        <button onClick={() => console.log('Removing row...')}>
          R
        </button>
      </td>
    </tr>
  );
}