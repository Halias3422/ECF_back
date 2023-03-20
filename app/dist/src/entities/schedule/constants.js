"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULE_TABLE = exports.SCHEDULE_ROUTES = void 0;
exports.SCHEDULE_ROUTES = {
    getWeekSchedule: '/api/get-week-schedule',
    modifyWeekSchedule: '/api/modify-week-schedule',
};
exports.SCHEDULE_TABLE = {
    name: 'Schedule',
    columns: {
        id: 'id',
        dayOfWeek: 'dayOfWeek',
        morningOpening: 'morningOpening',
        morningClosing: 'morningClosing',
        afternoonOpening: 'afternoonOpening',
        afternoonClosing: 'afternoonClosing',
    },
};
