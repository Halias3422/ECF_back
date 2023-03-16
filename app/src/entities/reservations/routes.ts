import express from 'express';
import {
  verifyAuthorization,
  verifyUserAuthorization,
} from '../common/apiResponses';
import { RESERVATIONS_ROUTES } from './constants';
import { ReservationsController } from './controller';

export const reservationsRoutes = express.Router();

reservationsRoutes.get(
  RESERVATIONS_ROUTES.getAllPartialReservationsByDate,
  async (req, res) => {
    const { date } = req.query;
    const { statusCode, response, data } =
      await ReservationsController.getAllPartialReservationsByDate(
        date as string
      );
    res.status(statusCode).send({ response, data });
  }
);

reservationsRoutes.post(
  RESERVATIONS_ROUTES.createReservation,
  async (req, res) => {
    const { reservation, userContext } = req.body;
    const { statusCode, response } =
      await ReservationsController.createReservation(reservation, userContext);
    res.status(statusCode).send(response);
  }
);

// PROTECTED

reservationsRoutes.get(
  RESERVATIONS_ROUTES.getUserReservations,
  async (req, res) => {
    const auth = await verifyUserAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response, data } =
        await ReservationsController.getUserReservations(auth.data[0]);
      res.status(statusCode).send({ response, data });
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

reservationsRoutes.get(
  RESERVATIONS_ROUTES.getAllReservationsWithAssociatedMail,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response, data } =
        await ReservationsController.getAllReservationsWithAssociatedMail();
      res.status(statusCode).send({ response, data });
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);
