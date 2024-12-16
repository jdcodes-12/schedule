import * as su from '../../../src/resources/schedule/schedule.utils.js';

const original =  {
  '2024-12-18': [ 
    { lesson_id: 1, a: 1 }, 
    { lesson_id: 2, b: 2 }, 
    { lesson_id: 3, c: 3 } 
  ],
  '2024-12-19': [ 
    { lesson_id: 4, a: 4 }, 
    { lesson_id: 5, b: 5 }, 
    { lesson_id: 6, c: 6 } 
  ]
};

const snapshots = {
  'same': {
    '2024-12-18': [ 
      { lesson_id: 1, a: 1 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 3 } 
    ],
    '2024-12-19': [ 
      { lesson_id: 4, a: 4 }, 
      { lesson_id: 5, b: 5 }, 
      { lesson_id: 6, c: 6 } 
    ]
  },
  'diff': {
    '2024-12-18': [ 
      { lesson_id: 1, a: 10 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 3 } 
    ],
    '2024-12-19': [ 
      { lesson_id: 4, a: 40 }, 
      { lesson_id: 5, b: 5 }, 
      { lesson_id: 6, c: 6 } 
    ]
  },
  'more-lessons': {
    '2024-12-18': [ 
      { lesson_id: 1, a: 1 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 3 },
      { lesson_id: 7, c: 7 },
    ],
    '2024-12-19': [ 
      { lesson_id: 4, a: 4 }, 
      { lesson_id: 5, b: 5 }, 
      { lesson_id: 6, c: 6 } 
    ]
  },
  'more-keys': {
    '2024-12-17': [ 
      { lesson_id: 7, a: 7 }, 
      { lesson_id: 8, b: 7 }, 
      { lesson_id: 9, c: 9 } 
    ],
    '2024-12-18': [ 
      { lesson_id: 1, a: 1 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 3 } 
    ],
    '2024-12-19': [ 
      { lesson_id: 4, a: 4 }, 
      { lesson_id: 5, b: 5 }, 
      { lesson_id: 6, c: 6 } 
    ]
  },
  'less-lessons': {
    '2024-12-18': [ 
      { lesson_id: 1, a: 1 }, 
    ],
    '2024-12-19': [ 
      { lesson_id: 4, a: 4 }, 
      { lesson_id: 5, b: 5 }, 
      { lesson_id: 6, c: 6 } 
    ]
  },
  'less-keys': {
    '2024-12-18': [ 
      { lesson_id: 1, a: 1 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 3 } 
    ]
  },
  'catch-all': {
    '2024-12-17': [
      { lesson_id: 10, a: 10 }, 
      { lesson_id: 20, b: 20 }, 
      { lesson_id: 30, c: 30 } 
    ],
    '2024-12-18': [ 
      { lesson_id: 1, a: 100 }, 
      { lesson_id: 2, b: 2 }, 
      { lesson_id: 3, c: 300 } 
    ],
  }
}

const origMap = new Map(Object.entries(original));

const arrays = {
  'base': [ 
    { lesson_id: 1, a: 1 }, 
    { lesson_id: 2, b: 2 }, 
    { lesson_id: 3, c: 3 } 
  ],
  'modified-1': [ 
    { lesson_id: 1, a: 10 }, 
    { lesson_id: 2, b: 2 }, 
    { lesson_id: 3, c: 3 } 
  ],
  'modified-2': [ 
    { lesson_id: 1, a: 10 }, 
    { lesson_id: 2, b: 20 }, 
    { lesson_id: 3, c: 3 } 
  ],
  'modified-3': [ 
    { lesson_id: 1, a: 10 }, 
    { lesson_id: 2, b: 20 }, 
    { lesson_id: 3, c: 30 } 
  ],
  'removed-1': [ 
    { lesson_id: 1, a: 1 }, 
    { lesson_id: 2, b: 2 }, 
  ],
  'removed-2': [ 
    { lesson_id: 1, a: 1 }, 
  ],
  'mod-removed': [ 
    { lesson_id: 1, a: 1 }, 
    { lesson_id: 2, b: 20 }, 
  ]
};

