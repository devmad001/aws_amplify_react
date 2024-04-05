// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  useLogin, useNotify, userLogin, Notification,
} from 'react-admin';

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

const useStyles = makeStyles( theme => ( {
  root: {
    height: '100vh',
  },
  logo: {
    width: '450px',
    height: '300px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  signinButton: {
    backgroundColor: theme.palette.primary.main,
  },
  forgotButton: {
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

function LoginPage( ) {
  const [ username, setUsername ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ loading, setLoading ] = useState( false );
  const login = useLogin();
  const notify = useNotify();
  const submit = e => {
    e.preventDefault();
    setLoading( true );
    login( { username, password } )
      .catch( () => {
        notify( 'Invalid username or password', 'warning' );
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
            Sign In
          </Typography>
          <form className={ classes.form } noValidate onSubmit={ submit }>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={ e => setUsername( e.target.value ) }
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ e => setPassword( e.target.value ) }
            />
            <Box mb="40px" pt="20px">
              <div className={ classes.wrapper }>
                <Button
                  className={ classes.signinButton }
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={ loading }
                >
                  Sign In
                </Button>
                {loading && <CircularProgress size={ 24 } className={ classes.buttonProgress } />}
              </div>
            </Box>
            <Box mb="40px" pt="20px" display="flex">
              <Button
                href="/#/forgot"
                className={ classes.forgotButton }
              >
                Forgot password?
              </Button>
            </Box>
          </form>
        </div>
      </Grid>
      <Hidden smDown>
        <Grid item xs={ false } sm={ false } md={ 6 } lg={ 8 } className={ classes.image }>
          <img alt="logo" className={ classes.logo } src="/images/metropolis-logo.png" />
        </Grid>
      </Hidden>
      <Notification />
    </Grid>
  );
}

export default connect( undefined, { userLogin } )( LoginPage );
