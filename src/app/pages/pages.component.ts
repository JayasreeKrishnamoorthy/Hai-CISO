import { Component, HostListener, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpServiceService } from '../Services/http_service/http-service.service';
import { UtilityService } from '../Services/utility.service';

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
  ) {
    const utilityMethod = this.utility;
    // window.addEventListener('unload', function (e) {
    //   utilityMethod.logOut();
    //   e.preventDefault();
    // });

    // window.onbeforeunload = function (e) {
    //   this.router.events
    //     .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    //     .subscribe(event => {
    //       if (
    //         event.id === 1 &&
    //         event.url === event.urlAfterRedirects
    //       ) {
    //       }
    //     });
    //   return undefined;
    // };

  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event) {
  //   this.utility.logOut();
  // }





  // @HostListener('window:beforeunload', ['$event'])
  // public saveAndClosePromt(event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('$event', event);
  //   if (window.onbeforeunload != null) {
  //     window.onbeforeunload = null;
  //   }
  //   window.addEventListener('beforeunload', function (e) {
  //     if (window.onbeforeunload != null) {
  //       window.onbeforeunload = null;
  //     }
  //   });
  //   window.onunload = () => {
  //     if (window.onbeforeunload != null) {
  //       window.onbeforeunload = null;
  //     }
  //     this.utility.logOut();
  //   };
  //   event.preventDefault();
  //   event.returnValue = '';
  //   this.utility.logOut();
  // }

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

}






