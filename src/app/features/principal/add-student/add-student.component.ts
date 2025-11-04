import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router'
import { map, Observable } from 'rxjs';

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

  constructor(private fb: FormBuilder, private principalService: PrincipalService, private matsnackbar : MatSnackBar,private router: Router) {
    this.studentForm = this.fb.group({
      userName: ['', Validators.required,[this.usernameValidator.bind(this)]],
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      feeDue: ['', [Validators.required,Validators.min(0)]]
    });
  }
  usernameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.principalService.checkUsernameExists(control.value).pipe(
    map((exists: boolean) => (exists ? { usernameTaken: true } : null))
  );
}

  onSubmit() {
    if (this.studentForm.valid) {
      this.principalService.addStudent(this.studentForm.value).subscribe({
        next: () => {
          // this.successMessage = 'Student added successfully!';
          this.matsnackbar.open('Student added successfully!',"close",{duration : 3000});
          this.studentForm.reset();
          this.router.navigate(['/principal']);
        },
        error: (err) => {
          console.error('Error adding student:', err);
          this.successMessage = 'Failed to add student.';
        }
      });
    }
  }
}
