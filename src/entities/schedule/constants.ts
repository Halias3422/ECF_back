export const SCHEDULE_ROUTES = {
  getWeekSchedule: '/api/get-week-schedule',
};

export const SCHEDULE_TABLE = {
  name: 'Schedule',
  columns: {
    id: 'id_schedule',
    dayOfWeek: 'day_of_week',
    morningOpening: 'morning_opening',
    morningClosing: 'morning_closing',
    afternoonOpening: 'afternoon_opening',
    afternoonClosing: 'afternoon_closing',
  },
};
