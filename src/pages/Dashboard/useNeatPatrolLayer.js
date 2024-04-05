import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { IconLayer } from '@deck.gl/layers';
import { useSubscription } from '@apollo/react-hooks';
import moment from 'moment';

import SUBSCRIPTION_NEAT_PATROL from './SUBSCRIPTION_NEAT_PATROL.graphql';

import { iconLayerOptions } from './layerOptions';

import pointIcon from '../../assets/images/icon-point.png';

const useNeatPatrolLayer = () => {
  const { data, loading } = useSubscription( SUBSCRIPTION_NEAT_PATROL, {
    variables: {
      startDay: moment().startOf( 'day' ).unix(),
      endDay: moment().endOf( 'day' ).unix(),
    },
  } );

  // [popupRef] will help to control popup element without rendering
  const neatPatrolPopupRef = useRef( null );

  const [ neatPatrols, setNeatPatrols ] = useState( [] );

  // ** caching [neatPatrolLayer]
  const getPatrolLayer = useCallback( () => {
    if ( loading ) return null;
    return new IconLayer( {
      ...iconLayerOptions,
      id: 'patrol-layer',
      iconAtlas: pointIcon,
      data: neatPatrols,
      onHover: neatPatrolPopupRef.current?.update,
    } );
  }, [ loading, neatPatrols ] );

  // map [neatPatrol] data
  useEffect( () => {
    if ( loading ) return;
    const sensors = data?.sensors || [];

    setNeatPatrols( sensors.map( sensor => ( {
      ...sensor,
      npid: sensor.channel.replace( /^np-/, '' ),
      dateTime: moment.unix( sensor.location_last_updated ).format( 'DD/MM/YYYY HH:mm:ss' ),
      coordinates: [ sensor.longitude, sensor.latitude ],
    } ) ) );
  }, [ loading, data ] );

  return { getPatrolLayer, neatPatrolPopupRef };
};

export default useNeatPatrolLayer;
