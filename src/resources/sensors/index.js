import loadable from '@loadable/component';

export const SensorCreate = loadable( () => import( '~/resources/sensors/SensorCreate' ) );
export const SensorEdit = loadable( () => import( '~/resources/sensors/SensorEdit' ) );
export const SensorList = loadable( () => import( '~/resources/sensors/SensorList' ) );
export const SensorShow = loadable( () => import( '~/resources/sensors/SensorShow' ) );
