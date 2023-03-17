export const RESERVATIONS_ROUTES = {
  getAllPartialReservationsByDate: "/api/get-all-partial-reservations-by-date",
  createReservation: "/api/create-reservation",
  getUserReservations: "/api/get-user-reservations",
  getAllReservationsWithAssociatedMail:
    "/api/get-all-reservations-with-associated-mail",
};

export const RESERVATIONS_TABLE = {
  name: "Reservations",
  columns: {
    id: "id",
    guestNumber: "guestNumber",
    date: "date",
    hour: "hour",
    service: "service",
    allergies: "allergies",
    userId: "userId",
  },
};

export interface PartialReservationData {
  guestNumber: string;
  date: string;
  hour: string;
  service: string;
}

export interface ReservationData extends PartialReservationData {
  id: string;
  allergies: string;
  userId?: string;
}
