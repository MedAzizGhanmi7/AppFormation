import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/services/models/Module';
import { Session } from 'src/app/services/models/session';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-instructor-sessions',
  templateUrl: './instructor-sessions.component.html',
  styleUrls: ['./instructor-sessions.component.scss']
})
export class InstructorSessionsComponent implements OnInit {
  sessionId: number = -1;
  email: string = "";
  sessions: Session[] = [];
  filteredSessions: Session[] = [];
  newModule: Module = { moduleName: '' };
  isAddingModule: boolean = false;
  searchTerm: string = '';
  finishedFilter: string = '';
  validatedFilter: string = '';

  constructor(private tokenService: TokenService, private sessionService: SessionServiceService) { }

  ngOnInit(): void {
    this.email = this.tokenService.userEmail;
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessionsByInstructorEmail(this.email).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
        this.filteredSessions = sessions;
        this.filterSessions();
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  addModule(id: any) {
    this.sessionId = id;
    this.isAddingModule = true;
    
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 200); 
  }
  
  
  createModuleAndSetSession(): void {
    this.sessionService.createModuleAndSetSession(this.newModule, this.sessionId).subscribe((data: Module) => {
      const session = this.sessions.find(s => s.sessionId === this.sessionId);
      if (session && session.modules) {
        session.modules.push(data);
      }
      this.newModule = { moduleName: '' };
      this.isAddingModule = false;
    });
  }

  filterSessions(): void {
    this.filteredSessions = this.sessions.filter(session => {
      const matchesName = session.sessionName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFinished = this.finishedFilter === '' || session.finished?.toString() === this.finishedFilter;
      const matchesValidated = this.validatedFilter === '' || session.validated?.toString() === this.validatedFilter;
      return matchesName && matchesFinished && matchesValidated;
    });
  }
}
