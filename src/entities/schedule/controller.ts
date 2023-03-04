import { QueryResponse } from '../common/constants';
import { ScheduleQueriesService } from './service.queries';

export const ScheduleController = {
  getWeekSchedule: async (): Promise<QueryResponse> => {
    return await ScheduleQueriesService.getWeekSchedule();
  },
};
