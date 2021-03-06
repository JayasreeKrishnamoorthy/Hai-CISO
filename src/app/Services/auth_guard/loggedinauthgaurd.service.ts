import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UtilityService } from '../utility.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedinauthgaurdService implements CanActivate {
  userDetails: any;
  pspCustomerDetails: any;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    public utility: UtilityService,
  ) {

    this.utility.userdetails.subscribe((data: any) => {
      this.userDetails = localStorage.getItem('PSPUser');
      this.userDetails = JSON.parse(this.userDetails);
      this.pspCustomerDetails = localStorage.getItem('PSPCUSTOMER');
      this.pspCustomerDetails = JSON.parse(this.pspCustomerDetails);
    });

    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.pspCustomerDetails = localStorage.getItem('PSPCUSTOMER');
    this.pspCustomerDetails = JSON.parse(this.pspCustomerDetails);
  }

  canActivate(): boolean {
    if (this._authService.isAuthenticated() && this.userDetails) {
      if (this.userDetails?.idendifier === 'CUSTOMER') {
        if (this.pspCustomerDetails) {
          this._router.navigate(['/pages']);
          return false;
        } else {
          return true;
        }
      } else {
        this._router.navigate(['/pages']);
        return false;
      }
    } else {
      return true;
    }
  }
}
