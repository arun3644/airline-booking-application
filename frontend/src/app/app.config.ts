// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZonelessChangeDetection(),
//     provideRouter(routes), provideClientHydration(withEventReplay())
//   ]
// };
export const AppConfig = {
  production: false,
  apiUrl: 'http://localhost:5000/api',  // Update if your backend runs elsewhere
};
