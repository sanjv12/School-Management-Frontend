import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service'; 
@Component({
  selector: 'app-pay-fees',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {

  studentId!: number;   // 🔧 replace later with actual logged-in student's ID
  feeDue: number | null = null;
  successMessage = '';
  errorMessage = '';
  isPaying = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.studentId = Number(storedId);
      this.loadStudentFee();
    } else {
      this.errorMessage = 'Unable to identify logged-in student.';
    }
  }

  loadStudentFee(): void {
    this.http.get<any>(`http://localhost:8081/api/student/${this.studentId}`)
      .subscribe({
        next: (data) => {
          this.feeDue = data.feeDue;
        },
        error: (err) => {
          console.error('Error loading student data:', err);
          this.errorMessage = 'Failed to fetch fee details.';
        }
      });
  }

  payFee(): void {
    if (!this.feeDue || this.feeDue <= 0) {
      this.errorMessage = 'No pending fees to pay.';
      return;
    }

    this.isPaying = true;
    this.http.post(`http://localhost:8081/api/student/${this.studentId}/pay`, {})
      .subscribe({
        next: () => {
          this.successMessage = 'Payment successful!';
          this.errorMessage = '';
          this.feeDue = 0;
          this.isPaying = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Payment failed.';
          this.successMessage = '';
          this.isPaying = false;
        }
      });
  }
}
