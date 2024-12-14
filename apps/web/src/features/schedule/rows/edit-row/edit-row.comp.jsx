import { useReducer } from 'react';
import { ACTION, initState, reducer } from '../edit-row/edit-row.reducer';

export default function EditRow({ lesson, toggleEditMode  }) {
  const [row, dispatch] = useReducer(reducer, initState(lesson));

  const handleSave = (e) => {
    toggleEditMode();
    console.log('Saving row edits..');
    // Update schedule block - `state.rows`
  }

  // TODO: Need to use inputs & get the values to set into state.
  return (
    <tr className='schedule-row'>
      <td>{row.date}</td>
      <td>{row.training_day}</td>
      <td>{row.time_slot}</td>
      <td>{row.subject}</td>
      <td>{row.location}</td>
      <td>{row.primary_instructor}</td>
      <td>{row.guest_instructor}</td>
      <td>{row.equipment}</td>
      <td>
        <button onClick={handleSave}>
          S
        </button>
      </td>
      <td>
        <button onClick={toggleEditMode}>
          X
        </button>
      </td>
    </tr>
  );
}