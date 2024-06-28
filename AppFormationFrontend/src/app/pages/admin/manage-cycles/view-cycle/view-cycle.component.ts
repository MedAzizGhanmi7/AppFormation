import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  cycle: Cycle | undefined ;
  newSession: Session = { sessionName: '', startDate: '', endDate: '' }; 

  constructor(private act: ActivatedRoute, private cycleService: CycleServiceService 
    ,private sessionService : SessionServiceService) { }

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

    this.sessionService.addSession(this.newSession, this.cycleId).subscribe(
      (data: Session) => {
        if (!this.cycle) {
          console.error('Cycle is undefined after adding session');
          return;
        }
        if (!this.cycle.sessions) {
          this.cycle.sessions = []; 
        }
        this.cycle.sessions.push(data);
        this.newSession = { sessionName: '', startDate: '', endDate: '' }; 
      },
      error => {
        console.error('Error adding session to cycle', error);
      }
    );
  }
}
