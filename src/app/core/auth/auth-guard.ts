import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.user() !== null) {
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;
};