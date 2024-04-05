import loadable from '@loadable/component';

export const BypassCreate = loadable( () => import( '~/resources/bypasses/BypassCreate' ) );
export const BypassEdit = loadable( () => import( '~/resources/bypasses/BypassEdit' ) );
export const BypassList = loadable( () => import( '~/resources/bypasses/BypassList' ) );
export const BypassShow = loadable( () => import( '~/resources/bypasses/BypassShow' ) );
