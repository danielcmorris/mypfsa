import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
import { environment } from '../../../environments/environment';

interface Council {
    councilID: number;
    code: string;
    name: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    secretary: { name: string | null; phone: string | null; email: string | null } | null;
}

@Component({
    selector: 'app-account-council-detail-page',
    standalone: true,
    imports: [CommonModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-council-detail-page.html',
    styleUrl: './account-council-detail-page.scss'
})
export class AccountCouncilDetailPage implements OnInit {
    council: Council | null = null;
    loading = true;
    error = false;

    constructor(private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.http.get<Council>(`${environment.server}/api/council/${id}`).subscribe({
            next: (data) => {
                this.council = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
