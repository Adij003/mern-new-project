import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/app/dashboard'));
const GetHelpPage = lazy(() => import('src/pages/app/get-help'));
const CreditSummaryPage = lazy(() => import('src/pages/app/credit-summary'));
const APIPage = lazy(() => import('src/pages/app/api'));
const TeamMembersPage = lazy(() => import('src/pages/app/team-members'));
const ActivityLogPage = lazy(() => import('src/pages/app/activity-log'));
const TimeZonePage = lazy(() => import('src/pages/app/time-zone'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'app',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'get-help', element: <GetHelpPage /> },
      {
        path: 'settings',
        children: [
          { element: <CreditSummaryPage />, index: true },
          { path: 'api', element: <APIPage /> },
          { path: 'team-members', element: <TeamMembersPage /> },
          { path: 'activity-log', element: <ActivityLogPage /> },
          { path: 'time-zone', element: <TimeZonePage /> },
        ],
      },
    ],
  },
];
