// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MatToolbarModule, MatButtonModule],
  template: `
    <app-navbar></app-navbar>
    <main class="app-container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-container {
      padding: 20px;
    }
  `]
})
export class AppComponent {}
