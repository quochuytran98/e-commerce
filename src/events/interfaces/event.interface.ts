import { Event } from '../event.schema';

export interface RegisterEventResponse {
  success: boolean;
  message: string;
  data: Partial<Event>;
}
export interface EventResponse {
  id: number;
  organizationId: number;
  categoryId: number;
  eventName: string;
  thumbnail: string;
  note: string;
  background: string;
  showTimes: number[];
  information: {
    fullName: string;
    address: string;
    phone: string;
  };
  setting: {
    contentEmail: string;
    url: string;
    isSendMail: boolean;
    isPrivate: boolean;
    _id: string;
  };
  // and other properties...
}
