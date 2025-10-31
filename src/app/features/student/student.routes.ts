import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { PayFeesComponent } from './pay-fees/pay-fees.component';
import { StudentAnnouncementsComponent } from './student-announcements/student-announcements.component';
import { StudyMaterialComponent } from './study-material/study-material.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    children: [
      { path: 'pay-fees', component: PayFeesComponent },
      { path: 'announcements', component: StudentAnnouncementsComponent },
      {path:'study-material',component : StudyMaterialComponent},
      { path: 'request-leave', component: RequestLeaveComponent }
    ]
  }
];
