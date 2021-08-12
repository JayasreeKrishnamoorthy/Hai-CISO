import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CustomersComponent } from './customers/customers.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { StratergizeComponent } from './stratergize/stratergize.component';
import { OperationalizeComponent } from './operationalize/operationalize.component';
import { IntegrationComponent } from './integration/integration.component';
import { ResourcesComponent } from './resources/resources.component';
import { LogsComponent } from './logs/logs.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
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
      path: 'stratergize',
      component: StratergizeComponent,
    },
    {
      path: 'operationalize',
      component: OperationalizeComponent,
    },
    {
      path: 'integration',
      component: IntegrationComponent,
    },
    {
      path: 'resources',
      component: ResourcesComponent,
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
      path: 'logs',
      component: LogsComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
  ],



}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
