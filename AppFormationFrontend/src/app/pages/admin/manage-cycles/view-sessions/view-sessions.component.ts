import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/services/models';
import { Session } from 'src/app/services/models/session';
import { UserService } from 'src/app/services/services';
import { SessionServiceService } from 'src/app/services/services/session-service.service';

@Component({
  selector: 'app-view-sessions',
  templateUrl: './view-sessions.component.html',
  styleUrls: ['./view-sessions.component.scss']
})
export class ViewSessionsComponent implements OnInit {
  sessionId: number = -1;
  session: Session | undefined;
  instructors: User[] | undefined;
  selectedInstructorId: number | undefined;

  constructor(private act: ActivatedRoute, private sessionService: SessionServiceService, private userService: UserService) { }

  ngOnInit(): void {
    this.act.params.subscribe(params => {
      this.sessionId = params['id'];
      this.getSessionDetails(this.sessionId);
      this.getInstructors();
    });
  }

  getSessionDetails(sessionId: number): void {
    this.sessionService.getSession(sessionId).subscribe((data) => {
      this.session = data;
    }, error => {
      console.error('Error fetching session details', error);
    });
  }

  getInstructors(): void {
    this.userService.findAllInstructors(this.sessionId).subscribe((data) => {
      this.instructors = data;
    }, error => {
      console.error('Error fetching instructors', error);
    });
  }

  onInstructorSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedInstructorId = Number(selectElement.value);
  }

  addInstructorToSession(): void {
    if (this.selectedInstructorId && this.sessionId) {
      const selectedInstructor = this.instructors?.find(instructor => instructor.userId === this.selectedInstructorId);
      if (this.session && selectedInstructor) {
        this.session.instructors = this.session.instructors || [];
        this.session.instructors.push(selectedInstructor);

        this.instructors = this.instructors?.filter(instructor => instructor.userId !== this.selectedInstructorId);
      }

      this.sessionService.addInstructorToSession(this.sessionId, this.selectedInstructorId).subscribe((updatedSession) => {
        this.session = updatedSession;
      }, error => {
        console.error('Error adding instructor to session', error);
      });
    }
  }
  
}
