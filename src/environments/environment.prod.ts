export const environment = {
  production: true,
  //server: 'https://pfsaapi.azurewebsites.net'
  server: 'https://pfsa-api.morrisdev.com',
  googleCalendar: {
    calendarId: 'portfsa@gmail.com',
    apiKey: 'AIzaSyBUSFa3iyp6HPd8g026z0zPK3rAo7osxQ8'
  },
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN.auth0.com',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    authorizationParams: {
      redirect_uri: 'https://mypfsa.org/callback'
    }
  }
};
