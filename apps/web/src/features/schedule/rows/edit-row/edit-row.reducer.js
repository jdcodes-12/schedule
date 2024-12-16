export const ACTION = {
  EDIT_ROW: 'edit-row'
}

export const initState = (lesson) => ({
  date: lesson?.date,
  training_day: lesson?.training_day,
  time_slot: lesson?.time_slot,
  subject: lesson?.name,
  location: lesson?.location,
  primary_instructor: lesson?.primary_instructor_name,
  guest_instructor: lesson?.guest_instructor_name,
  equipment: lesson?.uniform_and_equipment
});

export const reducer = (state, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case ACTION.EDIT_ROW: {
      const { key, value } = payload;
      return { ...state, [key]: value }
    }
    
    default: 
      return state;
  }
}