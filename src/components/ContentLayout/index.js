// @flow

import React from 'react';
import type { Node } from 'react';
import { Grid, Box } from '@material-ui/core';

type Props = {
  title?: string,
  children: Node,
}
const ContentLayout = ( { title = '', children }: Props ) => (
  <Box>
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 3 }>
        {title && title !== ''
         && <Box fontWeight="500" display="inline-block" color="text.primary" fontSize="body2.fontSize" component="span">{title}</Box>}
      </Grid>
      <Grid item xs={ 12 } sm={ 8 } md={ 8 } lg={ 9 }>
        <Box mt={ { xs: '-10px', sm: 0 } } mr={ { xs: 0, md: '100px', lg: '150px' } }>{children}</Box>
      </Grid>
    </Grid>
  </Box>
);

ContentLayout.defaultProps = {
  title: '',
};

export default ContentLayout;
