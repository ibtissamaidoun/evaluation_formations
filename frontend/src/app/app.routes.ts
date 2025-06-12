import { Routes } from '@angular/router';
import { AppLayout } from './features/layout/component/app.layout';
import { Dashboard } from './features/dashboard/dashboard.component';
import { EvaluationComponent  } from './features/pages/Evaluation';
import { ModuleEvaluationComponent } from './features/pages/module-evaluation/module-evaluation.component';
import { ScheduleEvaluationComponent } from './features/dashboard/components/schedule-evaluation.component';
import { SpaceEvaluationComponent } from './features/dashboard/components/space-evaluation.component';
import { ListeComponent } from './features/pages/module-evaluation/module-detail/liste.component';
import { CoursEvaluationComponent } from './features/pages/module-evaluation/cours/cours.component';
import { EvaluationCompleteComponent } from './features/pages/module-evaluation/evaluation-complete.component';
import { TdEvaluationComponent } from './features/pages/module-evaluation/td/td-evaluation.component';
import { TpEvaluationComponent } from './features/pages/module-evaluation/tp/tp-evaluation.component';
import { CcEvaluationComponent } from './features/pages/module-evaluation/CC/cc-evaluation.component';
import { ResetComponent } from './features/reset/reset.component';
import { EspaceEvaluationComponent } from './features/pages/espace-evaluation/espace-evaluation.component';
import { SchedulEvaluationComponent } from './features/pages/schedul-evaluation/schedul-evaluation.component';
import { DashboardAdminCompactComponent } from './features/dashboard_Admin/dashboard_admin-compact.component';
import { EvaluationReportsComponent } from './features/pages/evaluation-reports/evaluation-reports';
import { FormManagementComponent } from './features/pages/new-form-dialog/form-management.component';
import { UserManagementComponent } from './features/pages/user-management/user-management.component';
import { PlatformSettingsComponent } from './features/pages/platform-settings/platform-settings.component';
import {TeacherDashboardComponent} from './features/dashboard_prof/teacher-dashboard.component';
import {EvaluationSelectionPageComponent} from './features/pages/evaluation-selection-page/evaluation-selection-page.component';

export const appRoutes: Routes = [
  {path: 'reset', component: ResetComponent},

    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            {path: 'Evaluation', component: EvaluationComponent},
            { path: 'module-evaluation', component: ModuleEvaluationComponent },
            { path: 'module-evaluation/module-detail/liste', component: ListeComponent },
            {path: 'espace-evaluation', component: EspaceEvaluationComponent},
            {path: 'schedul-evaluation', component:SchedulEvaluationComponent },
            {path: 'module-evaluation/cours', component: CoursEvaluationComponent},
            {path: "module-evaluation/td",
            component: TdEvaluationComponent },
          {
            path: "module-evaluation/tp",
            component: TpEvaluationComponent,
          },
          {
            path: "module-evaluation/cc",
            component: CcEvaluationComponent,
          },
            {
              path: 'module-evaluation/cours/evaluation-complete',
              component: EvaluationCompleteComponent },
            {
              path: 'space-evaluation',
              component: SpaceEvaluationComponent
            },
            {
              path: 'schedule-evaluation',
              component: ScheduleEvaluationComponent}
            ]
            },
    {
            path: 'admin',
            component: AppLayout,
            children: [
                { path: 'dashboard', component: DashboardAdminCompactComponent },
                { path: 'reports/evaluation', component: EvaluationReportsComponent },
                { path: 'form/manage', component: FormManagementComponent },
                { path: 'user/manage', component:  UserManagementComponent},
                { path: 'settings', component: PlatformSettingsComponent }
            ]
        },
        
        {
          path: 'prof',
          component: AppLayout,
          children: [
              { path: 'dashboard', component: TeacherDashboardComponent },
              { path: 'evaluation', component: EvaluationSelectionPageComponent },
              { path: 'form/manage', component: FormManagementComponent },
              { path: 'user/manage', component:  UserManagementComponent},
              { path: 'settings', component: PlatformSettingsComponent }
          ]
      },
];

