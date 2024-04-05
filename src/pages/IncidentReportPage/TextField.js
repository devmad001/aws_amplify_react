// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  label?: string | number | null,
  value?: string | number | null,
}

function TextField( { label, value }: Props ) {
  return (
    <>
      <Typography variant="subtitle1">
        {label}
      </Typography>
      <Typography variant="h6">
        {value}
      </Typography>
    </>
  );
}

TextField.defaultProps = {
  label: '',
  value: '',
};

export default TextField;
