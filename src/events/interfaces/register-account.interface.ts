import { Event } from '../event.entity';

export interface RegisterEventResponse {
  success: boolean;
  message: string;
  data: Partial<Event>;
}
