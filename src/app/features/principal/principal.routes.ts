import { Routes } from '@angular/router';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { ViewAnnouncementsComponent } from './view-announcements/view-announcements.component';

export const PRINCIPAL_ROUTES: Routes = [
  {
    path: '',
    component: PrincipalDashboardComponent,
    children: [
      { path: 'add-student', component: AddStudentComponent },
      { path: 'add-teacher', component: AddTeacherComponent },
       { path: 'view-students', component: ViewStudentsComponent },
       { path: 'view-teachers', component: ViewTeachersComponent },
          { path: 'create-announcement', component: CreateAnnouncementComponent },
      { path: 'view-announcements', component: ViewAnnouncementsComponent },
      { path: '', redirectTo: 'add-student', pathMatch: 'full' }
    ]
  }
];
