/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { titleCase } from "title-case";
import moment from "moment";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { useUser } from "ra-aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import GetAppIcon from "@material-ui/icons/GetApp";
import Typography from "@material-ui/core/Typography";

import Loader from "../../components/Loader";
import SopTable from "./SopTable";
import NotFoundPage from "../NotFoundPage";
import ContactsTable from "./ContactsTable";
import TextField from "./TextField";
import CommentField from "./CommentField";

import INCIDENT from "./INCIDENT.graphql";
import BYPASSES from "./BYPASSES.graphql";
import {
  getIncident,
  bypassBySite_id,
  getIncidenttype,
  getSite,
  sopcheckedItemsByIncident_id,
  sopitemsBySiteByIncident_type,
  getStatustype,
} from "../../graphql/queries";
import userDataProvider from "../../providers/usersProvider";
import formatDuration from "../../helpers/formatDuration";

import isBypass from "../../helpers/isBypass";

import typography from "../../theme/typography";

import "./index.module.scss";
const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || "";

const theme = createTheme({
  typography: {
    fontFamily: typography.fontFamily,
  },
});

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    "@media print": {
      minHeight: "0",
    },
  },
  innerContainer: {
    width: "21cm",
    // minHeight: '29.6cm',
    margin: "auto",
    backgroundColor: "white",
    // boxShadow: '0px 0px 60px 2px rgba(189,189,189,1)',
    display: "flex",
    flexDirection: "column",
    "@media print": {
      boxShadow: "none",
      // size: 'A4 portrait',
      WebkitPrintColorAdjust: "exact !important",
    },
  },
  printButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: "10px",
    "@media print": {
      display: "none",
    },
  },
  title: {
    fontWeight: "bold",
  },
  signatureRow: {
    marginBottom: 60,
  },
  videoSection: {
    width: "21cm",
    margin: "60px auto",
    "@media print": {
      display: "none",
    },
  },
}));

function ReportPage() {
  const { id } = useParams();

  if (!id) return <NotFoundPage />;

  return <PageWithId id={id} />;
}

type PageWithIdProps = {
  id: number,
};

function PageWithId(props) {
  const { id } = props;
  const [incidentData, setIncidentData] = useState({});
  const [bypassData, setBypassData] = useState([]);
  const [sopitems, setSopitems] = useState([]);
  const [sop_checked_items, setSop_checked_items] = useState([]);
  const [userData, setUserData] = useState({});
  const [usergroupsData, setUsergroupsData] = useState([]);
  const [incidentId, setIncidentId] = useState(id);
  useEffect(() => {
    async function fetchData(incidentId) {
      const { data } = await API.graphql(
        graphqlOperation(getIncident, { id: incidentId })
      );
      if (data.getIncident) setIncidentData(data.getIncident);

      const { data: bypassData } = await API.graphql(
        graphqlOperation(bypassBySite_id, { site_id: incidentId })
      );
      if (bypassData.bypassBySite_id)
        setBypassData(bypassData.bypassBySite_id.items);

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
        },
      } = data;
      const userData = await userDataProvider("/getUser", {
        username: operator_id,
      });

      setUserData(userData);

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
          incident_id: incidentId,
        })
      );
      setSop_checked_items(checkedItemsData.items);

      const { Groups } = await userDataProvider("/listGroupsForUser", {
        username: operator_id,
      });
      setUsergroupsData(Groups);
      setLoading(false);
    }
    fetchData(incidentId);
  }, [incidentId]);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(true);
  const [expired, setExpired] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const updateStatus = () => {
      const startTime = incidentData ? incidentData.start_time : null;
      if (startTime) {
        // video will be ready 5min after incident start time
        const fiveMinsLater = moment(startTime).add(5, "minutes");
        const p = moment().isBefore(fiveMinsLater);

        // video will automatically be removed after 1 week
        const aWeek = moment().subtract(7, "days").startOf("day");
        const inAWeek = moment(startTime).isAfter(aWeek);

        setProcessing(p);
        setExpired(!inAWeek);
      }
    };
    updateStatus();
    const interval = setInterval(() => {
      updateStatus();
    }, 1000);
    return () => clearInterval(interval);
  }, [incidentData]);

  if (loading) return <Loader />;

  const isManual = !!incidentData.created_by;
  const hasSpecificCam =
    incidentData.details && incidentData.details.imopsCameraId;

  let cameras = [];
  if (isManual) {
    cameras = incidentData.videos.map((v, index) => ({
      id: index,
      name: `Video #${String(index + 1)}`,
      href: `${VIDEO_DOWNLOAD_ADDRESS}/video/${v}`,
    }));
  } else if (hasSpecificCam) {
    cameras = [
      {
        id: incidentData.incident.details.imopsCameraId,
        name: `Virtual Patrol Camera ${incidentData.incident.details.imopsCameraId}`,
        href: `${VIDEO_DOWNLOAD_ADDRESS}/video/incident-${id}-cam-${incidentData.incident.details.imopsCameraId}.mp4`,
      },
    ];
  } else {
    // cameras = incidentData.sensor.cameras.map((n) => ({
    //   id: n.id,
    //   name: n.name,
    //   href: `${VIDEO_DOWNLOAD_ADDRESS}/video/cam-${n.id}-incident-${id}.mp4`,
    // }));
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <IconButton
            color="primary"
            component="span"
            className={classes.printButton}
            onClick={() => window.print()}>
            <LocalPrintshopIcon />
          </IconButton>
        </div>
        <IncidentReportSection
          id={id}
          userData={userData}
          usergroupsData={usergroupsData}
          bypassData={bypassData}
          data={incidentData}
          sop_items={sopitems}
          sop_checked_items={sop_checked_items}
        />
        <div className={classes.videoSection} />
      </div>
    </ThemeProvider>
  );
}

