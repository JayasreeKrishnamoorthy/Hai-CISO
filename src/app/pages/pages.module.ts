import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbUserModule,
  NbContextMenuModule,
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
import { StratergizeComponent } from './stratergize/stratergize.component';
import { OperationalizeComponent } from './operationalize/operationalize.component';
import { IntegrationComponent } from './integration/integration.component';
import { ResourcesComponent } from './resources/resources.component';
import { LogsComponent } from './logs/logs.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MdePopoverModule } from '@material-extended/mde';
import { CustomerAddressComponent } from '../share/component/customer-address/customer-address.component';

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
    NbUserModule,
    NbContextMenuModule,
    MdePopoverModule,
  ],
  declarations: [
    PagesComponent,
    UserComponent,
    AnalyzeComponent,
    CustomersComponent,
    UserGroupComponent,
    RoleComponent,
    StratergizeComponent,
    OperationalizeComponent,
    IntegrationComponent,
    ResourcesComponent,
    LogsComponent,
    ChangePasswordComponent,
    CustomerAddressComponent,
  ],
})
export class PagesModule {
}
