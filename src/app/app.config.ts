import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {fakeBackendProvider} from './helpers/backend';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
        //  provideHttpClient(), 
        provideHttpClient(withInterceptorsFromDi()),  // in case there are interceptors 
        fakeBackendProvider,
         provideZoneChangeDetection({ eventCoalescing: true }), 
         provideRouter(routes)
         
         ]
};
