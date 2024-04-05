/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import pad from 'pad';

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

const formatDuration = ( duration: moment ) => {
  const hours = parseInt( duration.asHours(), 10 );
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${ pad( 2, hours, '0' ) }:${ pad( 2, minutes, '0' ) }:${ pad( 2, seconds, '0' ) }`;
};

const ElapsedTimeFromNow = ( { start }: {start: number} ) => {
  const [ duration, setDuration ] = useState( moment.duration( moment().diff( start ) ) );
  useEffect( () => {
    const interval = setInterval( () => {
      setDuration( moment.duration( moment().diff( start ) ) );
    }, 1000 );
    return () => clearInterval( interval );
  }, [ start ] );
  return formatDuration( duration );
};

function ElapsedTime( { start, end }: {start: number, end: number} ) {
  const classes = useStyles();
  const timeDisplay = end
    ? formatDuration( moment.duration( moment( end ).diff( start ) ) )
    : <ElapsedTimeFromNow start={ start } />;
  return (
    <Paper className={ classes.elapseContainer }>
      <Box className={ classes.elapseBox }>
        <Typography variant="h3">
          {timeDisplay}
        </Typography>
        <Typography variant="subtitle2">elapsed time</Typography>
      </Box>
    </Paper>
  );
}

export default ElapsedTime;
