import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/services/models/session';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.scss']
})
export class ParticipationsComponent implements OnInit {
  email: string = '';
  participations: Session[] = [];
  filteredParticipations: Session[] = [];
  searchTerm: string = '';
  finishedFilter: string = '';

  constructor(private tokenService: TokenService, private sessionService: SessionServiceService) { }

  ngOnInit(): void {
    this.email = this.tokenService.userEmail;
    this.sessionService.getParticipantSessions(this.email).subscribe((data) => {
      this.participations = data;
      this.filteredParticipations = data;
    }, error => {
      console.error('Error fetching participations', error);
    });
  }

  filterSessions(): void {
    this.filteredParticipations = this.participations.filter(session => {
      const matchesName = session.sessionName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFinished = this.finishedFilter === '' || session.finished?.toString() === this.finishedFilter;
      return matchesName && matchesFinished;
    });
  }
}
