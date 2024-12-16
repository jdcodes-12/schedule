import * as repo from './schedule.repository.js';
import * as su from './schedule.utils.js';

export async function listLessons() {
  try {
    const rows = await repo.getAllLessons();

    const groupedLessonsByBlock = rows.reduce((acc, lesson) => {
      const { date } = lesson;

      if (!acc[date])
        acc[date] = { block: date, lessons: [] };
      
      acc[date].lessons.push(lesson);

      return acc;
    }, {});

    // Convert to array for easier handling on frontend.
    return Object.values(groupedLessonsByBlock) ;
    
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveSchedule(original, snapshot) {
  try {
    const origMap = new Map(Object.entries(original));
    const snapMap = new Map(Object.entries(snapshot));
    
    console.log('> Parsing incoming schedule changes...');

    const [
     hasChanges, 
     changedLessons,
     deletedLessons
    ] = su.parseScheduleChanges(origMap, snapMap);

    if (hasChanges) {
      console.log('> Found changes in schedule. Processing... ')
      repo.saveSchedule(changedLessons, deletedLessons)
      console.log('> Schedule changes saved!');
    }
    
    else console.log('> No changes found.')
    
  } catch (error) {
    console.error(error);
    return error;
  }
}