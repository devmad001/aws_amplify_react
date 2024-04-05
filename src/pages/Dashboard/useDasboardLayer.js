import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { TextLayer, IconLayer } from '@deck.gl/layers';
import { useSubscription } from '@apollo/react-hooks';

import SUBSCRIPTION_DASHBOARD_DATA from './SUBSCRIPTION_DASHBOARD_DATA.graphql';

import { iconLayerOptions, textLayerOptions } from './layerOptions';

import pointIcon from '../../assets/images/icon-point.png';
import accidentIcon from '../../assets/images/icon-accident.png';
import roadworkIcon from '../../assets/images/icon-roadwork.png';
import vehiclebreakdownIcon from '../../assets/images/icon-vehiclebreakdown.png';
import thunderstormIcon from '../../assets/images/icon-thunderstorm.png';
import obstacleIcon from '../../assets/images/icon-obstacle.png';
import roadblockIcon from '../../assets/images/icon-roadblock.png';
import heavytrafficIcon from '../../assets/images/icon-heavytraffic.png';
import diversionIcon from '../../assets/images/icon-diversion.png';
import unattendedvehicleIcon from '../../assets/images/icon-unattendedvehicle.png';
import vehicleIcon from '../../assets/images/icon-vehicle.png';

const iconBySymbols = {
  accident: accidentIcon,
  roadwork: roadworkIcon,
  vehiclebreakdown: vehiclebreakdownIcon,
  weather: thunderstormIcon,
  obstacle: obstacleIcon,
  roadblock: roadblockIcon,
  heavytraffic: heavytrafficIcon,
  misc: pointIcon,
  diversion: diversionIcon,
  unattendedvehicle: unattendedvehicleIcon,
};

const useDashboardData = () => {
  const { data, loading } = useSubscription( SUBSCRIPTION_DASHBOARD_DATA );

  // [popupRef] will help to control popup element without rendering
  const trafficPopupRef = useRef( null );
  const vehiclePopupRef = useRef( null );

  const [ traffics, setTraffics ] = useState( [] );
  const [ weathers, setWeathers ] = useState( [] );
  const [ vehicles, setVehicles ] = useState( [] );

  // ** caching [trafficLayer]
  const getTrafficLayer = useCallback( () => {
    if ( loading ) return null;
    return new IconLayer( {
      ...iconLayerOptions,
      id: 'traffic-layer',
      getSize: 35,
      getColor: [ 255, 255, 255, 255 ],
      getIcon: d => ( {
        // make sure url will never be [undefined]
        url: iconBySymbols[ d.symbol ] || pointIcon,
        width: 35,
        height: 35,
      } ),
      data: traffics,
      onHover: trafficPopupRef.current?.update,
    } );
  }, [ loading, traffics ] );

  // ** caching [weatherLayer]
  const getWeatherLayer = useCallback( () => {
    if ( loading ) return null;
    return new TextLayer( {
      ...textLayerOptions,
      id: 'weather-layer',
      data: weathers,
    } );
  }, [ loading, weathers ] );

  // ** caching [vehicleLayer]
  const getVehicleLayer = useCallback( () => {
    if ( loading ) return null;
    return new IconLayer( {
      ...iconLayerOptions,
      id: 'vehicle-layer',
      getSize: 35,
      getColor: [ 255, 255, 255, 255 ],
      getIcon: () => ( {
        // make sure url will never be [undefined]
        url: vehicleIcon,
        width: 35,
        height: 35,
      } ),
      data: vehicles,
      onHover: vehiclePopupRef.current?.update,
    } );
  }, [ loading, vehicles ] );

  // map [weather] and [traffic] data
  useEffect( () => {
    if ( loading ) return;
    const dashboard = data.dashboard_data || [];
    const trafficData = dashboard.find( ( { source } ) => source === 'traffic' ).data || [];
    const weatherData = dashboard.find( ( { source } ) => source === 'weatherForecast' ).data || [];
    const vehicleData = dashboard.find( ( { source } ) => source === 'vehicle' ).data || [];

    setTraffics( trafficData.map( traffic => ( {
      ...traffic, coordinates: [ traffic.Longitude, traffic.Latitude ],
    } ) ) );
    setWeathers( weatherData.map( weather => ( {
      ...weather, coordinates: [ weather.location.longitude, weather.location.latitude ],
    } ) ) );
    setVehicles( vehicleData.map( vehicle => ( {
      ...vehicle, coordinates: [ vehicle.LastPosition.Longitude, vehicle.LastPosition.Latitude ],
    } ) ) );
  }, [ loading, data ] );

  return {
    getWeatherLayer, getTrafficLayer, getVehicleLayer, trafficPopupRef, vehiclePopupRef,
  };
};

export default useDashboardData;
