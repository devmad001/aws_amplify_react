// @flow

import React from 'react';
import {
  Edit,
  List,
  SimpleForm,
  TextInput,
} from 'react-admin';

export default ( props: List ) => (
  <Edit { ...props }>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
