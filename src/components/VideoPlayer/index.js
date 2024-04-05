// @flow
import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

type Camera = {
  id: string,
  name: string,
  url: string,
  fullHeight?: boolean,
};

const useStyles = makeStyles( () => ( {
  cameraContainer: props => ( {
    overflow: 'hidden',
    maxHeight: '100%',
    height: props.fullHeight ? '100%' : 'auto',
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
  videoContainer: {
    backgroundColor: 'black',
    position: 'relative',
    height: '100%',
  },
  overlay: props => ( {
    backgroundColor: '#000000',
    display: props.loaded ? 'none' : 'block',
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    minHeight: 400,
    minWidth: '100%',
  } ),
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    width: '100%',
    marginTop: -12,
    marginLeft: -12,
  },
} ) );

function VideoPlayer( {
  id, name, url, fullHeight,
}: Camera ) {
  const [ playerUrl, setPlayerUrl ] = useState( );
  const [ loaded, setLoaded ] = useState( false );
  const classes = useStyles( { fullHeight, loaded } );
  const ref = useRef();

  const playerId = `player-${ id }`;

  useEffect( () => {
    fetch( url )
      .then( response => response.blob()
        .then( blob => {
          setPlayerUrl( URL.createObjectURL( blob ) );
          setLoaded( true );
        } ) );
  }, [ ] );

  return (
    <Paper className={ classes.cameraContainer }>
      <Typography variant="subtitle1" className={ classes.cameraName }>
        { name }
      </Typography>
      <div id={ playerId } className={ classes.videoContainer }>
        <ReactPlayer
          url={ playerUrl }
          ref={ ref }
          width="100%"
          height="100%"
          style={ { maxWidth: '100%', maxHeight: '100%', position: 'relative' } }
          controls
        />
        <div className={ classes.overlay } />
        {!loaded && <CircularProgress size={ 24 } className={ classes.progress } />}
      </div>
    </Paper>
  );
}

VideoPlayer.defaultProps = {
  fullHeight: false,
};

export default VideoPlayer;
