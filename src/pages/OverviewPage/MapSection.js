// @flow

import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import RippleDot from '~/components/RippleDot';
import IncidentTypeIcon from '~/components/IncidentTypeIcon';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

const ReactMapbox = ReactMapboxGl( {
  accessToken: MAPBOX_ACCESS_TOKEN,
} );

type Props = {
  data?: {
    incidents: {
      id: number,
      sensor: {
        latitude: number,
        longitude: number,
      },
      site: {
        name: string
      },
      incident_viewers: Object[],
      incident_type: {
        id: number,
        icon: string
      }
    }[]
  },
  loading: boolean,
}

const useStyles = makeStyles( () => ( {
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
} ) );

const MapSection = ( { data = { incidents: [] }, loading }: Props ) => {
  if ( loading ) return null;

  const classes = useStyles();
  const { incidents } = data;

  return (
    <ReactMapbox
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/arfandiazzahar/ck49giuqn0by91cqfettkj2k2"
      center={ [ 103.8198, 1.3521 ] }
      zoom={ [ 9.8 ] }
      containerStyle={ {
        height: '30em',
        width: '100%',
      } }
    >
      {
        incidents.map( i => (
          <Marker
            key={ i.id }
            coordinates={ [ i.sensor.longitude, i.sensor.latitude ] }
            anchor="bottom"
          >
            <Tooltip
              title={ (
                <Box display="flex" alignItems="center">
                  <IncidentTypeIcon iconName={ i.incident_type.icon } style={ { height: '1em' } } />
                  <span style={ { marginLeft: 2 } }>{`Incident #${ i.id }`}</span>
                </Box>
              ) }
            >
              <Button
                href
                className={ classes.button }
                onClick={ () => window.open( `/#/incident?id=${ i.id }`, 'Incident' ) }
              >
                <span>
                  {
                    i.incident_viewers.length
                      ? <RippleDot color="white" />
                      : <RippleDot color="red" />
                  }
                </span>
              </Button>
            </Tooltip>
          </Marker>
        ) )
      }
    </ReactMapbox>
  );
};

MapSection.defaultProps = {
  data: { incidents: [] },
};

export default MapSection;
