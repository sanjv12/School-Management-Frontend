import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PrincipalService } from '../../../core/services/principal.service';

@Component({
  selector: 'app-view-announcements',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.css']
})
export class ViewAnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  loading = true;
  error = '';

  constructor(private principalService: PrincipalService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loading = true;
    this.principalService.getAllAnnouncements().subscribe({
      next: (data: any) => {
        this.announcements = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load announcements';
        this.loading = false;
      }
    });
  }
}
