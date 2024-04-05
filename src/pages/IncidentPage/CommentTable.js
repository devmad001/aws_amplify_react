/* eslint-disable camelcase */
// @flow

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { API, graphqlOperation } from "aws-amplify";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { useUser } from "ra-aws-amplify";
import { useNotify } from "react-admin";
import { updateIncident } from "../../graphql/mutations";
const NEATPATROL_BASE_ADDRESS = process.env.NEATPATROL_BASE_ADDRESS || "";

type Props = {
  id: number,
  name: string,
  siteId: string,
};

const useStyles = makeStyles(() => ({
  container: {
    padding: 10,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textfield: {
    width: "100%",
    flex: "1",
  },
  inputOutline: {
    height: "100%",
  },
  input: {
    height: "100% !important",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  reportButton: {
    backgroundColor: "#4D7DF2 !important",
    fontSie: "12px",
  },
}));

export default function CommentTable({ id, name, siteId, comment }: Props) {
  const classes = useStyles();

  const [commentData, setCommentData] = useState(comment);

  const updateValue = async (v) => {
    try {
      console.log("@@@", v);
      await API.graphql(
        graphqlOperation(updateIncident, {
          input: { id, comment: v },
        })
      );
      console.log(v);
    } catch (e) {}
  };

  const handleChange = (event) => {
    const { value } = event.target;
    updateValue(value);
    setCommentData(value);
  };

  const handleSubmit = () => {
    fetch(`${NEATPATROL_BASE_ADDRESS}/imops/incident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        notes: comment,
        siteId,
      }),
    }).then(() => {
      setCommentData("");
    });
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="subtitle1">COMMENT</Typography>
      <div className={classes.divider} />
      <TextField
        value={commentData}
        label=""
        multiline
        variant="outlined"
        onChange={handleChange}
        className={classes.textfield}
        InputProps={{
          className: classes.inputOutline,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          className: classes.input,
        }}
      />

      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button
          className={classes.reportButton}
          variant="contained"
          size="small"
          disabled={!commentData}
          onClick={handleSubmit}>
          Report to NeatPatrol
        </Button>
      </Box>
    </Paper>
  );
}
