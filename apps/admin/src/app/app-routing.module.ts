import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full',
      },
      {
        path: 'notification',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/notification/notification.module').then(
            (m) => m.NotificationModule,
          ),
      },
      {
        path: 'role',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'analytics',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/analytics/analytics.module').then(
            (m) => m.AnalyticsModule,
          ),
      },
      // APPEND ANGULAR ROUTES
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
