export const ACTION = {
  INIT_SCHEDULE: 'initialize-schedule',
  EDIT_SNAPSHOT: 'edit-snapshot'
}

export const initState = {
  blocks: [],
  snapshot: new Map(),
}

export const scheduleReducer = (state, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case ACTION.INIT_SCHEDULE: {
      const { scheduleBlocks } = payload;
      
      return {
        ...state,
        blocks: scheduleBlocks,
        snapshot: new Map(
          scheduleBlocks.map(({ block, lessons }) => [block, lessons])
        )
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