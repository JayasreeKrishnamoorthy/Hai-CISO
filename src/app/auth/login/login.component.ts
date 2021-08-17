import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Login } from '../../Responses/auth';
import { GeoService } from '../../Services/geo.service';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
import { HttpConfigInterceptor } from '../../Services/http_service/httpConfig.interceptor';
import { UtilityService } from '../../Services/utility.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cView = false;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServiceService,
    public utility: UtilityService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  login(): void {
    this.utility.showloader();
    const data = {
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,
    };
    this.httpService.doLogin(data).subscribe(res => {
      if (res.success === true) {
        // if (res?.data?.temppass === true) {
        //   localStorage.setItem('pspkey', res.data.token);
        //   const navigationExtras: NavigationExtras = {
        //     queryParams: {
        //       loginDetails: JSON.stringify(res?.data),
        //     },
        //   };
        //   this.router.navigate(['/auth/reset-password'], navigationExtras);
        // } else {
        //   localStorage.setItem('pspkey', res.data.token);
        //   localStorage.setItem('PSPUser', JSON.stringify(res.data));
        //   if (res.data.idendifier === 'CUSTOMER') {
        //     this.movetocompany();
        //   } else {
        //     this.movetohome();
        //   }
        // }
        localStorage.setItem('pspkey', res.data.token);
        localStorage.setItem('PSPUser', JSON.stringify(res.data));
        if (res.data.idendifier === 'CUSTOMER') {
          this.movetocompany();
        } else {
          this.movetohome();
        }
      } else {
        this.utility.openToast(res[`message`]);
      }
      this.utility.dismissloader();
    });
  }

  movetocompany() {
    this.router.navigate(['/select-company']);

  }

  movetohome() {
    this.router.navigate(['/pages']);
  }


}
