/* eslint-disable react/destructuring-assignment */
// @flow

import React, { useState, useEffect } from "react";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TablePagination from "@material-ui/core/TablePagination";
import Loader from "../../components/Loader";
import useRole from "../../helpers/useRole";
import { useNotify } from "react-admin";
import EditIcon from "./EditIcon";
import ElapsedTime from "./ElapsedTime";
import Status from "./Status";
import User from "./User";
import { listIncidentviewers } from "../../graphql/queries";

import type { Bypass as BypassType, User as UserType } from "~/types";

const useStyles = makeStyles((theme) => ({
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
  titleContainer: {
    display: "flex",
  },
  title: {
    margin: "auto",
  },
  add: {
    marginLeft: theme.spacing(0.5),
  },
}));

type Props = {
  bypassData: {
    bypasses: BypassType[],
  },
  usersData: {
    users: UserType[],
  },
};

type PropsWithData = {
  bypassData: {
    bypasses: BypassType[],
  },
  usersData: {
    users: UserType[],
  },
  limit: number,
  offset: number,
  search: string,
  onChangePage: (number) => void,
  onChangeRowsPerPage: (number) => void,
  onSearchChange: (string) => void,
};

let windowObjectRef = null;

const PastIncidentsTable = ({
  usersData = [],
  listIncidentItems = [],
  bypassData = [],
}: Props) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  return (
    <PastIncidentsTableWithData
      usersData={usersData}
      bypassData={bypassData}
      listIncidentItems={listIncidentItems}
      limit={limit}
      offset={offset}
      search={search}
      onChangePage={(p) => setOffset(limit * p)}
      onChangeRowsPerPage={(l) => setLimit(l)}
      onSearchChange={(s) => setSearch(s)}
    />
  );
};

function PastIncidentsTableWithData({
  usersData = [],
  bypassData = [],
  listIncidentItems = [],
  onChangePage,
  onChangeRowsPerPage,
  onSearchChange,
  limit,
  offset,
  search,
}) {
  const classes = useStyles();
  const notify = useNotify();
  const role = "superadmin";

  let count = 0;
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "CSID",
      field: "site_id.csid",
    },
    {
      title: "Type",
      field: "incident_type_id",
      render: (row) => row.incident_type_id.name,
      customFilterAndSearch: (term, row) => {
        const { name } = row.incident_type_id;
        return name.toLowerCase().includes(term.toLowerCase());
      },
    },
    {
      title: "Site",
      field: "site_id",
      render: (row) => row.site_id.name,
      customFilterAndSearch: (term, row) => {
        const { name } = row.site_id;
        return name.toLowerCase().includes(term.toLowerCase());
      },
    },
    {
      title: "Date Time",
      field: "start_time",
      render: (row) => moment(row.start_time).format("DD/MM/YYYY HH:mm"),
      customFilterAndSearch: (term, row) => {
        const time = moment(row.start_time).format("DD/MM/YYYY HH:mm");
        return time.toLowerCase().includes(term.toLowerCase());
      },
    },
    {
      title: "Action Taken",
      field: "status_type_id",
      render: (row) => <Status data={row} bypasses={bypassData} />,
      customFilterAndSearch: (term, row) => {
        const { name } = row.status_type_id;
        return name.toLowerCase().includes(term.toLowerCase());
      },
    },
    {
      title: "Severity",
      field: "severity_type_id",
      render: (row) => row.severity_type_id.name,
    },
    {
      title: "Elapsed",
      field: "elapsed",

      render: (row) => <ElapsedTime data={row} />,
    },
    {
      title: "Operator",
      field: "viewers",
      render: (row) => {
        const viewers = row.viewers.map((iv) => {
          const user = usersData.find((u) => u.Username == iv);
          if (!user) return null;
          return (
            <Grid item xs={12} key={iv.viewer_id}>
              <User user={user} id={iv.viewer_id} />
            </Grid>
          );
        });
        return (
          <Grid container spacing={1} className={classes.gridContainer}>
            {viewers}
          </Grid>
        );
      },
    },
    {
      title: "Handled By",
      field: "operator_id",
      render: (row) => {
        if (!row.operator_id) return null;

        const user = usersData.find((u) => u.Username === row.operator_id);
        return <User user={user} id={row.operator_id} />;
      },
    },
    {
      title: "Category",
      field: "created_by",
      render: (row) => (row.created_by ? "Manual" : "System"),
    },
  ];

  columns.push({
    title: "",
    sorting: false,
    render: (row) => <EditIcon data={row} />,
  });

  return (
    <MaterialTable
      data={listIncidentItems ? listIncidentItems : []}
      columns={columns}
      title={
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            Past Incidents
          </Typography>
          {
            <IconButton
              color="primary"
              className={classes.add}
              href="/#/incidents/create">
              <AddIcon />
            </IconButton>
          }
        </div>
      }
      options={{
        draggable: false,
        pageSize: limit,
        headerStyle: {
          textTransform: "uppercase",
          fontWeight: 900,
          opacity: 0.5,
        },
        rowStyle: () => ({
          opacity: 0.5,
        }),
      }}
      components={{
        Pagination: (p) => (
          <TablePagination
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...p}
            count={count}
            page={offset / limit}
            onChangePage={(event, page) => {
              p.onChangePage(event, page);
              onChangePage(page);
            }}
            onChangeRowsPerPage={(event) => {
              p.onChangeRowsPerPage(event);
              onChangeRowsPerPage(event.target.value);
            }}
          />
        ),
      }}
      onSearchChange={(s) => onSearchChange(s)}
      onRowClick={(e, row) => {
        if (!windowObjectRef || windowObjectRef.closed) {
          windowObjectRef = window.open(
            `/#/incident/${row.id}/report`,
            "Incident Report",
            "toolbar=0,menubar=0"
          );
        } else {
          windowObjectRef.open(
            `/#/incident/${row.id}/report`,
            "Incident Report",
            "toolbar=0,menubar=0"
          );
        }
      }}
    />
  );
}

export default PastIncidentsTable;
