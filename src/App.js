// @flow

import React, { useEffect } from "react";
import { Admin, Resource } from "react-admin";
import { ThemeProvider } from "@material-ui/core/styles";
import loadable from "@loadable/component";
import { Helmet } from "react-helmet";
import IdleJs from "idle-js";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

import {
  buildAuthProvider,
  buildDataProvider,
  CognitoGroupList,
  CognitoUserList,
  CognitoUserShow,
} from "react-admin-amplify";
// react admin props

import { graphqlOperation } from "aws-amplify";
import customRoutes from "./customRoutes";

import config from "./aws-exports";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import i18nProvider from "./providers/i18nProvider";
import layout from "./layout";
import theme from "./theme";

// resources
import {
  BypassList,
  BypassEdit,
  BypassCreate,
  BypassShow,
} from "./resources/bypasses";

import {
  CameraList,
  CameraEdit,
  CameraCreate,
  CameraShow,
} from "./resources/cameras";

import {
  ContactList,
  ContactEdit,
  ContactCreate,
  ContactShow,
} from "./resources/contacts";

import {
  IncidentTypeList,
  IncidentTypeEdit,
  IncidentTypeCreate,
} from "./resources/incident_types";

import {
  StatusTypeList,
  StatusTypeEdit,
  StatusTypeCreate,
} from "./resources/status_types";

import {
  IncidentList,
  // IncidentEdit,
  IncidentCreate,
  IncidentShow,
} from "./resources/incidents";

import { NvrList, NvrEdit, NvrCreate, NvrShow } from "./resources/nvr";

import {
  SensorTypeList,
  SensorTypeEdit,
  SensorTypeCreate,
} from "./resources/sensor_types";

import {
  SeverityTypeList,
  SeverityTypeEdit,
  SeverityTypeCreate,
} from "./resources/severity_types";
import {
  SensorList,
  SensorEdit,
  SensorCreate,
  SensorShow,
} from "./resources/sensors";

import { SiteList, SiteEdit, SiteCreate, SiteShow } from "./resources/sites";

import {
  SopItemList,
  SopItemEdit,
  SopItemCreate,
  SopItemShow,
} from "./resources/sop_items";

import {
  VirtualPatrolRouteCreate,
  VirtualPatrolRouteEdit,
  VirtualPatrolRouteList,
  VirtualPatrolRouteShow,
} from "./resources/virtual_patrol_routes";

import {
  VirtualPatrolScheduleCreate,
  VirtualPatrolScheduleEdit,
  VirtualPatrolScheduleList,
  VirtualPatrolScheduleShow,
} from "./resources/virtual_patrol_schedules";

// styles
import "./assets/scss/styles.scss";

// apollo client
const OverviewPage = loadable(() => import("~/pages/OverviewPage"));
const LoginPage = loadable(() => import("~/pages/LoginPage"));

// main app
function App() {
  const idle = new IdleJs({
    idle: 30 * 60 * 1000, // idle time in ms
    events: ["mousemove", "keydown", "mousedown", "touchstart"],
    onIdle: () => {
      window.location.reload();
    },
  });
  useEffect(() => {
    idle.start();
  }, []);
  const authProvider = buildAuthProvider();

  const dataProvider = buildDataProvider(
    {
      queries,
      mutations,
    },
    {
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
      enableAdminQueries: true,
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <Helmet defaultTitle="i-mops" titleTemplate="%s - i-mops" />
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={LoginPage}
        i18nProvider={i18nProvider}
        dashboard={OverviewPage}
        layout={layout}
        customRoutes={customRoutes}
        theme={theme}>
        <Resource
          name="sites"
          list={SiteList}
          edit={SiteEdit}
          create={SiteCreate}
          show={SiteShow}
          options={{
            icon: "apartment",
            desc: "Locations monitored",
          }}
        />
        <Resource
          name="bypasses"
          list={BypassList}
          edit={BypassEdit}
          create={BypassCreate}
          show={BypassShow}
          options={{
            icon: "next_plan",
            desc: "Bypass sites & time",
          }}
        />
        <Resource
          name="cameras"
          list={CameraList}
          edit={CameraEdit}
          create={CameraCreate}
          show={CameraShow}
          options={{
            icon: "videocam",
            desc: "Visual feed of locations",
          }}
        />

        <Resource
          name="sensors"
          list={SensorList}
          edit={SensorEdit}
          create={SensorCreate}
          show={SensorShow}
          options={{
            icon: "settings_remote",
            desc: "Sensing devices to trigger events",
          }}
        />
        <Resource
          name="severitytypes"
          list={SeverityTypeList}
          edit={SeverityTypeEdit}
          create={SeverityTypeCreate}
        />
        <Resource
          name="contacts"
          list={ContactList}
          edit={ContactEdit}
          create={ContactCreate}
          show={ContactShow}
          options={{
            icon: "perm_contact_calendar",
            desc: "Details of key personnel",
          }}
        />
        <Resource
          name="sopitems"
          list={SopItemList}
          edit={SopItemEdit}
          create={SopItemCreate}
          show={SopItemShow}
          options={{
            label: "SOP",
            icon: "list_alt",
            desc: "Standard operating procedures",
          }}
        />
        <Resource
          name="incidents"
          list={IncidentList}
          // edit={ IncidentEdit }
          create={IncidentCreate}
          show={IncidentShow}
          options={{
            icon: "error",
            desc: "Triggered by events based on sensors",
          }}
        />

        <Resource
          name="incidenttypes"
          list={IncidentTypeList}
          edit={IncidentTypeEdit}
          create={IncidentTypeCreate}
          options={{
            icon: "error",
            desc: "Types of incidents",
          }}
        />
        <Resource
          name="nvrs"
          list={NvrList}
          edit={NvrEdit}
          create={NvrCreate}
          show={NvrShow}
        />
        <Resource name="incidentviewer" />
        <Resource
          name="sensortypes"
          list={SensorTypeList}
          edit={SensorTypeEdit}
          create={SensorTypeCreate}
          options={{
            icon: "settings_remote",
            desc: "Types of sensors",
          }}
        />
        <Resource
          name="statustypes"
          list={StatusTypeList}
          edit={StatusTypeEdit}
          create={StatusTypeCreate}
        />
        <Resource
          name="virtualpatrolroutes"
          list={VirtualPatrolRouteList}
          edit={VirtualPatrolRouteEdit}
          create={VirtualPatrolRouteCreate}
          show={VirtualPatrolRouteShow}
        />
        <Resource
          name="virtualpatrolschedules"
          list={VirtualPatrolScheduleList}
          edit={VirtualPatrolScheduleEdit}
          create={VirtualPatrolScheduleCreate}
          show={VirtualPatrolScheduleShow}
        />
        <Resource
          name="cognitoUsers"
          list={CognitoUserList}
          show={CognitoUserShow}
        />
        <Resource name="cognitoGroups" list={CognitoGroupList} />
      </Admin>
    </ThemeProvider>
  );
}

export default App;
