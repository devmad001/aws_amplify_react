import loadable from '@loadable/component';

export const SiteCreate = loadable( () => import( '~/resources/sites/SiteCreate' ) );
export const SiteEdit = loadable( () => import( '~/resources/sites/SiteEdit' ) );
export const SiteList = loadable( () => import( '~/resources/sites/SiteList' ) );
export const SiteShow = loadable( () => import( '~/resources/sites/SiteShow' ) );
