import loadable from '@loadable/component';

export const NvrCreate = loadable( () => import( './Create' ) );
export const NvrEdit = loadable( () => import( './Edit' ) );
export const NvrList = loadable( () => import( './List' ) );
export const NvrShow = loadable( () => import( './Show' ) );
