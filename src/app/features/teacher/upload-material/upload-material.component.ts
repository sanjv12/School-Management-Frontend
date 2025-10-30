import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-material',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './upload-material.component.html',
  styleUrls: ['./upload-material.component.css']
})
export class UploadMaterialComponent {
  material: {
    title: string;
    contentText: string;
    classId: number | null;
    teacherId: number | null;
  } = {
    title: '',
    contentText: '',
    classId: null,
    teacherId: null
  };

  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    // ✅ temporary teacherId until auth integration
    this.material.teacherId = 1;

    this.http.post('http://localhost:8081/api/teacher/materials', this.material)
      .subscribe({
        next: (res) => {
          this.successMsg = 'Study material uploaded successfully!';
          this.errorMsg = '';
          this.material = { title: '', contentText: '', classId: null, teacherId: null };
        },
        error: (err) => {
          this.errorMsg = 'Failed to upload material.';
          this.successMsg = '';
          console.error(err);
        }
      });
  }
}
