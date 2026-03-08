import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { Footer } from '../../common/footer/footer';
import { NewslettersComponent } from '../../common/newsletters/newsletters';
import { environment } from '../../../environments/environment';

interface SearchResultItem {
    documentId: string;
    title: string;
    snippet: string;
    fileUrl?: string;
    relevanceScore: number;
    metadata: Record<string, string>;
}

interface SearchResponse {
    summary: string;
    results: SearchResultItem[];
    nextPageToken?: string;
    totalSize: number;
}

@Component({
    selector: 'app-search-page',
    standalone: true,
    imports: [CommonModule, FormsModule, TopHeader, Navbar, Footer, NewslettersComponent],
    templateUrl: './search-page.html',
    styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {
    topic = '';
    query = '';
    private lastRanQuery = '';
    loading = false;
    error = false;
    result: SearchResponse | null = null;
    renderedSummary: SafeHtml | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(([params, queryParams]) => {
            this.topic = params.get('topic') ?? '';
            const q = queryParams.get('q') ?? '';
            if (q && q !== this.lastRanQuery) {
                this.query = q;
                this.runSearch();
            }
        });
    }

    search(): void {
        const q = this.query.trim();
        if (!q) return;
        this.router.navigate(['/search', this.topic], { queryParams: { q } });
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    clear(): void {
        this.query = '';
        this.result = null;
        this.renderedSummary = null;
        this.error = false;
        this.loading = false;
        this.lastRanQuery = '';
        this.router.navigate(['/search', this.topic], { queryParams: {} });
    }

    private runSearch(): void {
        const q = this.query.trim();
        if (!q || !this.topic) return;

        this.lastRanQuery = q;
        this.loading = true;
        this.error = false;
        this.result = null;
        this.renderedSummary = null;

        this.http.get<SearchResponse>(`${environment.server}/api/search/${this.topic}`, {
            params: { query: q }
        }).subscribe({
            next: (data) => {
                this.result = data;
                this.renderedSummary = this.buildSummaryHtml(data.summary, data.results ?? []);
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }

    private buildSummaryHtml(summary: string, results: SearchResultItem[]): SafeHtml {
        const segments = summary.split(/(?:^|\n)\s*\*\s+/m).map(s => s.trim()).filter(s => s.length > 0);

        let processed: string;
        if (segments.length > 1) {
            const items = segments.map(seg => `<li>${seg}</li>`).join('');
            processed = `<ul class="summary-bullets">${items}</ul>`;
        } else {
            processed = summary.replace(/\s\*\s/g, '<br>');
        }

        const html = processed.replace(/\[(\d+)\]/g, (match, num) => {
            const idx = parseInt(num, 10);
            const item = results[idx - 1];
            if (item?.fileUrl) {
                return `<a href="${item.fileUrl}" target="_blank" rel="noopener" class="footnote-link" title="${item.title}">[${idx}]</a>`;
            }
            return match;
        });

        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    get topicLabel(): string {
        return this.topic.charAt(0).toUpperCase() + this.topic.slice(1);
    }
}
