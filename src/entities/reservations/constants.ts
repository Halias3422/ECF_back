export const RESERVATIONS_ROUTES = {
  getAllPartialReservationsByDate: '/api/get-all-partial-reservations-by-date',
  getAllReservations: '/api/get-all-reservations',
  createReservation: '/api/create-reservation',
  getUserReservations: '/api/get-user-reservations',
};

export const RESERVATIONS_TABLE = {
  name: 'Reservations',
  columns: {
    id: 'id',
    guestNumber: 'guestNumber',
    date: 'date',
    hour: 'hour',
    service: 'service',
    allergies: 'allergies',
    userId: 'userId',
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
