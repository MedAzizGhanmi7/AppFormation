import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/services/models';
import { Cycle } from 'src/app/services/models/cycle';
import { Session } from 'src/app/services/models/session';
import { UserService } from 'src/app/services/services';
import { CycleServiceService } from 'src/app/services/services/cycle-service.service';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-available-sessions',
  templateUrl: './available-sessions.component.html',
  styleUrls: ['./available-sessions.component.scss']
})
export class AvailableSessionsComponent implements OnInit {

  cycleId: number = -1;
  cycle: Cycle | undefined;
  newSession: Session = { sessionName: '', startDate: '', endDate: '', participantCount: 0 }; 
  participantEmail: string = '';
  currentUser!: User;

  constructor(
    private act: ActivatedRoute,
    private cycleService: CycleServiceService,
    private sessionService: SessionServiceService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.act.params.subscribe(params => {
      this.cycleId = params['id'];
      this.getCycleDetails(this.cycleId);
      this.participantEmail = this.tokenService.userEmail;
      this.userService.getUserByEmail(this.participantEmail).subscribe((data) => {
        this.currentUser = data;
      }, error => {
        console.error('Error fetching user', error);
      });
    });
  }

  getCycleDetails(cycleId: number): void {
    this.cycleService.getCycle(cycleId).subscribe((data) => {
      this.cycle = data;
    }, error => {
      console.error('Error fetching cycle details', error);
    });
  }

  shouldShowParticipateButton(session: Session): boolean {
    if (session.finished || !session.participants) {
      return false;
    }
    return !session.participants.some(participant => participant.userId === this.currentUser?.userId);
  }

  participate(sessionId: number | undefined): void {
    if (sessionId) {
      this.sessionService.participateInSession(sessionId, this.participantEmail).subscribe((updatedSession) => {
        if (this.cycle && this.cycle.sessions) {
          const session = this.cycle.sessions.find(s => s.sessionId === sessionId);
          if (session) {
            session.participantCount = updatedSession.participantCount;
            session.participants = updatedSession.participants; // Assuming this property is updated
          }
        }
      }, error => {
        console.error('Error adding participation', error);
      });
    }
  }
}
