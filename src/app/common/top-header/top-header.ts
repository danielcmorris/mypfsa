import { NgClass, AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-top-header',
    standalone: true,
    imports: [RouterLink, NgClass, AsyncPipe, NgIf],
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
        this.router.navigate(['/account/dashboard']);
    }

    /**
     * Debug function to check Auth0 authentication status
     * TODO: Remove once Auth0 integration is working
     */
    checkStatus(): void {
        this.auth.isAuthenticated$.subscribe(isAuth => {
            console.log('isAuthenticated:', isAuth);
            alert('Logged in: ' + isAuth);
        });
        this.auth.user$.subscribe(user => {
            console.log('User:', user);
        });
        this.auth.isLoading$.subscribe(loading => {
            console.log('Loading:', loading);
        });
    }
}