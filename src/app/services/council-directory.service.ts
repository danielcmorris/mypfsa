import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Council } from '../models/council.model';

 
@Injectable({
  providedIn: 'root'
})
export class CouncilDirectoryService {

  constructor(private http: HttpClient) { }

  getCouncils(): Observable<Council[]> {
    return this.http.get<Council[]>('/data/councils.json');
  }
}