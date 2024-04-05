// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';

import VideoPlayer from '~/components/VideoPlayer';

const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || '';

type Camera = {
  id: string,
  name: string,
  rtsp_stream: string,
  rtsp_params: string,
  selected: boolean,
  onMouseEnter: Function,
  onMouseLeave: Function,
}

type PlaybackTabProp = {
  videoNames: string[],
  single: boolean,
  cameras: Camera[],
}

const getVideoList = ( videoNames, cameras ) => {
  const playbackVideoList = cameras.map( camera => (
    {
      id: camera.id,
      name: camera.name,
      clip: videoNames.find( name => (
        name.includes( `cam-${ camera.id }` )
        && !name.includes( 'record' )
      ) ),
    }
  ) );
  return {
    allAvailable: playbackVideoList.every( entry => entry.clip !== null ),
    list: playbackVideoList.filter( entry => entry.clip !== null ),
  };
};

const PlaybackTab = ( props: PlaybackTabProp ) => {
  const { videoNames, single, cameras } = props;
  const videoListResult = getVideoList( videoNames, cameras );

  if ( videoListResult.list.length === 0 ) {
    return (
      <Box py={ 2 }>
        <Typography variant="subtitle2">Video is not ready for viewing.</Typography>
      </Box>
    );
  }
  return (
    <Scrollbars
      autoHide
      autoHideDuration={ 100 }
      style={ { height: '100%' } }
    >
      <Grid
        item
        container
        spacing={ 1 }
      >
        {
        videoListResult.list
          .map(
            videoCamera => {
              const href = `${ VIDEO_DOWNLOAD_ADDRESS }/video/${ videoCamera.clip || '' }`;
              return (
                <Grid
                  item
                  xs={ single ? 12 : 6 }
                  key={ `video-cam-${ videoCamera.id }` }
                >
                  <VideoPlayer
                    id={ `player-cam-${ videoCamera.id }` }
                    name={ videoCamera.name }
                    url={ href }
                    fullHeight={ single }
                  />
                </Grid>
              );
            },
          )
      }
      </Grid>
    </Scrollbars>
  );
};

export default PlaybackTab;
