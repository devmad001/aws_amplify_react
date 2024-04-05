// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';

import Scrollbars from 'react-custom-scrollbars';
// import { Button } from '@material-ui/core';
import LiveVideoPlayer from '~/components/LiveVideoPlayer';

type Camera = {
  id: string,
  name: string,
  rtsp_stream: string,
  rtsp_params: string,
  selected: boolean,
  onMouseEnter: Function,
  onMouseLeave: Function,
}

type LiveTabProp = {
  single: boolean,
  cameras: Camera[],
  selectedCamera: string | number | void,
  // onRequestRecordCamera: Function,
  onMouseEnterCamera: Function,
  onMouseLeaveCamera: Function,
}

type LiveCameraContainerProp = {
  single: boolean,
  selectedCamera: string | number | void,
  camera: Camera,
  // onRequestRecordCamera: Function,
  onMouseEnterCamera: Function,
  onMouseLeaveCamera: Function,
}

const LiveCameraContainer = ( props: LiveCameraContainerProp ) => {
  const {
    single,
    camera,
    selectedCamera,
    // onRequestRecordCamera,
    onMouseEnterCamera,
    onMouseLeaveCamera,
  } = props;
  return (
    <Grid
      item
      xs={ single ? 12 : 6 }
      key={ camera.id }
      onMouseEnter={ () => onMouseEnterCamera( camera.id ) }
      onMouseLeave={ () => onMouseLeaveCamera( camera.id ) }
    >
      <LiveVideoPlayer
        id={ camera.id }
        name={ camera.name }
        url={ camera.rtsp_stream }
        params={ camera.rtsp_params }
        selected={ selectedCamera === camera.id }
        fullHeight={ single }
      />
      {/* <Button
        color="secondary"
        onClick={ _ => onRequestRecordCamera( camera.id ) }
      >
        Record
      </Button> */}
    </Grid>
  );
};

const LiveTab = ( props: LiveTabProp ) => {
  const {
    cameras,
    single,
    selectedCamera,
    // onRequestRecordCamera,
    onMouseEnterCamera,
    onMouseLeaveCamera,
  } = props;
  return (
    <Scrollbars
      autoHide
      autoHideDuration={ 100 }
      style={ { height: '100%' } }
    >
      <Grid
        container
        spacing={ 1 }
      >
        {
          cameras.map(
            camera => (
              <LiveCameraContainer
                single={ single }
                camera={ camera }
                selectedCamera={ selectedCamera }
                // onRequestRecordCamera={ onRequestRecordCamera }
                onMouseEnterCamera={ onMouseEnterCamera }
                onMouseLeaveCamera={ onMouseLeaveCamera }
              />
            ),
          )
        }

      </Grid>

    </Scrollbars>
  );
};

export default LiveTab;
