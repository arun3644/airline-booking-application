import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { FlightSearchComponent } from './pages/flight-search/flight-search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'flights', component: FlightSearchComponent, canActivate: [AuthGuard] },
  { path: 'booking/:id', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'flights' }
];
