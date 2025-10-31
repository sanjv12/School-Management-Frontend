import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {
  teacherForm!: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private principalService: PrincipalService) {
    this.teacherForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      this.principalService.addTeacher(this.teacherForm.value).subscribe({
        next: () => {
          this.successMessage = 'Teacher added successfully!';
          this.teacherForm.reset();
        },
        error: (err) => {
          console.error('Error adding teacher:', err);
          this.successMessage = 'Failed to add teacher.';
        }
      });
    }
  }
}
