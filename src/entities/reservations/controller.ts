import { ApiResponse } from '../common/constants';
import { UserData } from '../users/constants';
import { UsersController } from '../users/controller';
import { ReservationData } from './constants';
import { ReservationsMutationsService } from './service.mutations';
import { ReservationsQueriesService } from './service.queries';

export class ReservationsController {
  //QUERIES

  static getAllPartialReservationsByDate = async (
    date: string
  ): Promise<ApiResponse> => {
    const response =
      await ReservationsQueriesService.getAllPartialReservationsByDate(date);
    return response;
  };

  static getUserReservations = async (
    userInfo: UserData
  ): Promise<ApiResponse> => {
    const response = await ReservationsQueriesService.getUserReservations(
      userInfo.id
    );
    return response;
  };

  static getAllReservationsWithAssociatedMail =
    async (): Promise<ApiResponse> => {
      const response =
        await ReservationsQueriesService.getAllReservationsWithAssociatedMail();
      return response;
    };

  // MUTATIONS

  static createReservation = async (
    reservation: ReservationData,
    userSession: string
  ): Promise<ApiResponse> => {
    let retreivedUser;
    if (userSession) {
      const userSessionInfo = userSession.split(':');
      retreivedUser = await UsersController.getAuthenticatedUserFromSession({
        id: userSessionInfo[0],
        token: userSessionInfo[1],
      });
    }
    const newReservation = await ReservationsMutationsService.createReservation(
      reservation,
      retreivedUser?.data[0].id || null
    );
    if (newReservation.statusCode === 200) {
      return { ...newReservation, statusCode: 201 };
    }
    return newReservation;
  };
}
