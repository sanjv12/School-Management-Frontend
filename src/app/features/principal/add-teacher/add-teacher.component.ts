import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private principalService: PrincipalService,private matsnakcbar: MatSnackBar,private router: Router) {
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
          // this.successMessage = 'Teacher added successfully!';
          this.matsnakcbar.open('Teacher Added Succesfully!','close',{duration:3000});
          this.teacherForm.reset();
          this.router.navigate(['/principal']);
        },
        error: (err) => {
          console.error('Error adding teacher:', err);
          this.successMessage = 'Failed to add teacher.';
        }
      });
    }
  }
}
