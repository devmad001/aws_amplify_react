/* eslint-disable camelcase */
// @flow

import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import IncidentTypeIcon from "../../components/IncidentTypeIcon";

type Incident = {
  id: number,
  incident_type: { id: number, name: string, icon: string },
  site: { csid: string, name: string, address: string },
};

const useStyles = makeStyles(() => ({
  container: {
    padding: 10,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "1em",
    marginRight: "0.3em",
  },
}));

function IncidentSummary({ incident }: { incident: Incident }) {
  const { id, incident_type_id, site_id } = incident;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Grid container spacing={0}>
        <Grid item xs={9} container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h5">
              <span className={classes.wrapper}>
                {" "}
                <IncidentTypeIcon
                  className={classes.icon}
                  iconName={incident_type_id.icon}
                />
                {site_id.csid}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{site_id.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">{site_id.address}</Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={3}
          container
          spacing={0}
          justify="center"
          alignItems="center">
          <Typography variant="h6">{id}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default IncidentSummary;
