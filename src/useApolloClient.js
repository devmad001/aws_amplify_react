// @flow
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import {
  ApolloClient, InMemoryCache, split, createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

type FireApp = firebase.app.App;

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || '';

const HTTP_LINK = `https://${ HASURA_ENDPOINT }/v1/graphql`;

const WS_LINK = `wss://${ HASURA_ENDPOINT }/v1/graphql`;

export default ( fireApp: FireApp ) => {
  const auth = fireApp.auth();
  const [ requestAuthorization, setRequestAuthorization ] = useState( '' );
  const [ cache ] = useState( new InMemoryCache() );
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged( async user => {
      if ( user ) {
        user.getIdTokenResult()
          .then( tokenObj => {
            if ( tokenObj.token && tokenObj.token !== '' ) {
              setRequestAuthorization( tokenObj.token );
            }
          } );
      }
      return '';
    } );

    return unsubscribe;
  }, auth );

  const authLink = setContext( async ( _, requestOptions ) => {
    const user = auth.currentUser;
    if ( user ) {
      const { token } = await user.getIdTokenResult();
      if ( token ) {
        return {
          headers: {
            ...requestOptions.headers,
            Authorization: `Bearer ${ token }`,
          },
        };
      }
      return requestOptions;
    }
    return requestOptions;
  } );

  const websocketLink = new WebSocketLink( {
    uri: WS_LINK,
    options: {
      reconnect: true,
      timeout: 6000,
      lazy: true,
      connectionParams: () => (
        { headers: { Authorization: `Bearer ${ requestAuthorization }` } }
      ),
    },
  } );

  const httpLink = createHttpLink( {
    uri: HTTP_LINK,
  } );

  return new ApolloClient( {
    link: split(
      ( { query } ) => {
        const { kind, operation } = getMainDefinition( query );
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      websocketLink,
      authLink.concat( httpLink ),
    ),
    cache,
  } );
};
