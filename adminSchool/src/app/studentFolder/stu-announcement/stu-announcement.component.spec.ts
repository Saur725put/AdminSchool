import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuAnnouncementComponent } from './stu-announcement.component';

describe('StuAnnouncementComponent', () => {
  let component: StuAnnouncementComponent;
  let fixture: ComponentFixture<StuAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
