import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-teachers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule,AddTeacherComponent],
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {
  displayedColumns: string[] = ['id','userName', 'firstName', 'lastName', 'email','actions'];
  teachers: any[] = [];
  loading = true;
  error = '';

  constructor(private principalService: PrincipalService,private matsnackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers() {
    this.loading = true;
    this.principalService.getAllTeachers().subscribe({
      next: (data: any) => {
        this.teachers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load teachers';
        this.loading = false;
      }
    });
  }
  deleteTeacher(id: number) {
  if (confirm('Are you sure you want to delete this Teacher?')) {
    this.principalService.deleteTeacher(id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(s => s.id !== id);
        this.matsnackbar.open('Teacher deleted Successfully','close',{duration : 3000});
        // alert('Student deleted successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete Teacher.');
      }
    });
  }
}

updateTeacher(teacher: any) {
  const updated = { ...teacher };

  const firstName = prompt('Enter new first name:', teacher.firstName);
  if (firstName !== null) updated.firstName = firstName;

  const lastName = prompt('Enter new last name:', teacher.lastName);
  if (lastName !== null) updated.lastName = lastName;

  const email = prompt('Enter new email:', teacher.email);
  if (email !== null) updated.email = email;

  this.principalService.updateTeacher(teacher.id, updated).subscribe({
    next: (res) => {
      // alert('Student updated successfully!');
      this.matsnackbar.open('Teacher update Successfully','close',{duration : 3000});
      this.fetchTeachers();
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update Teacher.');
    }
  });
}
}
