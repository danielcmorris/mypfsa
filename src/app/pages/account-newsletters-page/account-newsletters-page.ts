import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
import { environment } from '../../../environments/environment';

interface Newsletter {
    newsletterID: number;
    type: string;
    releaseDate: string;
    title: string;
    imageUrl: string;
    fileUrl: string;
}

@Component({
    selector: 'app-account-newsletters-page',
    standalone: true,
    imports: [CommonModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-newsletters-page.html',
    styleUrl: './account-newsletters-page.scss'
})
export class AccountNewslettersPage implements OnInit {
    newsletters: Newsletter[] = [];
    loading = true;
    error = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<Newsletter[]>(`${environment.server}/api/newsletter`).subscribe({
            next: (data) => {
                this.newsletters = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
