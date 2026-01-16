import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Council } from '../models/council.model';
import { Agent } from '../models/agent.model';

 
@Injectable({
  providedIn: 'root'
})
export class CouncilDirectoryService {
    private councils$?: Observable<Council[]>;

  constructor(private http: HttpClient) { }

  getCouncils(): Observable<Council[]> {
    if(!this.councils$) {
      this.councils$ = this.http.get<Council[]>('/data/councils.json').pipe(
        shareReplay(1)
      );
    }
    return this.councils$;
  }
}