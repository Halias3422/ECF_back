export const SCHEDULE_ROUTES = {
  getWeekSchedule: "/api/get-week-schedule",
  modifyWeekSchedule: "/api/modify-week-schedule",
};

export const SCHEDULE_TABLE = {
  name: "Schedule",
  columns: {
    id: "id",
    dayOfWeek: "dayOfWeek",
    morningOpening: "morningOpening",
    morningClosing: "morningClosing",
    afternoonOpening: "afternoonOpening",
    afternoonClosing: "afternoonClosing",
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
