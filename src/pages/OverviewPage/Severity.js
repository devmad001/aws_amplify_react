/* eslint-disable camelcase */
// @flow

import React from "react";
import { SEVERITY_TYPES } from "../../constants";

const SEVERITY_TYPES_ARRAY = Object.keys(SEVERITY_TYPES).map(
  (k) => SEVERITY_TYPES[k]
);

type Props = {
  data: {
    severity_type: { id: string, name: string },
  },
};

const Severity = ({ data }: Props) => {
  const { severity_type_id } = data;

  const type =
    SEVERITY_TYPES_ARRAY.find((t) => t.NAME === severity_type_id.name) || {};
  const { COLOR } = type;

  return <span style={{ color: COLOR }}>{severity_type_id.name}</span>;
};

export default Severity;
