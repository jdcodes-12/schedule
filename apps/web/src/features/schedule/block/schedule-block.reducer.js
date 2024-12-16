export const ACTION = {
  EDIT_LESSON: 'edit-block-lesson',
  RDORDER_LESSONS: 'reorder-rows',
  INSERT_BLANK_LESSON: 'insert-blank-lesson'
}

export const initState = (block) => ({
  blockID: block?.block ?? 'unassigned',
  lessons: new Map(
    block.lessons.map((lesson, index) => [index, lesson])
  ), 
});

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // TODO: Add row, Update Rows, Reorder Rows (for DND)

    default:
      return true;
  }
}