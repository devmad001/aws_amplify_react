// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ( {
  root: {
    marginTop: theme.spacing( 2 ),
  },
} ) );

const SubHeader = ( { children, style }: {children: any, style?: any} ) => {
  const classes = useStyles();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography
      variant="h6"
      display="block"
      gutterBottom
      className={ classes.root }
      style={ style }
    >
      {children}
    </Typography>
  );
};

SubHeader.defaultProps = {
  style: {},
};

export default SubHeader;
