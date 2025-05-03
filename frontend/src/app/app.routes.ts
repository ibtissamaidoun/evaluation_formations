// src/app/app.routes.ts
import { Routes } from '@angular/router';

// import { ResetComponent } from './features/reset/reset.component'; // Importer ton composant
import { Dashboard } from './features/dashboard/dashboard';
import { AppLayout } from './features/layout/component/app.layout';

  export const appRoutes: Routes = [
    {
      // path: 'reset', component: ResetComponent ,
      path: '',  component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            // { path: 'documentation', component: Documentation },
            // { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    // { path: 'landing', component: Landing },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];

