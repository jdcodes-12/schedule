import { Router } from 'express';
import { scheduleRouter } from './resources/schedule/schedule.router.js';

const router = Router();

router.use('/schedule', scheduleRouter);

export { router as appRouter }