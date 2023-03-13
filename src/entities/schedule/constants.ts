export const SCHEDULE_ROUTES = {
  getWeekSchedule: '/api/get-week-schedule',
  modifyWeekSchedule: '/api/modify-week-schedule',
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

export interface DaySchedule {
  id?: string;
  dayOfWeek: string;
  morningOpening: string;
  morningClosing: string;
  afternoonOpening: string;
  afternoonClosing: string;
}
