import { Router } from 'express';
import * as controller from './schedule.controller.js';

const router = Router();

router
  .get('/health', controller.healthcheck)
  .get('/', controller.listLessons)
  .post('/save', controller.saveSchedule);

export { router as scheduleRouter }