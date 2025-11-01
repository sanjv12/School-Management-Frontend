
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
// import { Router } from 'express';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class ChangePasswordComponent implements OnInit {
  changeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.changeForm = this.fb.group({
      username: localStorage.getItem('username'),
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.changeForm.valid) {
      const { username, oldPassword, newPassword } = this.changeForm.value;
      this.authService.changePassword(username!, oldPassword!, newPassword!).subscribe({
        next: (response) => {
          this.snackBar.open(response, 'Close', { duration: 3000 });
          this.changeForm.reset();
          this.router.navigate(['/login']);
        },
        error: () => {
          this.snackBar.open('Failed to change password', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
