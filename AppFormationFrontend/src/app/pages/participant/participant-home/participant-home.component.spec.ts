import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantHomeComponent } from './participant-home.component';

describe('ParticipantHomeComponent', () => {
  let component: ParticipantHomeComponent;
  let fixture: ComponentFixture<ParticipantHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantHomeComponent]
    });
    fixture = TestBed.createComponent(ParticipantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
