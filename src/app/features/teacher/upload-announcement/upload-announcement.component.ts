import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './upload-announcement.component.html',
  styleUrls: ['./upload-announcement.component.css']
})
export class UploadAnnouncementComponent {
  announcementForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      // teacherId: ['', Validators.required] // you can replace with auto teacher id later
    });
  }

  onSubmit() {
    if (this.announcementForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    const payload = {
      ...this.announcementForm.value,
      targetRole: 'STUDENT'  // fixed target role for students
    };

    this.isLoading = true;

    this.http.post('http://localhost:8081/api/teacher/announcements', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Announcement posted successfully!', 'Close', { duration: 3000 });
        this.announcementForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Failed to post announcement', 'Close', { duration: 3000 });
      }
    });
  }
}
