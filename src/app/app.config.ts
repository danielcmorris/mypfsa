import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideAnimationsAsync(),
        // TODO: Re-enable auth interceptor once Auth0 500 error is resolved
        // provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideHttpClient(withFetch()),
        provideAuth0({
            domain: environment.auth0.domain,
            clientId: environment.auth0.clientId,
            authorizationParams: {
                redirect_uri: typeof window !== 'undefined' ? window.location.origin + '/callback' : environment.auth0.authorizationParams.redirect_uri
            },
            // Skip redirect callback for SSR
            skipRedirectCallback: typeof window === 'undefined'
        })
    ]
};