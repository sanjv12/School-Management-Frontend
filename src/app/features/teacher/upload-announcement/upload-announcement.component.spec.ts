import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAnnouncementComponent } from './upload-announcement.component';

describe('UploadAnnouncementComponent', () => {
  let component: UploadAnnouncementComponent;
  let fixture: ComponentFixture<UploadAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
