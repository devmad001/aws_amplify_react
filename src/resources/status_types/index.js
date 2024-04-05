import loadable from '@loadable/component';

export const StatusTypeCreate = loadable( () => import( '~/resources/status_types/StatusTypeCreate' ) );
export const StatusTypeEdit = loadable( () => import( '~/resources/status_types/StatusTypeEdit' ) );
export const StatusTypeList = loadable( () => import( '~/resources/status_types/StatusTypeList' ) );
