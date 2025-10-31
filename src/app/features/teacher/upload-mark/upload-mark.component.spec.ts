import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMarksComponent } from './upload-mark.component';

describe('UploadMarkComponent', () => {
  let component: UploadMarksComponent;
  let fixture: ComponentFixture<UploadMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
