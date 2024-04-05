// @flow

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import useCount from "./useCount";
import IncidentTypeBreakdownTable from "./IncidentTypeBreakdownTable";

import ScoreCard from "../../../components/ScoreCard";

const useStyles = makeStyles(() => ({
  tooltip: {
    marginRight: "1em",
  },
  gridContainer: {
    display: "grid",
    "grid-template-columns": "1fr 1fr 1fr",
  },
}));

export default (_props: any) => {
  const { attendNowCount, activeCount, pastCount } = useCount();
  const classes = useStyles();
  console.log(activeCount, pastCount);
  return (
    <div className={classes.gridContainer}>
      <ScoreCard title="Incident Open Today" subtitle="" score={activeCount} />
      <ScoreCard title="Incident Closed Today" subtitle="" score={pastCount} />
      <IncidentTypeBreakdownTable
        title="Active Incident Count by type Today"
        data={{ attendNowCount, activeCount, pastCount }}
      />
    </div>
  );
};
