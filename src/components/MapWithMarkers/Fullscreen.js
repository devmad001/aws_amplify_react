// @flow

import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import * as React from 'react';
import fscreen from 'fscreen';

type FullScreenHandle = {
  active: boolean,
  enter: () => void,
  exit: () => void,
  node: { current: React$ElementRef<'div'> | null }
}

type FullScreenProps = {
  handle: FullScreenHandle,
  onChange?: ( state: boolean, handle: FullScreenHandle ) => void,
  children: React.Node,
  style?: Object,
}

export function useFullScreenHandle() {
  const [ active, setActive ] = useState<boolean>( false );
  const node = useRef<HTMLDivElement | null>( null );

  useEffect( () => {
    const handleChange = () => {
      setActive( fscreen.fullscreenElement === node.current );
    };
    fscreen.addEventListener( 'fullscreenchange', handleChange );
    return () => fscreen.removeEventListener( 'fullscreenchange', handleChange );
  }, [] );

  const enter = useCallback( () => {
    if ( fscreen.fullscreenElement ) {
      fscreen.exitFullscreen().then( () => {
        fscreen.requestFullscreen( node.current );
      } );
    } else if ( node.current ) {
      fscreen.requestFullscreen( node.current );
    }
  }, [] );

  const exit = useCallback( () => {
    if ( fscreen.fullscreenElement === node.current ) {
      fscreen.exitFullscreen();
    }
  }, [] );

  return {
    active,
    enter,
    exit,
    node,
  };
}

export const FullScreen = ( {
  handle,
  onChange,
  children,
  style = {},
}: FullScreenProps ) => {
  const classNames = [ 'fullscreen' ];
  if ( handle.active ) {
    classNames.push( 'fullscreen-enabled' );
  }

  useEffect( () => {
    if ( onChange ) {
      onChange( handle.active, handle );
    }
  }, [ handle.active ] );

  return (
    <div
      className={ classNames.join( ' ' ) }
      ref={ handle.node }
      style={ handle.active ? { height: '100%', width: '100%' } : style }
    >
      {children}
    </div>
  );
};

FullScreen.defaultProps = {
  onChange: () => {},
  style: {},
};
