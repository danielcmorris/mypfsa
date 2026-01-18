import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * HTTP Interceptor that adds JWT Bearer token to all API requests
 * Only adds token to requests going to our API server
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const auth = inject(AuthService);

    // Only add token for requests to our API server
    const isApiRequest = req.url.startsWith(environment.server) ||
                         req.url.startsWith('/api');

    if (!isApiRequest) {
        return next(req);
    }

    // Get the access token and add it to the request
    return auth.getAccessTokenSilently().pipe(
        first(),
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
        catchError(() => {
            // If we can't get a token (user not logged in), proceed without it
            return next(req);
        })
    );
};
