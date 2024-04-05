/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  updateIncident,
  createIncidentchangelog,
} from "../../../../graphql/mutations";
import { getIncident } from "../../../../graphql/queries";
import { useUser } from "ra-aws-amplify";
import { useNotify } from "react-admin";
const useStyles = makeStyles(() => ({
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

type SubProps = {
  incident_id: number,
  comment: String,
};

function CommentFieldWithSub({ incident_id }: SubProps) {
  const [loading, setLoading] = useState(false);
  const [incidentData, setIncidentData] = useState({});
  useEffect(() => {
    async function fetchData(incident_id) {
      const { data } = await API.graphql(
        graphqlOperation(getIncident, { id: incident_id })
      );
      if (data.getIncident) setIncidentData(data.getIncident);
      setLoading(false);
    }
    fetchData(incident_id);
  }, [incident_id]);

  return (
    <CommentField
      incident_id={incident_id}
      defaultValue={incidentData.comment}
    />
  );
}
type Props = {
  incident_id: number,
  defaultValue: string,
};
function CommentField({ incident_id, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const notify = useNotify();

  const userdata = useUser();
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async () => {
    setLoading(true);
    await API.graphql(
      graphqlOperation(updateIncident, {
        input: { id: incident_id, comment: value },
      })
    );
    try {
      await API.graphql(
        graphqlOperation(createIncidentchangelog, {
          input: {
            incident_id: incident_id,
            user_id: userdata.username,
            field: "comment",
          },
        })
      );
    } catch (e) {
      notify("Could not save logs", "warning");
    }

    setLoading(false);
  };

  return (
    <>
      <TextField
        label="Comment"
        multiline
        rows={10}
        variant="outlined"
        onChange={onChange}
        defaultValue={defaultValue}
        fullWidth
      />
      <Button
        onClick={() => onSubmit()}
        color="primary"
        variant="contained"
        style={{ marginTop: 12 }}
        disabled={value === defaultValue || loading}>
        <div className={classes.wrapper}>
          Update
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Button>
    </>
  );
}

export default CommentFieldWithSub;
