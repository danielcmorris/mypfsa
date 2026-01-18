# Authentication & Security

This document describes the authentication and security implementation for the PFSA Member Portal.

## Overview

The application uses **Auth0** for authentication, providing:
- Secure OAuth 2.0 / OpenID Connect authentication
- Social login support (Google)
- Email/password authentication
- JWT-based API authorization
- Persistent sessions via localStorage

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Angular App   │ ───► │     Auth0       │ ───► │   PFSA API      │
│                 │      │  (pfsa.auth0.com)│      │                 │
│  - Login Page   │ ◄─── │  - OAuth Server │ ◄─── │  - Validates JWT│
│  - Route Guards │      │  - User DB      │      │  - Returns Data │
│  - Interceptor  │      │  - Social Login │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Components

### 1. Auth0 Configuration

**File:** `src/app/app.config.ts`

```typescript
provideAuth0({
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    authorizationParams: {
        redirect_uri: window.location.origin + '/callback'
    },
    cacheLocation: 'localstorage',  // Persist tokens
    useRefreshTokens: true          // Enable silent refresh
})
```

| Setting | Purpose |
|---------|---------|
| `cacheLocation: 'localstorage'` | Stores JWT in localStorage for session persistence |
| `useRefreshTokens: true` | Enables refresh tokens for silent authentication |

### 2. Environment Configuration

**Files:**
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

```typescript
auth0: {
    domain: 'pfsa.auth0.com',
    clientId: 'lXAacDYLliyoQDKu2UJXegLnYRhBqnNi',
    authorizationParams: {
        redirect_uri: 'http://localhost:4200/callback'  // or production URL
    }
}
```

### 3. Auth Service

**File:** `src/app/services/auth.service.ts`

Wrapper around Auth0 SDK providing:

| Method | Description |
|--------|-------------|
| `login(returnUrl?)` | Redirect to Auth0 login |
| `loginWithEmailHint(email, returnUrl?)` | Login with email pre-filled |
| `loginWithGoogle(returnUrl?)` | Direct Google OAuth login |
| `logout()` | Clear session and redirect to home |
| `forgotPassword(email)` | Trigger Auth0 password reset |
| `isAuthenticated$` | Observable of auth state |
| `user$` | Observable of user profile |

### 4. Route Guard

**File:** `src/app/guards/auth.guard.ts`

Protects routes from unauthorized access:

```typescript
export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);

    return auth.isAuthenticated$.pipe(
        take(1),
        map(isAuthenticated => {
            if (isAuthenticated) return true;

            // Redirect to Auth0 login, preserving return URL
            auth.loginWithRedirect({
                appState: { target: state.url }
            });
            return false;
        })
    );
};
```

**Protected Routes** (`src/app/app.routes.ts`):
```typescript
{ path: 'account/dashboard', component: DashboardPage, canActivate: [authGuard] },
{ path: 'account/tools', component: AccountToolsPage, canActivate: [authGuard] },
{ path: 'account/forms', component: AccountFormsPage, canActivate: [authGuard] },
{ path: 'account/festas', component: FestaSchedulePage, canActivate: [authGuard] },
{ path: 'account/festa-submit', component: FestaFormPage, canActivate: [authGuard] },
{ path: 'account/profile', component: AccountProfilePage, canActivate: [authGuard] },
```

### 5. HTTP Interceptor

**File:** `src/app/interceptors/auth.interceptor.ts`

Automatically adds JWT to API requests:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);

    // Only add token for API requests
    const isApiRequest = req.url.startsWith(environment.server);
    if (!isApiRequest) return next(req);

    return auth.getAccessTokenSilently().pipe(
        switchMap(token => {
            if (token) {
                const authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return next(authReq);
            }
            return next(req);
        }),
        catchError(() => next(req))
    );
};
```

**Result:** All HTTP requests to the API include:
```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Authentication Flows

### Login Flow

