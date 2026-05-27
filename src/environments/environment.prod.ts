export const environment = {
  production: true,
  //server: 'https://pfsaapi.azurewebsites.net'
  //server: 'https://pfsa-api.morrisdev.com',
  server: 'https://pfsa-api-1043942554028.us-west1.run.app',
  googleCalendar: {
    calendarId: 'portfsa@gmail.com',
    apiKey: 'AIzaSyBUSFa3iyp6HPd8g026z0zPK3rAo7osxQ8'
  },
  auth0: {
    domain: 'pfsa.auth0.com',
    clientId: 'lXAacDYLliyoQDKu2UJXegLnYRhBqnNi',
    authorizationParams: {
      redirect_uri: 'https://mypfsa.org/callback'
    }
  }
};

