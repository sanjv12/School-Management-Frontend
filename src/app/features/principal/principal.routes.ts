import { Routes } from '@angular/router';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { ViewAnnouncementsComponent } from './view-announcements/view-announcements.component';
import { ApproveLeaveComponent } from './approve-leave-reques/approve-leave-reques.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AssignClassComponent } from './assign-class/assign-class.component';
import { AssignStudentComponent } from './assign-student/assign-student.component';
import { ClassesComponent } from './classes/classes.component';
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
      { path: 'approve-leave', component: ApproveLeaveComponent},
      { path: 'add-class', component: AddClassComponent },
      { path: 'assign-class/:classId', component: AssignClassComponent },
      { path: 'assign-student/:classId', component: AssignStudentComponent },
      { path: 'classes', component: ClassesComponent },
      { path: '', redirectTo: 'add-student', pathMatch: 'full' }
    ]
  }
];
