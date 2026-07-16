import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/layout/layout').then(m => m.LayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'debts', loadComponent: () => import('./features/debts/debt-list/debt-list').then(m => m.DebtListComponent) },
      { path: 'debts', loadComponent: () => import('./features/debts/debt-list/debt-list').then(m => m.DebtListComponent) },
      { path: 'debts/new', loadComponent: () => import('./features/debts/debt-form/debt-form').then(m => m.DebtFormComponent) },
      { path: 'debts/:uuid/edit', loadComponent: () => import('./features/debts/debt-form/debt-form').then(m => m.DebtFormComponent) },
      { path: 'debts/:uuid', loadComponent: () => import('./features/debts/debt-detail/debt-detail').then(m => m.DebtDetailComponent) }
    ]
  },
  { path: '**', redirectTo: 'login' }
];