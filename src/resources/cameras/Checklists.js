/* eslint-disable camelcase */
// @flow

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MaterialTable from 'material-table';
import maxBy from 'lodash/maxBy';

import CHECKLISTS from './CHECKLISTS.graphql';
import INSERT_CAMERA_CHECKLIST from '../../graphql/camera_checklists/INSERT_CAMERA_CHECKLIST.graphql';
import UPDATE_CAMERA_CHECKLIST from '../../graphql/camera_checklists/UPDATE_CAMERA_CHECKLIST.graphql';
import DELETE_CAMERA_CHECKLIST from '../../graphql/camera_checklists/DELETE_CAMERA_CHECKLIST.graphql';

const Checklists = ( { camera_id }: {camera_id: number} ) => {
  const { data, loading, refetch } = useQuery( CHECKLISTS, { variables: { camera_id } } );
  if ( loading ) return null;

  return <Form checklists={ data.checklists } camera_id={ camera_id } refetch={ refetch } />;
};

type Checklist = {
  id: number,
  name: string,
  order: number,
}

const Form = ( props: {camera_id: number, checklists: Checklist[], refetch: Function} ) => {
  const { camera_id, refetch, checklists = [] } = props;
  const [ isLoading, setLoading ] = useState( false );

  const [ add ] = useMutation( INSERT_CAMERA_CHECKLIST );
  const [ update ] = useMutation( UPDATE_CAMERA_CHECKLIST );
  const [ remove ] = useMutation( DELETE_CAMERA_CHECKLIST );

  const maxChecklist = maxBy( checklists, 'order' );
  const newOrder = maxChecklist ? maxChecklist.order + 1 : 1;

  const onRowAdd = useCallback(
    newData => new Promise( resolve => {
      const { name, order } = newData;
      add( {
        variables: {
          camera_id,
          name,
          order,
        },
      } )
        .then( () => {
          refetch();
          resolve();
        } );
    } ),
    [ ],
  );

  const onRowUpdate = useCallback(
    newData => new Promise( resolve => {
      const { id, name, order } = newData;
      update( {
        variables: {
          id,
          name,
          order,
        },
      } )
        .then( () => {
          refetch();
          resolve();
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
          refetch();
          setLoading( false );
        } );
    } ),
    [ ],
  );

  return (
    <>
      <MaterialTable
        title=""
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
            title: 'Name',
            field: 'name',
            validate: rowData => !!( rowData.name ),
          },
        ] }
        data={ checklists }
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

export default Checklists;
