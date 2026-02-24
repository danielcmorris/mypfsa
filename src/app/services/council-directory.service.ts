import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Council } from '../models/council.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouncilDirectoryService {
  private councils$?: Observable<Council[]>;
  private server = environment.server;

  constructor(private http: HttpClient) {}

  getCouncils(): Observable<Council[]> {
    if (!this.councils$) {
      this.councils$ = this.http.get<Council[]>(`${this.server}/api/council`).pipe(
        shareReplay(1)
      );
    }
    return this.councils$;
  }
}
