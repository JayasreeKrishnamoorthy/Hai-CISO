/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NebularModule } from './nebular/nebular.module';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoggedinauthgaurdService } from './Services/auth_guard/loggedinauthgaurd.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpConfigInterceptor } from './Services/http_service/httpConfig.interceptor';
import { Http, RequestOptions } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  providers: [
    AUTH_PROVIDERS, LoggedinauthgaurdService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NebularModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    MatDialogModule,
    MaterialModule,
    MatMenuModule,
    NbFormFieldModule,
    NbContextMenuModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
