/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { API, graphqlOperation } from 'aws-amplify';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { useNotify } from 'react-admin';
import CameraSensorMap from '~/components/CameraSensorMap';

import { getSensor, camerasBySite_id } from '../../graphql/queries';
import { createCamSensors, deleteCamSensors } from '../../graphql/mutations';

const Cameras = ( { sensor_id }: { sensor_id: number } ) => {
  const [ sensor, setSensor ] = useState( { cameras: { items: [] } } );
  const [ cameras, setCameras ] = useState( [] );
  const notify = useNotify();
  useEffect( () => {
    async function fetchData() {
      const { data, loading } = await API.graphql(
        graphqlOperation( getSensor, { id: sensor_id } ),
      );

      setSensor( data.getSensor );
      // represent sensors field of camera related with camera_sensor by camera.sensors.items because of many-many relationship

      // console.log(data);
      const result = await API.graphql(
        graphqlOperation( camerasBySite_id, {
          site_id: data.getSensor.site_id,
        } ),
      );

      const camerasbysite = result.data.camerasBySite_id.items;

      setCameras( camerasbysite );
    }
    fetchData();
  }, [] );

  return <Form sensor={ sensor } cameras={ cameras } />;
};

type Sensor = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
};
type Camera = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  camera_sensors: {
    camera_id: number,
    sensor_id: number,
  }[],
};

const Form = ( {
  sensor,
  cameras = [],
}: {
  sensor: Sensor,
  cameras: Camera[],
} ) => {
  const initialCheckedIds = sensor.cameras.items.map( item => item.id );

  const [ checkedIds, setCheckedIds ] = useState( initialCheckedIds );

  const combinedCheckbox = cameras.map( s => ( {
    ...s,
    checked: checkedIds.includes( s.id ),
    firstLetter: s.name[ 0 ].toUpperCase(),
  } ) );
  const add = async ( sensor_id, camera_id ) => {
    await API.graphql(
      graphqlOperation( createCamSensors, {
        input: {
          sensorId: sensor_id,
          cameraId: camera_id,
        },
      } ),
    );
  };
  const deleteCameraSensor = async ( sensor_id, camera_id ) => {
    await API.graphql(
      graphqlOperation( deleteCamSensors, {
        input: {
          sensor_id,
          camera_id,
        },
      } ),
    );
  };
  const onChange = ( event, newValue ) => {
    const newIds = newValue.map( v => v.id );
    const addDiff = newIds.filter( x => !checkedIds.includes( x ) );
    const removeDiff = checkedIds.filter( x => !newIds.includes( x ) );
    if ( addDiff.length ) {
      add( addDiff[ 0 ], sensor.id );
    }
    if ( removeDiff.length ) {
      deleteCameraSensor( removeDiff[ 0 ], sensor.id );
    }
    setCheckedIds( newIds );
  };

  const selectedCameras = cameras
    .filter( s => checkedIds.includes( s.id ) )
    .map( s => ( {
      id: s.id,
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
    } ) );

  return (
    <>
      <div style={ { width: '40rem', marginBottom: '30px' } }>
        <CameraSensorMap
          height="20rem"
          cameras={ selectedCameras }
          sensors={ [ sensor ] }
        />
      </div>
      <Autocomplete
        multiple
        options={ combinedCheckbox }
        disableCloseOnSelect
        value={ combinedCheckbox.filter( c => checkedIds.includes( c.id ) ) }
        getOptionLabel={ option => option.name }
        groupBy={ option => option.firstLetter }
        onChange={ onChange }
        renderOption={ ( option, { selected } ) => (
          <>
            <Checkbox style={ { marginRight: 8 } } checked={ selected } />
            {option.name}
          </>
        ) }
        style={ { width: '100%' } }
        renderInput={ params => (
          <TextField { ...params } variant="outlined" label="Cameras" />
        ) }
      />
    </>
  );
};

export default Cameras;
