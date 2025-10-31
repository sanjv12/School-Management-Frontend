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
  selector: 'app-assign-class',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.css']
})
export class AssignClassComponent implements OnInit {
  classId!: number;
  teachers: any[] = [];
  selectedTeacherId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.fetchTeachers();
  }

  fetchTeachers() {
    this.http.get<any[]>('http://localhost:8081/api/principal/teachers').subscribe({
      next: (res) => (this.teachers = res),
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load teachers', 'Close', { duration: 3000 });
      }
    });
  }

  assignTeacher() {
    if (!this.selectedTeacherId) return;

    this.http
      .post(`http://localhost:8081/api/principal/classes/${this.classId}/assign/${this.selectedTeacherId}`, {})
      .subscribe({
        next: () => {
          this.snackBar.open('Teacher assigned successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to assign teacher', 'Close', { duration: 3000 });
        }
      });
  }
}
