// @flow

import React, { useState, useEffect } from "react";

import { usePermissions } from "react-admin";
import { API, graphqlOperation } from "aws-amplify";
import { Helmet } from "react-helmet";

import {
  listBypasses,
  listIncidents,
  listStatustypes,
} from "../../graphql/queries";
import Loader from "../../components/Loader";

import OverviewDashboard from "./OverviewDashboard";
import ActiveIncidentsTable from "./ActiveIncidentsTable";
import PastIncidentsTable from "./PastIncidentsTable";
import userDataProvider from "../../providers/usersProvider";
// import MapSection from './MapSection';
import { USER_ROLES, STATUS_TYPES } from "~/constants";

function Page() {
  const { loaded, permissions } = usePermissions();
  const [bypassData, setBypassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statustype, setStatustype] = useState("");
  const [usersData, setUsersData] = useState();
  const [listIncidentItems, setListIncidentItems] = useState();
  const [activeData, setActiveData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { Users = [] } = await userDataProvider("/listUsers", {});
      setUsersData(Users);

      const {
        data: { listBypasses: { items = [] } = {} },
      } = await API.graphql(graphqlOperation(listBypasses));
      setBypassData(items);

      const {
        data: { listIncidents: { items: listIncidentItems = [] } = {} },
      } = await API.graphql(graphqlOperation(listIncidents));
      setListIncidentItems(listIncidentItems);

      const {
        data: { listStatustypes: { items: statusitems = [] } = {} },
      } = await API.graphql({
        query: listStatustypes,
        variables: { filter: { name: { eq: STATUS_TYPES.OPEN.NAME } } },
      });

      if (!statusitems.length) return null;
      setStatustype(statusitems[0].id);

      const {
        data: { listIncidents: { items: activeIncidentsItems = [] } = {} },
      } = await API.graphql({
        query: listIncidents,
        variables: {
          filter: { incidentStatus_type_idId: { eq: statusitems[0].id } },
        },
      });
      setActiveData(activeIncidentsItems);

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;
  const [attendNowData, otherActiveData] = activeData.reduce(
    (result, incident) => {
      if (incident.severity_type_id.name === "PRIORITY") {
        return [{ incidents: [...result[0].incidents, incident] }, result[1]];
      }
      return [result[0], { incidents: [...result[1].incidents, incident] }];
    },
    [{ incidents: [] }, { incidents: [] }]
  );
  const role = permissions;

  return (
    <>
      <Helmet title="Overview" />
      {/* <MapSection data={ activeData } loading={ activeLoading } /> */}
      {/* <div style={ { padding: 10 } } /> */}
      {role !== USER_ROLES.CUSTOMER && (
        <>
          <OverviewDashboard />
          <div style={{ padding: 10 }} />
          <ActiveIncidentsTable
            title="Attend Now"
            usersData={usersData}
            data={attendNowData}
            bypassData={bypassData}
          />
          <ActiveIncidentsTable
            title="Active Incidents"
            defaultSortSeverity="desc"
            usersData={usersData}
            data={otherActiveData}
            bypassData={bypassData}
          />
          <div style={{ padding: 10 }} />
        </>
      )}
      <PastIncidentsTable
        listIncidentItems={listIncidentItems}
        usersData={usersData}
        bypassData={bypassData}
      />
    </>
  );
}

export default Page;
