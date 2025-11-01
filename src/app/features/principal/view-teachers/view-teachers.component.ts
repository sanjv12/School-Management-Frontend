import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from '../../../core/services/principal.service';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
@Component({
  selector: 'app-view-teachers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule,AddTeacherComponent],
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email'];
  teachers: any[] = [];
  loading = true;
  error = '';

  constructor(private principalService: PrincipalService) {}

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
}
