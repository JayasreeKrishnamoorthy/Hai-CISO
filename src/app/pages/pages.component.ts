import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../Services/http_service/http-service.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.html',
  styleUrls: ['pages.component.scss'],
  // template: `
  //   <ngx-one-column-layout>
  //     <nb-menu [items]="menu"></nb-menu>
  //     <router-outlet></router-outlet>
  //   </ngx-one-column-layout>
  // `,
})
export class PagesComponent {
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
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.userDetails = localStorage.getItem('PSPUser');
    this.userDetails = JSON.parse(this.userDetails);
  }

  subMenuSelect(val): void {
    val.drop = !val?.drop;
    this.navLinks.forEach(element => {
      if (element?.name !== val?.name && val.drop === true) {
        element[`drop`] = false;
      }
    });
  }

  profileAction(val) {
    if (val?.name === 'Logout') {
      localStorage.removeItem('pspkey');
      localStorage.removeItem('PSPUser');
      this.http.updateUserDetails();
      this.router.navigate(['/auth/login']);
    }
  }

}
