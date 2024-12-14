import * as repo from './schedule.repository.js';

export async function listLessons() {
  try {
    return await repo.getAllLessons();
    
  } catch (err) {
    console.error(err);
    return err;
  }
}