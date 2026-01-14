import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Newsletter, NewslettersByYear } from '../models/newsletter.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private server = environment.server;

  constructor(private http: HttpClient) {}

  getNewsletters(): Observable<NewslettersByYear[]> {
    return this.http.get<Newsletter[]>(`${this.server}/api/newsletter`).pipe(
      map(newsletters => this.groupByYear(newsletters))
    );
  }

  private groupByYear(newsletters: Newsletter[]): NewslettersByYear[] {
    // Sort newsletters by date descending
    const sorted = newsletters.sort((a, b) => {
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
    }, {} as Record<number, Newsletter[]>);

    // Convert to array and sort years descending
    return Object.keys(grouped)
      .map(year => ({
        year: parseInt(year),
        newsletters: grouped[parseInt(year)]
      }))
      .sort((a, b) => b.year - a.year);
  }
}
