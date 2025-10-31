import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css']
})
export class RequestLeaveComponent {
  studentId = 1; // Replace with actual logged-in student's ID (from auth later)
  reason = '';
  message = '';

  constructor(private http: HttpClient) {}

  requestLeave() {
    if (!this.reason.trim()) {
      this.message = 'Please enter a reason for leave.';
      return;
    }

    const leaveRequest = {
      requesterId: this.studentId,
      requesterRole: 'STUDENT',
      targetRole: 'TEACHER',
      reason: this.reason
    };

    this.http.post(`http://localhost:8081/api/student/${this.studentId}/leave/request`, leaveRequest)
      .subscribe({
        next: () => {
          this.message = 'Leave request submitted successfully!';
          this.reason = '';
        },
        error: (err) => {
          console.error('Error submitting leave request:', err);
          this.message = 'Failed to submit leave request. Please try again.';
        }
      });
  }
}
