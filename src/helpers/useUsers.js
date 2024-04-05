// @flow

import { useEffect, useState } from 'react';

const USERS_API = process.env.USERS_API || '';

const useUsers = () => {
  const [ data, setData ] = useState();
  const [ loading, setLoading ] = useState( true );
  const fetchData = () => {
    user.getIdToken().then( token => {
      fetch( USERS_API, {
        headers: new Headers( {
          Authorization: `Bearer ${ token }`,
        } ),
      } )
        .then( response => response.json() )
        .then( d => {
          d.users.sort( ( a, b ) => {
            if ( !a.displayName && !b.displayName ) {
              if ( a.email < b.email ) {
                return -1;
              }
              if ( a.email > b.email ) {
                return 1;
              }
            }
            if ( a.displayName && b.displayName ) {
              if ( a.displayName < b.displayName ) {
                return -1;
              }
              if ( a.displayName > b.displayName ) {
                return 1;
              }
            }
            return 0;
          } );
          setData( d );
          setLoading( false );
        } );
    } );
  };

  useEffect( () => {
    if ( user ) {
      fetchData();
    }
  }, [ user ] );

  return [ { data, loading }, fetchData ];
};

export default useUsers;
