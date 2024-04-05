/* eslint-disable camelcase */
// @flow

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "ra-aws-amplify";
import { Helmet } from "react-helmet";
import { usePermissions, useRedirect, useNotify } from "react-admin";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";

import CameraSection from "./CameraSection";
import CommentTable from "./CommentTable";
import ContactsTable from "./ContactsTable";
import ElapsedTime from "./ElapsedTime";
import IncidentStatusUpdateButton from "../../components/IncidentStatusUpdateButton";
import IncidentSummary from "./IncidentSummary";
import Loader from "../../components/Loader";
import MapSection from "./MapSection";
import NotFoundPage from "../NotFoundPage";
import ResolvedSection from "./ResolvedSection";
import SopTable from "../../components/SopTable";
import StartTime from "./StartTime";
import CAMERAS from "./CAMERAS.graphql";

import { STATUS_TYPES, INCIDENT_TYPE } from "~/constants";

import isBypass from "../../helpers/isBypass";
import {
  getIncident,
  getCamera,
  bypassBySite_id,
  getIncidenttype,
  getSite,
  sopcheckedItemsByIncident_id,
  sopitemsBySiteByIncident_type,
  getStatustype,
  neatpatrolnotesByIncident_id,
  contactBySite_id,
} from "../../graphql/queries";
import { updateIncident } from "../../graphql/mutations";
import userDataProvider from "../../providers/usersProvider";
const mapHeight = 240;
const topHeight = 120;
const commentContactsHeight = 260;
const statusHeight = 120;
const bottomHeight = 12;

