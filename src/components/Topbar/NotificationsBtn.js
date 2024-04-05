// @flow

import React, { useState, useEffect, useMemo } from 'react';
import {
  makeStyles,
  Tooltip,
  IconButton,
  Icon,
  Popover,
  List,
  ListSubheader,
  Typography,
  Divider,
  ListItem,
  Box,
  Badge,
  ListItemText,
} from '@material-ui/core';
import { useSubscription } from '@apollo/react-hooks';
import moment from 'moment';
import pad from 'pad';
import BYPASSES from './BYPASSES.graphql';
import CAMERAS from './CAMERAS.graphql';

const useStyles = makeStyles( theme => ( {
  root: {
    width: '100%',
    minWidth: 530,
    maxWidth: 530,
    padding: 0,
    '& .text-badge': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding: '2px 5px',
      fontSize: 12,
      fontWeight: 400,
      borderRadius: 3,
      marginLeft: 10,
    },
    '& .top-dropdown-menu--item': {
      padding: 0,
    },
  },
  textLight: {
    color: theme.palette.text.primary,
  },
} ) );

const now = new Date();
const gte = new Date();
const lte = new Date();
lte.setHours( now.getHours() + 3 );

const formatDuration = ( duration: moment ) => {
  const hours = parseInt( duration.asHours(), 10 );
  const minutes = duration.minutes();
  return `${ pad( 2, hours, '0' ) }:${ pad( 2, minutes, '0' ) }`;
};

const TimeLeft = ( { time }: { time: number } ) => {
  const [ duration, setDuration ] = useState(
    moment.duration( moment( time ).diff( moment() ) ),
  );
  useEffect( () => {
    const interval = setInterval( () => {
      setDuration( moment.duration( moment( time ).diff( moment() ) ) );
    }, 60000 );
    return () => clearInterval( interval );
  }, [ time ] );
  return formatDuration( duration );
};

const NotificationsBtn = () => {
  const [ anchorEl, setAnchorEl ] = useState( null );
  const open = !!anchorEl;
  const handleClick = e => {
    setAnchorEl( e.currentTarget );
  };
  const handleClose = () => {
    setAnchorEl( null );
  };
  const classes = useStyles();

  const { data: bypassesData } = useSubscription( BYPASSES, {
    variables: { _gte: gte.toUTCString(), _lte: lte.toUTCString() },
  } );

  const { data: camerasData } = useSubscription( CAMERAS );

  const notifications = useMemo( () => {
    const cameraNotifications = ( camerasData?.cameras || [] ).map( camera => {
      const {
        uid, name, site, params,
      } = camera;
      const lastReport = moment
        .unix( params.error.timestamp )
        .format( 'DD/MM/YYYY, HH:mm A' );

      return {
        id: uid,
        content: `Camera ${ name } at ${ site.name } reported problem at ${ lastReport }`,
      };
    } );

    const bypassNotifications = ( bypassesData?.bypasses || [] ).map( bypass => {
      const { id, ent_time: endTime, site } = bypass;

      return {
        id,
        content: (
          <>
            {`Bypass at ${ site.csid } expires in `}
            <TimeLeft time={ endTime } />
          </>
        ),
      };
    } );

    return [ ...cameraNotifications, ...bypassNotifications ];
  }, [ camerasData, bypassesData ] );

  return (
    <Box className="h-btn-noti res-hide">
      {/* todo: i18n translate */}
      <Tooltip title="Notifications" placement="bottom">
        <IconButton
          aria-describedby={ open ? 'notifications' : null }
          variant="contained"
          color="primary"
          style={ { padding: '6px' } }
          onClick={ handleClick }
        >
          <Badge badgeContent={ notifications.length } color="primary">
            <Icon className={ classes.textLight }>notifications_none</Icon>
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        id="notifications"
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        } }
      >
        <List
          className={ `${ classes.root } top-dropdown-menu` }
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={ (
            <ListSubheader component="div" id="nested-list-subheader">
              <div className="dropdown-header text-center">
                <Typography variant="body2">Notifications</Typography>
              </div>
            </ListSubheader>
          ) }
        >
          <Divider />
          {notifications.map( ( { id, content } ) => (
            <ListItem key={ id } component="div">
              <ListItemText
                primary={ content }
                primaryTypographyProps={ { color: 'textPrimary' } }
              />
            </ListItem>
          ) )}
        </List>
      </Popover>
    </Box>
  );
};

NotificationsBtn.defaultProps = {};

export default NotificationsBtn;
