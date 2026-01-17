import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { Festa } from '../models/festa.model';

@Injectable({
  providedIn: 'root'
})
export class FestaService {
  private festas$?: Observable<Festa[]>;

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
}
