import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class TeacherLeaveRequestComponent {
  
  leaveRequest = {
    requesterId: 1,          // you can replace this dynamically (logged-in teacher)
    requesterRole: 'TEACHER',
    targetRole: 'PRINCIPAL', // ✅ Teacher requests go to Principal
    reason: ''  
  };

  message = '';
  apiUrl = 'http://localhost:8081/api/teacher/leave/request'; // adjust if needed

  constructor(private http: HttpClient) {}

  submitRequest(): void {
    if (!this.leaveRequest.reason.trim()) {
      this.message = 'Please enter a valid reason.';
      return;
    }

    this.http.post(this.apiUrl, this.leaveRequest).subscribe({
      next: () => {
        this.message = 'Leave request submitted successfully!';
        this.leaveRequest.reason = '';
      },
      error: (err) => {
        console.error('Error submitting leave request', err);
        this.message = 'Failed to submit leave request. Try again later.';
      }
    });
  }
}
