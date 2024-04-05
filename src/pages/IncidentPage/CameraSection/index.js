/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
// @flow

import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LiveTab from './LiveTab';
import PlaybackTab from './PlaybackTab';
// import RecordTab from './RecordTab';
import NotesTab from './NotesTab';
import ImagesTab from './ImagesTab';

type Camera = {
  id: string,
  name: string,
  rtsp_stream: string,
  rtsp_params: string,
  selected: boolean,
  onMouseEnter: Function,
  onMouseLeave: Function,
}

type NeatPatrolNote = {
  id: string,
  timestamp: number,
  details: {
    description: string,
  }
}

type CameraSectionType = {
  cameras: Camera[],
  neatPatrolNotes: NeatPatrolNote[],
  selectedId: string | number | void,
  single: boolean,
  incidentId: number,
  onMouseEnterCamera?: ( number | string ) => void,
  onMouseLeaveCamera?: ( number | string ) => void,
  processing: boolean,
  expired: boolean,
  comments: string,
}

type TabPanelProps = {
  children: any,
  value: number,
  index: number
}

const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || '';

function a11yProps( index ) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  };
}

function getVideoNameList( incidentId ) {
  return fetch(
    `${ VIDEO_DOWNLOAD_ADDRESS }/video/list?incidentId=${ incidentId }`,
  ).then( response => (
    response.json()
  ) );
}

function getImageNameList( incidentId ) {
  return fetch(
    `${ VIDEO_DOWNLOAD_ADDRESS }/image/list?incidentId=${ incidentId }`,
  ).then( response => (
    response.json()
  ) );
}

function TabPanel( props: TabPanelProps ) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `camera-tabpanel-${ index }` }
      aria-labelledby={ `camera-tab-${ index }` }
      style={ { height: 'calc(100% - 24px)' } }
      { ...other }
    >
      {value === index && children}
    </div>
  );
}

function CameraSection( {
  cameras = [],
  neatPatrolNotes = [],
  onMouseEnterCamera = () => {},
  onMouseLeaveCamera = () => {},
  selectedId,
  single,
  incidentId,
  processing,
  expired,
  comments,
}: CameraSectionType ) {
  const [ value, setValue ] = useState( 0 );
  const handleChange = ( event, newValue ) => {
    setValue( newValue );
  };
  /*
  const handleRequestCameraRecord = cameraId => (
    fetch(
      `${ VIDEO_DOWNLOAD_ADDRESS }/record`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          incidentId,
          cameraId,
        } ),
      },
    )
  );
  */

  const [ videoNameList, setVideoNameList ] = useState( [] );
  const [ imageNameList, setImageNameList ] = useState( [] );

  useEffect( () => {
    getVideoNameList( incidentId )
      .then( list => {
        setVideoNameList( list );
      } );

    getImageNameList( incidentId )
      .then( list => {
        setImageNameList( list );
      } );
  }, [] );

  const playbackLabel = `Playback ( ${ processing ? 'Processing' : '' } )`;

  return (
    <div style={ { height: '100%' } }>
      <AppBar position="relative">
        <Tabs value={ value } onChange={ handleChange }>
          <Tab label="Live Feed" disableRipple { ...a11yProps( 0 ) } />
          <Tab
            label={ playbackLabel }
            disableRipple
            { ...a11yProps( 1 ) }
            disabled={ expired || processing }
          />
          {/* <Tab
            label="Record"
            disableRipple
            { ...a11yProps( 2 ) }
          /> */}
          <Tab label="Notes" disableRipple { ...a11yProps( 2 ) } />
          <Tab label="Images" disableRipple { ...a11yProps( 3 ) } />
        </Tabs>
      </AppBar>
      <TabPanel value={ value } index={ 0 }>
        <LiveTab
          single={ single }
          cameras={ cameras }
          selectedCamera={ selectedId }
          // onRequestRecordCamera={ handleRequestCameraRecord }
          onMouseEnterCamera={ onMouseEnterCamera }
          onMouseLeaveCamera={ onMouseLeaveCamera }
        />
      </TabPanel>
      <TabPanel value={ value } index={ 1 }>
        <PlaybackTab
          videoNames={ videoNameList }
          single={ single }
          cameras={ cameras }
        />
      </TabPanel>
      {/* <TabPanel value={ value } index={ 2 }>
        <RecordTab
          videoNames={ videoNameList }
          cameras={ cameras }
        />
      </TabPanel> */}
      <TabPanel value={ value } index={ 2 }>
        <NotesTab comments={ comments } neatPatrolNotes={ neatPatrolNotes } />
      </TabPanel>
      <TabPanel value={ value } index={ 3 }>
        <ImagesTab imageNames={ imageNameList } />
      </TabPanel>
    </div>
  );
}

CameraSection.defaultProps = {
  onMouseEnterCamera: () => {},
  onMouseLeaveCamera: () => {},
};

export default CameraSection;
