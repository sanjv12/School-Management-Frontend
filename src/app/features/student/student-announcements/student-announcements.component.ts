import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service'; 
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-student-announcements',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.css']
})
export class StudentAnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  isLoading = true;
  studentId!: number; 
  errorMsg = '';

  private apiUrl = 'http://localhost:8081/api/student';
  // 🔸 Replace later with actual logged-in student's ID

  constructor(private http: HttpClient,private authService: AuthService) {}

 ngOnInit(): void {
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.studentId = storedId;
      this.fetchAnnouncements();
      this.studentId = Number(storedId);
    } else {
      this.errorMsg = 'Unable to identify logged-in student.';
    }
  }

  fetchAnnouncements() {
    this.isLoading = true;
    this.http.get<Announcement[]>(`${this.apiUrl}/${this.studentId}/announcements`)
      .subscribe({
        next: (data) => {
          this.announcements = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Failed to load announcements.';
          this.isLoading = false;
        }
      });
  }
}
