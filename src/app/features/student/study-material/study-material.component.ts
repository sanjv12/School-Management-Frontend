import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-study-material',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.css']
})
export class StudyMaterialComponent implements OnInit {
  materials: any[] = [];
  studentId!: number; 
  errorMessage = '';

  constructor(private http: HttpClient,private authService: AuthService,) {}

 ngOnInit(): void {
    const storedId = this.authService.getUserId();
    if (storedId) {
      this.studentId = storedId;
      this.fetchMaterials();
      this.studentId = Number(storedId);
    } else {
      this.errorMessage = 'Unable to identify logged-in student.';
    }
  }

  fetchMaterials() {
    this.http.get<any[]>(`http://localhost:8081/api/student/${this.studentId}/materials`)
      .subscribe({
        next: (data) => this.materials = data,
        error: (err) => console.error('Error fetching materials:', err)
      });
  }
}
