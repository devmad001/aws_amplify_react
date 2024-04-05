// @flow

import React from 'react';
import type { Element } from 'react';
import MenuItem from './MenuItem';

// MenuItemsFromConfig will read a config that looks like this:
// const config = [
//   {
//     icon: 'dashboard',
//     title: 'Overview',
//     desc: 'General review of all sites',
//     data: {
//       to: '/overview',
//     },
//     children: [],
//   },
//   {
//     icon: 'list_alt',
//     title: 'Nested Menu',
//     desc: 'Menu item with children',
//     children: [
//       {
//         icon: 'settings_remote',
//         title: 'Child Menu 1',
//         desc: 'Child menu 1 under nested menu',
//         data: {
//           to: '/child-page-1',
//         },
//       },
//       {
//         icon: 'settings_remote',
//         title: 'Child Menu 2',
//         desc: 'Child menu 2 under nested menu',
//         data: {
//           to: '/child-page-2',
//         },
//       },
//     ],
//   },
// ];
//
// Data is anything to be passed in later to onClick prop e.g.
// <MenuItemsFromConfig
//   config={ config }
//   onClick={ item => {
//     if ( item.data.to ) history.push( item.data.to );
//   } }
// />

type ItemConfig = {
  icon?: string,
  title?: string,
  desc?: string,
  to?: string,
  data?: any,
  children?: ItemConfig[],
};

type Props = {
  config: ItemConfig[],
  onClick?: any => void,
};

const MenuItemsFromConfig = ( props: Props ) => {
  const { config, onClick } = props;

  const menuItems: Element<typeof MenuItem>[] = config.map( item => (
    <MenuItem
      key={ item.title }
      icon={ item.icon }
      title={ item.title }
      desc={ item.desc }
      to={ item.to }
      onClick={ onClick ? () => { if ( onClick ) onClick( item ); } : null }
    >
      { item.children && item.children.map( child => (
        <MenuItem
          // key={ `${ child.title }_${ child.to }` }
          icon={ child.icon }
          title={ child.title }
          desc={ child.desc }
          to={ child.to }
          onClick={ onClick ? () => { if ( onClick ) onClick( child ); } : null }
        />
      ) ) }
    </MenuItem>
  ) );

  return (
    <>
      { menuItems }
    </>
  );
};

MenuItemsFromConfig.defaultProps = {
  onClick: undefined,
};

export default MenuItemsFromConfig;
