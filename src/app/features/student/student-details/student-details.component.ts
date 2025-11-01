import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service'; 
@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatSnackBarModule],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any;
  marks: any[] = [];
  attendance: any[] = [];
    studentId!: number; 
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.studentId = storedId;
      this.loadAttendance();
      this.loadStudentDetails();
      this.loadMarks();
      this.studentId = Number(storedId);
    } else {
      this.errorMessage = 'Unable to identify logged-in student.';
    }
  }

  loadStudentDetails() {
    this.http.get(`http://localhost:8081/api/student/${this.studentId}`).subscribe({
      next: (data) => this.student = data,
      error: (err) => this.snackBar.open('Failed to load student details', 'Close', { duration: 3000 })
    });
  }

  loadMarks() {
    this.http.get<any[]>(`http://localhost:8081/api/student/${this.studentId}/marks`).subscribe({
      next: (data) => this.marks = data,
      error: () => this.snackBar.open('Failed to load marks', 'Close', { duration: 3000 })
    });
  }

  loadAttendance() {
    this.http.get<any[]>(`http://localhost:8081/api/student/${this.studentId}/attendance`).subscribe({
      next: (data) => this.attendance = data,
      error: () => this.snackBar.open('Failed to load attendance', 'Close', { duration: 3000 })
    });
  }

  getAttendancePercentage() {
    if (this.attendance.length === 0) return 0;
    const present = this.attendance.filter(a => a.status === 'PRESENT').length;
    return ((present / this.attendance.length) * 100).toFixed(2);
  }
}
