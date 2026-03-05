import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
import { environment } from '../../../environments/environment';

interface CouncilForm {
    code: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    secretaryFirstName: string;
    secretaryLastName: string;
    secretaryPhone: string;
    secretaryEmail: string;
}

@Component({
    selector: 'app-account-council-edit-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-council-edit-page.html',
    styleUrl: './account-council-edit-page.scss'
})
export class AccountCouncilEditPage implements OnInit {
    form: CouncilForm = {
        code: '', name: '', address1: '', address2: '',
        city: '', state: 'CA',
        secretaryFirstName: '', secretaryLastName: '',
        secretaryPhone: '', secretaryEmail: ''
    };

    councilId!: number;
    isNew = false;
    loading = true;
    loadError = false;

    saving = false;
    saveSuccess = false;
    saveError: string | null = null;

    deleting = false;
    deleteConfirm = false;
    deleteError: string | null = null;

    states = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
        'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
        'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
        'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
        'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ];

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam || idParam === 'new') {
            this.isNew = true;
            this.loading = false;
        } else {
            this.councilId = parseInt(idParam, 10);
            this.http.get<any>(`${environment.server}/api/council/${this.councilId}`).subscribe({
                next: (data) => {
                    const nameParts = (data.secretary?.name ?? '').split(' ');
                    this.form = {
                        code: data.code ?? '',
                        name: data.name ?? '',
                        address1: data.address1 ?? '',
                        address2: data.address2 ?? '',
                        city: data.city ?? '',
                        state: data.state ?? 'CA',
                        secretaryFirstName: nameParts[0] ?? '',
                        secretaryLastName: nameParts.slice(1).join(' '),
                        secretaryPhone: data.secretary?.phone ?? '',
                        secretaryEmail: data.secretary?.email ?? ''
                    };
                    this.loading = false;
                },
                error: () => {
                    this.loadError = true;
                    this.loading = false;
                }
            });
        }
    }

    save(): void {
        this.saving = true;
        this.saveError = null;
        this.saveSuccess = false;

        const body = {
            code: this.form.code,
            name: this.form.name,
            address1: this.form.address1 || null,
            address2: this.form.address2 || null,
            city: this.form.city || null,
            state: this.form.state || null,
            secretaryFirstName: this.form.secretaryFirstName || null,
            secretaryLastName: this.form.secretaryLastName || null,
            secretaryPhone: this.form.secretaryPhone || null,
            secretaryEmail: this.form.secretaryEmail || null
        };

        if (this.isNew) {
            this.http.post<any>(`${environment.server}/api/council`, body).subscribe({
                next: (created) => {
                    this.saving = false;
                    this.router.navigate(['/account/council', created.councilID]);
                },
                error: (err) => {
                    this.saving = false;
                    this.saveError = err.error?.error ?? 'Save failed. Please try again.';
                }
            });
        } else {
            this.http.put(`${environment.server}/api/council/${this.councilId}`, body).subscribe({
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

    deleteCouncil(): void {
        if (!this.deleteConfirm) {
            this.deleteConfirm = true;
            return;
        }
        this.deleting = true;
        this.deleteError = null;
        this.http.delete(`${environment.server}/api/council/${this.councilId}`).subscribe({
            next: () => this.router.navigate(['/account/council']),
            error: (err) => {
                this.deleting = false;
                this.deleteConfirm = false;
                this.deleteError = err.error?.error ?? 'Delete failed. Please try again.';
            }
        });
    }
}
