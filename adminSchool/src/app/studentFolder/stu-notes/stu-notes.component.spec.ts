import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuNotesComponent } from './stu-notes.component';

describe('StuNotesComponent', () => {
  let component: StuNotesComponent;
  let fixture: ComponentFixture<StuNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
