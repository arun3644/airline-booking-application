import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async signup() {
    this.errorMsg = '';
    if (this.signupForm.invalid) return;

    try {
      const res: any = await this.authService.register(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      );
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role);
      this.router.navigate(['/flights']);
    } catch (err: any) {
      this.errorMsg = err.error?.message || 'Signup failed';
    }
  }
}
