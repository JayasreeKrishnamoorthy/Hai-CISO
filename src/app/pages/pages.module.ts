import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CustomersComponent } from './customers/customers.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NebularModule } from '../nebular/nebular.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,NbTabsetModule,
    DashboardModule,NbCardModule,NbTreeGridModule,Ng2SmartTableModule,NbButtonModule,
    DashboardModule,
    NebularModule,
  ],
  declarations: [
    PagesComponent,
    AnalyzeComponent,
    CustomersComponent,
  ],
})
export class PagesModule {
}
