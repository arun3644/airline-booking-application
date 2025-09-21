import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { Flight } from '../../models/flight.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FlightCardComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  flights: Flight[] = [];
  bookings: Booking[] = [];
  errorMsg = '';

  constructor(private flightService: FlightService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadFlights();
    this.loadBookings();
  }

  async loadFlights() {
  try {
    this.flights = await this.flightService.listFlights();
  } catch (err) {
    this.errorMsg = 'Error loading flights';
  }
}

  async loadBookings() {
    try {
      this.bookings = await this.bookingService.getUserBookings();
    } catch (err) {
      this.errorMsg = 'Error loading your bookings';
    }
  }
}
