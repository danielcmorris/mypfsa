 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Agent } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private agents$?: Observable<Agent[]>;

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    if (!this.agents$) {
      this.agents$ = this.http.get<Agent[]>('/data/agents.json').pipe(
        shareReplay(1)
      );
    }
    return this.agents$;
  }
}