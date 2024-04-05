/* eslint-disable camelcase */
// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( () => ( {
  elapseContainer: {
    padding: 18,
    display: 'flex',
  },
  elapseBox: {
    margin: 'auto',
    textAlign: 'center',
  },
} ) );

function StartTime( { start }: {start: number} ) {
  const classes = useStyles();
  return (
    <Paper className={ classes.elapseContainer }>
      <Box className={ classes.elapseBox }>
        <Typography variant="h3">
          {moment( start ).format( 'DD/MM/YYYY HH:mm:ss' )}
        </Typography>
        <Typography variant="subtitle2">time started</Typography>
      </Box>
    </Paper>
  );
}

export default StartTime;
