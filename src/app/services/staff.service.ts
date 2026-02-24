import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Staff } from '../models/staff.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staff$?: Observable<Staff[]>;
  private server = environment.server;

  constructor(private http: HttpClient) {}

  getStaff(): Observable<Staff[]> {
    if (!this.staff$) {
      this.staff$ = this.http.get<Staff[]>(`${this.server}/api/staff`).pipe(
        shareReplay(1)
      );
    }
    return this.staff$;
  }
}
