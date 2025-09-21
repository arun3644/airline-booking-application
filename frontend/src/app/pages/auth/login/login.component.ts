import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    this.errorMsg = '';
    if (this.loginForm.invalid) return;

    try {
      const res: any = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role);
      this.router.navigate(['/flights']);
    } catch (err: any) {
      this.errorMsg = err.error?.message || 'Login failed';
    }
  }
}
