import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {
  @Input() flight!: Flight; // allow parent to bind [flight]
  @Output() select = new EventEmitter<void>(); // allow parent to handle (select)

  onSelect() {
    this.select.emit();
  }
}
