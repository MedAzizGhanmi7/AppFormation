import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticipantCycleComponent } from './paticipant-cycle.component';

describe('PaticipantCycleComponent', () => {
  let component: PaticipantCycleComponent;
  let fixture: ComponentFixture<PaticipantCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaticipantCycleComponent]
    });
    fixture = TestBed.createComponent(PaticipantCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
