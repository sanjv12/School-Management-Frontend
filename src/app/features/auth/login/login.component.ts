import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;  
  isLoading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    const { username, password } = this.loginForm.value;

    // 🔹 Placeholder for API call
    // Replace this with actual AuthService call later
    // this.authService.loginPrincipal(username!, password!).subscribe(...)

    // Temporary mock login
    setTimeout(() => {
      this.isLoading = false;
      if (username === 'principal' && password === 'admin123') {
        alert('Login successful (principal)');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = 'Invalid credentials';
      }
    }, 1000);
  }
}
