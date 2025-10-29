import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'feeDue'];
  students: any[] = [];
  loading = true;
  error = '';

  constructor(private principalService: PrincipalService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.principalService.getAllStudents().subscribe({
      next: (data: any) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load students';
        this.loading = false;
      }
    });
  }
}
