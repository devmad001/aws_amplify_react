/* eslint-disable camelcase */
// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles( theme => ( {
  container: {
    display: 'flex',
    height: '100vh',
  },
  box: {
    margin: 'auto',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: theme.spacing( 2 ),
  },
} ) );

type Props = {
  csid: string,
  siteName: string,
  operatorId: string,
  end: number,
  usersData: {
    users: {
      uid: string,
      displayName: string,
    }[]
  },
  usersLoading: boolean,
}
function ResolvedSection( {
  csid, siteName, operatorId, end, usersData, usersLoading,
}: Props ) {
  const classes = useStyles();
  const endTime = moment( end ).format( 'DD/MM/YYYY HH:mm:ss' );
  let operatorName = <Skeleton />;
  if ( !usersLoading ) {
    const user = usersData.users.find( u => u.uid === operatorId );
    operatorName = user ? user.displayName : 'Operator';
  }
  return (
    <Paper className={ classes.container }>
      <Box className={ classes.box }>
        <Typography variant="h3">
          {`${ csid }, on ${ siteName } has been handled by `}
        </Typography>
        <Typography variant="h3">
          {operatorName}
        </Typography>
        <Typography variant="h3">
          {`on ${ endTime }.`}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={ () => window.close() }
          className={ classes.closeButton }
        >
          Close
        </Button>
      </Box>
    </Paper>
  );
}

export default ResolvedSection;
