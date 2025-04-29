import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http'; // <-- Correction ici
//import { HttpClientModule } from '@angular/common/http'; // Facultatif, juste pour clarification

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),  // Correctement importé depuis '@angular/common/http'
    provideRouter(routes)
  ]
};
