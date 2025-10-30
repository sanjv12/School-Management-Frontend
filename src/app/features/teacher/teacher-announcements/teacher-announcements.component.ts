import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teacher-announcements',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './teacher-announcements.component.html',
  styleUrls: ['./teacher-announcements.component.css']
})
export class TeacherAnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const teacherId = 1; // 🔹 Replace with actual logged-in teacher ID later
    this.http.get<any[]>(`http://localhost:8081/api/teacher/announcements`)
      .subscribe({
        next: (data) => {
          this.announcements = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMsg = 'Failed to load announcements.';
          this.isLoading = false;
          console.error(err);
        }
      });
  }
}
