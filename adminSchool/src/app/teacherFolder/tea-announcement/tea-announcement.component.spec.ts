import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaAnnouncementComponent } from './tea-announcement.component';

describe('TeaAnnouncementComponent', () => {
  let component: TeaAnnouncementComponent;
  let fixture: ComponentFixture<TeaAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
