import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { Flight } from '../../models/flight.model';
import { AuthService } from '../../services/auth.service';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  selectedFlight!: Flight | null; // used in HTML
  errorMsg = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) this.loadFlight(id);
  }

  async loadFlight(id: string) {
    try {
      // Cast the response to Flight to avoid 'undefined' errors
      this.selectedFlight = await this.flightService.getFlight(id) as Flight;
    } catch (err) {
      this.errorMsg = 'Failed to load flight';
    }
  }

  // Called when BookingFormComponent emits 'book'
  async confirmBooking(passengersForm: any) {
    if (!this.selectedFlight) return;
    this.errorMsg = '';
    this.successMsg = '';
    try {
      const token = this.authService.getToken();
      await this.bookingService.createBooking(
        {
          flight: this.selectedFlight._id,
          passengers: passengersForm.passengers,
          totalPrice: this.selectedFlight.price * passengersForm.passengers.length
        },
        token!
      );
      this.successMsg = 'Booking confirmed!';
      // Redirect to user dashboard after 2 seconds
      setTimeout(() => this.router.navigate(['/user-dashboard']), 2000);
    } catch (err) {
      this.errorMsg = 'Booking failed';
    }
  }
}
