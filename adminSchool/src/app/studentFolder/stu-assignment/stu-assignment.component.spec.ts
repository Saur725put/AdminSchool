import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuAssignmentComponent } from './stu-assignment.component';

describe('StuAssignmentComponent', () => {
  let component: StuAssignmentComponent;
  let fixture: ComponentFixture<StuAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
