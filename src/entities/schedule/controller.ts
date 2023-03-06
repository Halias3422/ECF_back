import { ApiResponse } from '../common/constants';
import { ScheduleQueriesService } from './service.queries';

export class ScheduleController {
  static getWeekSchedule = async (): Promise<ApiResponse> => {
    return await ScheduleQueriesService.getWeekSchedule();
  };
}
