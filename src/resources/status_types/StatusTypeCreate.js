// @flow

import React from 'react';
import {
  Create,
  List,
  SimpleForm,
  TextInput,
} from 'react-admin';

export default ( props: List ) => (
  <Create { ...props }>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
