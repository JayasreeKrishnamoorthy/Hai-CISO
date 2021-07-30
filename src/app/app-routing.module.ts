import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.module').then(mod => mod.LayoutModule),
    // canActivate: [LayoutGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
