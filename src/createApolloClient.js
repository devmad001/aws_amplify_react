import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from '@apollo/client/link/context';
import authProvider from './providers/authProvider';

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || '';

const HTTP_LINK = `https://${ HASURA_ENDPOINT }/v1/graphql`;

const WS_LINK = `wss://${ HASURA_ENDPOINT }/v1/graphql`;

const getHeaders = async () => {
  const token = await authProvider.getJWTToken();
  if ( !token ) return {}; // for public user
  return {
    headers: {
      Authorization: token ? `Bearer ${ token }` : '',
    },
  };
};

const authLink = setContext( async ( _, { headers } ) => {
  const token = await authProvider.getJWTToken();
  if ( !token ) return { headers }; // for public user
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${ token }`,
    },
  };
} );

const httpLink = new HttpLink( {
  uri: HTTP_LINK,
} );

const websocketLink = new WebSocketLink( {
  uri: WS_LINK,
  options: {
    reconnect: true,
    timeout: 6000,
    connectionParams: getHeaders,
  },
} );

const createApolloClient = () => new ApolloClient( {
  link: authLink.concat( split(
    ( { query } ) => {
      const { kind, operation } = getMainDefinition( query );
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    websocketLink,
    httpLink,
  ) ),
  cache: new InMemoryCache(),
} );

export default createApolloClient;
