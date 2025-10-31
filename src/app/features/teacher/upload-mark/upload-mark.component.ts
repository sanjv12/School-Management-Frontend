import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-marks',
  standalone: true,
  templateUrl: './upload-mark.component.html',
  styleUrls: ['./upload-mark.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class UploadMarksComponent {
  markForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.markForm = this.fb.group({
      studentId: ['', Validators.required],
      classId: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.markForm.valid) {
      const payload = this.markForm.value;

      this.http.post('http://localhost:8081/api/teacher/marks', payload).subscribe({
        next: () => {
          this.snackBar.open('Marks uploaded successfully!', 'Close', { duration: 3000 });
          this.markForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to upload marks. Try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
