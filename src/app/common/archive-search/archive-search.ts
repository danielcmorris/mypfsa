import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-archive-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './archive-search.html',
    styleUrl: './archive-search.scss'
})
export class ArchiveSearchComponent {
    @Input() topic = 'newsletters';

    query = '';

    constructor(private router: Router) {}

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
}
