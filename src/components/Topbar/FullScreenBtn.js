// @flow

import React from 'react';
import {
  makeStyles, Tooltip, IconButton, Icon, Hidden, Box,
} from '@material-ui/core';
import screenfull from 'screenfull';

const useStyles = makeStyles( theme => ( {
  textLight: {
    color: theme.palette.text.primary,
  },
} ) );

const FullScreenBtn = () => {
  const classes = useStyles();

  return (
    <Hidden xsDown implementation="css" className="h-btn-full-scr res-hide">
      <Box>
        <Tooltip title="Full Screen" placement="bottom">
          <IconButton aria-label="settings" style={ { padding: '6px' } } onClick={ () => screenfull.toggle() }>
            {/* todo: i18n translate */}
            <Icon className={ classes.textLight }>fullscreen</Icon>
          </IconButton>
        </Tooltip>
      </Box>
    </Hidden>
  );
};

export default FullScreenBtn;
