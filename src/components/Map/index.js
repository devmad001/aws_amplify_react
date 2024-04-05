// @flow
import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import themeColors from '../../theme/themeColors';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

const ReactMapbox = ReactMapboxGl( {
  accessToken: MAPBOX_ACCESS_TOKEN,
} );

type Props = {
  latitude: number,
  longitude: number,
};

function Map( { latitude, longitude }: Props ) {
  if ( latitude === null || longitude === null ) return null;
  const coordinates = [ longitude, latitude ];
  return (
    <ReactMapbox
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/arfandiazzahar/ck49giuqn0by91cqfettkj2k2"
      center={ coordinates }
      zoom={ [ 16 ] }
      containerStyle={ {
        height: '300px',
        width: '100%',
      } }
    >
      <Marker
        coordinates={ coordinates }
        anchor="bottom"
      >
        <LocationOnIcon
          fontSize="large"
          style={ { color: themeColors.textPrimary } }
        />
      </Marker>
    </ReactMapbox>
  );
}

export default Map;
