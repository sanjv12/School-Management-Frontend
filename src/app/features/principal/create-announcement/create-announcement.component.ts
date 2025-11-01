

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {
  announcementForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private http: HttpClient,private matsnackbar: MatSnackBar,private router:Router) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      targetRole: ['', Validators.required] // 👈 Added field
    });
  }

  onSubmit() {
    if (this.announcementForm.invalid) return;

    const payload = this.announcementForm.value;

    this.http.post('http://localhost:8081/api/principal/announcements', payload).subscribe({
      next: () => {
        // this.successMsg = 'Announcement created successfully!';
        this.matsnackbar.open('Announcement created Successfully!!','close',{duration: 3000});
        this.errorMsg = '';
        this.announcementForm.reset();
        this.router.navigate(['/principal']);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to create announcement.';
        this.successMsg = '';
      }
    });
  }
}
