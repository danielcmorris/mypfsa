import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Magazine, MagazinesByYear } from '../models/magazine.model';
 
@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  private server = environment.server;

  constructor(private http: HttpClient) { }

  getMagazines(): Observable<MagazinesByYear[]> {
    return this.http.get<Magazine[]>(`${this.server}/api/magazine`).pipe(
      map(magazines => this.groupByYear(magazines))
    );
  }

  private groupByYear(magazines: Magazine[]): MagazinesByYear[] {
    // Sort magazines by date descending
    const sorted = magazines.sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return dateB - dateA;
    });

    // Group by year
    const grouped = sorted.reduce((acc, newsletter) => {
      const year = new Date(newsletter.releaseDate).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(newsletter);
      return acc;
    }, {} as Record<number, Magazine[]>);

    // Convert to array and sort years descending
    return Object.keys(grouped)
      .map(year => ({
        year: parseInt(year),
        magazines: grouped[parseInt(year)]
      }))
      .sort((a, b) => b.year - a.year);
  }
}
