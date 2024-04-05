/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
// @flow

import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// import ReactPlayer from 'react-player';

const useStyles = makeStyles( () => ( {
  cameraContainer: props => ( {
    overflow: 'hidden',
    boxShadow: props.selected ? '0px 0px 5px 1px rgba(255,255,255,1)' : 'initial',
    position: 'relative',
  } ),
  cameraName: {
    padding: 3,
    position: 'absolute',
    top: '5.5%',
    right: 0,
    backgroundColor: '#000000ad',
    zIndex: 1,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 'small',
  },
} ) );

type Camera = {
  id: string,
  name: string,
  stream_url: string,
  selected?: boolean,
}

function CameraPlayer( {
  name, stream_url, id, selected,
}: Camera ) {
  const classes = useStyles( { selected } );
  const playerId = `player-${ id }`;

  useEffect( () => {
    const ovenPlayer = window.OvenPlayer.create( playerId, {
      sources: [
        {
          type: 'webrtc',
          file: stream_url,
          label: stream_url,
        },
      ],
      expandFullScreenUI: true,
      autoStart: true,
      mute: true, // As of Chrome 66, videos must be muted in order to play automatically
    } );

    ovenPlayer.on( 'error', err => console.error( 'OvenPlayer error', err ) );
    ovenPlayer.on( 'ready', () => {
      ovenPlayer.play();
    } );

    return () => {
      ovenPlayer.stop();
    };
  }, [] );
  return (
    <Paper className={ classes.cameraContainer }>
      <Typography variant="subtitle1" className={ classes.cameraName }>
        { name }
      </Typography>
      <div id={ playerId } style={ { position: 'relative', paddingTop: '56.25%', backgroundColor: 'black' } } />
    </Paper>
  );
}

CameraPlayer.defaultProps = {
  selected: false,
};

function ErrorFallback( ) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      There is an error loading this video stream.
    </Alert>
  );
}

const CameraPlayerWithErrorBoundary = ( props: Camera ) => (
  <ErrorBoundary
    FallbackComponent={ ErrorFallback }
  >
    <CameraPlayer { ...props } />
  </ErrorBoundary>
);

CameraPlayerWithErrorBoundary.defaultProps = {
  selected: false,
};

export default CameraPlayerWithErrorBoundary;
