import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('guest guard: authenticated');
    return true;
  }

  console.log('guest guard: not authenticated');


  authService.removeToken('portal-access-token')
  router.navigate(['/login']);
  return false;
};

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('auth guard: authenticated');
    router.navigate(['/portal']);
    return false;
  }

  console.log('auth guard: not authenticated');
  return true;
};


