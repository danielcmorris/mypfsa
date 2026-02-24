import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Agent } from '../models/agent.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private agents$?: Observable<Agent[]>;
  private server = environment.server;

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    if (!this.agents$) {
      this.agents$ = this.http.get<Agent[]>(`${this.server}/api/agent`).pipe(
        shareReplay(1)
      );
    }
    return this.agents$;
  }
}
