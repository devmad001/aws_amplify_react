import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
  Box, Paper, Typography, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles( () => ( {
  label: {
    fontWeight: 700,
    color: '#FFFFFF',
    marginRight: 4,
  },
  text: {
    color: '#FFFFFF',
  },
} ) );

const splitMessage = str => {
  // Ex:
  // str = '(8/10)11:45 Roadworks on Sheares Avenue after Park Street'
  // dateTime = (8/10)11:45
  // resMessage = [ 'Roadworks', 'on', 'Sheares', 'Avenue', 'after', 'Park', 'Street' ]
  const [ dateTime, ...resMessage ] = str.split( ' ' );

  // time = 11:45
  const time = dateTime.slice( 1 ).split( ')' )[ 1 ] || '';
  // message = 'Roadworks on Sheares Avenue after Park Street'
  const message = resMessage.join( ' ' );

  return { time, message };
};

const PopupTraffic = forwardRef( ( props, ref ) => {
  const classes = useStyles();

  const containerRef = useRef();
  const typeRef = useRef();
  const dateTimeRef = useRef();
  const messageRef = useRef();

  useImperativeHandle( ref, () => ( {
    update: ( { x, y, object } ) => {
      const containerEl = containerRef.current;

      containerEl.style.left = `${ x + 10 }px`;
      containerEl.style.top = `${ y }px`;
      containerEl.style.display = object ? 'block' : 'none';
      containerEl.style.pointerEvents = 'none';

      const { time, message } = splitMessage( object?.Message || '' );

      typeRef.current.textContent = object?.Type;
      dateTimeRef.current.textContent = time;
      messageRef.current.textContent = message;
    },
  } ) );

  return (
    <Box ref={ containerRef } position="absolute" zIndex={ 1 } display="none" width={ 200 }>
      <Paper>
        <Box px={ 1.5 } py={ 1 }>
          <Box display="flex">
            <Typography variant="body1" className={ classes.label }>Type:</Typography>
            <Typography ref={ typeRef } variant="body1" className={ classes.text } />
          </Box>
          <Box display="flex">
            <Typography variant="body1" className={ classes.label }>Time:</Typography>
            <Typography ref={ dateTimeRef } variant="body1" className={ classes.text } />
          </Box>
          <Typography ref={ messageRef } variant="body1" className={ classes.text } />
        </Box>
      </Paper>
    </Box>
  );
} );

export default PopupTraffic;
