import { Routes } from '@angular/router';
import { TeacherAnnouncementsComponent } from './teacher-announcements/teacher-announcements.component';
import { UploadMaterialComponent } from './upload-material/upload-material.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

export const TEACHER_ROUTES: Routes = [
    {
  path: '',
  component: TeacherDashboardComponent,
  children: [
    { path: 'upload-material', component: UploadMaterialComponent },
    { path: 'announcements', component: TeacherAnnouncementsComponent },
    // ...other teacher routes
  ]
}
];
