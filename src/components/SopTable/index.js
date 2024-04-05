/* eslint-disable camelcase */
// @flow

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { Scrollbars } from "react-custom-scrollbars";

import SopListItem from "./SopListItem";

const useStyles = makeStyles(() => ({
  title: {
    textTransform: "uppercase",
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

type SopItem = { id: number, name: string, sop_checked_items: any[] };
type Props = {
  incident_id: number,
  items: SopItem[],
  hideDivider?: boolean,
  clickable?: boolean,
  subtitle?: string,
};
function SopTable({
  incident_id,
  items,
  sop_checked_items,
  hideDivider,
  clickable = false,
  subtitle,
}) {
  const classes = useStyles();
  const sub = subtitle ? ` - ${subtitle}` : "";
  return (
    <Scrollbars autoHide autoHideDuration={100} style={{ height: "100%" }}>
      <Typography variant="subtitle1" className={classes.title}>
        {`SOP${sub}`}
      </Typography>
      <List className={classes.list}>
        {items.map(({ id, name }, index) => {
          const sop_checked_item = sop_checked_items.find(
            (i) => i.sop_item_id == id
          );
          return (
            <span key={id}>
              {!hideDivider && <Divider />}
              <SopListItem
                id={id}
                name={name}
                index={index}
                sop_checked_item={sop_checked_item}
                incident_id={incident_id}
                clickable={clickable}
              />
            </span>
          );
        })}
      </List>
    </Scrollbars>
  );
}

SopTable.defaultProps = {
  hideDivider: false,
  clickable: false,
  subtitle: "",
};

export default SopTable;
