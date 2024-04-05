// @flow

import { useSelector, shallowEqual } from 'react-redux';
import { getResources, useTranslate, Translate } from 'ra-core';
import inflection from 'inflection';

const translatedResourceName = ( resource: any, translate: Translate ) => translate( `resources.${ resource.name }.name`, {
  smart_count: 2,
  _: resource.options && resource.options.label
    ? translate( resource.options.label, {
      smart_count: 2,
      _: resource.options.label,
    } )
    : inflection.titleize( inflection.humanize( inflection.pluralize( resource.name ) ) ),
} );

export const useResources = () => {
  const resources = useSelector( getResources, shallowEqual );
  const translate = useTranslate();

  const hierarchy = [];
  const filtered = resources.filter( r => ( r.hasCreate || r.hasEdit || r.hasList || r.hasShow ) );
  filtered.forEach( resource => {
    if ( !resource.options.parent ) {
      // resource has no parent
      const foundResource = hierarchy.find(
        resourceToFind => resourceToFind.name === resource.name,
      );
      if ( foundResource ) {
        // resource already exists, overwrite
        foundResource.icon = resource.options.icon || 'table_chart';
        foundResource.title = translatedResourceName( resource, translate );
        // $FlowFixMe
        foundResource.desc = resource.options.desc;
        // $FlowFixMe
        foundResource.to = `/${ resource.name }`;
      } else {
        // resource is new
        hierarchy.push( {
          name: resource.name,
          icon: resource.options.icon || 'table_chart',
          title: translatedResourceName( resource, translate ),
          desc: resource.options.desc,
          to: `/${ resource.name }`,
          children: [],
        } );
      }
    } else {
      // resource has a parent
      const parentResource = hierarchy.find( parent => parent.name === resource.options.parent );
      if ( parentResource ) {
        // parent resource found
        parentResource.children.push( {
          name: resource.name,
          icon: resource.options.icon || 'table_chart',
          title: translatedResourceName( resource, translate ),
          desc: resource.options.desc,
          to: `/${ resource.name }`,
        } );
      } else {
        // parent was not defined, or not found yet, create an empty one
        hierarchy.push( {
          name: resource.options.parent,
          icon: 'label',
          title: translatedResourceName( resource.options.parent, translate ),
          children: [
            {
              name: resource.name,
              icon: resource.options.icon || 'table_chart',
              title: translatedResourceName( resource, translate ),
              desc: resource.options.desc,
              to: `/${ resource.name }`,
            },
          ],
        } );
      }
    }
  } );

  return hierarchy;
};

export const other = '';

// import React from 'react';
// import { Translate } from 'ra-core';
// import inflection from 'inflection';

// import MenuItem from './MenuItem';

// export const translatedResourceName =
// ( resource: any, translate: Translate ) => translate( `resources.${ resource.name }.name`, {
//   smart_count: 2,
//   _: resource.options && resource.options.label
//     ? translate( resource.options.label, {
//       smart_count: 2,
//       _: resource.options.label,
//     } )
//     : inflection.titleize( inflection.humanize( inflection.pluralize( resource.name ) ) ),
// } );

// export const getResourcesHierarchy = ( resources: any, translate: Translate ) => {
//   const hierarchy = [];
//   const filtered =
//    resources.filter( r => ( r.hasCreate || r.hasEdit || r.hasList || r.hasShow ) );
//   filtered.forEach( resource => {
//     if ( !resource.options.parent ) {
//       // resource has no parent
//       const foundResource = hierarchy.find(
//         resourceToFind => resourceToFind.name === resource.name,
//       );
//       if ( foundResource ) {
//         // resource already exists, overwrite
//         foundResource.icon = resource.options.icon || 'table_chart';
//         foundResource.title = translatedResourceName( resource, translate );

//         foundResource.desc = resource.options.desc;

//         foundResource.to = `/${ resource.name }`;
//       } else {
//         // resource is new
//         hierarchy.push( {
//           name: resource.name,
//           icon: resource.options.icon || 'table_chart',
//           title: translatedResourceName( resource, translate ),
//           desc: resource.options.desc,
//           isOpen: false,
//           to: `/${ resource.name }`,
//           children: [],
//         } );
//       }
//     } else {
//       // resource has a parent
//       const parentResource = hierarchy.find( parent => parent.name === resource.options.parent );
//       if ( parentResource ) {
//         // parent resource found
//         parentResource.children.push( {
//           name: resource.name,
//           icon: resource.options.icon || 'table_chart',
//           title: translatedResourceName( resource, translate ),
//           desc: resource.options.desc,
//           to: `/${ resource.name }`,
//         } );
//       } else {
//         // parent was not defined, or not found yet, create an empty one
//         hierarchy.push( {
//           name: resource.options.parent,
//           icon: 'label',
//           title: translatedResourceName( resource.options.parent, translate ),
//           children: [
//             {
//               name: resource.name,
//               icon: resource.options.icon || 'table_chart',
//               title: translatedResourceName( resource, translate ),
//               desc: resource.options.desc,
//               to: `/${ resource.name }`,
//             },
//           ],
//         } );
//       }
//     }
//   } );

//   return hierarchy;
// };

// export const renderResourcesHierarchy = (
//   hierarchy: any,
//   closeSidebar: Function,
// ) => hierarchy.map( item => (
//   <MenuItem
//     key={ item.to }
//     menu={ {
//       icon: item.icon,
//       title: item.title,
//       desc: item.desc,
//       isOpen: item.isOpen,
//       to: item.to || '/bar', // todo: proper routing
//     } }
//     toggleMenu={ () => {} }
//     closeSidebar={ closeSidebar }
//   >
//     { item.children.map( childItem => (
//       <MenuItem
//         key={ item.to }
//         menu={ {
//           icon: childItem.icon,
//           title: childItem.title,
//           desc: item.desc,
//           isOpen: childItem.isOpen,
//           to: item.to || '/bar', // todo: proper routing
//         } }
//         toggleMenu={ () => {} }
//         closeSidebar={ closeSidebar }
//       />
//     ) ) }
//   </MenuItem>
// ) );
