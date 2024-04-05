import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
  Box, Paper, Typography, makeStyles,
} from '@material-ui/core';
import moment from 'moment';

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

const PopupVehicle = forwardRef( ( props, ref ) => {
  const classes = useStyles();

  const containerRef = useRef();
  const messageRef = useRef();

  useImperativeHandle( ref, () => ( {
    update: ( { x, y, object } ) => {
      const containerEl = containerRef.current;

      containerEl.style.left = `${ x + 10 }px`;
      containerEl.style.top = `${ y }px`;
      containerEl.style.display = object ? 'block' : 'none';
      containerEl.style.pointerEvents = 'none';

      const time = moment( object?.DeviceActivity ).format( 'DD/MM/YYYY HH:mm:ss' );
      messageRef.current.textContent = `Info (${ object?.PlateNumber || '' }), ${ time }`;
    },
  } ) );

  return (
    <Box ref={ containerRef } position="absolute" zIndex={ 1 } display="none">
      <Paper>
        <Box px={ 1.5 } py={ 1 }>
          <Typography ref={ messageRef } variant="body1" className={ classes.text } />
        </Box>
      </Paper>
    </Box>
  );
} );

export default PopupVehicle;
