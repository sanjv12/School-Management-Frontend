import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,    
    SidebarComponent  
  ],
  templateUrl: './principal-dashboard.component.html',
  styleUrls: ['./principal-dashboard.component.css']
})
export class PrincipalDashboardComponent {}
