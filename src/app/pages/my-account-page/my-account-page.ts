import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-my-account-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './my-account-page.html',
    styleUrl: './my-account-page.scss'
})
export class MyAccountPage implements OnInit {
    private auth = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    // Form fields
    email = '';
    password = '';
    showPassword = false;
    rememberMe = false;

    isLoading = false;
    errorMessage = '';

    ngOnInit(): void {
        // Check for auth errors in query params
        this.route.queryParams.subscribe(params => {
            if (params['error'] === 'authentication_failed') {
                this.errorMessage = 'Authentication failed. Please try again.';
            }
        });

        // Redirect authenticated users to dashboard
        this.auth.isAuthenticated$.pipe(take(1)).subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.router.navigate(['/account/dashboard']);
            }
        });
    }

    loginWithEmail(): void {
        if (!this.email || !this.password) {
            this.errorMessage = 'Please enter your email and password.';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        // Redirect to Auth0 with email pre-filled using login_hint
        this.auth.loginWithEmailHint(this.email, '/account/dashboard');
    }

    loginWithGoogle(): void {
        this.isLoading = true;
        this.errorMessage = '';
        // Redirect to Auth0 with Google connection
        this.auth.loginWithGoogle('/account/dashboard');
    }

    forgotPassword(): void {
        if (this.email) {
            // Redirect to Auth0 password reset with email hint
            this.auth.forgotPassword(this.email);
        } else {
            this.errorMessage = 'Please enter your email address first.';
        }
    }
}
