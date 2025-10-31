import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { PayFeesComponent } from './pay-fees/pay-fees.component';
import { StudentAnnouncementsComponent } from './student-announcements/student-announcements.component';
import { StudyMaterialComponent } from './study-material/study-material.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { ViewMarksComponent } from './view-marks/view-marks.component';
import { ViewAttendanceComponent } from './attendance/attendance.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    children: [
      { path: 'pay-fees', component: PayFeesComponent },
      { path: 'announcements', component: StudentAnnouncementsComponent },
      {path:'study-material',component : StudyMaterialComponent},
      { path: 'request-leave', component: RequestLeaveComponent },
      { path: 'marks', component: ViewMarksComponent },
      { path: 'attendance', component: ViewAttendanceComponent },
      { path: 'details', component: StudentDetailsComponent }

    ]
  }
];
