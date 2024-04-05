// @flow

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Hidden, Drawer, CssBaseline,
  Paper, Container,
} from '@material-ui/core';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { setSidebarVisibility } from 'ra-core';
import { Scrollbars } from 'react-custom-scrollbars';
import { Notification } from 'react-admin';

import Header from './Header';
import Menu from './Menu';

type Props = {
  classes: any,
  theme: {},
  children?: Node,
};

const drawerWidth = 260;

const styles = theme => ( {
  root: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    marginLeft: -drawerWidth,
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    [ theme.breakpoints.down( 'xs' ) ]: {
      paddingTop: 52,
    },
  },
  contentShift: {
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
    marginLeft: 0,
  },
  menuButton: {
    color: 'red',
    marginRight: theme.spacing( 2 ),
    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'none',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  bgColor: {
    backgroundColor: '#272e3d',
    borderRight: '0',
    overflowY: 'hidden',
  },
  drawerPaper: {
    width: '100%',
    backgroundColor: '#272e3d',
    borderRight: '0',
    overflowY: 'hidden',
    [ theme.breakpoints.up( 'md' ) ]: {
      position: 'relative',
    },
  },
  paper: {
    padding: '0.75rem',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:first-child': {
      paddingTop: '24px',
    },
    '&:last-child': {
      paddingBottom: '30px',
    },
  },
} );

const CustomLayout = ( props: Props ) => {
  const { classes, theme, children } = props;
  const [ responsiveSidebarOpen, setResponsiveSidebarOpen ] = useState( false );
  const dispatch = useDispatch();
  const sidebarOpen = useSelector( state => state.admin.ui.sidebarOpen );
  const toggleSidebar = () => dispatch( setSidebarVisibility( !sidebarOpen ) );
  const toggleResponsiveSidebar = () => setResponsiveSidebarOpen( !responsiveSidebarOpen );

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline>
        <div className={ `hk-app-layout ${ classes.root }` }>
          <Header
            sidebarOpen={ sidebarOpen }
            toggleSidebar={ toggleSidebar }
            toggleResponsiveSidebar={ toggleResponsiveSidebar }
          />
          <nav aria-label="menu-sidebar">
            {/* Sidebar when screen is small */}
            <Hidden lgUp implementation="css">
              <Drawer
                variant="temporary"
                anchor="left"
                open={ responsiveSidebarOpen }
                onClose={ toggleResponsiveSidebar }
                classes={ {
                  paper: `${ classes.bgColor } ${ classes.drawer }`,
                } }
                ModalProps={ {
                  keepMounted: true, // Better open performance on mobile.
                } }
              >
                <Menu closeResponsiveSidebar={ toggleResponsiveSidebar } />
              </Drawer>
            </Hidden>
            {/* Sidebar when screen is large */}
            <Hidden
              mdDown
              implementation="css"
              className={ clsx( classes.drawer, {
                'rtl-sidebar': !sidebarOpen,
              } ) }
            >
              <Drawer
                variant="persistent"
                anchor="left"
                open={ sidebarOpen }
                classes={ {
                  paper: ` ${ classes.drawerPaper }`,
                } }
              >
                <Menu />
              </Drawer>
            </Hidden>
          </nav>
          <main
            className={ clsx( classes.content, {
              [ classes.contentShift ]: sidebarOpen,
            }, 'hk-main' ) }
          >
            <div className="hk-page">
              <Scrollbars
                className="hulk-scroll main-content"
                autoHide
                autoHideDuration={ 100 }
                style={ { height: 'calc(100vh - 64px)' } }
              >
                <div className="hulk-page-content">
                  <Container>
                    <Paper className={ classes.paper } square>
                      {children}
                    </Paper>
                  </Container>
                </div>
              </Scrollbars>
            </div>
          </main>
        </div>
      </CssBaseline>
      <Notification />
    </ThemeProvider>
  );
};

CustomLayout.defaultProps = {
  children: null,
};

export default withStyles( styles )( CustomLayout );
