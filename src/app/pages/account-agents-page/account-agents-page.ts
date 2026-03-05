import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface Agent {
    agentID: number;
    firstName: string;
    lastName: string;
    license: string;
    phone: string;
    email: string;
    imgUri: string | null;
    councilID: number | null;
    officeHours: string;
    languages: string;
    facebook: string | null;
    linkedIn: string | null;
    fax: string | null;
}

@Component({
    selector: 'app-account-agents-page',
    standalone: true,
    imports: [CommonModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-agents-page.html',
    styleUrl: './account-agents-page.scss'
})
export class AccountAgentsPage implements OnInit {
    agents: Agent[] = [];
    loading = true;
    error = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<Agent[]>(`${environment.server}/api/agent`).subscribe({
            next: (data) => {
                this.agents = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
