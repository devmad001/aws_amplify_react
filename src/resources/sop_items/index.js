import loadable from '@loadable/component';

export const SopItemCreate = loadable( () => import( '~/resources/sop_items/SopItemCreate' ) );
export const SopItemEdit = loadable( () => import( '~/resources/sop_items/SopItemEdit' ) );
export const SopItemList = loadable( () => import( '~/resources/sop_items/SopItemList' ) );
export const SopItemShow = loadable( () => import( '~/resources/sop_items/SopItemShow' ) );
