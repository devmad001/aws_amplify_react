// @flow

import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ( ) => (
  <div id="loading-bg" className="hk-full-loader">
    <div className="text-center">
      <Box mb={ 3 }>
        <img alt="logo" src="/images/logo.svg" />
      </Box>
      <CircularProgress />
    </div>
  </div>
);

export default Loader;
