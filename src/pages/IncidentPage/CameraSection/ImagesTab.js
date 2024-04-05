/* eslint-disable react/destructuring-assignment */
// @flow

import React from 'react';

import Scrollbars from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || '';

const useStyles = makeStyles( () => ( {
  image: {
    display: 'block',
    width: '100%',
  },
} ) );

type Props = {
  imageNames: string[]
}

function ImagesTab( { imageNames }: Props ) {
  const classes = useStyles();

  if ( imageNames.length === 0 ) {
    return (
      <Box py={ 2 }>
        <Typography variant="subtitle2">No image available.</Typography>
      </Box>
    );
  }

  return (
    <Scrollbars
      className="hulk-scroll"
      autoHide
      autoHideDuration={ 100 }
      style={ { height: 'calc(100% - 104px)', background: '#14131C' } }
    >
      <Box p={ 1 }>
        <Grid item container spacing={ 1 }>
          {
            imageNames
              .filter( name => !!name )
              .map(
                name => (
                  <Grid key={ name } item xs={ 4 }>
                    <img
                      className={ classes.image }
                      src={ `${ VIDEO_DOWNLOAD_ADDRESS }/image/${ name }` }
                      alt={ name }
                    />
                  </Grid>
                ),
              )
          }
        </Grid>
      </Box>
    </Scrollbars>
  );
}

export default ImagesTab;
