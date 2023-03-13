import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { SCHEDULE_ROUTES } from './constants';
import { ScheduleController } from './controller';

export const scheduleRoutes = express.Router();

scheduleRoutes.get(SCHEDULE_ROUTES.getWeekSchedule, async (req, res) => {
  const { statusCode, response, data } =
    await ScheduleController.getWeekSchedule();
  return res.status(statusCode).send({ response, data });
});

scheduleRoutes.post(SCHEDULE_ROUTES.modifyWeekSchedule, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } =
      await ScheduleController.modifyWeekSchedule(req.body);
    return res.status(statusCode).send(response);
  } else {
    return res.status(401).send('Unauthorized');
  }
});
