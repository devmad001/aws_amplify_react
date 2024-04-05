import loadable from '@loadable/component';

export const UserList = loadable( () => import( '~/resources/users/UserList' ) );
export const UserCreate = loadable( () => import( '~/resources/users/UserCreate' ) );
export const UserEdit = loadable( () => import( '~/resources/users/UserEdit' ) );
