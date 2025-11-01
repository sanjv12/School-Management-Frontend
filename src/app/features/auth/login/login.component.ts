import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// 1. Import the AuthService
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;  
  isLoading = false;
  errorMsg = '';

  // 3. Inject AuthService into the constructor
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  private getDashboardPath(role: string): string {
    console.log(role);
    if(role == 'principal'){
      return '/principal';
    }else if(role == 'student'){
      return '/student';
    }else if(role == 'teacher'){
      return '/teacher';
    }else{
      this.authService.logout(); // Assuming you add a logout method
        this.errorMsg = 'Invlaid Username or Password.';
        return '/login'; 
    }

  }
  // 4. Update the onSubmit method
   onSubmit() {
   if (this.loginForm.invalid) {
    this.errorMsg = 'Please fill in all fields';
   return;
  }

  this.isLoading = true;
  this.errorMsg = '';
  const { username, password } = this.loginForm.value;

    // Call the service and subscribe to the role string result
   this.authService.login(username!, password!).subscribe({
      next: (role: string) => {
        // Successful login: Use the returned role to navigate
        this.isLoading = false;
        
        const path = this.getDashboardPath(role);
        
        // Navigate based on the resolved path
        if (path !== '/login') {
            // alert(`Login successful as ${role}! Navigating...`);
            this.snackBar.open('Login Successful!!', 'Close', { duration: 3000 });
            // console.log(path);
            this.router.navigate([path]); 
        }
      },
      error: (err) => {
        // Login failure: Display the error message from the service
        this.isLoading = false;
        this.errorMsg = err.message || 'An error occurred during login.';
      }
    });
  }
}