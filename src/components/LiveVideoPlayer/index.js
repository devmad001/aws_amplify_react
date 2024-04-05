/* eslint-disable camelcase */

// @flow
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { fromEvent, AsyncSubject } from 'rxjs';
import {
  flatMap, concatMap, first,
} from 'rxjs/operators';
import lifecycle from 'page-lifecycle';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const LIVE_VIDEO_ADDRESS = process.env.LIVE_VIDEO_ADDRESS || '';

const LIVE_VIDEO_PATH = process.env.LIVE_VIDEO_PATH || '';
type Camera = {
  id: string,
  name: string,
  url: string,
  params: string | { [ string ]: string },
  selected?: boolean,
  fullHeight?: boolean,
};

const useStyles = makeStyles( theme => ( {
  cameraContainer: props => ( {
    overflow: 'hidden',
    boxShadow: props.selected ? '0px 0px 5px 1px rgba(255,255,255,1)' : 'initial',
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
  video: {
    height: '100%',
    width: '100%',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
} ) );

const webSocketService = () => {
  let cacheStreamId = null;
  const ioInstance = io( LIVE_VIDEO_ADDRESS, {
    path: `${ LIVE_VIDEO_PATH }/socket.io/`,
    transports: [ 'websocket' ],
  } );
  ioInstance.on( 'connect_error', () => {
    setTimeout( () => {
      ioInstance.connect();
    }, 1000 );
  } );
  return {
    loadVideoStream: ( address, params ) => {
      const stream = fromEvent( ioInstance, 'playResponse' )
        .pipe(
          first(),
          flatMap( streamId => {
            cacheStreamId = streamId;
            return fromEvent( ioInstance, `data:${ streamId }` );
          } ),
        );
      ioInstance.on( 'connect', () => {
        ioInstance.send( { function: 'play', address, params } );
      } );
      return stream;
    },
    close: () => {
      if ( ioInstance.connected ) {
        ioInstance.send( { function: 'stop', streamId: cacheStreamId } );
        cacheStreamId = null;
      }
    },
  };
};

const getMedia = ( socketInterface, streamAddress, streamParams ) => {
  const mimeCodec = 'video/mp4; codecs="avc1.4D401F"';
  if ( 'MediaSource' in window && MediaSource.isTypeSupported( mimeCodec ) ) {
    const mediaSource = new MediaSource();
    mediaSource.addEventListener( 'sourceopen', () => {
      const streamParamsObj = typeof streamParams === 'string' ? JSON.parse( streamParams ) : streamParams;
      const videoStream = socketInterface.loadVideoStream( streamAddress, streamParamsObj );
      const sourceBuffer = mediaSource.addSourceBuffer( mimeCodec );
      videoStream
        .pipe(
          concatMap( data => {
            const completeSubject = new AsyncSubject();
            sourceBuffer.appendBuffer( data );
            const onUpdateEnd = ( _: Event ) => {
              sourceBuffer.removeEventListener( 'updateend', onUpdateEnd );
              completeSubject.next( {} );
              completeSubject.complete();
            };
            sourceBuffer.addEventListener( 'updateend', onUpdateEnd );
            return completeSubject;
          } ),
        )
        .subscribe();
    } );
    return mediaSource;
  }
  return null;
};

function LiveVideoPlayer( {
  id, name, url, params, selected, fullHeight,
}: Camera ) {
  const classes = useStyles( { selected, fullHeight } );
  const playerId = `liveplayer-${ id }`;
  const elementRef = useRef( null );
  const [ loading, setLoading ] = useState( false );
  const mediaSocket = webSocketService();

  useEffect( () => {
    if ( url ) {
      setLoading( true );
      const mediaSource = getMedia( mediaSocket, url, params );
      const videoElement = elementRef.current || null;
      if ( videoElement && mediaSource ) {
        videoElement.src = URL.createObjectURL( mediaSource );
        videoElement.load();
        const onPlayReady = ( _: Event ) => {
          setLoading( false );
          videoElement.removeEventListener( 'canplay', onPlayReady );
          videoElement.play();
        };
        videoElement.addEventListener( 'canplay', onPlayReady );
        const onUnload = event => {
          if ( event.newState === 'terminated' || event.newState === 'discarded' ) {
            mediaSocket.close();
          }
        };
        lifecycle.addEventListener( 'statechange', onUnload );
      }
      return () => {
        mediaSocket.close();
        if ( videoElement ) {
          videoElement.pause();
          videoElement.removeAttribute( 'src' );
          videoElement.load();
        }
      };
    }
    return () => {};
  }, [ url ] );

  return (
    <Paper className={ classes.cameraContainer }>
      <Typography variant="subtitle1" className={ classes.cameraName }>
        { name }
      </Typography>
      <div id={ playerId } className={ classes.videoContainer }>
        <video className={ classes.video } ref={ elementRef } muted autoPlay />
        {loading && <CircularProgress size={ 24 } className={ classes.buttonProgress } />}
      </div>
    </Paper>
  );
}

LiveVideoPlayer.defaultProps = {
  selected: false,
  fullHeight: false,
};

export default LiveVideoPlayer;
