"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESERVATIONS_TABLE = exports.RESERVATIONS_ROUTES = void 0;
exports.RESERVATIONS_ROUTES = {
    getAllPartialReservationsByDate: '/api/get-all-partial-reservations-by-date',
    createReservation: '/api/create-reservation',
    getUserReservations: '/api/get-user-reservations',
    getAllReservationsWithAssociatedMail: '/api/get-all-reservations-with-associated-mail',
};
exports.RESERVATIONS_TABLE = {
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
