import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approve-request',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './approve-leave-request.component.html',
  styleUrls: ['./approve-leave-request.component.css']
})
export class ApproveRequestComponent implements OnInit {

  leaveRequests: any[] = [];
  apiUrl = 'http://localhost:8081/api/teacher/leave';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAssignedRequests();
  }

  loadAssignedRequests(): void {
    this.http.get<any[]>(`${this.apiUrl}/assigned`).subscribe({
      next: (data) => this.leaveRequests = data,
      error: (err) => console.error('Error fetching leave requests', err)
    });
  }

  updateStatus(id: number, status: string): void {
    this.http.post(`${this.apiUrl}/${id}/status?status=${status}`, {}, { responseType: 'json' })
      .subscribe({
        next: () => {
          alert(`Leave ${status.toLowerCase()} successfully!`);
          this.loadAssignedRequests(); // refresh after update
        },
        error: (err) => console.error('Error updating status', err)
      });
  }
}
