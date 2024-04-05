// @flow

import React from 'react';
import type { Node } from 'react';
import loadable from '@loadable/component';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState, usePermissions } from 'react-admin';
import * as Sentry from '@sentry/react';

const ForgotPasswordPage = loadable( () => import( '~/pages/ForgotPasswordPage' ) );
const IncidentPage = loadable( () => import( '~/pages/IncidentPage' ) );
const IncidentReportPage = loadable( () => import( '~/pages/IncidentReportPage' ) );
const OverviewPage = loadable( () => import( '~/pages/OverviewPage' ) );
const ProfilePage = loadable( () => import( '~/pages/ProfilePage' ) );
const VisitorsPage = loadable( () => import( '~/pages/VisitorsPage' ) );
const SystemHealth = loadable( () => import( '~/pages/SystemHealth' ) );
const Dashboard = loadable( () => import( '~/pages/Dashboard' ) );

export default [
  <Route exact path="/forgot" component={ ForgotPasswordPage } noLayout />,
  <PrivateRoute exact path="/" Component={ OverviewPage } />,
  <PrivateRoute
    exact
    path="/incident/:id/active"
    Component={ IncidentPage }
    noLayout
  />,
  <PrivateRoute
    exact
    path="/incident/:id/report"
    Component={ IncidentReportPage }
    noLayout
  />,
  <PrivateRoute exact path="/overview" Component={ OverviewPage } />,
  <PrivateRoute exact path="/profile" Component={ ProfilePage } />,
  <PrivateRoute exact path="/visitors" Component={ VisitorsPage } />,
  <PrivateRoute exact path="/system_health" Component={ SystemHealth } />,
  <PrivateRoute exact path="/dashboard" Component={ Dashboard } />,
];

type Props = {
  children?: Node | null,
  Component: any,
  path: string,
};

function PrivateRoute( props: Props ) {
  // eslint-disable-next-line no-unused-vars
  const { children, Component = <div />, ...rest } = props;

  const { loading, authenticated } = useAuthState();
  const { permissions } = usePermissions();
  console.log( 'permissions', permissions );
  console.log( 'permissions', useAuthState() );
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      { ...rest }
      render={ p => {
        if ( loading ) return null;
        if ( !authenticated ) return <Redirect to="/login" />;
        return (
          <Sentry.ErrorBoundary fallback="An error has occured">
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              { ...p }
              basePath={ rest.path }
              permissions={ permissions }
            />
          </Sentry.ErrorBoundary>
        );
      } }
    />
  );
}

PrivateRoute.defaultProps = {
  children: null,
};
