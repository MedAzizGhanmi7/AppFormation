import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { SessionServiceService } from 'src/app/services/services/session-service.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-instructor-calendar',
  templateUrl: './instructor-calendar.component.html',
  styleUrls: ['./instructor-calendar.component.scss']
})
export class InstructorCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  email: string = "";

  constructor(private tokenService: TokenService, private sessionService: SessionServiceService) { }

  ngOnInit(): void {
    this.email = this.tokenService.userEmail;
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessionsByInstructorEmail(this.email).subscribe(
      (sessions: any[]) => {
        this.events = sessions.filter(s => !s.finished).map(session => ({
          start: new Date(session.startDate),
          end: new Date(session.endDate),
          title: session.sessionName,
          color: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
          }
        }));
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }
}
