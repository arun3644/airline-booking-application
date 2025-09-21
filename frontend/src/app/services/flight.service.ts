// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AppConfig } from '../app.config';

// @Injectable({
//   providedIn: 'root'
// })
// export class FlightService {

//   constructor(private http: HttpClient) { }

//   listFlights(params: any = {}) {
//     const query = new URLSearchParams(params).toString();
//     return this.http.get(`${AppConfig.apiUrl}/flights?${query}`).toPromise();
//   }

//    async lisdtFlights(): Promise<Flight[]> {
//     return this.http.get<Flight[]>(`${AppConfig.apiUrl}/flights`).toPromise();
//   }

//   getFlight(id: string) {
//     return this.http.get(`${AppConfig.apiUrl}/flights/${id}`).toPromise();
//   }

//     async deleteFlight(id: string): Promise<void> {
//     return this.http.delete<void>(`${AppConfig.apiUrl}/flights/${id}`).toPromise();
//   }

// }




  // flight.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/flight.model';
import { AppConfig } from '../app.config'; // make sure this exists

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {}

  // Correctly typed listFlights
  async listFlights(): Promise<Flight[]> {
  const flights = await this.http.get<Flight[]>(`${AppConfig.apiUrl}/flights`).toPromise();
  return flights ?? []; // if undefined, return empty array
}


   getFlight(id: string) {
    return this.http.get(`${AppConfig.apiUrl}/flights/${id}`).toPromise();
  }


  // Add deleteFlight method here
  async deleteFlight(id: string): Promise<void> {
    return this.http.delete<void>(`${AppConfig.apiUrl}/flights/${id}`).toPromise();
  }
}

