import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
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
    selector: 'app-account-search-page',
    standalone: true,
    imports: [CommonModule, FormsModule, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-search-page.html',
    styleUrl: './account-search-page.scss'
})
export class AccountSearchPage {
    query = '';
    loading = false;
    error = false;
    result: SearchResponse | null = null;
    renderedSummary: SafeHtml | null = null;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

    search(): void {
        const q = this.query.trim();
        if (!q) return;

        this.loading = true;
        this.error = false;
        this.result = null;
        this.renderedSummary = null;

        this.http.get<SearchResponse>(`${environment.server}/api/search/newsletters`, {
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

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    private buildSummaryHtml(summary: string, results: SearchResultItem[]): SafeHtml {
        // Split on bullet markers: lines/segments starting with "* "
        const segments = summary.split(/(?:^|\n)\s*\*\s+/m).map(s => s.trim()).filter(s => s.length > 0);

        let processed: string;
        if (segments.length > 1) {
            // Render as a bulleted list
            const items = segments.map(seg => `<li>${seg}</li>`).join('');
            processed = `<ul class="summary-bullets">${items}</ul>`;
        } else {
            // No bullets found — replace any stray " * " with a line break
            processed = summary.replace(/\s\*\s/g, '<br>');
        }

        // Resolve footnote links — 1-based positions in the results array
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
}
