"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTAURANT_TABLE = exports.RESTAURANT_ROUTES = void 0;
exports.RESTAURANT_ROUTES = {
    getSeatsCapacity: '/api/get-seats-capacity',
    modifySeatsCapacity: '/api/modify-seats-capacity',
};
exports.RESTAURANT_TABLE = {
    name: 'Restaurant',
    columns: {
        id: 'id',
        seatsCapacity: 'seatsCapacity',
    },
};
