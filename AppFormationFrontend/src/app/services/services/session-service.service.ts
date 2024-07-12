import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { Module } from '../models/Module';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private apiUrl = 'http://localhost:8081/api/v1/sessions';
  private moduleApiUrl = 'http://localhost:8081/api/v1/modules';
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

  getSessionsByInstructorEmail(email: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/instructor/${email}`);
  }

  
  getParticipantSessions(email: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/Participations/${email}`);
  }

  createModuleAndSetSession(module: Module, sessionId: number): Observable<Module> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Module>(`${this.moduleApiUrl}/${sessionId}`, module, { headers });
  }

  participateInSession(sessionId: number, participantEmail: string): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}/participate/${sessionId}/${participantEmail}`, null);
  }
}
