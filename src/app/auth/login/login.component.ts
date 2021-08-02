import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Responses/auth';
import { HttpServiceService } from '../../Services/http_service/http-service.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServiceService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const data = {
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,
    };
    this.httpService.doLogin(data).subscribe((res: Login) => {
      if (res.success) {
        localStorage.setItem('pspkey', res.data.token);
        this.movetohome();
      }
      // else if(res.status===0)
      // {
      //   alert(res.message)
      // }
    },
    ); (err) => {
      alert(err.error.message);
      // err.error.message
    };
  }

  movetohome() {
    this.router.navigate(['/pages']);
  }


}
