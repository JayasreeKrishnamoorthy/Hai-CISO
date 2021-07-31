import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NebularModule } from '../nebular/nebular.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NebularModule,
  ],
  declarations: [
    PagesComponent,
    UserComponent,
  ],
})
export class PagesModule {
}
