import { pgClient } from '../../config/db.config.js';

export async function getAllLessons() {
  try {
    const result = await pgClient.query(`
      SELECT * 
      FROM lessons
      ORDER BY date, row_number ASC;  
    `);

    return result.rows;

  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function saveSchedule(changedLessons, deletedLessons) {
  try {
    // Run changed lessons query - send changedLessons to storedProc.

    if (deletedLessons.length > 0)
      await pgClient.query(queries.bulkDeleteLessons(deletedLessons));

    return;

  } catch (err) {
    console.error(err);
    return err;
  }
}