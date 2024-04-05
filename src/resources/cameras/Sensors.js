/* eslint-disable camelcase */
// @flow

import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import CameraSensorMap from '~/components/CameraSensorMap';
import {
  getCamera,
  sensorsBySite_id,
  listCamSensors,
} from '../../graphql/queries';
import { createCamSensors, deleteCamSensors } from '../../graphql/mutations';

const Sensors = ( { camera_id }: { camera_id: number } ) => {
  const [ camera, setCamera ] = useState( { sensors: { items: [] } } );
  const [ sensors, setSensors ] = useState( [] );
  useEffect( () => {
    async function fetchData() {
      const { data, loading } = await API.graphql(
        graphqlOperation( getCamera, { id: camera_id } ),
      );
      setCamera( data.getCamera );
      // represent sensors field of camera related with camera_sensor by camera.sensors.items because of many-many relationship

      // console.log(data);
      const result = await API.graphql(
        graphqlOperation( sensorsBySite_id, {
          site_id: data.getCamera.site_id,
        } ),
      );

      const sensorsbysite = result.data.sensorsBySite_id.items;

      setSensors( sensorsbysite );
    }
    fetchData();
  }, [] );

  return <Form camera={ camera } sensors={ sensors } />;
};

type Sensor = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  camera_sensors: {
    camera_id: number,
    sensor_id: number,
  }[],
};
type Camera = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
};

const Form = ( { camera, sensors = [] } ) => {
  // const [add] = useMutation(INSERT_CAMERA_SENSOR);
  // const [remove] = useMutation(DELETE_CAMERA_SENSOR);

  console.log( 'camera', camera, sensors );
  const initialCheckedIds = camera.sensors.items.map( item => item.id );

  const [ checkedIds, setCheckedIds ] = useState( initialCheckedIds );

  const combinedCheckbox = sensors.map( s => ( {
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
          sensorId: sensor_id,
          cameraId: camera_id,
        },
      } ),
    );
  };

  const onChange = ( event, newValue ) => {
    const newIds = newValue.map( v => v.id );
    const addDiff = newIds.filter( x => !checkedIds.includes( x ) );
    const removeDiff = checkedIds.filter( x => !newIds.includes( x ) );
    if ( addDiff.length ) {
      add( addDiff[ 0 ], camera.id );
    }
    if ( removeDiff.length ) {
      deleteCameraSensor( removeDiff[ 0 ], camera.id );
    }
    setCheckedIds( newIds );
  };

  const selectedSensors = sensors
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
          cameras={ [ camera ] }
          sensors={ selectedSensors }
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
          <TextField { ...params } variant="outlined" label="Sensors" />
        ) }
      />
    </>
  );
};

export default Sensors;
