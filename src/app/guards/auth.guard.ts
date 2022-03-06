import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
