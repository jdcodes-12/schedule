import * as service from './schedule.service.js';

export async function healthcheck(req, res) {
  return res.status(200).json({ message: 'API running!' });
}

export async function listLessons(req, res) {
  try {
    const lessons = await service.listLessons();
    
    return res.status(200).json(lessons);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'Something went wrong. Try again later.'
    });
  }
}

export async function saveSchedule(req, res) {
  try {
    return res.status(201).json({ message: 'Schedule saved.'});
    
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'Something went wrong. Try again later.'
    });
  }
}