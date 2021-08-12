import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeoService } from '../../Services/geo.service';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  cView = false;
  nView = false;
  conView = false;
  loginDetails: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpServiceService,
    public utility: UtilityService,
    public routeData: ActivatedRoute,
  ) {
    this.resetPasswordForm = this.fb.group({
      currentPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeData.queryParams.subscribe(data => {
      // tslint:disable-next-line:no-console
      console.log('data', data);
      this.loginDetails = JSON.parse(data.loginDetails);
      // tslint:disable-next-line:no-console
      console.log('this.loginDetails', this.loginDetails);
    });
  }


  resetPassword() {
    if (this.resetPasswordForm.controls.newPwd.value === this.resetPasswordForm.controls.confirmPwd.value) {
      const obj = {
        oldpassword: this.resetPasswordForm.controls.currentPwd.value,
        password: this.resetPasswordForm.controls.newPwd.value,
      };
      this.http.postToken(`/auth/changepassword`, obj).subscribe(data => {
        if (data.success === true) {
          this.loginDetails[`temppass`] = false;
          localStorage.setItem('pspkey', this.loginDetails.token);
          localStorage.setItem('PSPUser', JSON.stringify(this.loginDetails));
          if (this.loginDetails.idendifier === 'CUSTOMER') {
            this.movetocompany();
          } else {
            this.movetohome();
          }
        } else {
        }
        this.utility.openToast(data[`message`]);
      });
    } else {
      this.utility.openToast(`new password and confirm password does not match`);
    }
  }

  movetocompany() {
    this.router.navigate(['/auth/select-company']);
  }

  movetohome() {
    this.router.navigate(['/pages']);
  }



}
