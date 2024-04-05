/* eslint-disable camelcase */
// @flow

import React from "react";
import { STATUS_TYPES } from "../../constants";

import RippleDot from "~/components/RippleDot";

const STATUS_TYPES_ARRAY = Object.keys(STATUS_TYPES).map(
  (k) => STATUS_TYPES[k]
);

type DataProps = {
  start_time: number,
  status_type_id: { id: number },
  incident_viewers: { viewer_id: string }[],
};

const StatusIcon = ({ data }: { data: DataProps }) => {
  const { status_type_id, viewers } = data;

  const type =
    STATUS_TYPES_ARRAY.find((t) => t.NAME === status_type_id.name) || {};
  const { COLOR } = type;

  if (status_type_id.name === STATUS_TYPES.OPEN.NAME && !viewers.length) {
    return <RippleDot color={COLOR} />;
  }

  return "";
};

export default StatusIcon;
