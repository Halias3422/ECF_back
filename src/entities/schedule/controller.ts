import { QueryResponse } from '../common/constants';
import { ScheduleQueriesService } from './service.queries';

export class ScheduleController {
  static getWeekSchedule = async (): Promise<QueryResponse> => {
    return await ScheduleQueriesService.getWeekSchedule();
  };
}
