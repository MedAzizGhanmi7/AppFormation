import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Cycle } from 'src/app/services/models/cycle';
import { Session } from 'src/app/services/models/session';
import { CycleServiceService } from 'src/app/services/services/cycle-service.service';
import { SessionServiceService } from 'src/app/services/services/session-service.service';

@Component({
  selector: 'app-view-cycle',
  templateUrl: './view-cycle.component.html',
  styleUrls: ['./view-cycle.component.scss']
})
export class ViewCycleComponent implements OnInit {
  cycleId: number = -1;
  cycle: any;
  sessionForm: FormGroup;

  constructor(
    private act: ActivatedRoute,
    private cycleService: CycleServiceService,
    private sessionService: SessionServiceService,
    private fb: FormBuilder
  ) {
    this.sessionForm = this.fb.group({
      sessionName: ['', Validators.required],
      startDate: ['', [Validators.required, this.dateValidator()]],
      endDate: ['', [Validators.required, this.dateValidator()]]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.act.params.subscribe(params => {
      this.cycleId = params['id'];
      this.getCycleDetails(this.cycleId);
    });
  }

  getCycleDetails(cycleId: number): void {
    this.cycleService.getCycle(cycleId).subscribe((data) => {
      this.cycle = data;
    }, error => {
      console.error('Error fetching cycle details', error);
    });
  }

  addSessionsToCycle(): void {
    if (!this.cycle) {
      console.error('Cycle is undefined');
      return;
    }

    if (this.sessionForm.valid) {
      const newSession: Session = this.sessionForm.value;
      this.sessionService.addSession(newSession, this.cycleId).subscribe(
        (data: Session) => {
          if (!this.cycle.sessions) {
            this.cycle.sessions = [];
          }
          this.cycle.sessions.push(data);
          this.sessionForm.reset();
        },
        error => {
          console.error('Error adding session to cycle', error);
        }
      );
    } else {
      Object.keys(this.sessionForm.controls).forEach(key => {
        this.sessionForm.controls[key].markAsTouched();
      });
    }
  }

  validate(sessionId: any): void {
    this.sessionService.validateSession(sessionId).subscribe(
      (validatedSession: Session) => {
        if (this.cycle && this.cycle.sessions) {
          const index = this.cycle.sessions.findIndex((session: { sessionId: any; }) => session.sessionId === sessionId);
          if (index !== -1) {
            this.cycle.sessions[index] = validatedSession;
          }
        }
      },
      error => {
        console.error('Error validating session', error);
      }
    );
  }

  private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(control.value);
      return selectedDate >= today ? null : { invalidDate: true };
    };
  }

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    return startDate && endDate && new Date(startDate) <= new Date(endDate) ? null : { invalidDateRange: true };
  }
}
