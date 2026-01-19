import { NgClass, AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-top-header',
    standalone: true,
    imports: [NgClass, AsyncPipe, NgIf],
    templateUrl: './top-header.html',
    styleUrl: './top-header.scss'
})
export class TopHeader {
    public router = inject(Router);
    public auth = inject(AuthService);

    login(): void {
        this.auth.login();
    }

    logout(): void {
        this.auth.logout();
    }

    goToAccount(): void {
        this.router.navigate(['/my-account']);
    }
}