```
1. User visits /my-account
2. User enters email/password and clicks "Sign In"
   └─► OR clicks "Continue with Google"
3. App redirects to Auth0 (with login_hint or connection=google-oauth2)
4. User authenticates with Auth0
5. Auth0 redirects to /callback with authorization code
6. CallbackPage exchanges code for tokens
7. Tokens stored in localStorage
8. User redirected to /account/dashboard
```

### Protected Route Access

```
1. User navigates to /account/dashboard
2. authGuard checks isAuthenticated$
3. If authenticated:
   └─► Allow access
4. If not authenticated:
   └─► Redirect to Auth0 login
   └─► After login, return to original URL
```

### API Request Flow

```
1. Component makes HTTP request to API
2. authInterceptor intercepts request
3. Interceptor retrieves JWT from Auth0 SDK
4. JWT added to Authorization header
5. Request sent to API with Bearer token
6. API validates JWT and returns data
```

### Token Refresh Flow

```
1. Access token expires (typically after 1 hour)
2. Next API request triggers silent refresh
3. Auth0 SDK uses refresh token to get new access token
4. New token stored in localStorage
5. Request continues with fresh token
```

## localStorage Keys

Auth0 stores the following in localStorage:

| Key Pattern | Content |
|-------------|---------|
| `@@auth0spajs@@` | Encrypted token cache |
| `auth0.is.authenticated` | Boolean auth state |

## Security Considerations

### Token Storage
- Tokens stored in localStorage (persistent across sessions)
- Trade-off: Convenience vs. XSS vulnerability
- Mitigated by: Content Security Policy, input sanitization

### HTTPS
- Production must use HTTPS
- Auth0 requires HTTPS for redirect URIs (except localhost)

### Token Expiration
- Access tokens expire after 1 hour (configurable in Auth0)
- Refresh tokens enable silent renewal
- Full re-authentication required if refresh token expires

### CORS
- API must allow requests from the Angular app origin
- Auth0 handles CORS for authentication endpoints

## Auth0 Dashboard Configuration

Required settings in [Auth0 Dashboard](https://manage.auth0.com/):

### Application Settings

| Setting | Development | Production |
|---------|-------------|------------|
| **Allowed Callback URLs** | `http://localhost:4200/callback` | `https://mypfsa.org/callback` |
| **Allowed Logout URLs** | `http://localhost:4200` | `https://mypfsa.org` |
| **Allowed Web Origins** | `http://localhost:4200` | `https://mypfsa.org` |

### API Settings (if using custom API)

1. Create an API in Auth0 Dashboard
2. Set the audience (identifier)
3. Add audience to Angular config:
   ```typescript
   authorizationParams: {
       audience: 'https://api.mypfsa.org'
   }
   ```

### Social Connections

1. Enable Google connection in Auth0 Dashboard
2. Configure Google OAuth credentials
3. Enable connection for your application

## Troubleshooting

### "Callback URL mismatch"
- Add the callback URL to Auth0 Dashboard → Application Settings → Allowed Callback URLs

### "Login required"
- Token expired and refresh failed
- User needs to re-authenticate

### API returns 401 Unauthorized
- Check JWT is being sent (browser DevTools → Network → Headers)
- Verify API is validating the correct Auth0 domain/audience
- Check token expiration

### Tokens not persisting
- Verify `cacheLocation: 'localstorage'` is set
- Check browser isn't blocking localStorage
- Verify no errors in console during login

## File Reference

| File | Purpose |
|------|---------|
| `src/app/app.config.ts` | Auth0 provider configuration |
| `src/app/services/auth.service.ts` | Authentication service wrapper |
| `src/app/guards/auth.guard.ts` | Route protection |
| `src/app/interceptors/auth.interceptor.ts` | JWT injection for API calls |
| `src/app/pages/callback-page/callback-page.ts` | Auth0 redirect handler |
| `src/app/pages/my-account-page/my-account-page.ts` | Login page |
| `src/environments/environment.ts` | Dev Auth0 config |
| `src/environments/environment.prod.ts` | Prod Auth0 config |
