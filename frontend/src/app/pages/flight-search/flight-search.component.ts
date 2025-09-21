import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component'; // Import FlightCardComponent

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FlightCardComponent], // Include it here
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  flights: Flight[] = [];
  searchForm: FormGroup;
  errorMsg = '';

  constructor(private flightService: FlightService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      from: [''],
      to: [''],
      date: ['']
    });
  }

  async search() {
    this.errorMsg = '';
    try {
      this.flights = await this.flightService.listFlights();
    } catch (err: any) {
      this.errorMsg = 'Failed to fetch flights';
    }
  }

  selectFlight(flight: Flight) {
    this.router.navigate(['/booking', flight._id]);
  }
}
