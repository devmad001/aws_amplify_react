// @flow

import React from 'react';
import { Notification } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles( theme => ( {
  root: {
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  fourofour: {
    fontSize: '20em',
  },
  paper: {
    margin: theme.spacing( 8, 4 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
  },
} ) );

function UnauthorizedPage( ) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        xs={ 12 }
        component={ Paper }
        style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }
        className={ classes.root }
      >
        <div className={ classes.paper }>
          <Typography variant="h2" className={ classes.fourofour }>
            401
          </Typography>
          <Typography variant="h2">
            Unauthorized
          </Typography>
          <IconButton href="/" className={ classes.home }>
            <HomeIcon fontSize="large" />
          </IconButton>
        </div>
      </Grid>
      <Notification />
    </Grid>
  );
}

export default UnauthorizedPage;
