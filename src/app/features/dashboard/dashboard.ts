import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<h1>Dashboard (protected) — logged in as: {{ authService.user()?.sub }}</h1>`
})
export class DashboardComponent {
  authService = inject(AuthService);
}