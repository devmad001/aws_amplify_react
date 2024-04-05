// @flow

import React, { useState, cloneElement, Children } from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { List, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
  closeResponsiveSidebar?: ?() => void,
  children?: Node,
};

const useStyles = makeStyles( theme => ( {
  logo: {
    maxWidth: '45px',
    maxHeight: '30px',
  },
  drawerHeader: {
    display: 'flex',
    borderBottom: '1px solid #404854',
    alignItems: 'center',
    padding: theme.spacing( 0, 2 ),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
} ) );

export const Sidebar = ( props: Props ) => {
  const { children, closeResponsiveSidebar } = props;
  const [ openIndex, setOpenIndex ] = useState( false );

  const newChildren = Children.map( children, ( child, i ) => child && cloneElement( child, {
    isOpen: i === openIndex,
    toggleOpen: () => setOpenIndex( i === openIndex ? false : i ),
    closeResponsiveSidebar,
    customOnClick: child.onClick,
  } ) );
  const classes = useStyles();

  return (
    <div>
      <div className="sidebar-wrap h-100">
        <div className={ classes.drawerHeader }>
          <Box className="site-logo" display="inline-flex" alignItems="center">
            <Box component={ Link } to="/" className="logo-mini" lineHeight={ 0.8 }>
              <img alt="logo" className={ classes.logo } src="/images/metropolis-logo.png" />
            </Box>
          </Box>
        </div>
        <Scrollbars
          className="hulk-scroll"
          autoHide
          autoHideDuration={ 100 }
          style={ { height: 'calc(100vh - 64px)' } }
        >
          <List className="menu-wrap" style={ { padding: 0 } }>
            { newChildren }
          </List>
        </Scrollbars>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  closeResponsiveSidebar: () => {},
  children: [],
};

export { default as MenuItem } from './MenuItem';

export { default as MenuItemsFromConfig } from './MenuItemsFromConfig';

export default Sidebar;
