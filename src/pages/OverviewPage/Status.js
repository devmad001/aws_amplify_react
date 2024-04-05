/* eslint-disable camelcase */
// @flow

import React from "react";
import { STATUS_TYPES } from "../../constants";
import isBypass from "../../helpers/isBypass";

import type { Bypass as BypassType } from "~/types";

const STATUS_TYPES_ARRAY = Object.keys(STATUS_TYPES).map(
  (k) => STATUS_TYPES[k]
);

type Props = {
  data: {
    site_id: { id: number },
    start_time: string,
    status_type_id: { id: number },
    incident_viewers: { viewer_id: string }[],
  },
  bypasses: BypassType[],
};

const Status = ({ data, bypasses = [] }) => {
  const { status_type_id, incident_viewers = [], site_id, start_time } = data;

  if (isBypass(site_id.id, start_time, bypasses)) return "Bypass";

  const type =
    STATUS_TYPES_ARRAY.find((t) => t.NAME === status_type_id.name) || {};
  const { NAME, COLOR } = type;

  if (
    status_type_id.name === STATUS_TYPES.OPEN.NAME &&
    !incident_viewers.length
  ) {
    return <span style={{ color: COLOR }}>Pending</span>;
  }

  return NAME;
};

export default Status;
