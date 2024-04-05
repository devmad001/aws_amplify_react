/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import CommentIcon from "@material-ui/icons/Comment";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EditIcon from "@material-ui/icons/Edit";
import { useNotify } from "react-admin";
import { API, graphqlOperation } from "aws-amplify";
import userDataProvider from "../../../../providers/usersProvider";
import { logsByIncident_id } from "../../../../graphql/queries";
import Loader from "../../../../components/Loader";
const getIcon = (field) => {
  switch (field) {
    case "comment":
      return <CommentIcon />;
    case "SOP":
      return <CheckBoxIcon />;

    default:
      return <EditIcon />;
  }
};

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  timelineItem: {
    "&::before": {
      flex: "unset",
    },
  },
}));

type Props = {
  incident_id: any,
};
function Changelogs({ incident_id }: Props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [logsData, setLogsData] = useState([]);
  const [usersData, setUsersData] = useState();
  const notify = useNotify();
  useEffect(() => {
    async function fetchData(incident_id) {
      setLoading(true);
      try {
        const { Users = [] } = await userDataProvider("/listUsers", {});
        setUsersData(Users);

        const { data } = await API.graphql(
          graphqlOperation(logsByIncident_id, { incident_id })
        );

        if (data.logsByIncident_id) setLogsData(data.logsByIncident_id.items);
      } catch (e) {
        notify("Could not get logs", "warning");
      }

      setLoading(false);
    }
    fetchData(incident_id);
  }, [incident_id]);

  if (loading) return <Loader />;

  if (!logsData.length) return <Typography>No Changelog</Typography>;
  return (
    <Timeline>
      {logsData.map(({ id, field, user_id, created_at }, index) => {
        const user = usersData.find((u) => u.Username === user_id);
        let username = "";

        if (user) {
          const { Username } = user;
          username = Username;
        }
        return (
          <TimelineItem key={id} className={classes.timelineItem}>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                {getIcon(field)}
              </TimelineDot>
              {index < logsData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <>
                <div>
                  <Typography variant="subtitle" component="span">
                    {username}
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {` updated ${field}.`}
                  </Typography>
                </div>
                <Typography variant="caption">
                  {moment(created_at).format("DD/MM/YYYY HH:mm:ss")}
                </Typography>
              </>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default Changelogs;
