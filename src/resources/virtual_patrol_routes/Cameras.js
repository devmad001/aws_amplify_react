/* eslint-disable camelcase */
// @flow

import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MaterialTable from 'material-table';
import maxBy from 'lodash/maxBy';

import CAMERAS from './CAMERAS.graphql';
import VPROUTE from './VPROUTE.graphql';
import INSERT_VP_ROUTE_CAMERA from '../../graphql/virtual_patrol_route_camera/INSERT_VP_ROUTE_CAMERA.graphql';
import UPDATE_VP_ROUTE_CAMERA from '../../graphql/virtual_patrol_route_camera/UPDATE_VP_ROUTE_CAMERA.graphql';
import DELETE_VP_ROUTE_CAMERA from '../../graphql/virtual_patrol_route_camera/DELETE_VP_ROUTE_CAMERA.graphql';

const Cameras = ( { id, site_id }: {id: number, site_id: number} ) => {
  const { data, loading, refetch } = useQuery( VPROUTE, { variables: { id } } );
  const { data: camData, loading: camLoading } = useQuery( CAMERAS, { variables: { site_id } } );

  const routeCameras = useMemo( () => {
    if ( data && data.route && Array.isArray( data.route.routeCameras ) ) {
      return data.route.routeCameras.map( i => ( {
        id: i.id,
        order: i.order,
        camera_id: i.camera_id,
      } ) );
    }

    return [];
  }, [ data ] );

  const cameras = useMemo( () => {
    if ( camData && Array.isArray( camData.cameras ) ) {
      return camData.cameras.reduce( ( acc, c ) => ( {
        ...acc,
        [ c.id ]: c.name,
      } ), {} );
    }

    return {};
  }, [ camData ] );

  if ( loading || camLoading ) return null;

  return (
    <Form
      routeCameras={ routeCameras }
      cameras={ cameras }
      id={ id }
      site_id={ site_id }
      refetch={ refetch }
    />
  );
};

type RouteCamera = {
  id: number,
  order: number,
  cameraId: number,
  cameraName: string,
}

type Props = {
  id: number,
  routeCameras: RouteCamera[],
  cameras: {[number]: string},
  refetch: Function,
}
const Form = ( props: Props ) => {
  const {
    id: virtual_patrol_route_id, refetch, routeCameras, cameras,
  } = props;
  const [ isLoading, setLoading ] = useState( false );

  const [ add ] = useMutation( INSERT_VP_ROUTE_CAMERA );
  const [ update ] = useMutation( UPDATE_VP_ROUTE_CAMERA );
  const [ remove ] = useMutation( DELETE_VP_ROUTE_CAMERA );

  const maxChecklist = maxBy( routeCameras, 'order' );
  const newOrder = maxChecklist ? maxChecklist.order + 1 : 1;

  const onRowAdd = useCallback(
    newData => new Promise( resolve => {
      const { camera_id, order } = newData;
      add( {
        variables: {
          virtual_patrol_route_id,
          camera_id,
          order,
        },
      } )
        .then( () => {
          refetch().then( resolve );
        } );
    } ),
    [ ],
  );

  const onRowUpdate = useCallback(
    newData => new Promise( resolve => {
      const { id, order, camera_id } = newData;
      update( {
        variables: {
          id,
          camera_id,
          order,
        },
      } )
        .then( () => {
          refetch().then( resolve );
        } );
    } ),
    [ ],
  );

  const onRowRemove = useCallback(
    ( e, rowData ) => new Promise( resolve => {
      const { id } = rowData;
      const variables = {
        id,
      };
      setLoading( true );
      remove( {
        variables,
      } )
        .then( () => {
          resolve();
        } )
        .finally( () => {
          refetch().then( () => setLoading( false ) );
        } );
    } ),
    [ ],
  );

  return (
    <>
      <MaterialTable
        title="Route"
        isLoading={ isLoading }
        columns={ [
          {
            title: 'Order',
            field: 'order',
            type: 'numeric',
            initialEditValue: newOrder,
            validate: rowData => rowData.order !== '',
          },
          {
            title: 'Camera',
            field: 'camera_id',
            validate: rowData => !!( rowData.camera_id ),
            lookup: cameras,
          },
        ] }
        data={ routeCameras }
        editable={ {
          onRowAdd,
          onRowUpdate,
        } }
        actions={ [
          () => ( {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: onRowRemove,
          } ),
        ] }
        options={ {
          search: false,
          actionsColumnIndex: -1,
          paging: false,
        } }
      />
    </>
  );
};

export default Cameras;
