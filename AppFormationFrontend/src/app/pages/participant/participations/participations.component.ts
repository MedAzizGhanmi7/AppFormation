import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/services/models/session';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.scss']
})
export class ParticipationsComponent implements OnInit{

  constructor( private tokenService: TokenService , private sessionService : SessionServiceService) { }

  eamil :string='';
  participations!:Session[];

  ngOnInit(): void {
    this.eamil = this.tokenService.userEmail;
    this.sessionService.getParticipantSessions(this.eamil).subscribe((data) => {
      this.participations = data;
    }, error => {
      console.error('Error fetching participations ', error);
    });
  }



  }


