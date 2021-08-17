import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'ngx-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.scss'],
})
export class ForgotPageComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpServiceService,
    public utility: UtilityService,
    public routeData: ActivatedRoute,
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  resetPassword(form) {
    this.utility.showloader();
    const obj = {
      email: this.forgetPasswordForm.controls.email.value,
    };
    this.http.post(`/auth/forget-password`, obj).subscribe(data => {
      this.utility.openToast(data[`message`]);
      if (data.success === true) {
        form.resetForm();
      } else {
      }
      this.utility.dismissloader();
    });
  }

}
