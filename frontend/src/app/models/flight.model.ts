// src/app/models/flight.model.ts
export interface Flight {
  _id: string;           // required now
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}
