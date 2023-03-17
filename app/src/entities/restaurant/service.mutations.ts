import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { RESTAURANT_TABLE } from "./constants";

export class RestaurantMutationsService {
  static modifySeatsCapacity = async (
    newNumber: number
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${RESTAURANT_TABLE.name} SET ${RESTAURANT_TABLE.columns.seatsCapacity} = (?)`,
        [newNumber]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "modify seats capacity");
    } catch (error) {
      return databaseMutationError("modify seats capacity");
    }
  };
}
