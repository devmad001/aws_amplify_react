/* eslint-disable react/destructuring-assignment */
// @flow

import React, { useState } from "react";
import moment from "moment";
import Highlight from "react-highlighter";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ElapsedTime from "./ElapsedTime";
import Severity from "./Severity";
import Status from "./Status";
import StatusIcon from "./StatusIcon";
import User from "./User";

import { SEVERITY_TYPES } from "../../constants";

import "./index.scss";

const useStyles = makeStyles(() => ({
  tooltip: {
    marginRight: "1em",
  },
  incidentIcon: {
    height: "100%",
    padding: "3px",
  },
  gridContainer: {
    flexGrow: 1,
  },
}));

type Props = {
  title: string,
  data: {
    incidents: Object[],
  },
  bypassData: {
    bypasses: BypassType[],
  },
  loading: boolean,
  usersData: {
    users: UserType[],
  },
  defaultSortSeverity: string | undefined,
};
let windowObjectRef = null;
function ActiveIncidentsTable({
  title,
  data,
  loading,
  usersData = { users: [] },
  bypassData = { bypasses: [] },
  defaultSortSeverity,
}: Props) {
  const classes = useStyles();
  const [search, setSearchText] = useState("");

  const columns = [
    {
      title: "No",
      field: "id",
      render: (row) => (
        <Highlight search={search}>{row.id.toString()}</Highlight>
      ),
      // always return true, so rows will not be filtered out
      customFilterAndSearch: () => true,
    },
    {
      title: "CSID",
      field: "site_id.csid",
      sorting: false,
      render: (row) => (
        <Highlight search={search}>{row.site_id.csid.toString()}</Highlight>
      ),
    },
    {
      title: "Type",
      field: "incident_type_id",
      render: (row) => row.incident_type_id.name,
    },
    {
      title: "Site",
      field: "site_id.id",
      render: (row) => (
        <Highlight search={search}>{row.site_id.name}</Highlight>
      ),
    },
    {
      title: "Date Time",
      field: "start_time",
      customSort: (a, b) => {
        const aTime = moment(a.start_time);
        const bTime = moment(b.start_time);
        if (aTime.isBefore(bTime, "second")) {
          return -1;
        }
        if (aTime.isAfter(bTime, "second")) {
          return 1;
        }
        return 0;
      },
      render: (row) => (
        <Highlight search={search}>
          {moment(row.start_time).format("DD/MM/YYYY HH:mm")}
        </Highlight>
      ),
      customFilterAndSearch: (term, row) => {
        const time = moment(row.start_time).format("DD/MM/YYYY HH:mm");
        return time.toLowerCase().includes(term.toLowerCase());
      },
    },
    {
      title: "Action Taken",
      field: "status_type_id",
      render: (row) => <Status data={row} bypasses={bypassData.bypasses} />,
    },
    {
      title: "Severity",
      field: "severity_type_id",
      defaultSort: defaultSortSeverity,

      render: (row) => <Severity data={row} />,
    },
    {
      title: "Elapsed",
      field: "elapsed",
      render: (row) => <ElapsedTime data={row} />,
    },
    {
      title: "Handled By",
      field: "operator_id",
      sorting: false,
      render: (row) => {
        if (!row.operator_id) return null;

        const user = usersData.find((u) => u.Username === row.operator_id);
        return <User user={user} id={row.operator_id} />;
      },
    },
    {
      title: "status",
      sorting: false,
      render: (row) => <StatusIcon data={row} />,
    },
  ];

  const highStatus = ["HIGH", "PRIORITY"];

  return (
    <div className={classes.wrapper}>
      <MaterialTable
        data={data ? data.incidents : []}
        columns={columns}
        title={title}
        isLoading={loading}
        options={{
          draggable: false,
          paging: false,
          headerStyle: {
            textTransform: "uppercase",
            fontWeight: 900,
            opacity: 0.5,
          },
          rowStyle: (row) => ({
            animationName: highStatus.includes(row.severity_type_id.name)
              ? "changeColorHigh"
              : "changeColorLow",
            animationDuration: "1.5s",
            animationIterationCount: "infinite",
          }),
        }}
        onRowClick={(e, row) => {
          if (!windowObjectRef || windowObjectRef.closed) {
            windowObjectRef = window.open(
              `/#/incident/${row.id}/active`,
              "Incident",
              `${"toolbar=0,menubar=0,width="}${
                window.screen.availWidth
              },height=${window.screen.availHeight}`
            );
          } else {
            windowObjectRef.open(
              `/#/incident/${row.id}/active`,
              "Incident",
              `${"toolbar=0,menubar=0,width="}${
                window.screen.availWidth
              },height=${window.screen.availHeight}`
            );
          }
        }}
        onSearchChange={setSearchText}
      />
    </div>
  );
}

export default ActiveIncidentsTable;
