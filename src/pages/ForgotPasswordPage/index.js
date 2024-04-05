// @flow

import React, { useState } from 'react';
import { useNotify, Notification } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import firebase from 'firebase';

const useStyles = makeStyles( theme => ( {
  root: {
    height: '100vh',
  },
  logo: {
    width: '340px',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  signInButton: {
    margin: 'auto',
  },
  image: {
    backgroundImage: 'url(/images/background-image.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing( 8, 4 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing( 1 ),
  },
  submit: {
    margin: theme.spacing( 3, 0, 2 ),
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing( 1 ),
    position: 'relative',
  },
} ) );

function ForgotPasswordPage( ) {
  const [ email, setEmail ] = useState( '' );
  const [ loading, setLoading ] = useState( false );
  const notify = useNotify();
  const submit = e => {
    e.preventDefault();
    setLoading( true );
    const auth = firebase.auth();

    auth.sendPasswordResetEmail( email ).then( () => {
      notify( 'Email sent' );
      setLoading( false );
    } ).catch( ( { message } ) => {
      notify( message, 'error' );
      setLoading( false );
    } );
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={ classes.root }>
      <CssBaseline />
      <Grid
        item
        xs={ 12 }
        sm={ 12 }
        md={ 6 }
        lg={ 4 }
        component={ Paper }
        style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }
      >
        <div className={ classes.paper }>
          <Typography variant="h4" gutterBottom>
            Forgot Your Password?
          </Typography>
          <form className={ classes.form } noValidate onSubmit={ submit }>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={ e => setEmail( e.target.value ) }
            />
            <Box mb="40px" pt="20px">
              <div className={ classes.wrapper }>
                <Button
                  className={ classes.button }
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={ loading }
                >
                  Reset My Password
                </Button>
                {loading && <CircularProgress size={ 24 } className={ classes.buttonProgress } />}
              </div>
            </Box>
            <Box mb="40px" pt="20px" display="flex">
              <Button
                href="/#/login"
                className={ classes.signInButton }
              >
                Back to Login
              </Button>
            </Box>
          </form>
        </div>
      </Grid>
      <Hidden smDown>
        <Grid item md={ 6 } lg={ 8 } className={ classes.image }>
          <img alt="logo" className={ classes.logo } src="/images/logo.svg" />
        </Grid>
      </Hidden>
      <Notification />
    </Grid>
  );
}

export default ForgotPasswordPage;
