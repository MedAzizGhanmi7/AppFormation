import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSessionsComponent } from './view-sessions.component';

describe('ViewSessionsComponent', () => {
  let component: ViewSessionsComponent;
  let fixture: ComponentFixture<ViewSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSessionsComponent]
    });
    fixture = TestBed.createComponent(ViewSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
