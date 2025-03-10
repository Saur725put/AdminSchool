import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuHeaderComponent } from './stu-header.component';

describe('StuHeaderComponent', () => {
  let component: StuHeaderComponent;
  let fixture: ComponentFixture<StuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
