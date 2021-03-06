import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { NebularModule } from '../../nebular/nebular.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbTabsetModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MaterialModule } from '../../material/material.module';
import { RoleViewComponent } from './role-view/role-view.component';
import { UserGroupViewComponent } from './user-group-view/user-group-view.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { MapComponent } from './map/map.component';
import { SubdomainComponent } from './subdomain/subdomain.component';
import { SubdomaincveComponent } from './subdomaincve/subdomaincve.component';



@NgModule({
  declarations: [
    UserViewComponent,
    RoleViewComponent,
    UserGroupViewComponent,
    ConfirmationComponent,
    CustomerViewComponent,
    MapComponent,
    SubdomainComponent,
    SubdomaincveComponent,
  ],
  entryComponents: [
    UserViewComponent,
    RoleViewComponent,
    UserGroupViewComponent,
    ConfirmationComponent,
    CustomerViewComponent,
    MapComponent,SubdomainComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule, NbTabsetModule,
    DashboardModule, NbCardModule, NbTreeGridModule, Ng2SmartTableModule, NbButtonModule,
    DashboardModule,
    NebularModule,
    NbEvaIconsModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    MaterialModule,
  ],
})
export class ComponentsModule { }
