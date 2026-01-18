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

    login(): void {
        this.isLoading = true;
        this.errorMessage = '';
        this.auth.login('/account/dashboard');
    }

    loginWithGoogle(): void {
        // Auth0 handles the Google connection - same as regular login
        // The user will be able to choose Google on the Auth0 login page
        this.login();
    }
}
