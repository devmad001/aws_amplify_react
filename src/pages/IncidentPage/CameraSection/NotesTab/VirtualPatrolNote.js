/* eslint-disable react/destructuring-assignment */
// @flow

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( () => ( {
  label: {
    fontWeight: 700,
  },
} ) );

type Props = {
  comments: string,
}

function VirtualPatrolNote( { comments }: Props ) {
  const classes = useStyles();

  if ( !comments ) {
    return null;
  }

  return (
    <Box>
      <Box p={ 2 }>
        <Typography variant="subtitle1" className={ classes.label }>
          Virtual Patrol
        </Typography>
      </Box>

      <Box px={ 2 }>
        <Typography variant="body2">
          {comments}
        </Typography>
      </Box>
    </Box>
  );
}

export default VirtualPatrolNote;
