import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedinauthgaurdService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean {
      if (this._authService.isAuthenticated()) {
          this._router.navigate(['/pages']);
          return false;
      } else {
          return true;
      }
  }
}
