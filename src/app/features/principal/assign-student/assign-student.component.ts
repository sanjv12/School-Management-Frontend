import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assign-student',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit {
  classId!: number;
  students: any[] = [];
  selectedStudentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:8081/api/principal/students').subscribe({
      next: (res) => (this.students = res),
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load students', 'Close', { duration: 3000 });
      }
    });
  }

  assignStudent() {
    if (!this.selectedStudentId) return;

    this.http
      .post(
        `http://localhost:8081/api/principal/students/${this.selectedStudentId}/assign/${this.classId}`,
        {}
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Student assigned successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to assign student', 'Close', { duration: 3000 });
        }
      });
  }
}
