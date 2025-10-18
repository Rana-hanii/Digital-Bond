import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: '',
    loadComponent: () => import('./pages_/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
