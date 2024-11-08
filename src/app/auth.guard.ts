import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { map, tap } from 'rxjs';

export const checkAuthState = (isPublic: boolean): CanActivateFn => {
  return () => {
    const router = inject(Router)
    const authState = inject(AuthService)

    return authState.authState$.pipe(
      map(state => {
        if (state && isPublic) {
          router.navigate([''])
          return false
        } else if (!state && !isPublic) {
          router.navigate(['/auth/sign-in'])
          return false
        }
        return true
      }),
      tap(isAllowed => {
        if(!isAllowed) {
          console.warn('Access denied. Redirecting...')
        }
      })
    )
  };
}

export const privateGuard = checkAuthState(false)

export const publicGuard = checkAuthState(true)