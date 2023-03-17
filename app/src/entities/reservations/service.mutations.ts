import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { ReservationData, RESERVATIONS_TABLE } from "./constants";

export class ReservationsMutationsService {
  static createReservation = async (
    reservation: ReservationData,
    userId?: string
  ): Promise<ApiResponse> => {
    try {
      const DEFAULT = {
        toSqlString: function () {
          return "DEFAULT";
        },
      };
      const mutation = mysql2.format(
        `INSERT INTO ${RESERVATIONS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          DEFAULT,
          reservation.guestNumber,
          reservation.date,
          reservation.hour,
          reservation.service,
          reservation.allergies,
          userId || null,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "create new reservation");
    } catch (error) {
      return databaseMutationError("create new reservation");
    }
  };
}
