import { deepEqual } from '../../lib/global.utils.js';

export function parseScheduleChanges(original, snapshot) {
  const changedLessons = [];
  const deletedLessons = [];

  const hasChanges = scheduleHasChanges(original, snapshot);
  
  if (hasChanges) {
    const origKeys = Array.from(original.keys());
    const snapKeys = Array.from(snapshot.keys());

    const newKeys = snapKeys.filter((k) => !original.has(k));
    const deletedKeys = origKeys.filter((k) => !snapshot.has(k));
    const sameKeys = snapKeys.filter((k) => original.has(k));

    // New lesson blocks that have been added since UI
    // fetched initially.
    newKeys.forEach((nk) => {
      const newLessons = snapshot.get(nk);
      newLessons.map((l) => changedLessons.push(l));
    });

    // Lessons blocks that have been removed.
    deletedKeys.forEach((dk) => {
      const lessonsToDelete = original.get(dk);
      lessonsToDelete.map((l) => deletedLessons.push(l));
    });

    // For same keys - run diff & add items to changedLessons for any 
    // items that have changed. Any deleted items go to deleteItems.
    sameKeys.forEach((sk) => {
      const origLessons = original.get(sk);
      const snapLessons = snapshot.get(sk);

      const [
        editedLessons, 
        removedLessons
      ] = parseLessonArrays(origLessons, snapLessons);
      
      editedLessons.map((el) => changedLessons.push(el));
      removedLessons.map((rl) => deletedLessons.push(rl));
    });
  }

  return [hasChanges, changedLessons, deletedLessons];
}

export function scheduleHasChanges(original, snapshot) {
  const origKeys = Array.from(original.keys());
  const snapKeys = Array.from(snapshot.keys());
 
  // Check for keys that exist in original but not 
  // in snapshot (deleted keys).
  for (let k of origKeys) 
    if (!snapshot.has(k)) return true; // Deletion detected.

  // Check for keys that exist in snapshot but not 
  // in original (added keys).
  for (let k of snapKeys) 
    if (!original.has(k)) return true; // Addition detected.

  // Compare the arrays for matching keys
  for (let key of origKeys) {
    if (snapshot.has(key)) {
      const origArr = original.get(key);
      const snapArr = snapshot.get(key);

      // Array length mismatch indicates a change.
      if (origArr.length !== snapArr.length) 
        return true; 

      // Deep compare the objects within the arrays for this key.
      for (let i = 0; i < origArr.length; i++) 
        if (!deepEqual(origArr[i], snapArr[i])) 
            return true; // Object mismatch detected.
    }
  }

  return false;
}

export function parseLessonArrays(original, snapshot) {
  const editedLessons = [];
  const removedLessons = [];

  const lookup = new Map(original.map(obj => [obj.lesson_id, obj]));
  const snapshotIDs = new Set();

  // Iterate over S to find modified and new rows.
  for (const objS of snapshot) {
    if (objS.lesson_id) {
      const objO = lookup.get(objS.lesson_id);
      snapshotIDs.add(objS.lesson_id); // Track IDs from snapshot.
      
      if (!objO || !deepEqual(objO, objS)) 
        editedLessons.push(objS); // Modified if not deeply equal.
    } 
    // It's a new row if it lacks `id`.
    else editedLessons.push(objS);
  }

  // Identify unused (deleted) items,
  // those in `original` but not in `snapshot`.
  for (const lesson of original) 
    if (!snapshotIDs.has(lesson.lesson_id)) 
      removedLessons.push(lesson);

  return [ editedLessons, removedLessons ];
}