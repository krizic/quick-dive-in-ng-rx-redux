import { Routes } from '@angular/router';

import { TasksPageComponent } from '../pages/tasks-page/tasks-page.component';
import { SigninPageComponent } from '../pages/signin-page/signin-page.component';
import { AuthGuard } from '../guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'tasks',
    component: TasksPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninPageComponent
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
];
