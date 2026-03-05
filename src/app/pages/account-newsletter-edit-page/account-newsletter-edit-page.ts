import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';
import { environment } from '../../../environments/environment';

interface Newsletter {
    newsletterID: number;
    type: string;
    releaseDate: string;  // "M/d/yyyy" from API
    title: string;
    imageUrl: string;
    fileUrl: string;
}

@Component({
    selector: 'app-account-newsletter-edit-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, AccountTopHeader, AccountNavbar, Footer],
    templateUrl: './account-newsletter-edit-page.html',
    styleUrl: './account-newsletter-edit-page.scss'
})
export class AccountNewsletterEditPage implements OnInit {
    newsletter: Newsletter | null = null;
    newsletterId!: number;
    isNew = false;
    loading = true;
    loadError = false;

    // Form fields (month = "YYYY-MM")
    formMonth = '';
    formTitle = '';
    formType = 'Newsletter';

    saving = false;
    saveSuccess = false;
    saveError: string | null = null;

    deleting = false;
    deleteConfirm = false;
    deleteError: string | null = null;

    // Image upload
    uploadingImage = false;
    imageSuccess = false;
    imageError: string | null = null;
    selectedImage: File | null = null;
    imagePreview: string | null = null;

    // PDF upload
    uploadingPdf = false;
    pdfSuccess = false;
    pdfError: string | null = null;
    selectedPdf: File | null = null;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam || idParam === 'new') {
            this.isNew = true;
            this.newsletter = { newsletterID: 0, type: 'Newsletter', releaseDate: '', title: '', imageUrl: '', fileUrl: '' };
            this.loading = false;
        } else {
            this.newsletterId = parseInt(idParam, 10);
            this.http.get<Newsletter>(`${environment.server}/api/newsletter/${this.newsletterId}`).subscribe({
                next: (data) => {
                    this.newsletter = { ...data };
                    this.formMonth = this.toMonthInput(data.releaseDate);
                    this.formTitle = data.title;
                    this.formType = data.type;
                    this.loading = false;
                },
                error: () => {
                    this.loadError = true;
                    this.loading = false;
                }
            });
        }
    }

    private toMonthInput(dateStr: string): string {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        this.selectedImage = file;
        this.imagePreview = URL.createObjectURL(file);
        this.imageSuccess = false;
        this.imageError = null;
    }

    onPdfSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        this.selectedPdf = file;
        this.pdfSuccess = false;
        this.pdfError = null;
    }

    uploadFiles(): void {
        if (!this.selectedImage && !this.selectedPdf) return;

        const formData = new FormData();
        if (this.selectedImage) formData.append('image', this.selectedImage);
        if (this.selectedPdf) formData.append('pdf', this.selectedPdf);

        if (this.selectedImage) this.uploadingImage = true;
        if (this.selectedPdf) this.uploadingPdf = true;
        this.imageError = null;
        this.pdfError = null;

        this.http.post<{ imageUrl: string | null; fileUrl: string | null }>(
            `${environment.server}/api/newsletter/${this.newsletterId}/files`, formData
        ).subscribe({
            next: (res) => {
                this.uploadingImage = false;
                this.uploadingPdf = false;
                if (res.imageUrl && this.newsletter) {
                    this.newsletter.imageUrl = res.imageUrl;
                    this.imageSuccess = true;
                    this.selectedImage = null;
                }
                if (res.fileUrl && this.newsletter) {
                    this.newsletter.fileUrl = res.fileUrl;
                    this.pdfSuccess = true;
                    this.selectedPdf = null;
                }
            },
            error: (err) => {
                this.uploadingImage = false;
                this.uploadingPdf = false;
                const msg = err.error?.error ?? 'Upload failed. Please try again.';
                if (this.selectedImage) this.imageError = msg;
                if (this.selectedPdf) this.pdfError = msg;
            }
        });
    }

    saveNewsletter(): void {
        const releaseDate = this.formMonth ? `${this.formMonth}-01` : '';
        const body = { type: this.formType, releaseDate, title: this.formTitle };

        this.saving = true;
        this.saveError = null;
        this.saveSuccess = false;

        if (this.isNew) {
            this.http.post<Newsletter>(`${environment.server}/api/newsletter`, body).subscribe({
                next: (created) => {
                    this.saving = false;
                    this.router.navigate(['/account/newsletters', created.newsletterID, 'edit']);
                },
                error: (err) => {
                    this.saving = false;
                    this.saveError = err.error?.error ?? 'Save failed. Please try again.';
                }
            });
        } else {
            this.http.put(`${environment.server}/api/newsletter/${this.newsletterId}`, body).subscribe({
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

    deleteNewsletter(): void {
        if (!this.deleteConfirm) {
            this.deleteConfirm = true;
            return;
        }
        this.deleting = true;
        this.deleteError = null;
        this.http.delete(`${environment.server}/api/newsletter/${this.newsletterId}`).subscribe({
            next: () => this.router.navigate(['/account/newsletters']),
            error: (err) => {
                this.deleting = false;
                this.deleteConfirm = false;
                this.deleteError = err.error?.error ?? 'Delete failed. Please try again.';
            }
        });
    }

    get isUploading(): boolean {
        return this.uploadingImage || this.uploadingPdf;
    }
}
