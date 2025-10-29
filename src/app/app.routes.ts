import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { PrincipalDashboardComponent } from './features/principal/principal-dashboard/principal-dashboard.component';
import { TeacherDashboardComponent } from './features/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './features/student/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalDashboardComponent },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: 'student', component: StudentDashboardComponent },
];
