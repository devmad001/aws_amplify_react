// @flow

import { useEffect, useState } from 'react';

import { usePermissions } from 'react-admin';

const useRole = () => {
  const { loaded, permissions } = usePermissions();
  const [ role, setRole ] = useState( );

  useEffect( () => {
    if ( loaded ) {
      setRole( permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ] );
    }
  }, [ loaded ] );
  return { role, loading: !loaded };
};

export default useRole;
