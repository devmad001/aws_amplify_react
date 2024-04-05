// @flow

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  makeStyles, AppBar, Toolbar, Box, IconButton, Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

type Props = {
  sidebarOpen: boolean,
  toggleSidebar: () => void,
  toggleResponsiveSidebar: () => void,
  children: Node,
};

const drawerWidth = 260;

const useStyles = makeStyles( theme => ( {
  appBar: {
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
  },
  appBarShift: {
    width: `calc(100% - ${ drawerWidth }px)`,
    marginLeft: `${ drawerWidth }px`,
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
  contentJustify: {
    justifyContent: 'space-between',
  },
  menuButton: {
    marginLeft: '-80px',
    color: theme.palette.common.white,
    marginRight: theme.spacing( 2 ),
    '& .MuiSvgIcon-root': {
      fontSize: '1.8125rem',
    },
    [ theme.breakpoints.down( 'md' ) ]: {
      marginLeft: '-6px',
    },
    [ theme.breakpoints.down( 'xs' ) ]: {
      marginLeft: '-7px',
    },
  },
  textLight: {
    color: theme.palette.text.primary,
  },
  toggleBtn: {
    marginLeft: '-12px',
    color: theme.palette.text.primary,
    transition: theme.transitions.create( [ 'margin' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
} ) );

const debounce = ( func, wait ) => {
  let timeout;
  return function waitFn( ...args ) {
    const context = this;
    if ( timeout ) clearTimeout( timeout );
    timeout = setTimeout( () => {
      timeout = null;
      func.apply( context, args );
    }, wait );
  };
};

export const Topbar = ( props: Props ) => {
  const {
    sidebarOpen, toggleSidebar, toggleResponsiveSidebar, children,
  } = props;
  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );
  const classes = useStyles();

  const updateDimensions = debounce( () => {
    setWindowWidth( window.innerWidth );
  }, 500 );

  useEffect( () => {
    window.addEventListener( 'resize', updateDimensions );
    return () => {
      window.removeEventListener( 'resize', updateDimensions );
    };
  } );

  return (
    <div className="hk-header">
      <AppBar
        position="fixed"
        color="default"
        className={ clsx( classes.appBar, {
          [ classes.appBarShift ]: windowWidth < 1280 ? false : sidebarOpen,
          'rtl-header': !sidebarOpen,
        } ) }
      >
        <Toolbar className={ classes.contentJustify }>
          <Box display="flex" alignItems="center">
            <Hidden mdDown implementation="css">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={ toggleSidebar }
                edge="start"
                className={ clsx( classes.menuButton, {
                  [ classes.toggleBtn ]: sidebarOpen === false,
                }, 'hamburger-icon' ) }
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden lgUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={ toggleResponsiveSidebar }
                className={ `${ classes.menuButton } ham-menu ${ classes.textLight }` }
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
          <Box className="horizontal-icon" display="flex" alignItems="center">
            { children }
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Topbar.defaultProps = {};

export { default as NotificationsBtn } from './NotificationsBtn';
export { default as FullScreenBtn } from './FullScreenBtn';
export { default as ProfileBtn } from './ProfileBtn';

export default Topbar;
