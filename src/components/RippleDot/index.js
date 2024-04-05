// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ( {
  wrapper: {
    position: 'relative',
    margin: 'auto',
    width: props => props.size || '12px',
    height: props => props.size || '12px',
  },
  badge: {
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 2,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: props => props.color || theme.palette.primary.main,
      borderRadius: '50%',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: props => props.color || theme.palette.primary.main,
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0,0,0,.3) inset',
      animation: '$ripple 1.2s infinite ease-in-out',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
} ) );

const RippleDot = ( { color }: {color: string} ) => {
  const classes = useStyles( { color } );
  return <div className={ classes.wrapper }><div className={ classes.badge } /></div>;
};

export default RippleDot;
