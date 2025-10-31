import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-upload-attendance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './upload-attendence.component.html',
  styleUrls: ['./upload-attendence.component.css']
})
export class UploadAttendanceComponent {
  attendanceForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.attendanceForm = this.fb.group({
      studentId: ['', Validators.required],
      classId: ['', Validators.required],
      present: ['', Validators.required], // Default value
    });
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      const payload = {
        ...this.attendanceForm.value,
        date: new Date().toISOString().split('T')[0] // set current date
      };

      this.http.post('http://localhost:8081/api/teacher/attendance', payload).subscribe({
        next: () => {
          this.snackBar.open('Attendance uploaded successfully!', 'Close', { duration: 3000 });
          this.attendanceForm.reset({ status: 'PRESENT' });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to upload attendance.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
    }
  }
}
