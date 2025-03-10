import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaAssignmentComponent } from './tea-assignment.component';

describe('TeaAssignmentComponent', () => {
  let component: TeaAssignmentComponent;
  let fixture: ComponentFixture<TeaAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
