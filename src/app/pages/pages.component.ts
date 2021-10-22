import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { filter } from 'rxjs/operators';
import { HttpServiceService } from '../Services/http_service/http-service.service';
import { UtilityService } from '../Services/utility.service';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { MENU_ITEMS } from './pages-menu';
declare var $: any;
declare global {
  interface Window {
    FB: any;
  }
}

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['pages.component.scss'],
})

export class PagesComponent {

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;


  menu = MENU_ITEMS;


  navLinks: any = [
    {
      path: '/pages/dashboard',
      name: 'Dashboard',
      icon: 'home',
      drop: false,
    },
    {
      path: '/pages/customers',
      name: 'Customers',
      icon: 'people',
      drop: false,
    },
    {
      path: '/pages/analyze',
      name: 'Analyze',
      icon: 'cast',
      drop: false,
    },
    {
      path: '/pages/stratergize',
      name: 'Strategize',
      icon: 'next_plan',
      drop: false,
    },
    {
      path: '/pages/operationalize',
      name: 'Operationalize',
      icon: 'cached',
      drop: false,
    },
    {
      path: '/pages/integration',
      name: 'Integration',
      icon: 'integration_instructions',
      drop: false,
    },
    {
      path: '/pages/resources',
      name: 'Resources',
      icon: 'person',
      drop: false,
    },
    {
      name: 'Users',
      icon: 'group_add',
      path: '/pages/user',
      subitems: [
        {
          path: '/pages/user',
          name: 'User List',
          icon: 'format_list_bulleted',
        },
        {
          path: '/pages/role',
          name: 'Roles',
          icon: 'admin_panel_settings',
        },
        {
          path: '/pages/user-group',
          name: 'User Groups',
          icon: 'groups',
        },
      ],
      drop: false,
    },
    {
      path: '/pages/logs',
      name: 'Logs',
      icon: 'view_in_ar',
      drop: false,
    },
    // {
    //   path: '/layout/domin',
    //   name: 'Domain Analyser',
    //   icon: 'language',
    //   drop: false,
    // },
  ];

  headerMenu: any = [
    {
      name: 'Home',
    },
    {
      name: 'My Assessment',
    },
    {
      name: 'My Projects',
    },
    {
      name: 'My Quicklinks',
    },
    // {
    //   icon: 'assets/img/support.png',
    //   // name: 'Support & Contact',
    // },
  ];

  profileMenu: any = [
    {
      name: 'Profile',
      icon: 'account_circle',
    },
    {
      name: 'PSP',
      icon: 'domain',
    },
    {
      name: 'Password Reset',
      icon: 'password',
    },
    {
      name: 'Settings',
      icon: 'settings',
    },
    {
      name: 'Logout',
      icon: 'logout',
    },
  ];

  menuToggle = false;
  userDetails: any;


