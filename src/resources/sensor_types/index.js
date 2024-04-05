import loadable from '@loadable/component';

export const SensorTypeCreate = loadable( () => import( '~/resources/sensor_types/SensorTypeCreate' ) );
export const SensorTypeEdit = loadable( () => import( '~/resources/sensor_types/SensorTypeEdit' ) );
export const SensorTypeList = loadable( () => import( '~/resources/sensor_types/SensorTypeList' ) );
