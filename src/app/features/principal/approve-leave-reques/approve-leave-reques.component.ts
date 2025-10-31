import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-approve-leave',
  standalone: true,
  imports: [CommonModule, DatePipe, MatButtonModule],
  templateUrl: './approve-leave-reques.component.html',
  styleUrls: ['./approve-leave-reques.component.css']
})
export class ApproveLeaveComponent implements OnInit {

  leaves: any[] = [];
  message: string = '';
  apiUrl = 'http://localhost:8081/api/principal/leave';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.http.get<any[]>(`${this.apiUrl}/assigned`).subscribe({
      next: (data) => this.leaves = data,
      error: (err) => {
        console.error('Error fetching leave requests', err);
        this.message = 'Failed to load leave requests.';
      }
    });
  }

  updateStatus(id: number, status: string): void {
    this.http.post(`${this.apiUrl}/${id}/status?status=${status}`, {}).subscribe({
      next: () => {
        this.message = `Leave request ${status.toLowerCase()} successfully.`;
        this.loadLeaveRequests(); // refresh list
      },
      error: (err) => {
        console.error('Error updating leave status', err);
        this.message = 'Failed to update leave status.';
      }
    });
  }
}
