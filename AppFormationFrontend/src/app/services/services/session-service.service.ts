import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private apiUrl = 'http://localhost:8081/api/v1/sessions';

  constructor(private http: HttpClient) { }

  addSession(session: Session, cycleId: number): Observable<Session> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Session>(`${this.apiUrl}/add/${cycleId}`, session, { headers });
  }


  getSession(cycleId: number): Observable<Session> {
    return this.http.get<Session>(`${this.apiUrl}/byId/${cycleId}`);
  }


  addInstructorToSession(sessionId: number, instructorId: number): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}/${sessionId}/addInstructor/${instructorId}`, null);
  }
}
