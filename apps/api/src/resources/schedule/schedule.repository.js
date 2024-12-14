import { pgClient } from '../../config/db.config.js';

export async function getAllLessons() {
  try {
    const result = await pgClient.query('SELECT * FROM lessons;');
    
    return result.rows;

  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function saveSchedule() {
  try {
    // TODO: setup saving lessons.

  } catch (err) {
    console.error(err);
    return err;
  }
}