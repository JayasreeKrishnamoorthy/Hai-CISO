import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuardService as AuthGuard } from './Services/auth_guard/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { LoggedinauthgaurdService as LoggedInAuthGuard } from './Services/auth_guard/loggedinauthgaurd.service';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
   // canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
   // canActivate: [AuthGuard],
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
