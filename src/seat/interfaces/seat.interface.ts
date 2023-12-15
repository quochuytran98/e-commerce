export interface Seat {
  id: number;

  eventId: number;

  showTimeId: number;

  accountId: number;

  ticketTypeId: string;

  seatNumber: string;

  price: string;

  note: string;

  name: string;

  status: 'AVAILABLE' | 'BOOKED' | 'SOLD';

  bookedAt: Date;

  soldAt: Date;

  createdAt: Date;

  updatedAt: Date;
}
