// @flow

import React from 'react';
import {
  DateInput as RaDateInput,
  useInput,
} from 'react-admin';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const DateInput = ( props: RaDateInput ) => {
  const { resettable } = props;
  const {
    input: { onChange },
  } = useInput( props );
  return (
    <RaDateInput
      InputProps={ resettable ? {
        endAdornment: (
          <IconButton onClick={ () => onChange( null ) }>
            <ClearIcon fontSize="small" style={ { width: '16px' } } />
          </IconButton>
        ),
      } : {} }
      // eslint-disable-next-line react/jsx-props-no-spreading
      { ...props }
    />
  );
};

export default DateInput;
