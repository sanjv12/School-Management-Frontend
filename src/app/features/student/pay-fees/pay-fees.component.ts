import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-pay-fees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,            // ✅ only FormsModule needed for ngModel
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {

  studentId!: number;
  feeDue: number | null = null;
  successMessage = '';
  errorMessage = '';
  isPaying = false;

  paymentMethod = '';     // 'upi' or 'card'
  upiId = '';
  payingAmount = 0;
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  remarks = 'School Fees';

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
          this.payingAmount = data.feeDue;
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
    if (!this.payingAmount) {
      this.errorMessage = 'Enter amount.';
      return;
    }
    if (this.payingAmount > this.feeDue) {
      this.errorMessage = 'Amount exceeds due.';
      return;
    }
    if (!this.paymentMethod) {
      this.errorMessage = 'Please select a payment method.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isPaying = true;

    let transactionUrl = '';
    let transactionData: any = {};

    if (this.paymentMethod === 'upi') {
      if (!this.upiId) {
        this.errorMessage = 'Please enter your UPI ID.';
        this.isPaying = false;
        return;
      }
      transactionUrl = 'http://localhost:8081/api/transaction/transferByUpi';
      transactionData = {
        fromUpiId: this.upiId,
        toUpiId: 'school@bank',
        toAccountNumber: '1234567890',
        amount: this.payingAmount,
        remarks: this.remarks,
      };

    } else if (this.paymentMethod === 'card') {
      if (!this.cardNumber || !this.expiryDate || !this.cvv) {
        this.errorMessage = 'Please fill in all card details.';
        this.isPaying = false;
        return;
      }
      transactionUrl = 'http://localhost:8081/api/transaction/transferbyDebiCard';
      transactionData = {
        creditCardNumber: this.cardNumber,
        creditCardCvv: this.cvv,
        creditCardExpiryDate: this.expiryDate,
        toUpiId: 'school@bank',
        toAccountNumber: '1234567890',
        amount: this.payingAmount,
        remarks: this.remarks
      };
    }

    // Step 1️⃣ - Perform the transaction
    this.http.post<any>(transactionUrl, transactionData)
      .subscribe({
        next: (response) => {
          if (response?.status === 'Transaction Successful' || response === 'Transaction Successful') {
            // Step 2️⃣ - Mark fee as paid
            this.http.post(`http://localhost:8081/api/student/${this.studentId}/pay/${this.payingAmount}`, {})
              .subscribe({
                next: () => {
                  this.successMessage = 'Payment successful! Fees marked as paid.';
                  this.errorMessage = '';
                  this.feeDue = 0;
                  this.isPaying = false;
                },
                error: (err) => {
                  this.errorMessage = err.error?.message || 'Failed to mark fee as paid.';
                  this.successMessage = '';
                  this.isPaying = false;
                }
              });
          } else {
            this.errorMessage = 'Transaction failed.';
            this.isPaying = false;
          }
        },
        error: (err) => {
          console.error('Transaction error:', err);
          this.errorMessage = err.error?.message || 'Transaction failed.';
          this.isPaying = false;
        }
      });
  }
}
