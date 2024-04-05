// @flow
import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { makeStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import { FullScreen, useFullScreenHandle } from './Fullscreen';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

const ReactMapbox = ReactMapboxGl( {
  accessToken: MAPBOX_ACCESS_TOKEN,
  doubleClickZoom: false,
} );

type MarkerType = {
  id: number | string,
  originalId: number | string,
  type: string,
  name?: string,
  icon?: string,
  latitude: number,
  longitude: number,
}

type Props = {
  markers: MarkerType[],
  bearing?: number,
  pitch?: number,
  height?: string | number,
  width?: string | number,
  selectedId: string,
  onMouseEnterMarker?: ( MarkerType ) => void,
  onMouseLeaveMarker?: ( MarkerType ) => void,
};

const useStyles = makeStyles( () => ( {
  container: {
    position: 'relative',
    display: 'inline-block',
    padding: 5,
    '&[attrselected="true"] $icon': {
      animationName: '$float, $bob',
      animationDuration: '.3s, 1.5s',
      animationDelay: '0s, .3s',
      animationTimingFunction: 'ease-out, ease-in-out',
      animationIterationCount: '1, infinite',
      animationFillMode: 'forwards',
      animationDirection: 'normal, alternate',
    },
    '&[attrselected="true"] $text': {
      backgroundColor: 'rgba(130, 130, 130, 0.9)',
    },
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    WebkitTransform: 'perspective(1px) translateZ(0)',
    transform: 'perspective(1px) translateZ(0)',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0)',
  },
  text: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    width: '100px',
    marginLeft: '-55px',
    textAlign: 'center',
    cursor: 'default',
    color: '#ffffff',
    padding: '4px 8px',
    fontSize: '0.7rem',
    fontWeight: '500',
    lineHeight: '1.4em',
    borderRadius: '4px',
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
    transition: 'background-color 100ms ease-in-out',
  },
  '@keyframes bob': {
    '0%': {
      transform: 'translateY(-8px)',
    },
    '50%': {
      transform: 'translateY(-3px)',
    },
    '100%': {
      transform: 'translateY(-8px)',
    },
  },
  '@keyframes float': {
    '100%': {
      transform: 'translateY(-8px)',
    },
  },
} ) );

function MapWithMarkers( {
  markers,
  bearing,
  pitch,
  height,
  width,
  selectedId,
  onMouseEnterMarker = () => {},
  onMouseLeaveMarker = () => {},
}: Props ) {
  const classes = useStyles( );
  const handle = useFullScreenHandle();

  const minLatMarker = minBy( markers, 'latitude' );
  const maxLatMarker = maxBy( markers, 'latitude' );
  const minLngMarker = minBy( markers, 'longitude' );
  const maxLngMarker = maxBy( markers, 'longitude' );

  const minLat = minLatMarker ? minLatMarker.latitude : -90;
  const maxLat = maxLatMarker ? maxLatMarker.latitude : 90;
  const minLng = minLngMarker ? minLngMarker.longitude : 0;
  const maxLng = maxLngMarker ? maxLngMarker.longitude : 180;

  return (
    <div
      onDoubleClick={ () => { if ( !handle.active ) handle.enter(); } }
      style={ {
        height: handle.active ? '100vh' : height,
        width,
      } }
    >
      <FullScreen
        handle={ handle }
        style={ {
          height: '100%',
          width: '100%',
        } }
      >
        <ReactMapbox
          // eslint-disable-next-line react/style-prop-object
          style="mapbox://styles/arfandiazzahar/ck49giuqn0by91cqfettkj2k2"
          bearing={ [ bearing ] }
          pitch={ [ pitch ] }
          fitBounds={ [ [ minLng, minLat ], [ maxLng, maxLat ] ] }
          fitBoundsOptions={ {
            padding: {
              top: 50, bottom: 50, left: 50, right: 50,
            },
          } }
          containerStyle={ {
            height: '100%',
            width: '100%',
          } }
        >
          {
            markers.map( m => (
              <span key={ m.id }>
                <Marker
                  coordinates={ [ m.longitude, m.latitude ] }
                  anchor="bottom"
                  onMouseEnter={ () => onMouseEnterMarker( m ) }
                  onMouseLeave={ () => onMouseLeaveMarker( m ) }
                >
                  <div
                    className={ classes.container }
                    attrselected={ ( m.id === selectedId ).toString() }
                  >
                    <Icon className={ classes.icon } style={ { fontSize: 20 } }>{m.icon}</Icon>
                    <span className={ classes.text }>
                      {m.name}
                    </span>
                  </div>
                </Marker>
              </span>
            ) )
          }
        </ReactMapbox>
      </FullScreen>
    </div>
  );
}

MapWithMarkers.defaultProps = {
  bearing: 0,
  pitch: 0,
  height: '30rem',
  width: '100%',
  onMouseEnterMarker: () => {},
  onMouseLeaveMarker: () => {},
};

export default MapWithMarkers;
