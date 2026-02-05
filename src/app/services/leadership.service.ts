import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { LeadershipSet } from '../models/leadership.model';

@Injectable({
  providedIn: 'root'
})
export class LeadershipService {
  private leadershipSets$?: Observable<LeadershipSet[]>;

  constructor(private http: HttpClient) { }

  getLeadershipSets(): Observable<LeadershipSet[]> {
    if (!this.leadershipSets$) {
      this.leadershipSets$ = this.http.get<LeadershipSet[]>('/data/leadership.json').pipe(
        shareReplay(1)
      );
    }
    return this.leadershipSets$;
  }
}
