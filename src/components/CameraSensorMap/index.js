/* eslint-disable camelcase */
// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';

import MapWithMarkers from '../MapWithMarkers';

type Props = {
  cameras: {
    id: number,
    name: string,
    latitude: number,
    longitude: number
  }[],
  sensors: {
    id: number,
    name: string,
    latitude: number,
    longitude: number
  }[],
  height: string,
  selectedCamId?: number | string | void,
  onMouseEnterCamera?: ( number | string ) => void,
  onMouseLeaveCamera?: ( number | string ) => void,
}

function MapSection( {
  height,
  cameras,
  sensors,
  selectedCamId,
  onMouseEnterCamera = () => {},
  onMouseLeaveCamera = () => {},
}: Props ) {
  const camerasWithIcon = cameras.map( camera => ( {
    ...camera,
    id: `camera-${ camera.id }`,
    type: 'camera',
    originalId: camera.id,
    icon: 'videocam',
  } ) );

  const sensorsWithIcon = sensors.map( sensor => ( {
    ...sensor,
    id: `sensor-${ sensor.id }`,
    type: 'sensor',
    originalId: sensor.id,
    icon: 'settings_remote',
  } ) );

  const markers = [ ...camerasWithIcon, ...sensorsWithIcon ];

  return (
    <Paper style={ { overflow: 'hidden' } }>
      <MapWithMarkers
        height={ height }
        markers={ markers }
        pitch={ 40 }
        selectedId={ selectedCamId ? `camera-${ selectedCamId }` : '' }
        onMouseEnterMarker={ m => {
          if ( m.type === 'camera' ) {
            onMouseEnterCamera( m.originalId );
          }
        } }
        onMouseLeaveMarker={ m => {
          if ( m.type === 'camera' ) {
            onMouseLeaveCamera( m.originalId );
          }
        } }
      />
    </Paper>
  );
}

MapSection.defaultProps = {
  selectedCamId: undefined,
  onMouseEnterCamera: () => {},
  onMouseLeaveCamera: () => {},
};

export default MapSection;
