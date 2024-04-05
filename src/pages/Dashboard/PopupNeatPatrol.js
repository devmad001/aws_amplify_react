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

const PopupNeatPatrol = forwardRef( ( props, ref ) => {
  const classes = useStyles();

  const containerRef = useRef();
  const npidRef = useRef();
  const dateTimeRef = useRef();
  const locationRef = useRef();

  useImperativeHandle( ref, () => ( {
    update: ( { x, y, object } ) => {
      const containerEl = containerRef.current;
      containerEl.style.display = object ? 'block' : 'none';
      containerEl.style.left = `${ x + 10 }px`;
      containerEl.style.top = `${ y }px`;
      containerEl.style.pointerEvents = 'none';

      npidRef.current.textContent = object?.npid;
      dateTimeRef.current.textContent = object?.dateTime;
      locationRef.current.textContent = '';
    },
  } ) );

  return (
    <Box ref={ containerRef } position="absolute" zIndex={ 1 } display="none" width={ 200 }>
      <Paper>
        <Box px={ 1.5 } py={ 1 }>
          <Box display="flex">
            <Typography variant="body1" className={ classes.label }>NPID:</Typography>
            <Typography ref={ npidRef } variant="body1" className={ classes.text } />
          </Box>
          <Box display="flex">
            <Typography variant="body1" className={ classes.label }>Date time:</Typography>
            <Typography ref={ dateTimeRef } variant="body1" className={ classes.text } />
          </Box>
          <Box display="flex">
            <Typography variant="body1" className={ classes.label }>Location:</Typography>
            <Typography ref={ locationRef } variant="body1" className={ classes.text } />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} );

export default PopupNeatPatrol;
