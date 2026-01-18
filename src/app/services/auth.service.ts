import { Injectable, inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface UserProfile {
    sub: string;
    name: string;
    nickname: string;
    email: string;
    email_verified: boolean;
    picture: string;
    updated_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth0 = inject(Auth0Service);

    // Observable of authentication state
    isAuthenticated$ = this.auth0.isAuthenticated$;

    // Observable of loading state
    isLoading$ = this.auth0.isLoading$;

    // Observable of user profile
    user$ = this.auth0.user$;

    // Observable of access token
    getAccessToken$(): Observable<string> {
        return this.auth0.getAccessTokenSilently().pipe(
            catchError(() => of(''))
        );
    }

    // Login with redirect
    login(returnUrl?: string): void {
        this.auth0.loginWithRedirect({
            appState: { target: returnUrl || '/account/dashboard' }
        });
    }

    // Login with email hint (pre-fills email on Auth0 login page)
    loginWithEmailHint(email: string, returnUrl?: string): void {
        this.auth0.loginWithRedirect({
            appState: { target: returnUrl || '/account/dashboard' },
            authorizationParams: {
                login_hint: email
            }
        });
    }

    // Login with Google connection
    loginWithGoogle(returnUrl?: string): void {
        this.auth0.loginWithRedirect({
            appState: { target: returnUrl || '/account/dashboard' },
            authorizationParams: {
                connection: 'google-oauth2'
            }
        });
    }

    // Forgot password - redirect to Auth0 password reset
    forgotPassword(email: string): void {
        const resetUrl = `https://${environment.auth0.domain}/dbconnections/change_password`;
        // Open password reset in new tab or redirect
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = resetUrl;
        form.target = '_blank';

        const clientIdInput = document.createElement('input');
        clientIdInput.type = 'hidden';
        clientIdInput.name = 'client_id';
        clientIdInput.value = environment.auth0.clientId;
        form.appendChild(clientIdInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'hidden';
        emailInput.name = 'email';
        emailInput.value = email;
        form.appendChild(emailInput);

        const connectionInput = document.createElement('input');
        connectionInput.type = 'hidden';
        connectionInput.name = 'connection';
        connectionInput.value = 'Username-Password-Authentication';
        form.appendChild(connectionInput);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    // Login with popup (alternative method)
    loginWithPopup(): Observable<void> {
        return this.auth0.loginWithPopup();
    }

    // Logout
    logout(): void {
        this.auth0.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }

    // Get user profile synchronously (for use in components)
    getUserProfile(): Observable<UserProfile | null | undefined> {
        return this.user$.pipe(
            map(user => user as UserProfile | null | undefined)
        );
    }

    // Check if user has a specific role (if using Auth0 roles)
    hasRole$(role: string): Observable<boolean> {
        return this.user$.pipe(
            map(user => {
                if (!user) return false;
                const roles = (user as Record<string, unknown>)['https://mypfsa.org/roles'] as string[] || [];
                return roles.includes(role);
            })
        );
    }

    // Check if user has a specific permission
    hasPermission$(permission: string): Observable<boolean> {
        return this.user$.pipe(
            map(user => {
                if (!user) return false;
                const permissions = (user as Record<string, unknown>)['https://mypfsa.org/permissions'] as string[] || [];
                return permissions.includes(permission);
            })
        );
    }
}
