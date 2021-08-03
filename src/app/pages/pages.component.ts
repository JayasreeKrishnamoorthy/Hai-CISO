import { Component } from '@angular/core';

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
      name: 'Analyse',
      icon: 'cast',
      drop: false,
    },
    {
      path: '/pages/Statergize',
      name: 'Statergize',
      icon: 'next_plan',
      drop: false,
    },
    {
      path: '/pages/Operationalize',
      name: 'Operationalize',
      icon: 'cached',
      drop: false,
    },
    {
      path: '/pages/Integration',
      name: 'Integration',
      icon: 'integration_instructions',
      drop: false,
    },
    {
      path: '/pages/Resource',
      name: 'Resource',
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
        },
        {
          path: '/pages/role',
          name: 'Roles',
        },
        {
          path: '/pages/user-group',
          name: 'User Groups',
        },
      ],
      drop: false,
    },
    {
      path: '/layout/logs',
      name: 'Logs',
      icon: 'view_in_ar',
      drop: false,
    },
    {
      path: '/layout/domin',
      name: 'Domain Analyser',
      icon: 'language',
      drop: false,
    },
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
    {
      name: 'My Profile & Settings',
    },
  ];

  menuToggle = false;

  subMenuSelect(val): void {
    val.drop = !val?.drop;
    this.navLinks.forEach(element => {
      if (element?.name !== val?.name && val.drop === true) {
        element[`drop`] = false;
      }
    });
  }

}
