// import { InlineIcon } from '@iconify/react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard-2'),
  getHelp: icon('ic-get-help'),
  setting: icon('ic-setting'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {

    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
    ],
  },
  /**
   * Management
   */
  {
    items: [
      {
        title: 'Settings',
        path: paths.dashboard.group.root,
        icon: ICONS.setting,
        children: [
          { title: 'Credit Summary', path: paths.dashboard.group.root },
          { title: 'API', path: paths.dashboard.group.api },
          { title: 'Team Members', path: paths.dashboard.group.teamMembers },
          { title: 'Activity Log', path: paths.dashboard.group.activityLog },
          { title: 'Time Zone', path: paths.dashboard.group.timeZone },
        ],
      },
    ],
  },

  {
    items: [
      { title: 'Get Help', path: paths.dashboard.getHelp, icon: ICONS.getHelp },
    ],
  },
];
