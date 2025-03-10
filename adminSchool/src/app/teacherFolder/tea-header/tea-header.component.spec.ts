import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaHeaderComponent } from './tea-header.component';

describe('TeaHeaderComponent', () => {
  let component: TeaHeaderComponent;
  let fixture: ComponentFixture<TeaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
