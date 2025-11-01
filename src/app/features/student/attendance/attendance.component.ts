import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-view-attendance',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatSnackBarModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['date', 'classId', 'status'];
  attendanceList: any[] = [];
  errorMessage = '';
  studentId!: number; // 🔹 Replace with actual logged-in student ID

  constructor(private http: HttpClient, private snackBar: MatSnackBar,private authService: AuthService) {}

  ngOnInit(): void {
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.studentId = storedId;
      this.loadAttendance();
      this.studentId = Number(storedId);
    } else {
      this.errorMessage = 'Unable to identify logged-in student.';
    }
  }

  loadAttendance() {
    this.http.get<any[]>(`http://localhost:8081/api/student/${this.studentId}/attendance`).subscribe({
      next: (data) => {
        this.attendanceList = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load attendance.', 'Close', { duration: 3000 });
      }
    });
  }

  getTotalPresent() {
    return this.attendanceList.filter(a => a.status === 'PRESENT').length;
  }

  getTotalAbsent() {
    return this.attendanceList.filter(a => a.status === 'ABSENT').length;
  }

  getAttendancePercentage() {
    if (this.attendanceList.length === 0) return 0;
    return ((this.getTotalPresent() / this.attendanceList.length) * 100).toFixed(2);
  }
}
