import express from 'express';
import { SCHEDULE_ROUTES } from './constants';
import { ScheduleController } from './controller';

export const scheduleRoutes = express.Router();

scheduleRoutes.get(SCHEDULE_ROUTES.getWeekSchedule, async (req, res) => {
  const { statusCode, response, rows } =
    await ScheduleController.getWeekSchedule();
  res.status(statusCode).send({ response, rows });
});
