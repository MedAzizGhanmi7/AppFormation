import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cycle } from '../models/cycle';

@Injectable({
  providedIn: 'root'
})
export class CycleServiceService {

  private apiUrl = 'http://localhost:8081/api/v1/cycles';

  constructor(private http: HttpClient) { }

  addCycle(cycle: Cycle): Observable<Cycle> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Cycle>(`${this.apiUrl}/add`, cycle, { headers });
  }

  getAllCycles(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(`${this.apiUrl}/all`);
  }

  getCycle(cycleId: number): Observable<Cycle> {
    return this.http.get<Cycle>(`${this.apiUrl}/byId/${cycleId}`);
  }
}
