/* eslint-disable camelcase */
// @flow

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

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

type SopItem = {
  id: number,
  name: string,
  site_id: string,
  incident_type_id: string,
};
type SopcheckedItem = {
  id: number,
  sop_item_id: string,
  incident_id: string,
  checked: boolean,
};
type Props = {
  incident_id: number,
  items: SopItem[],
  checkedItems: SopcheckedItem[],
  hideDivider?: boolean,
  clickable?: boolean,
  subtitle?: string,
};
function SopTable({
  incident_id,
  items = [],
  checkedItems = [],
  hideDivider,
  clickable = false,
  subtitle,
}: Props) {
  const classes = useStyles();
  const sub = subtitle ? ` - ${subtitle}` : "";
  const checkedItemsArray = checkedItems.map((item) =>
    item.sop_item_id ? item.sop_item_id : ""
  );
  console.log("@@@", checkedItemsArray);
  return (
    <>
      <Typography variant="subtitle1" className={classes.title}>
        {`SOP${sub}`}
      </Typography>
      <List className={classes.list}>
        {items.map(({ id, name }, index) => {
          console.log("@#@#", id, name);
          return (
            <span key={id}>
              {!hideDivider && <Divider />}
              <SopListItem
                id={id}
                name={name}
                index={index}
                checkstate={checkedItemsArray.includes(id)}
                incident_id={incident_id}
                clickable={clickable}
              />
            </span>
          );
        })}
      </List>
    </>
  );
}

SopTable.defaultProps = {
  hideDivider: false,
  clickable: false,
  subtitle: "",
};

export default SopTable;
