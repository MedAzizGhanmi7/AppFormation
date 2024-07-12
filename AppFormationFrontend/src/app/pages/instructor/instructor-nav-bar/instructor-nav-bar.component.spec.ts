import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorNavBarComponent } from './instructor-nav-bar.component';

describe('InstructorNavBarComponent', () => {
  let component: InstructorNavBarComponent;
  let fixture: ComponentFixture<InstructorNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorNavBarComponent]
    });
    fixture = TestBed.createComponent(InstructorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
