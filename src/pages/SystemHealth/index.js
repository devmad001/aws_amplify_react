/* eslint-disable react/jsx-props-no-spreading */
// @flow

import React, { useState, useMemo } from 'react';
import moment from 'moment';
import MaterialTable from 'material-table';
import { usePermissions } from 'react-admin';
import {
  Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import { useSubscription } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';

import UnauthorizedPage from '~/pages/UnauthorizedPage';

import { USER_ROLES, SEVERITY_TYPES } from '~/constants';

import CAMERAS from './CAMERAS.graphql';

const useStyles = makeStyles( () => ( {
  formControl: {
    width: '100%',
    maxWidth: 270,
  },
  link: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
} ) );

const SystemHealthPage = () => {
  const classes = useStyles();

  const { loaded, permissions } = usePermissions();

  const { data: camerasData, loading: camerasLoading } = useSubscription( CAMERAS );

  const [ selectedSite, setSelectedSite ] = useState( '' );

  const siteOptions = useMemo( () => {
    const siteMap = new Map();

    ( camerasData?.cameras || [] ).forEach( ( { site } ) => siteMap.set( site.id, site ) );

    return [ ...siteMap.values() ];
  }, [ camerasData ] );

  const cameras = useMemo(
    () => ( camerasData?.cameras || [] )
      .map( ( camera, index ) => ( { ...camera, category: 'Camera', no: index + 1 } ) )
      // filter by Site
      .filter( ( { site } ) => !selectedSite || selectedSite === site.id ),
    [ camerasData, selectedSite ],
  );

  if ( !camerasData ) return null;

  if (
    loaded
    && (
      !permissions
      || !permissions[ 'https://hasura.io/jwt/claims' ]
      || permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ] !== USER_ROLES.SUPERVISOR
    )
  ) {
    return <UnauthorizedPage />;
  }

  const columns = [
    {
      title: 'Index',
      field: 'no',
    },
    {
      title: 'Category',
      field: 'category',
    },
    {
      title: 'Asset ID',
      field: 'aid',
    },
    {
      title: 'Description/Name',
      field: 'name',
    },
    {
      title: 'Site Name',
      field: 'site.name',
      render: row => {
        const { site: { id, name } } = row;
        return <Link className={ classes.link } href={ `#/sites/${ id }/show` }>{ name }</Link>;
      },
    },
    {
      title: 'Status',
      defaultSort: 'desc',
      render: row => {
        const { params: { error } } = row;
        if ( !error ) {
          return <>Normal</>;
        }

        return (
          <span style={ { color: SEVERITY_TYPES.HIGH.COLOR } }>
            {error.caption}
          </span>
        );
      },
      customSort: ( prev, next ) => {
        const prevStatus = prev.params.error ? prev.params.error.caption : 'Normal';
        const nextStatus = next.params.error ? next.params.error.caption : 'Normal';

        if ( prevStatus === 'Normal' && nextStatus === 'Normal' ) return 0;
        if ( prevStatus === 'Normal' ) return -1;
        if ( nextStatus === 'Normal' ) return 1;
        return prevStatus > nextStatus ? 1 : -1;
      },
    },
    {
      title: 'Last report',
      render: ( { params } ) => {
        const lastReport = params.error ? params.error.timestamp : params.timeScanned;
        if ( !lastReport ) return '';
        return moment.unix( lastReport ).format( 'DD/MM/YYYY, HH:mm' );
      },
      customSort: ( { params: prevParams }, { params: nextParams } ) => {
        const prevReport = prevParams.error ? prevParams.error.timestamp : prevParams.timeScanned;
        const nextReport = nextParams.error ? nextParams.error.timestamp : nextParams.timeScanned;

        return ( prevReport || 0 ) - ( nextReport || 0 );
      },
    },
  ];

  return (
    <MaterialTable
      data={ cameras }
      columns={ columns }
      isLoading={ camerasLoading }
      options={ {
        search: false,
        sorting: true,
        pageSize: 10,
        showTitle: false,
      } }
      components={ {
        Toolbar: () => (
          <Box py={ 1 }>
            <FormControl variant="filled" className={ classes.formControl }>
              <InputLabel>Site</InputLabel>
              <Select value={ selectedSite } onChange={ e => setSelectedSite( e.target.value ) }>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                { siteOptions.map( site => (
                  <MenuItem value={ site.id }>{ site.name }</MenuItem>
                ) ) }
              </Select>
            </FormControl>
          </Box>
        ),
      } }
    />
  );
};

export default SystemHealthPage;