describe('Schedule Utils - scheduleHasChanges()', () => {

  test('Returns FALSE when original payload and snapshot are the same.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['same']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(false);
  })

  test('Returns TRUE when a block\'s lessons has changed from original.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['diff']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(true);
  })

  test('Returns TRUE when snapshot has more lessons for a block.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['more-lessons']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(true);
  })

  test('Returns TRUE when snapshot has less lessons for a block.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['less-lessons']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(true);
  })

  test('Returns TRUE when snapshot has less schedule blocks than original.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['less-keys']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(true);
  })

  test('Returns TRUE when snapshot has more schedule blocks than original.', () => {
    const orig = new Map(Object.entries(original));
    const snap = new Map(Object.entries(snapshots['more-keys']));

    const result = su.scheduleHasChanges(orig, snap);

    expect(result).toBe(true);
  });
})

describe('Schedule Utils - parseLessonArrays()', () => {
  test('Returns [] if no items modified or added.', () => {
    const base = arrays['base'];
  
    const [ 
      editedLessons, 
      removedLessons
    ] = su.parseLessonArrays(base, base);

    expect(editedLessons.length).toBe(0);
    expect(removedLessons.length).toBe(0);
  })

  // TODO: When items are modified but not deleted
  test('Correctly returns modified/edited rows.', () => {
    const base = arrays['base'];
    const mod1 = arrays['modified-1'];
    const mod2 = arrays['modified-2'];
    const mod3 = arrays['modified-3'];
  
    const res1 = su.parseLessonArrays(base, mod1);
    const res2 = su.parseLessonArrays(base, mod2);
    const res3 = su.parseLessonArrays(base, mod3);

    // [0] == editedLessons array. See first test.
    expect(res1[0].length).toBe(1);
    expect(res2[0].length).toBe(2);
    expect(res3[0].length).toBe(3);
  })

  // TODO: when items deleted, not modified.
  test('Correctly returns removed rows.', () => {
    const base = arrays['base'];
    const rm1 = arrays['removed-1'];
    const rm2 = arrays['removed-2'];
  
    const res1 = su.parseLessonArrays(base, rm1);
    const res2 = su.parseLessonArrays(base, rm2);

    // [1] == removedLessons array. See first test.
    expect(res1[1].length).toBe(1);
    expect(res2[1].length).toBe(2);
  })

  // TODO: when items modified & deleted
  test('Correctly returns modified and removed rows.', () => {
    const base = arrays['base'];
    const modRm = arrays['mod-removed']
  
    const [ 
      editedLessons, 
      removedLessons
    ] = su.parseLessonArrays(base, modRm);

    expect(editedLessons.length).toBe(1);
    expect(removedLessons.length).toBe(1);
  })
})

describe('Schedule Utils - parseSchedule()', () => {

  test('When equal maps hasChanges is false, changedLesson & deletedLessons is empty', () => {
    const snapMap = new Map(Object.entries(snapshots['same']));
    
    const [
      hasChanges, 
      changedLessons, 
      deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);

    expect(hasChanges).toBe(false);
    expect(changedLessons.length).toBe(0);
    expect(deletedLessons.length).toBe(0);
  })

  test('When missing keys in snapshot, adds deleted keys.', () => {
    const snapMap = new Map(Object.entries(snapshots['less-keys']));

    const [
      hasChanges,
      changedLessons,
      deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);

    expect(hasChanges).toBe(true);
    expect(changedLessons.length).toBe(0);
    expect(deletedLessons.length).toBe(3);
  })

  // TODO: hasChanges = true, deletedLessons.length = 1, changedLessons = 1;
  test('When new keys in snapshot, adds new keys.', () => {
    const snapMap = new Map(Object.entries(snapshots['more-keys']));

    const [
      hasChanges,
      changedLessons,
      deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);

    expect(hasChanges).toBe(true);
    expect(changedLessons.length).toBe(3);
    expect(deletedLessons.length).toBe(0);
  })

  test('When same keys, grabs all changed objects.', () => {
    const snapMap = new Map(Object.entries(snapshots['diff']));

    const [
      hasChanges,
      changedLessons,
      deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);

    expect(hasChanges).toBe(true);
    expect(changedLessons.length).toBe(2);
    expect(deletedLessons.length).toBe(0);
  })

  test(
    'Catch all - deleted keys, new keys, changed rows, & removed rows', 
    () =>  {
    const snapMap = new Map(Object.entries(snapshots['catch-all']));

    const [
      hasChanges,
      changedLessons,
      deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);
    
    expect(hasChanges).toBe(true);
    expect(changedLessons.length).toBe(5);
    expect(deletedLessons.length).toBe(3);
  })
})