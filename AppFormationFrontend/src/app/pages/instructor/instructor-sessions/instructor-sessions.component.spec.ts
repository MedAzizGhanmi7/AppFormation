import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSessionsComponent } from './instructor-sessions.component';

describe('InstructorSessionsComponent', () => {
  let component: InstructorSessionsComponent;
  let fixture: ComponentFixture<InstructorSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSessionsComponent]
    });
    fixture = TestBed.createComponent(InstructorSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
