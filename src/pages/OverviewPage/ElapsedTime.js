/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from "react";
import moment from "moment";
import pad from "pad";
import { STATUS_TYPES } from "../../constants";

const formatDuration = (duration: moment) => {
  const hours = parseInt(duration.asHours(), 10);
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  if (hours) {
    return `${pad(2, hours, "0")}h ${pad(2, minutes, "0")}m ${pad(
      2,
      seconds,
      "0"
    )}s`;
  }
  if (minutes) {
    return `${pad(2, minutes, "0")}m ${pad(2, seconds, "0")}s`;
  }
  return `${pad(2, seconds, "0")}s`;
};

const ElapsedTimeFromNow = ({
  start,
  color,
}: {
  start: number,
  color?: string,
}) => {
  const [duration, setDuration] = useState(
    moment.duration(moment().diff(start))
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(moment.duration(moment().diff(start)));
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return <span style={{ color }}>{formatDuration(duration)}</span>;
};

ElapsedTimeFromNow.defaultProps = {
  color: "",
};

type DataProps = {
  start_time: number,
  end_time: number,
  status_type_id: { id: number },
  incident_viewers: { viewer_id: string }[],
};

const ElapsedTime = ({ data }: { data: DataProps }) => {
  const { status_type_id, start_time, end_time } = data;

  if (status_type_id.name === STATUS_TYPES.OPEN.NAME) {
    return (
      <ElapsedTimeFromNow start={start_time} color={STATUS_TYPES.OPEN.COLOR} />
    );

    return <ElapsedTimeFromNow start={start_time} />;
  }

  const duration = moment.duration(moment(end_time).diff(start_time));
  return formatDuration(duration);
};

export default ElapsedTime;
