import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { IconLayer } from '@deck.gl/layers';
import { useSubscription } from '@apollo/react-hooks';

import SUBSCRIPTION_ATTEND_NOW_COUNT from './SUBSCRIPTION_ATTEND_NOW_COUNT.graphql';
import SUBSCRIPTION_ACTIVE_COUNT from './SUBSCRIPTION_ACTIVE_COUNT.graphql';
import SUBSCRIPTION_ACTIVE from './SUBSCRIPTION_ACTIVE.graphql';
import SUBSCRIPTION_PAST_COUNT from './SUBSCRIPTION_PAST_COUNT.graphql';
import SUBSCRIPTION_PAST from './SUBSCRIPTION_PAST.graphql';
import SUBSCRIPTION_SITE from './SUBSCRIPTION_SITE.graphql';

import { iconLayerOptions } from './layerOptions';

import shieldIcon from '../../assets/images/icon-shield.png';

export const priorityOrders = {
  PRIORITY: 4, HIGH: 3, MID: 2, LOW: 1, NORMAL: 0,
};

export const priorityColors = {
  [ priorityOrders.PRIORITY ]: [ 254, 1, 0 ],
  [ priorityOrders.HIGH ]: [ 237, 125, 49 ],
  [ priorityOrders.MID ]: [ 113, 48, 160 ],
  [ priorityOrders.LOW ]: [ 1, 176, 240 ],
  [ priorityOrders.NORMAL ]: [ 112, 173, 71 ],
};

const useIncidentLayer = () => {
  // incident's sites subscriptions
  const { data: activeData, loading: activeLoading } = useSubscription( SUBSCRIPTION_ACTIVE );
  const { data: pastData, loading: pastLoading } = useSubscription( SUBSCRIPTION_PAST );
  const { data: sitesData, loading: sitesLoading } = useSubscription( SUBSCRIPTION_SITE );

  // incidents' count subscription
  const { data: attendNowCountData, loading: attendNowCountLoading } = useSubscription(
    SUBSCRIPTION_ATTEND_NOW_COUNT,
  );
  const { data: activeCountData, loading: activeCountLoading } = useSubscription(
    SUBSCRIPTION_ACTIVE_COUNT,
  );
  const { data: pastCountData, loading: pastCountLoading } = useSubscription(
    SUBSCRIPTION_PAST_COUNT,
  );

  const [ incidentCounts, setIncidentCounts ] = useState( { attendNow: 0, active: 0, past: 0 } );
  const [ incidentSites, setIncidentSites ] = useState( [] );

  const isLoadingIncidents = useMemo( () => (
    activeLoading || pastLoading || sitesLoading
  ), [ activeLoading, pastLoading, sitesLoading ] );

  const isLoadingCounts = useMemo( () => (
    attendNowCountLoading || activeCountLoading || pastCountLoading
  ), [ attendNowCountLoading, activeCountLoading, pastCountLoading ] );

  // ** caching [insidentSiteIconLayer]
  const getInsidentSiteLayer = useCallback( () => {
    if ( isLoadingCounts || isLoadingIncidents ) return null;
    return new IconLayer( {
      ...iconLayerOptions,
      id: 'incident-site-layer',
      iconAtlas: shieldIcon,
      data: incidentSites,
      getColor: d => priorityColors[ d.priorityOrder ],
    } );
  }, [ isLoadingCounts, isLoadingIncidents, incidentSites ] );

  // map Incidents' Count
  useEffect( () => {
    if ( isLoadingCounts ) return;

    setIncidentCounts( {
      attendNow: attendNowCountData?.incidents_aggregate?.aggregate?.count || 0,
      active: activeCountData?.incidents_aggregate?.aggregate?.count || 0,
      past: pastCountData?.incidents_aggregate?.aggregate?.count || 0,
    } );
  }, [ isLoadingCounts, attendNowCountData, activeCountData, pastCountData ] );

  // map Incident's Sites
  useEffect( () => {
    if ( isLoadingIncidents ) return;

    const mapSite = incident => ( { ...incident.site, severityId: incident.severity_type?.id } );

    const activeSites = ( activeData?.incidents || [] ).map( mapSite );
    const pastSites = ( pastData?.incidents || [] ).map( mapSite );

    const setSiteToMap = ( map, isPast ) => site => {
      const existedSiteInMap = map.get( site.id );
      let priorityOrder = 0;

      if ( !isPast ) {
        priorityOrder = Math.max(
          priorityOrders[ site.severityId ], // current incident's priority order
          existedSiteInMap?.priorityOrder || 0, // duplicated incident's priority order
        );
      }

      map.set( site.id, {
        id: site.id, coordinates: [ site.longitude, site.latitude ], priorityOrder,
      } );
    };

    const openingSiteMap = new Map();
    const closedSiteMap = new Map();

    // map ACTIVE incidents' site data
    activeSites.forEach( setSiteToMap( openingSiteMap ) );

    // map PAST incidents' site data
    // take all incidents' site which don't have any OPEN incidents
    pastSites
      .filter( site => !openingSiteMap.has( site.id ) )
      .forEach( setSiteToMap( closedSiteMap, true ) );

    // take all sites which don't have any incidents
    const normalSites = ( sitesData.sites || [] )
      .filter( site => !openingSiteMap.has( site.id ) && !closedSiteMap.has( site.id ) )
      .map( site => ( {
        id: site.id,
        coordinates: [ site.longitude, site.latitude ],
        priorityOrder: priorityOrders.NORMAL,
      } ) );

    setIncidentSites( [ ...closedSiteMap.values(), ...openingSiteMap.values(), ...normalSites ] );
  }, [ isLoadingIncidents, sitesData, activeData, pastData ] );

  return {
    getInsidentSiteLayer,
    incidentCounts,
    incidentSites,
    incidentsLoading: isLoadingCounts || isLoadingIncidents,
  };
};

export default useIncidentLayer;
