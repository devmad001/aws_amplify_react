import loadable from '@loadable/component';

export const VirtualPatrolRouteCreate = loadable( () => import( '~/resources/virtual_patrol_routes/VirtualPatrolRouteCreate' ) );
export const VirtualPatrolRouteEdit = loadable( () => import( '~/resources/virtual_patrol_routes/VirtualPatrolRouteEdit' ) );
export const VirtualPatrolRouteList = loadable( () => import( '~/resources/virtual_patrol_routes/VirtualPatrolRouteList' ) );
export const VirtualPatrolRouteShow = loadable( () => import( '~/resources/virtual_patrol_routes/VirtualPatrolRouteShow' ) );