  constructor(
    public http: HttpServiceService,
    public router: Router,
    public utility: UtilityService,
    public idle: Idle,
    public keepalive: Keepalive,
    public dialog: MatDialog,
  ) {
    const utilityMethod = this.utility;
    // tslint:disable-next-line:no-console
    console.log('working pages');
    this.idle.watch();
    this.idle.setIdle(1200);
    this.idle.setTimeout(10);
    this.idle.onTimeout.subscribe(() => {
      this.utility.logOut();
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === 10) {
        this.openToast('You will session out in ' + countdown + ' seconds!');
      }
    });
    keepalive.interval(1200);
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
    this.verifyUser();
    if (this.userDetails.idendifier === 'CUSTOMER') {
      // For Customer
      this.navLinks = [
        {
          path: '/pages/dashboard',
          name: 'Dashboard',
          icon: 'home',
          drop: false,
        },
        // {
        //   path: '/pages/customers',
        //   name: 'Customers',
        //   icon: 'people',
        //   drop: false,
        // },
        {
          path: '/pages/analyze',
          name: 'Analyze',
          icon: 'cast',
          drop: false,
        },
        {
          path: '/pages/stratergize',
          name: 'Strategize',
          icon: 'next_plan',
          drop: false,
        },
        {
          path: '/pages/operationalize',
          name: 'Operationalize',
          icon: 'cached',
          drop: false,
        },
        {
          path: '/pages/integration',
          name: 'Integration',
          icon: 'integration_instructions',
          drop: false,
        },
        {
          path: '/pages/resources',
          name: 'Resources',
          icon: 'person',
          drop: false,
        },
        {
          name: 'Users',
          icon: 'group_add',
          path: '/pages/user',
          subitems: [
            {
              path: '/pages/user',
              name: 'User List',
              icon: 'format_list_bulleted',
            },
            // {
            //   path: '/pages/role',
            //   name: 'Roles',
            //   icon: 'admin_panel_settings',
            // },
            {
              path: '/pages/user-group',
              name: 'User Groups',
              icon: 'groups',
            },
          ],
          drop: false,
        },
        {
          path: '/pages/logs',
          name: 'Logs',
          icon: 'view_in_ar',
          drop: false,
        },
        // {
        //   path: '/layout/domin',
        //   name: 'Domain Analyser',
        //   icon: 'language',
        //   drop: false,
        // },
      ];

    } else {
      // For PSP
      this.navLinks = [
        {
          path: '/pages/dashboard',
          name: 'Dashboard',
          icon: 'home',
          drop: false,
        },
        {
          path: '/pages/customers',
          name: 'Customers',
          icon: 'people',
          drop: false,
        },
        {
          path: '/pages/analyze',
          name: 'Analyze',
          icon: 'cast',
          drop: false,
        },
        {
          path: '/pages/stratergize',
          name: 'Strategize',
          icon: 'next_plan',
          drop: false,
        },
        {
          path: '/pages/operationalize',
          name: 'Operationalize',
          icon: 'cached',
          drop: false,
        },
        {
          path: '/pages/integration',
          name: 'Integration',
          icon: 'integration_instructions',
          drop: false,
        },
        {
          path: '/pages/resources',
          name: 'Resources',
          icon: 'person',
          drop: false,
        },
        {
          name: 'Users',
          icon: 'group_add',
          path: '/pages/user',
          subitems: [
            {
              path: '/pages/user',
              name: 'User List',
              icon: 'format_list_bulleted',
            },
            {
              path: '/pages/role',
              name: 'Roles',
              icon: 'admin_panel_settings',
            },
            {
              path: '/pages/user-group',
              name: 'User Groups',
              icon: 'groups',
            },
          ],
          drop: false,
        },
        {
          path: '/pages/logs',
          name: 'Logs',
          icon: 'view_in_ar',
          drop: false,
        },
        // {
        //   path: '/layout/domin',
        //   name: 'Domain Analyser',
        //   icon: 'language',
        //   drop: false,
        // },
      ];
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.idle.onTimeout.unsubscribe();
    this.idle.onTimeoutWarning.unsubscribe();
  }

  verifyUser() {
    this.http.postToken(`/auth/verify`).subscribe(data => {
      if (data[`success`] === true) {

      } else if (data[`success`] === true && data?.data) {
        this.utility.openToast(data?.data[`message`]);
      } else {
        this.utility.openToast(data[`message`]);
        this.utility.logOut();
      }
    });
  }

  subMenuSelect(val): void {
    val.drop = !val?.drop;
    this.navLinks.forEach(element => {
      if (element?.name !== val?.name && val.drop === true) {
        element[`drop`] = false;
      }
    });
  }

  openProfileMenu() {
  }

  profileAction(val) {
    if (val?.name === 'Logout') {
      this.utility.logOut();
    } else if (val?.name === 'PSP') {
      if (this.userDetails.idendifier === 'CUSTOMER') {
        this.router.navigate(['/select-company']);
      }
    } else if (val?.name === 'Password Reset') {
      this.router.navigate(['/pages/change-password']);
    }
  }

  openToast(message) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '35%',
      disableClose: true,
      panelClass: '',
      data: {
        message,
        type: 'idel',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.idle.watch();
      }
    });
  }

}






