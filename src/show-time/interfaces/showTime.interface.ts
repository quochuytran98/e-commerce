import { ShowTime } from '../show-time.schema';

export interface RegisterShowTimeResponse {
  code: number;
  message: string;
  data: Partial<ShowTime>;
}
export interface ShowTimeResponse {
  id: number;

  accountId: number;

  dateTime: Date;

  eventId: number;

  location: string;

  ticketTypes: TicketTypes[];

  createdAt: Date;

  updatedAt: Date;
}
export interface TicketTypes {
  name: string;
  price: number;
  quantity: number;
  seatsPerRow: number;
  note: string;
  color: string;
  _id: string;
}
