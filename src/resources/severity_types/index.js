import loadable from '@loadable/component';

export const SeverityTypeCreate = loadable( () => import( '~/resources/severity_types/SeverityTypeCreate' ) );
export const SeverityTypeEdit = loadable( () => import( '~/resources/severity_types/SeverityTypeEdit' ) );
export const SeverityTypeList = loadable( () => import( '~/resources/severity_types/SeverityTypeList' ) );
