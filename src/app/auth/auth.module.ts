import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NebularModule } from '../nebular/nebular.module';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { MaterialModule } from '../material/material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [LoginComponent, SelectCompanyComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule, FormsModule, ReactiveFormsModule, NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    AuthRoutingModule,
    NebularModule,
    MaterialModule,
    NbFormFieldModule,
  ],
})
export class AuthModule { }
