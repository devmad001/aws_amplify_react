import loadable from '@loadable/component';

export const IncidentTypeCreate = loadable( () => import( '~/resources/incident_types/IncidentTypeCreate' ) );
export const IncidentTypeEdit = loadable( () => import( '~/resources/incident_types/IncidentTypeEdit' ) );
export const IncidentTypeList = loadable( () => import( '~/resources/incident_types/IncidentTypeList' ) );
