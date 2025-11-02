import { Routes } from '@angular/router';
 import { LoginComponent } from './features/auth/login/login.component';
import { PrincipalDashboardComponent } from './features/principal/principal-dashboard/principal-dashboard.component'; 
import { TeacherDashboardComponent } from './features/teacher/teacher-dashboard/teacher-dashboard.component';
 import { StudentDashboardComponent } from './features/student/student-dashboard/student-dashboard.component';
  import { PRINCIPAL_ROUTES } from './features/principal/principal.routes'; 
import { studentRoutes } from './features/student/student.routes';
import { TEACHER_ROUTES } from './features/teacher/teacher.routes';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { AuthGuard } from './auth.guard';
  export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }, 
      { path: 'principal', component: PrincipalDashboardComponent, }, 
      { path: 'teacher', component: TeacherDashboardComponent,canActivate: [AuthGuard] }, 
      { path: 'student', component: StudentDashboardComponent,canActivate: [AuthGuard] }, 
      { path: 'principal', children: PRINCIPAL_ROUTES },
      { path:'student',children: studentRoutes },
      { path: 'teacher', children: TEACHER_ROUTES },
      { path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthGuard] }

   ];