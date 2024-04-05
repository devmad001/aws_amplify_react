/* eslint-disable camelcase */
// @flow

import React from "react";
import MuiEditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

type DataProps = {
  id: number,
};

const EditIcon = ({ data }: { data: DataProps }) => (
  <IconButton
    onClick={(e) => {
      e.stopPropagation();
      window.open(`/#/incidents/${data.id}/show`, "_blank");
    }}>
    <MuiEditIcon />
  </IconButton>
);

export default EditIcon;
