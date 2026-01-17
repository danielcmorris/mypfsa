import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Observable, of, delay, tap, catchError } from 'rxjs';

@Component({
    selector: 'app-my-account-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './my-account-page.html',
    styleUrl: './my-account-page.scss'
})
export class MyAccountPage {
    email = '';
    password = '';
    rememberMe = false;
    isLoading = false;
    errorMessage = '';

    constructor(private router: Router) {}

    loginWithEmail(): void {
        // For development: redirect immediately to dashboard
        // TODO: Add validation back when authentication is implemented
        this.router.navigate(['/account/dashboard']);

        // TODO: Replace with actual authentication service call when ready
        // Example with RxJS Observable pattern:
        // if (!this.email || !this.password) return;
        // this.isLoading = true;
        // this.errorMessage = '';
        // this.authenticateWithEmail(this.email, this.password)
        //     .pipe(
        //         tap((result) => {
        //             if (result.success) {
        //                 localStorage.setItem('auth_token', result.token);
        //                 this.router.navigate(['/account/dashboard']);
        //             }
        //         }),
        //         catchError((error) => {
        //             this.errorMessage = error.message || 'Authentication failed. Please try again.';
        //             this.isLoading = false;
        //             return of(null);
        //         })
        //     )
        //     .subscribe();
    }

    loginWithGoogle(): void {
        // For development: redirect immediately to dashboard
        this.router.navigate(['/account/dashboard']);

        // TODO: Replace with Auth0 or Google OAuth implementation
        // Example Auth0 popup pattern:
        // this.isLoading = true;
        // this.errorMessage = '';
        // this.auth0Service.loginWithPopup().subscribe({
        //     next: () => this.router.navigate(['/account/dashboard']),
        //     error: (err) => {
        //         this.errorMessage = 'Google sign-in failed. Please try again.';
        //         this.isLoading = false;
        //     }
        // });
    }

    // Mock authentication methods - replace with actual service calls
    private authenticateWithEmail(email: string, password: string): Observable<{ success: boolean; token?: string }> {
        // TODO: Replace with actual HTTP call to authentication endpoint
        // return this.authService.login(email, password);

        // Mock implementation - simulates API call
        return of({ success: true, token: 'mock-jwt-token' }).pipe(
            delay(1500) // Simulate network delay
        );
    }

    private authenticateWithGoogle(): Observable<{ success: boolean; token?: string }> {
        // TODO: Replace with Auth0 loginWithPopup() or Google OAuth
        // return this.auth0Service.loginWithPopup();

        // Mock implementation - simulates OAuth popup
        return of({ success: true, token: 'mock-google-token' }).pipe(
            delay(2000) // Simulate OAuth flow
        );
    }
}
