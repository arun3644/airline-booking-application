import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { Booking } from '../models/booking.model';  // <-- ADD THIS

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(data: any, token: string) {
    return this.http.post<Booking>(`${AppConfig.apiUrl}/bookings`, data, { 
      headers: { Authorization: `Bearer ${token}` } 
    }).toPromise();
  }

  listBookings(token: string) {
    return this.http.get<Booking[]>(`${AppConfig.apiUrl}/bookings`, { 
      headers: { Authorization: `Bearer ${token}` } 
    }).toPromise();
  }

  async getUserBookings(): Promise<Booking[]> {
    return (await this.http.get<Booking[]>(`${AppConfig.apiUrl}/bookings/user`).toPromise()) || [] ;
  }

  cancelBooking(id: string, token: string) {
    return this.http.delete(`${AppConfig.apiUrl}/bookings/${id}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    }).toPromise();
  }
}
