import React from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';
import randomLocation from 'random-location';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import 'mapbox-gl/dist/mapbox-gl.css';

import ScoreCard from '~/components/ScoreCard';
import './style.css';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

// points
const center = {
  longitude: 103.8156158446521,
  latitude: 1.3815064157578196,
};
const cbd = {
  longitude: 103.83346202991358,
  latitude: 1.2903855389228847,
};
const west = {
  longitude: 103.73049890220987,
  latitude: 1.3609644889800514,
};
const east = {
  longitude: 103.91058051026504,
  latitude: 1.3560478332392658,
};

const data = [];

const getRandomInt = ( max = 125 ) => Math.floor( Math.random() * ( max - 1 ) ) + 1;

// center
for ( let i = 0; i < 30; i += 1 ) {
  const p = randomLocation.randomCirclePoint( center, 9000 );
  data.push( {
    ...p,
    weight: getRandomInt(),
  } );
}

// cbd
for ( let i = 0; i < 10; i += 1 ) {
  const p = randomLocation.randomCirclePoint( cbd, 2500 );
  data.push( {
    ...p,
    weight: getRandomInt(),
  } );
}

// west
for ( let i = 0; i < 10; i += 1 ) {
  const p = randomLocation.randomCirclePoint( west, 6000 );
  data.push( {
    ...p,
    weight: getRandomInt(),
  } );
}

// east
for ( let i = 0; i < 10; i += 1 ) {
  const p = randomLocation.randomCirclePoint( east, 5000 );
  data.push( {
    ...p,
    weight: getRandomInt(),
  } );
}

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: center.longitude,
  latitude: center.latitude,
  zoom: 11,
  pitch: 0,
  bearing: 0,
};

const useStyles = makeStyles( theme => ( {
  cards: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    left: 0,
    top: 0,
    padding: theme.spacing( 3 ),
    paddingBottom: 0,
  },
} ) );

const visitDuration = getRandomInt( 30 ) + 30;

const VisitorsPage = () => {
  const classes = useStyles();

  const heatmapLayer = new HeatmapLayer( {
    id: 'heatmapLayer',
    data,
    getPosition: d => [ d.longitude, d.latitude ],
    getWeight: d => d.weight,
    aggregation: 'SUM',
  } );

  const totalVisitors = data.map( d => d.weight ).reduce( ( a, b ) => a + b );

  return (
    <div>
      <div className={ classes.cards }>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 3 }>
            <ScoreCard title="Total Number of Sites" score={ data.length } />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard title="Total Number of Visitors" score={ totalVisitors } />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard title="Average Number of Visitors per Site" score={ Math.round( totalVisitors / data.length ) } />
          </Grid>
          <Grid item xs={ 3 }>
            <ScoreCard title="Average Visit Duration (min)" score={ visitDuration } />
          </Grid>
        </Grid>
      </div>
      <div>
        <DeckGL
          initialViewState={ INITIAL_VIEW_STATE }
          controller
          layers={ [ heatmapLayer ] }
        >
          <StaticMap
            mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
            mapStyle="mapbox://styles/arfandiazzahar/ck49giuqn0by91cqfettkj2k2"
          />
        </DeckGL>
      </div>
    </div>
  );
};

export default VisitorsPage;