type VideoSectionProps = {
  expired: boolean,
  processing: boolean,
  cameras: {
    id: number,
    name: string,
    href: string,
  }[],
};

function VideoSection(props: VideoSectionProps) {
  const classes = useStyles();
  const { cameras, expired, processing } = props;
  if (!cameras.length) return null;

  let buttonText = "";

  if (expired) buttonText = " (Expired)";
  if (processing) buttonText = " (Processing)";
  return (
    <div>
      <Typography variant="h3" className={classes.title}>
        Videos
      </Typography>
      {cameras.map((c) => (
        <Button
          fullWidth
          key={c.id}
          startIcon={<GetAppIcon />}
          href={c.href}
          target="_blank"
          disabled={expired || processing}>
          {c.name + buttonText}
        </Button>
      ))}
    </div>
  );
}
type Incident = {
  start_time: string,
  end_time: string,
  status_type: {
    name: string,
  },
  incident_type: {
    name: string,
  },
  site: {
    id: number,
    name: string,
    address: string,
  },
  operator_id: number,
  sop_items: {
    id: number,
    name: string,
    sop_checked_items: {
      id: number,
      checked: boolean,
    },
  }[],
  contacts: {
    id: number,
    name: string,
    handphone: string,
  }[],
  comment: string,
  details?: {
    comments: string,
  },
  created_by: string,
};

type Props = {
  id: number,
  usersData?: {
    users: {
      uid: string,
      displayName: string,
      role: string,
      email: string,
    }[],
  },
  data: {
    incident: Incident,
  },
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
});

function IncidentReportSection({
  id,
  usersData = {},
  userData = {},
  usergroupsData = [{ GroupName: "" }],
  bypassData,
  sop_checked_items,
  sop_items,
  data,
}) {
  const classes = useStyles();

  const {
    start_time,
    site_id,
    end_time,
    comment,
    details,
    incident_type_id,
    status_type_id,
  } = data;
  const isManual = true;
  const { Username = "", UserAttributes = [{}] } = userData;
  const usergroupName = usergroupsData[0].GroupName;
  const email = UserAttributes.filter((att) => att.Name == "email")[0].Value;
  const UID = UserAttributes.filter((att) => att.Name == "sub")[0].Value;

  const bypass = isBypass(site_id.id, start_time, bypassData);
  const commentList = [];
  if (comment) commentList.push(comment);
  if (details && details.comments) commentList.push(`VP: ${details.comments}`);
  const { name: siteName, address } = site_id;
  return (
    <>
      <Helmet title={`Incident Report #${id}`} />
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Typography variant="h3" className={classes.title}>
              Incident Report
            </Typography>
          </View>
          <Divider />
          <View style={styles.section}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField label="Name" value={Username} />
              </Grid>
              <Grid item xs={8}>
                <TextField label="UID" value={UID} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Designation"
                  value={usergroupsData ? titleCase(usergroupName) : ""}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField label="Email" value={email ? email : ""} />
              </Grid>
            </Grid>
          </View>
          <Divider />
          <View style={styles.section}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField label="Incident No." value={id} />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Date and Time"
                  value={moment(start_time).format("DD/MM/YYYY HH:mm:ss")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Resolved Time"
                  value={moment(end_time).format("DD/MM/YYYY HH:mm:ss")}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Elapsed Time"
                  value={formatDuration(
                    moment.duration(moment(end_time).diff(start_time))
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Site" value={siteName} />
              </Grid>
              <Grid item xs={8}>
                <TextField label="Address" value={address} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Incident Type"
                  value={incident_type_id.name}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Action Taken"
                  value={`${status_type_id.name} ${bypass ? "(Bypass)" : ""}`}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Category"
                  value={isManual ? "Manual" : "System"}
                />
              </Grid>
            </Grid>
          </View>
          <Divider />
          <View style={styles.section}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SopTable
                  items={sop_items}
                  checkedItems={sop_checked_items}
                  hideDivider
                  incident_id={id}
                />
              </Grid>
            </Grid>
          </View>
          <Divider />
          <View style={styles.section}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CommentField
                  label="Comment"
                  value={commentList.length ? commentList.join("\n") : "-"}
                />
              </Grid>
            </Grid>
          </View>
          <Divider />

          <Divider />
          <View style={styles.section}>
            <Grid container spacing={3} className={classes.signatureRow}>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <TextField label="Signature" />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Date" />
              </Grid>
            </Grid>
          </View>
          <Divider />
        </Page>
      </Document>
    </>
  );
}

IncidentReportSection.defaultProps = {
  usersData: { users: [] },
};

export default ReportPage;
