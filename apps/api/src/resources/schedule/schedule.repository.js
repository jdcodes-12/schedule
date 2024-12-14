import { pgClient } from '../../config/db.config.js';

export async function getAllLessons() {
  try {
    const query = {
      text: 'SELECT * FROM lessons;',
      rowMode: 'array'
    }

    console.log('> Fetching lessons...');
    const result = await pgClient.query(query);
    
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