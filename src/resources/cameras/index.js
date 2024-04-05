import loadable from '@loadable/component';

export const CameraCreate = loadable( () => import( '~/resources/cameras/CameraCreate' ) );
export const CameraEdit = loadable( () => import( '~/resources/cameras/CameraEdit' ) );
export const CameraList = loadable( () => import( '~/resources/cameras/CameraList' ) );
export const CameraShow = loadable( () => import( '~/resources/cameras/CameraShow' ) );