const useStyles = makeStyles((theme) => ({
  top: {
    height: topHeight,
    position: "fixed",
    top: 0,
    width: "100%",
  },
  mid: {
    position: "fixed",
    top: topHeight,
    bottom: bottomHeight,
    width: "100%",
    overflow: "hidden",
  },
  bottom: {
    height: bottomHeight,
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  status: {
    position: "absolute",
    bottom: 0,
  },
  fullHeight: {
    height: "100%",
  },
  cameraSection: {
    height: `calc(100vh - ${topHeight + bottomHeight}px)`,
  },
  sop: {
    height: `calc(100vh - ${
      topHeight +
      bottomHeight +
      mapHeight +
      commentContactsHeight +
      statusHeight +
      24
    }px)`,
  },
  sopPaper: {
    padding: theme.spacing(2),
    height: "100%",
  },
  commentContacts: {
    height: commentContactsHeight,
  },
  camera: {
    height: "100%",
    overflow: "auto",
  },
  incidentButtons: {
    margin: "auto 0 auto auto",
  },
}));

function Page() {
  const { id } = useParams();
  const { loaded, permissions } = usePermissions();
  const redirect = useRedirect();
  console.log(permissions);
  useEffect(() => {
    if (loaded && !permissions) {
      redirect("/login");
    }
  }, [loaded, permissions]);

  if (!loaded) return <Loader />;

  if (!id) return <NotFoundPage />;

  return <IncidentPage id={id} />;
}

type Props = {
  id: number,
  user_id: string,
  usersData?: {
    users: {
      uid: string,
      displayName: string,
    }[],
  },
  usersLoading: boolean,
};

function IncidentPage({ id, user_id, usersData = { users: [] } }) {
  const [incidentData, setIncidentData] = useState({});
  const [bypassData, setBypassData] = useState([]);
  // const [userData, setUserData] = useState({});
  const [usergroupsData, setUsergroupsData] = useState([]);
  const [neatPatrolNotesData, setNeatPatrolNotesData] = useState({});
  const [sopitems, setSopitems] = useState([]);

  const [contactsData, setContactsData] = useState([]);
  const [sop_checked_items, setSop_checked_items] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useUser();
  const notify = useNotify();
  useEffect(() => {
    async function fetchData(id) {
      const { data } = await API.graphql(graphqlOperation(getIncident, { id }));
      if (data.getIncident) setIncidentData(data.getIncident);

      const {
        getIncident: {
          start_time,
          end_time,
          status_type_id,
          incident_type_id: { id: IncidenttypeID },
          site_id: { id: siteID },
          comment,
          detail,
          operator_id,
          viewers,
        },
      } = data;

      const { data: bypassData } = await API.graphql(
        graphqlOperation(bypassBySite_id, {
          site_id: IncidenttypeID,
        })
      );
      if (bypassData.bypassBySite_id)
        setBypassData(bypassData.bypassBySite_id.items);

      const { data: resultContactData } = await API.graphql(
        graphqlOperation(contactBySite_id, {
          site_id: siteID,
        })
      );
      if (resultContactData.contactBySite_id)
        setContactsData(resultContactData.contactBySite_id.items);

      //setUserData(userData);

      const {
        data: { sopitemsBySiteByIncident_type: sopitemsData },
      } = await API.graphql(
        graphqlOperation(sopitemsBySiteByIncident_type, {
          incident_type_id: { eq: IncidenttypeID },
          site_id: siteID,
        })
      );
      setSopitems(sopitemsData.items);

      const {
        data: { sopcheckedItemsByIncident_id: checkedItemsData },
      } = await API.graphql(
        graphqlOperation(sopcheckedItemsByIncident_id, {
          incident_id: id,
        })
      );
      setSop_checked_items(checkedItemsData.items);

      const { Groups } = await userDataProvider("/listGroupsForUser", {
        username: operator_id,
      });
      setUsergroupsData(Groups);

      const {
        data: { neatpatrolnotesByIncident_id: neatPatrolNotes },
      } = await API.graphql(
        graphqlOperation(neatpatrolnotesByIncident_id, {
          incident_id: id,
        })
      );
      setNeatPatrolNotesData(neatPatrolNotes.items);

      let newViewers = [...viewers];
      const { username } = userData;

      if (!viewers.includes(username)) {
        newViewers.push(username);

        try {
          await API.graphql(
            graphqlOperation(updateIncident, {
              input: { id: id, viewers: newViewers },
            })
          );
        } catch (e) {
          notify(e, "error");
        }
      }

      // const { data } = await API.graphql(graphqlOperation(getCamera, { id }));
      // if (data.getIncident) setIncidentData(data.getIncident);

      setLoading(false);
    }
    fetchData(id);
  }, [id]);

  const classes = useStyles();

  const [selectedCamId, setSelectedCamId] = useState();

  if (loading) return <Loader />;

  const {
    start_time,
    end_time,
    sop_items,
    status_type,
    siteID,
    site_id: { csid, name },
    sensor,
    operator_id,
    incident_type_id,
    contacts,
    details,
    name: incidentName,
    status_type_id,
    comment,
  } = incidentData;

  // const cameras =
  //   cameraData && cameraData.cameras
  //     ? cameraData.cameras
  //     : nodes.map((n) => n.camera);

  const bypass = isBypass(siteID, start_time, bypassData);

  const fiveMinsLater = moment(start_time).add(5, "minutes");
  const processing = moment().isBefore(fiveMinsLater);

  // video will automatically be removed after 1 week
  const aWeek = moment().subtract(7, "days").startOf("day");
  const inAWeek = moment(start_time).isAfter(aWeek);
  const expired = !inAWeek;

  if (status_type_id.name !== STATUS_TYPES.OPEN.NAME) {
    return (
      <ResolvedSection
        csid={csid}
        siteName={name}
        operatorId={operator_id}
        end={end_time}
      />
    );
  }
  return (
    <>
      <Helmet title={`Incident #${id}`} />
      {bypass && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ top: 110 }}>
          <MuiAlert severity="info" variant="filled" elevation={6}>
            This is a bypass incident
          </MuiAlert>
        </Snackbar>
      )}
      <div style={{ padding: 12 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.top} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <IncidentSummary incident={incidentData} />
              </Grid>
              <Grid item xs={4}>
                <StartTime start={start_time} />
              </Grid>
              <Grid item xs={4}>
                <ElapsedTime start={start_time} end={end_time} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.mid} spacing={3}>
            <Grid container spacing={3} className={classes.fullHeight}>
              <Grid item xs={8} className={classes.cameraSection}></Grid>
              <Grid item xs={4} className={classes.fullHeight}>
                <Grid container spacing={3} className={classes.fullHeight}>
                  <Grid item xs={12} style={{ height: mapHeight }}>
                    <MapSection
                      height={`${mapHeight}px`}
                      cameras={cameras}
                      sensor={sensor}
                      selectedCamId={selectedCamId}
                      onMouseEnterCamera={setSelectedCamId}
                      onMouseLeaveCamera={(cid) => {
                        if (cid === selectedCamId) setSelectedCamId();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.sop}>
                    <Paper className={classes.sopPaper}>
                      <SopTable
                        incident_id={id}
                        items={sopitems}
                        sop_checked_items={sop_checked_items}
                        clickable
                        subtitle={incident_type_id.name}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} className={classes.commentContacts}>
                    <Grid container spacing={3} className={classes.fullHeight}>
                      <Grid item xs={8} className={classes.fullHeight}>
                        <CommentTable
                          id={id}
                          name={incidentName}
                          siteId={siteID}
                          comment={comment}
                        />
                      </Grid>
                      <Grid item xs={4} className={classes.fullHeight}>
                        <ContactsTable items={contactsData} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.status}>
                    <IncidentStatusUpdateButton
                      id={id}
                      status_type={status_type_id}
                      user_id={user_id}
                      bypass={bypass}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

IncidentPage.defaultProps = {
  usersData: { users: [] },
};

export default Page;
