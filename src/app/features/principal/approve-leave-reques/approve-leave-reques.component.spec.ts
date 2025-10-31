import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaveRequesComponent } from './approve-leave-reques.component';

describe('ApproveLeaveRequesComponent', () => {
  let component: ApproveLeaveRequesComponent;
  let fixture: ComponentFixture<ApproveLeaveRequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveLeaveRequesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveLeaveRequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
