import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-study-material',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.css']
})
export class StudyMaterialComponent implements OnInit {
  materials: any[] = [];
  studentId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMaterials();
  }

  fetchMaterials() {
    this.http.get<any[]>(`http://localhost:8081/api/student/${this.studentId}/materials`)
      .subscribe({
        next: (data) => this.materials = data,
        error: (err) => console.error('Error fetching materials:', err)
      });
  }
}
