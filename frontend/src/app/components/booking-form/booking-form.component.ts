import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  @Input() flight!: Flight;  // <-- important, allow parent to bind flight
  @Output() book = new EventEmitter<any>();  // <-- important, allow parent to capture event

  passengersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passengersForm = this.fb.group({
      passengers: this.fb.array([this.createPassenger()])
    });
  }

  createPassenger(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      seatClass: ['Economy']
    });
  }

  get passengers(): FormArray {
    return this.passengersForm.get('passengers') as FormArray;
  }

  addPassenger() {
    this.passengers.push(this.createPassenger());
  }

  submit() {
    if (this.passengersForm.valid) {
      this.book.emit(this.passengersForm.value);
    }
  }
}
