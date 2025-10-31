import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [MatSnackBarConfig],
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  classForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.classForm.valid) {
      const payload = this.classForm.value;

      this.http.post('http://localhost:8081/api/principal/classes', payload).subscribe({
        next: () => {
          this.snackBar.open('Class added successfully!', 'Close', { duration: 3000 });
          this.classForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to add class. Try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
