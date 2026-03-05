import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface CouncilSecretary {
    name: string;
    phone: string | null;
    email: string | null;
}

interface Council {
    councilID: number;
    code: string;
    name: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    secretary: CouncilSecretary | null;
}

@Component({
    selector: 'app-account-council-page',
    standalone: true,
    imports: [CommonModule, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-council-page.html',
    styleUrl: './account-council-page.scss'
})
export class AccountCouncilPage implements OnInit {
    councils: Council[] = [];
    loading = true;
    error = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<Council[]>('https://pfsa-api.morrisdev.com/api/council').subscribe({
            next: (data) => {
                this.councils = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
