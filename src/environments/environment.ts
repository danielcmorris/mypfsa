export const environment = {
  production: false,
  server: 'http://localhost:5222',
  googleCalendar: {
    calendarId: 'portfsa@gmail.com',
    apiKey: 'AIzaSyBUSFa3iyp6HPd8g026z0zPK3rAo7osxQ8'
  },
  // Auth0 SPA application - new app created to debug 500 error
  auth0: {
    domain: 'pfsa.auth0.com',
    clientId: '6zwN2Y86t4gaccYLPopYrIMSFLXJVwO1', // New SPA app
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/callback'
    }
  }
};
