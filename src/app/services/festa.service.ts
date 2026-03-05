import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { Festa, ApiFestaRequest, ApiFestaResponse } from '../models/festa.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FestaService {
  private festas$?: Observable<Festa[]>;
  private apiBase = `${environment.server}/api/Festas`;

  constructor(private http: HttpClient) { }

  getFestas(): Observable<Festa[]> {
    if (!this.festas$) {
      this.festas$ = this.http.get<Festa[]>('/data/festa-list.json').pipe(
        shareReplay(1)
      );
    }
    return this.festas$;
  }

  getCities(): Observable<string[]> {
    return this.getFestas().pipe(
      map(festas => {
        const cities = [...new Set(festas.map(f => f.city))];
        return cities.sort();
      })
    );
  }

  getFestasByCity(city: string): Observable<Festa[]> {
    return this.getFestas().pipe(
      map(festas => festas.filter(f => f.city.toLowerCase() === city.toLowerCase()))
    );
  }

  getApiFestaList(): Observable<ApiFestaResponse[]> {
    return this.http.get<ApiFestaResponse[]>(this.apiBase);
  }

  getFestaById(id: number): Observable<ApiFestaResponse> {
    return this.http.get<ApiFestaResponse>(`${this.apiBase}/${id}`);
  }

  createFesta(festa: ApiFestaRequest): Observable<unknown> {
    return this.http.post(this.apiBase, festa);
  }

  updateFesta(id: number, festa: ApiFestaRequest): Observable<unknown> {
    return this.http.put(`${this.apiBase}/${id}`, festa);
  }

  deleteFesta(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiBase}/${id}`);
  }
}
