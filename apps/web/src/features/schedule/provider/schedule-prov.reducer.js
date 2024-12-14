export const ACTION = {
  INIT_SCHEDULE: 'initialize-schedule',
  EDIT_SNAPSHOT: 'edit-snapshot'
}

export const initState = {
  lessons: [],
  snapshot: new Map(),
}

export const scheduleReducer = (state, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case ACTION.INIT_SCHEDULE: {
      const { lessons } = payload;

      return {
        ...state, 
        lessons
      }
    }

    case ACTION.EDIT_SNAPSHOT: {
      const { blockID, rows } = payload;
      const { snapshot } = state;

      snapshot.set(blockID, rows);

      return { 
        ...state,
        snapshot: new Map(snapshot)
      }
    }
    default:
      return state;
  }
}