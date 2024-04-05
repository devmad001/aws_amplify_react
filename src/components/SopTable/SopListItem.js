/* eslint-disable camelcase */
// @flow

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CircularProgress from "@material-ui/core/CircularProgress";

import { API, graphqlOperation } from "aws-amplify";
import {
  createSopcheckeditem,
  updateSopcheckeditem,
  deleteSopcheckeditem,
} from "../../graphql/mutations";
import CHECK from "./CHECK.graphql";

const useStyles = makeStyles((theme) => ({
  listItem: {
    alignItems: "flex-start",
    "&:hover": {
      backgroundColor: "transparent",
    },
    paddingLeft: 0,
    paddingRight: 0,
  },
  listItemHeader: {
    "& .MuiTypography-body1": {
      color: "white",
      fontWeight: 600,
    },
  },
  listItemText: {
    marginTop: 0,
    marginBottom: 0,
    "& .MuiTypography-body1": {
      color: "white",
      fontWeight: 300,
    },
  },
  listItemIcon: {
    minWidth: "fit-content",
  },
  listItemNumber: {
    minWidth: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: "center",
  },
  checkboxWrapper: {
    position: "relative",
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

type Props = {
  id: number,
  name: string,
  index: number,
  sop_checked_items: any[],
  incident_id: number,
  clickable: boolean,
};
function SopListItem({
  id,
  name,
  index,
  sop_checked_item,
  incident_id,
  clickable,
}: Props) {
  const classes = useStyles();

  let ischecked = false;
  if (sop_checked_item) ischecked = true;
  const [checked, setChecked] = useState(ischecked);
  const [loading, setLoading] = useState(false);
  const handleCheck = async (v) => {
    if (clickable) {
      setChecked(v);
      setLoading(true);
      if (!v) {
        await API.graphql(
          graphqlOperation(deleteSopcheckeditem, {
            input: { id: sop_checked_item.id },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(createSopcheckeditem, {
            input: { incident_id, sop_item_id: id, checked: true },
          })
        );
      }
      setLoading(false);
    }
  };

  return (
    <ListItem
      disableRipple
      className={classes.listItem}
      onClick={() => handleCheck(!checked)}
      button={clickable}>
      <ListItemIcon className={classes.listItemIcon}>
        <div className={classes.checkboxWrapper}>
          <Checkbox
            edge="start"
            checked={checked}
            disabled
            disableRipple
            className={classes.checkbox}
          />
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </ListItemIcon>
      <ListItemIcon className={classes.listItemNumber}>
        <Typography variant="caption">{`${index + 1}`}</Typography>
      </ListItemIcon>
      <ListItemText
        primary={name}
        primaryTypographyProps={{ style: { whiteSpace: "break-spaces" } }}
        className={classes.listItemText}
      />
    </ListItem>
  );
}

SopListItem.defaultProps = {};

export default SopListItem;
