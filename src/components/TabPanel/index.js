/* eslint-disable react/jsx-props-no-spreading */
// @flow

import React from 'react';
import type { Node } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type Props = {
  children: Node,
  value: number,
  index: number,
}

function TabPanel( props: Props ) {
  const {
    children, value, index, ...other
  } = props;

  // return <div>{children}</div>;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${ index }` }
      aria-labelledby={ `simple-tab-${ index }` }
      { ...other }
    >
      {value === index && (
        <Box p={ 3 }>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
