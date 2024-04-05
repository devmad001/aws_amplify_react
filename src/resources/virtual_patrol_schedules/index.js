import loadable from '@loadable/component';

export const VirtualPatrolScheduleCreate = loadable( () => import( '~/resources/virtual_patrol_schedules/VirtualPatrolScheduleCreate' ) );
export const VirtualPatrolScheduleEdit = loadable( () => import( '~/resources/virtual_patrol_schedules/VirtualPatrolScheduleEdit' ) );
export const VirtualPatrolScheduleList = loadable( () => import( '~/resources/virtual_patrol_schedules/VirtualPatrolScheduleList' ) );
export const VirtualPatrolScheduleShow = loadable( () => import( '~/resources/virtual_patrol_schedules/VirtualPatrolScheduleShow' ) );
