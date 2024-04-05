import loadable from '@loadable/component';

export const IncidentCreate = loadable( () => import( '~/resources/incidents/IncidentCreate' ) );
export const IncidentEdit = loadable( () => import( '~/resources/incidents/IncidentEdit' ) );
export const IncidentList = loadable( () => import( '~/resources/incidents/IncidentList' ) );
export const IncidentShow = loadable( () => import( '~/resources/incidents/IncidentShow' ) );
