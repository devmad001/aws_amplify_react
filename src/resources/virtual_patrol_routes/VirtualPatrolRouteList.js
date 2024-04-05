// @flow

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
} from 'react-admin';

export default ( props: List ) => (
  <List
    bulkActionButtons={ false }
    { ...props }
  >
    <Datagrid rowClick="show">
      <ReferenceField
        link="show"
        source="site_id"
        reference="sites"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);
