/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Paper, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ( {
  container: {
    padding: 10,
    display: 'flex',
  },
  box: {
    margin: 'auto',
    textAlign: 'center',
  },
} ) );

function ScoreCard( { title, score, datatestid } ) {
  const classes = useStyles();
  return (
    <Paper className={ classes.container }>
      <Box className={ classes.box }>
        <Typography variant="subtitle2" data-testid={ datatestid || 'card' }>{title}</Typography>
        <Typography variant="h3">
          {score}
        </Typography>
        <Typography variant="subtitle2" />
      </Box>
    </Paper>
  );
}

export default ScoreCard;
