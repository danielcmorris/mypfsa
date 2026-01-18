import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-callback-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="callback-container">
            <div class="callback-content">
                <div class="spinner"></div>
                <h2>Signing you in...</h2>
                <p>Please wait while we complete your authentication.</p>
            </div>
        </div>
    `,
    styles: [`
        .callback-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
        }

        .callback-content {
            text-align: center;
            color: white;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 24px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        h2 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        p {
            font-size: 14px;
            opacity: 0.8;
        }
    `]
})
export class CallbackPage implements OnInit {
    private auth = inject(AuthService);
    private router = inject(Router);

    ngOnInit(): void {
        // Auth0 handles the callback automatically
        // We just need to wait for authentication to complete and redirect
        this.auth.isAuthenticated$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                // Get the target URL from Auth0 app state or default to dashboard
                this.auth.appState$.subscribe(appState => {
                    const target = appState?.target || '/account/dashboard';
                    this.router.navigate([target]);
                });
            }
        });

        // Handle errors
        this.auth.error$.subscribe(error => {
            console.error('Auth0 error:', error);
            this.router.navigate(['/my-account'], {
                queryParams: { error: 'authentication_failed' }
            });
        });
    }
}
