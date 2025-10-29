import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {
  announcementForm: FormGroup;
  message = '';
  isSubmitting = false;

  constructor(private fb: FormBuilder, private principalService: PrincipalService) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.announcementForm.invalid) return;
    this.isSubmitting = true;
    this.principalService.createAnnouncement(this.announcementForm.value).subscribe({
      next: () => {
        this.message = 'Announcement created successfully!';
        this.isSubmitting = false;
        this.announcementForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error creating announcement';
        this.isSubmitting = false;
      }
    });
  }
}
