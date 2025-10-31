import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  classes: any[] = [];
  showAddForm = false;

  newClass = {
    name: '',
    code: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.http.get<any[]>('http://localhost:8081/api/principal/classes').subscribe({
      next: (data) => (this.classes = data),
      error: (err) => console.error('Error fetching classes', err)
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addClass() {
    if (!this.newClass.name || !this.newClass.code) {
      alert('Please enter both class name and code');
      return;
    }

    this.http.post('http://localhost:8081/api/principal/classes', this.newClass).subscribe({
      next: () => {
        alert('Class added successfully!');
        this.showAddForm = false;
        this.newClass = { name: '', code: '' };
        this.loadClasses(); // refresh
      },
      error: (err) => {
        console.error('Error adding class', err);
        alert('Error adding class');
      }
    });
  }

  // assignTeacher(classId: number) {
    
  // }

  assignStudent(classId: number) {
    // Navigate to assign-student component
  }
}
