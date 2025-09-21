import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FlightCardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  flights: Flight[] = [];
  errorMsg = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  async loadFlights() {
    try {
      this.flights = await this.flightService.listFlights(); // Now correctly typed
    } catch (err) {
      this.errorMsg = 'Error loading flights';
    }
  }

  async deleteFlight(id: string) {
    try {
      await this.flightService.deleteFlight(id); // Service has this method now
      this.flights = this.flights.filter(f => f._id !== id);
    } catch (err) {
      this.errorMsg = 'Failed to delete flight';
    }
  }
}
