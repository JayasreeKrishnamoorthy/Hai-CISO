import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Personal',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Customers',
    icon: 'people-outline',
    link: '/pages/customers',
    home: true,
  },
  {
    title: 'Analyse',
    icon: 'cast-outline',
    link: '/pages/analyze',
    home: true,
  },
  {
    title: 'Statergize',
    icon: 'compass-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Operationalize',
    icon: 'loader-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Integration',
    icon: 'flash-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Resource',
    icon: 'award-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'person-add-outline',
    children: [
      {
        title: 'User List',
        link: '/pages/user',
      },
      {
        title: 'Roles',
        link: '/pages/role',
      },
      {
        title: 'User Groups',
        link: '/pages/user-group',
      },
    ],
  },

  {
    title: 'Logs',
    icon: 'cube-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Domain Analyser',
    icon: 'globe-outline',
    link: '/pages/dashboard',
    home: true,
  },
 ];
