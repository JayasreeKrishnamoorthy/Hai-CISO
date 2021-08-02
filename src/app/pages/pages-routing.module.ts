import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CustomersComponent } from './customers/customers.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { UserGroupComponent } from './user-group/user-group.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'analyze',
      component: AnalyzeComponent,
    },
    {
      path: 'customers',
      component: CustomersComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: 'role',
      component: RoleComponent,
    },
    {
      path: 'user-group',
      component: UserGroupComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: DashboardComponent,
    // },
  ],



}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
