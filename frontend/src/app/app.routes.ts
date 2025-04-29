// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { ResetComponent } from './features/reset/reset.component'; // Importer ton composant

export const routes: Routes = [
  { path: 'reset', component: ResetComponent }, // Ta route de reset
  // d'autres routes ici
];
