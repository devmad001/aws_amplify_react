// @flow

import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import Icon from '@material-ui/core/Icon';

const UserNotFoundIcon = ( { id }: { id: string } ) => (
  <Tooltip title={ `User Not Found (ID: ${ id }) ` }>
    <Badge
      overlap="circle"
      anchorOrigin={ {
        vertical: 'top',
        horizontal: 'right',
      } }
      badgeContent={ <Icon style={ { fontSize: '1rem' } } color="secondary">help</Icon> }
    >
      <PersonIcon />
    </Badge>
  </Tooltip>
);

export default UserNotFoundIcon;
