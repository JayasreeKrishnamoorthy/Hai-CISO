import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbTabsetModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CustomersComponent } from './customers/customers.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NebularModule } from '../nebular/nebular.module';
import { UserComponent } from './user/user.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MaterialModule } from '../material/material.module';
import { UserGroupComponent } from './user-group/user-group.component';
import { RoleComponent } from './role/role.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule, NbTabsetModule,
    DashboardModule, NbCardModule, NbTreeGridModule, Ng2SmartTableModule, NbButtonModule,
    DashboardModule,
    NebularModule,
    NbEvaIconsModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    MaterialModule,
    ComponentsModule,
  ],
  declarations: [
    PagesComponent,
    UserComponent,
    AnalyzeComponent,
    CustomersComponent,
    UserGroupComponent,
    RoleComponent,
  ],
})
export class PagesModule {
}
