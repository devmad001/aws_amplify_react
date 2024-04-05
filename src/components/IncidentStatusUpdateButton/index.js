/* eslint-disable camelcase */
// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useMutation } from 'react-admin';

import { STATUS_TYPES } from '../../constants';

const statusOptions = [ {
  id: STATUS_TYPES.PENDING_AAR.ID,
  name: STATUS_TYPES.PENDING_AAR.NAME,
  color: STATUS_TYPES.PENDING_AAR.COLOR,
}, {
  id: STATUS_TYPES.NOT_DETECTED.ID,
  name: STATUS_TYPES.NOT_DETECTED.NAME,
  color: STATUS_TYPES.NOT_DETECTED.COLOR,
}, {
  id: STATUS_TYPES.CLEARED.ID,
  name: STATUS_TYPES.CLEARED.NAME,
  color: STATUS_TYPES.CLEARED.COLOR,
},
];

const bypassStatusOptions = [ {
  id: STATUS_TYPES.CLEARED.ID,
  name: STATUS_TYPES.CLEARED.NAME,
  color: STATUS_TYPES.CLEARED.COLOR,
} ];

type Status_Type = {id: number, name: string}

type Props = {
  id: number, // incident id
  status_type: Status_Type,
  user_id: string,
  bypass: boolean,
  disabled?: boolean,
}

const getColoredRadio = color => withStyles( {
  root: {
    color,
  },
  checked: {},
// eslint-disable-next-line react/jsx-props-no-spreading
} )( props => <Radio color="default" { ...props } /> );

export default function IncidentStatusUpdateButton( {
  id, status_type, user_id, bypass, disabled,
}: Props ) {
  const [ mutate, { loading: updating } ] = useMutation();

  const updateStatus = v => mutate( {
    type: 'update',
    resource: 'incidents',
    payload: {
      id,
      data: {
        status_type_id: v,
        end_time: new Date().toISOString(),
        operator_id: user_id,
      },
    },
  } );

  const handleChange = event => {
    const value = Number( event.target.value );
    if ( value ) {
      updateStatus( value );
    }
  };

  const options = bypass ? bypassStatusOptions : statusOptions;

  return (
    <RadioGroup row aria-label="statusOptions" name="statusOptions" value={ status_type.id } onChange={ handleChange }>
      {options.map( ( { id: statusId, name, color } ) => {
        const ColoredRadio = getColoredRadio( color );
        return (
          <FormControlLabel
            value={ statusId }
            key={ statusId }
            control={ <ColoredRadio /> }
            label={ name }
            labelPlacement="bottom"
            disabled={ updating || disabled }
          />
        );
      } )}
    </RadioGroup>
  );
}
IncidentStatusUpdateButton.defaultProps = {
  disabled: false,
};
