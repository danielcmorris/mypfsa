import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
import { environment } from '../../../environments/environment';

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
    selector: 'app-account-agent-detail-page',
    standalone: true,
    imports: [CommonModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-agent-detail-page.html',
    styleUrl: './account-agent-detail-page.scss'
})
export class AccountAgentDetailPage implements OnInit {
    agent: Agent | null = null;
    loading = true;
    error = false;

    constructor(private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.http.get<Agent>(`${environment.server}/api/agent/${id}`).subscribe({
            next: (data) => {
                this.agent = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
}
