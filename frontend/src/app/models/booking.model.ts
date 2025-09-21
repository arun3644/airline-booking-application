import { User } from './user.model';
import { Flight } from './flight.model';

export interface Passenger {
  name: string;
  age: number;
  seatClass?: string;
}

export interface Booking {
  _id?: string;
  user: User;
  flight: Flight;
  passengers: Passenger[];
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  createdAt?: string;
}
