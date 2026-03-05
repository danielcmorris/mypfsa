import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    selector: 'app-account-agent-edit-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-agent-edit-page.html',
    styleUrl: './account-agent-edit-page.scss'
})
export class AccountAgentEditPage implements OnInit {
    agent: Agent | null = null;
    agentId!: number;
    loading = true;
    loadError = false;

    saving = false;
    saveSuccess = false;
    saveError: string | null = null;

    uploading = false;
    uploadSuccess = false;
    uploadError: string | null = null;
    photoPreview: string | null = null;
    selectedFile: File | null = null;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.agentId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.http.get<Agent>(`${environment.server}/api/agent/${this.agentId}`).subscribe({
            next: (data) => {
                this.agent = { ...data };
                this.loading = false;
            },
            error: () => {
                this.loadError = true;
                this.loading = false;
            }
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        this.selectedFile = file;
        this.photoPreview = URL.createObjectURL(file);
        this.uploadSuccess = false;
        this.uploadError = null;
    }

    uploadPhoto(): void {
        if (!this.selectedFile) return;
        this.uploading = true;
        this.uploadError = null;
        this.uploadSuccess = false;

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.http.post<{ imgUri: string }>(`${environment.server}/api/agent/${this.agentId}/photo`, formData).subscribe({
            next: (res) => {
                this.uploading = false;
                this.uploadSuccess = true;
                if (this.agent) this.agent.imgUri = res.imgUri;
                this.selectedFile = null;
            },
            error: (err) => {
                this.uploading = false;
                this.uploadError = err.error?.error ?? 'Upload failed. Please try again.';
            }
        });
    }

    saveAgent(): void {
        if (!this.agent) return;
        this.saving = true;
        this.saveError = null;
        this.saveSuccess = false;

        this.http.put(`${environment.server}/api/agent/${this.agentId}`, this.agent).subscribe({
            next: () => {
                this.saving = false;
                this.saveSuccess = true;
            },
            error: (err) => {
                this.saving = false;
                this.saveError = err.error?.error ?? 'Save failed. Please try again.';
            }
        });
    }
}
