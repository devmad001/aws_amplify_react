// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  label?: string | number | null,
  value: string,
}

const LineText = prop => (
  <>
    {
      prop.text.split( /[\f\r\n]+/ ).map( line => (
        <>
          { line }
          <br />
        </>
      ) )
    }
  </>
);

function CommentField( { label, value }: Props ) {
  return (
    <>
      <Typography variant="subtitle1">
        {label || 'Comment'}
      </Typography>
      <Typography variant="h6">
        <LineText text={ value } />
      </Typography>
    </>
  );
}

CommentField.defaultProps = {
  label: '',
};

export default CommentField;
