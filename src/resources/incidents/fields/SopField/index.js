/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import { API, graphqlOperation } from "aws-amplify";
import SopListItem from "./SopListItem";
import Loader from "../../../../components/Loader";
import {
  sopcheckedItemsByIncident_id,
  sopitemsBySiteByIncident_type,
} from "../../../../graphql/queries";
import { updateIncident } from "../../../../graphql/mutations";
const useStyles = makeStyles(() => ({
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

type Props = {
  incident_id: number,
  clickable?: boolean,
};
function SopTable({
  incident_id,
  incident_type_id,
  site_id,
  clickable = false,
}: Props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [sopitems, setSopitems] = useState([]);
  const [sop_checked_items, setSop_checked_items] = useState([]);
  useEffect(() => {
    async function fetchData(incident_id, site_id, incident_type_id) {
      const {
        data: { sopcheckedItemsByIncident_id: checkedItemsData },
      } = await API.graphql(
        graphqlOperation(sopcheckedItemsByIncident_id, {
          incident_id,
        })
      );
      setSop_checked_items(checkedItemsData.items);

      const {
        data: { sopitemsBySiteByIncident_type: sopitemsData },
      } = await API.graphql(
        graphqlOperation(sopitemsBySiteByIncident_type, {
          incident_type_id: { eq: incident_type_id },
          site_id: site_id,
        })
      );
      setSopitems(sopitemsData.items);

      setLoading(false);
    }
    fetchData(incident_id, site_id, incident_type_id);
  }, [incident_id, site_id, incident_type_id]);

  if (loading) return <Loader />;
  return (
    <>
      <List className={classes.list}>
        {sopitems.map(({ id, name }, index) => {
          const sop_checked_item = sop_checked_items.find(
            (i) => i.sop_item_id == id
          );

          return (
            <span key={id}>
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
    </>
  );
}

SopTable.defaultProps = {
  clickable: false,
};

export default SopTable;
