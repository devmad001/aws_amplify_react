// @flow

import moment from 'moment';

import type { Bypass as BypassType } from '~/types';

export default ( siteId: number, time: string, bypasses: BypassType[] ) => {
  const compareDate = moment( time );
  return !!bypasses.find( b => {
    const startDate = moment( b.start_time );
    const endDate = moment( b.end_time );

    return b.site_id === siteId && compareDate.isBetween( startDate, endDate );
  } );
};
