/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { UtilityService } from './Services/utility.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    public idle: Idle,
    public keepalive: Keepalive,
    public router: Router,
    public utility: UtilityService,
    private httpClient: HttpClient,
  ) {
    this.idle.watch();
    this.idle.setIdle(10);
    this.idle.setTimeout(10);
    this.idle.onTimeout.subscribe(() => {
      this.utility.logOut();
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === 10) {
        this.utility.openToast('You will session out in ' + countdown + ' seconds!');
      }
    });
    keepalive.interval(15);
    // let inFormOrLink: any;
    // inFormOrLink = true;
    // // tslint:disable-next-line:no-console
    // console.log('working tab close', inFormOrLink);
    // // tslint:disable-next-line:ban
    // $(window).bind('beforeunload', function (eventObject) {
    //   let returnValue;
    //   if (!inFormOrLink) {
    //     // tslint:disable-next-line:no-console
    //     console.log('working tab close');
    //     returnValue = 'Do you really want to close?';
    //   }
    //   eventObject.returnValue = returnValue;
    //   return returnValue;
    // });




  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event) {
  //   this.logoutOntabClose();
  // }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  logoutOntabClose() {
    this.utility.logOut();
  }

}
