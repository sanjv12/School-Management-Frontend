import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Mark {
  id: number;
  subject: string;
  score: number;
  classId: number;
}

@Component({
  selector: 'app-view-marks',
  standalone: true,
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css'],
  imports: [CommonModule, MatCardModule, MatTableModule, MatSnackBarModule]
})
export class ViewMarksComponent implements OnInit {
  marks: Mark[] = [];
  studentId: number = 1; // 🔹 Replace with logged-in student ID (from auth service later)

  displayedColumns: string[] = ['subject', 'score', 'classId'];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchMarks();
  }

  fetchMarks() {
    this.http.get<Mark[]>(`http://localhost:8081/api/student/${this.studentId}/marks`).subscribe({
      next: (data) => {
        this.marks = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load marks. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}
