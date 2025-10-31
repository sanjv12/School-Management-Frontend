import { Routes } from '@angular/router';
import { TeacherAnnouncementsComponent } from './teacher-announcements/teacher-announcements.component';
import { UploadMaterialComponent } from './upload-material/upload-material.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { UploadAnnouncementComponent } from './upload-announcement/upload-announcement.component';
import { ApproveRequestComponent } from './approve-leave-request/approve-leave-request.component';
import { TeacherLeaveRequestComponent } from './leave-request/leave-request.component';

export const TEACHER_ROUTES: Routes = [
    {
  path: '',
  component: TeacherDashboardComponent,
  children: [
    { path: 'upload-material', component: UploadMaterialComponent },
    { path: 'announcements', component: TeacherAnnouncementsComponent },
    { path: 'upload-announcement', component: UploadAnnouncementComponent},
    { path: 'approve-leave', component: ApproveRequestComponent },
    { path: 'request-leave', component: TeacherLeaveRequestComponent}

    // ...other teacher routes  
  ]
}
];
