import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'ngx-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  cView = false;
  nView = false;
  conView = false;
  token: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpServiceService,
    public utility: UtilityService,
    public routeData: ActivatedRoute,
  ) {
    this.forgotPasswordForm = this.fb.group({
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeData.queryParams.subscribe(data => {
      // tslint:disable-next-line:no-console
      console.log('data', data);
      this.token = data.token;
    });
  }


  resetPassword(form) {
    if (this.forgotPasswordForm.controls.newPwd.value === this.forgotPasswordForm.controls.confirmPwd.value) {
      this.utility.showloader();
      const obj = {
        token: this.token,
        password: this.forgotPasswordForm.controls.newPwd.value,
      };
      this.http.postToken(`/auth/resetpassword`, obj).subscribe(data => {
        this.utility.openToast(data[`message`]);
        if (data.success === true) {
          form.resetForm();
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
        }
        this.utility.dismissloader();
      });
    } else {
      this.utility.openToast(`new password and confirm password does not match`);
    }
  }

}
