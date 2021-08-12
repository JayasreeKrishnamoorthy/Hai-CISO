import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GeoService } from '../../Services/geo.service';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  cView = false;
  nView = false;
  conView = false;
  constructor(
    public fb: FormBuilder,
    public utility: UtilityService,
    public http: HttpServiceService,
  ) {
    this.resetPasswordForm = this.fb.group({
      currentPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  resetPassword(form) {
    if (this.resetPasswordForm.controls.newPwd.value === this.resetPasswordForm.controls.confirmPwd.value) {
      const obj = {
        oldpassword: this.resetPasswordForm.controls.currentPwd.value,
        password: this.resetPasswordForm.controls.newPwd.value,
      };
      this.http.postToken(`/auth/changepassword`, obj).subscribe(data => {
        if (data.success === true) {
          form.resetForm();
        } else {
        }
        this.utility.openToast(data[`message`]);
      });
    } else {
      this.utility.openToast(`new password and confirm password does not match`);
    }
  }

}
