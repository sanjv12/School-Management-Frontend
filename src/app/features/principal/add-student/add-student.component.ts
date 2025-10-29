import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private principalService: PrincipalService) {
    this.studentForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feeDue: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.principalService.addStudent(this.studentForm.value).subscribe({
        next: () => {
          this.successMessage = 'Student added successfully!';
          this.studentForm.reset();
        },
        error: (err) => {
          console.error('Error adding student:', err);
          this.successMessage = 'Failed to add student.';
        }
      });
    }
  }
}
