import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service'; 
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
  leaveRequests: any[] = [];
  message = '';
  apiUrl = 'http://localhost:8081/api/teacher/leave'; // adjust if needed
  teacherId!: number; 
  constructor(private http: HttpClient,private authService:AuthService) {}
   ngOnInit(): void {
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.teacherId = storedId;
      this.teacherId = Number(storedId);
      this.loadRequests();
    } else {
      this.message = 'Unable to identify logged-in Teacher.';
    }
  }
  loadRequests(): void {
    this.http.get<any[]>(`${this.apiUrl}/${this.teacherId}`).subscribe({
      next: (data) => {this.leaveRequests = data;},
      error: (err) => console.error('Error fetching leave requests', err)
    });
  }
  submitRequest(): void {
    if (!this.leaveRequest.reason.trim()) {
      this.message = 'Please enter a valid reason.';
      return;
    }

    this.http.post(`${this.apiUrl}/request`, this.leaveRequest).subscribe({
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
