import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCycleComponent } from './view-cycle.component';

describe('ViewCycleComponent', () => {
  let component: ViewCycleComponent;
  let fixture: ComponentFixture<ViewCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCycleComponent]
    });
    fixture = TestBed.createComponent(ViewCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
