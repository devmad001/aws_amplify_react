// @flow

import moment from 'moment';
import pad from 'pad';

export default ( duration: moment ) => {
  const hours = parseInt( duration.asHours(), 10 );
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${ pad( 2, hours, '0' ) }:${ pad( 2, minutes, '0' ) }:${ pad( 2, seconds, '0' ) }`;
};
