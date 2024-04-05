/* eslint-disable linebreak-style */
import React, { useMemo, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import {
  Box, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Typography,
} from '@material-ui/core';
import ScoreCard from '../../components/dashboardScoreCard';

import useIncidentLayer from './useIncidentLayer';
import useDasboardLayer from './useDasboardLayer';
import useNeatPatrolLayer from './useNeatPatrolLayer';

import PopupTraffic from './PopupTraffic';
import PopupVehicle from './PopupVehicle';
import PopupNeatPatrol from './PopupNeatPatrol';

import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/extensions
import './style.css';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYXJmYW5kaWF6emFoYXIiLCJhIjoiY2swZ2EzcWd1MDVpYzNjcWEydWw4YW52aiJ9.fzPmZmFdGMaDvleaWGsfWg';

const viewState = {
  longitude: 103.833240,
  latitude: 1.357920,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const useStyles = makeStyles( () => ( {
  typeLabel: {
    fontWeight: 700,
    color: '#FFFFFF',
  },
} ) );

const DashboardPage = () => {
  const classes = useStyles();
  const { getInsidentSiteLayer, incidentCounts, incidentSites } = useIncidentLayer();
  const {
    trafficPopupRef, vehiclePopupRef, getWeatherLayer, getTrafficLayer, getVehicleLayer,
  } = useDasboardLayer();
  const { getPatrolLayer, neatPatrolPopupRef } = useNeatPatrolLayer();

  const [ selectedType, setSelectedType ] = useState( 'site' );

  // ** caching [layers]
  // If we pass { DeckGL.layers = [ layer1, layer2 ] } directly,
  //   when another state was changed (Ex: we passed another {react.state} to [DeckGL]),
  //   Array [ layer1, layer2 ] will be assigned to new reference,
  //   that can ask [DeckGL] to draw all layers again, although all layers were not changed
  // [useMemo] will cache each layer references,
  //   so [layers] is always in the same reference if no layer was changed
  const layers = useMemo( () => {
    const insidentSiteLayer = getInsidentSiteLayer();
    const trafficLayer = getTrafficLayer();
    const weatherLayer = getWeatherLayer();
    const patrolLayer = getPatrolLayer();
    const vehicleLayer = getVehicleLayer();

    if (
      !insidentSiteLayer || !trafficLayer || !weatherLayer || !patrolLayer || !vehicleLayer
    ) return [];
    if ( selectedType === 'site' ) return [ insidentSiteLayer ];
    if ( selectedType === 'traffic' ) return [ insidentSiteLayer, trafficLayer ];
    if ( selectedType === 'weather' ) return [ insidentSiteLayer, weatherLayer ];
    if ( selectedType === 'neatpatrol' ) return [ insidentSiteLayer, patrolLayer ];
    if ( selectedType === 'vehicleTracking' ) return [ insidentSiteLayer, vehicleLayer ];
    return [];
  }, [
    selectedType,
    getInsidentSiteLayer,
    getTrafficLayer,
    getWeatherLayer,
    getPatrolLayer,
    getVehicleLayer,
  ] );

  // ** caching [DeckGL] element
  // [useMemo] will updated only when [layers] was assigned by new reference
  // [layers] have to be cached for performance
  const mapElement = useMemo( () => (
    <DeckGL initialViewState={ viewState } controller layers={ layers }>
      <StaticMap
        mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
        mapStyle="mapbox://styles/arfandiazzahar/ck49giuqn0by91cqfettkj2k2"
      />
    </DeckGL>
  ), [ layers ] );

  return (
    <div>
      <Box position="absolute" zIndex={ 1 } top={ 0 } left={ 0 } width="100%" pb={ 0 }>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 3 }>
            <ScoreCard
              title="Total Number of Sites"
              score={ incidentSites.length }
              datatestid="total-sites"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard
              title="Total number of ‘Attend Now’ Incidents"
              score={ incidentCounts.attendNow }
            />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard
              title="Total number of Active Incidents"
              score={ incidentCounts.active }
            />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard
              title="Total number of Past Incidents"
              score={ incidentCounts.past }
            />
          </Grid>
        </Grid>
      </Box>

      <Box position="absolute" top={ 115 } left={ 35 } zIndex={ 1 } width={ 240 }>
        <Paper>
          <Box p={ 1.125 }>
            <Typography variant="body1" className={ classes.typeLabel }>
              VIEWS
            </Typography>
          </Box>
          <Divider />
          <Box p={ 1.125 }>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={ selectedType }
                onChange={ e => setSelectedType( e.target.value ) }
              >
                <MenuItem value="site">Site Location</MenuItem>
                <MenuItem value="traffic">Traffic</MenuItem>
                <MenuItem value="weather">Weather</MenuItem>
                <MenuItem value="neatpatrol">Neatpatrol</MenuItem>
                <MenuItem value="vehicleTracking">Vehicle Tracking</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Box>

      <Box position="absolute" bottom={ 0 } left={ 0 } width="100%" height="99%">
        {mapElement}
      </Box>

      <PopupTraffic ref={ trafficPopupRef } />
      <PopupVehicle ref={ vehiclePopupRef } />
      <PopupNeatPatrol ref={ neatPatrolPopupRef } />
    </div>
  );
};

export default DashboardPage;
