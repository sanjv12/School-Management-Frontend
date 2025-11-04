import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule,AddStudentComponent],
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  displayedColumns: string[] = ['id','userName', 'firstName', 'lastName', 'email', 'feeDue','classId','teacherId','actions'];
  students: any[] = [];
  loading = true;
  error = '';

  constructor(private principalService: PrincipalService,private matsnackbar : MatSnackBar) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.principalService.getAllStudents().subscribe({
      next: (data: any) => {
        // if(!data.classId){
        //   data.classId = "Not Assigned";
        // }
        // if(!data.teacherId){
        //   data.classId = "Not Assigned";
        // }
        this.students = data;
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load students';
        this.loading = false;
      }
    });
  }
  deleteStudent(id: number) {
  if (confirm('Are you sure you want to delete this student?')) {
    this.principalService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== id);
        this.matsnackbar.open('Student deleted Successfully','close',{duration : 3000});
        // alert('Student deleted successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete student.');
      }
    });
  }
}

updateStudent(student: any) {
  const updated = { ...student };

  const firstName = prompt('Enter new first name:', student.firstName);
  if (firstName !== null) updated.firstName = firstName;

  const lastName = prompt('Enter new last name:', student.lastName);
  if (lastName !== null) updated.lastName = lastName;

  const email = prompt('Enter new email:', student.email);
  if (email !== null) updated.email = email;

  const feeDue = prompt('Enter new fee due:', student.feeDue);
  if (feeDue !== null) updated.feeDue = Number(feeDue);

  this.principalService.updateStudent(student.id, updated).subscribe({
    next: (res) => {
      // alert('Student updated successfully!');
      this.matsnackbar.open('Student update Successfully','close',{duration : 3000});
      this.fetchStudents();
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update student.');
    }
  });
}

}
