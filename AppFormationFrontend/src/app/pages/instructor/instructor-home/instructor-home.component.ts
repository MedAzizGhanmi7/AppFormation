import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/services/models/Module';
import { Session } from 'src/app/services/models/session';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-instructor-home',
  templateUrl: './instructor-home.component.html',
  styleUrls: ['./instructor-home.component.scss']
})
export class InstructorHomeComponent implements OnInit {
  sessionId: number = -1;
  email: string = "";
  sessions: Session[] = [];
  newModule: Module = { moduleName: '' };
  isAddingModule: boolean = false;

  constructor(private tokenService: TokenService, private sessionService: SessionServiceService) { }

  ngOnInit(): void {
    this.email = this.tokenService.userEmail;
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessionsByInstructorEmail(this.email).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  addModule(id: any) {
    this.sessionId = id;
    this.isAddingModule = true;
  }

  createModuleAndSetSession() {
    this.sessionService.createModuleAndSetSession(this.newModule, this.sessionId).subscribe((data: Module) => {
      // Find the session by id and push the new module to its modules array
      const session = this.sessions.find(s => s.sessionId === this.sessionId);
      if (session && session.modules) {
        session.modules.push(data);
      }
      this.newModule = { moduleName: '' };
      this.isAddingModule = false; // Hide the form after submitting
    });
  }
}
