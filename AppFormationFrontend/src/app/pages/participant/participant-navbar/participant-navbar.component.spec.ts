import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantNavbarComponent } from './participant-navbar.component';

describe('ParticipantNavbarComponent', () => {
  let component: ParticipantNavbarComponent;
  let fixture: ComponentFixture<ParticipantNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantNavbarComponent]
    });
    fixture = TestBed.createComponent(ParticipantNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
