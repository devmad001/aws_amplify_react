// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  TextField,
  UrlField,
} from 'react-admin';

export default ( props: List ) => (
  <List bulkActionButtons={ false } { ...props }>
    <Datagrid rowClick="show">
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <UrlField source="url" label="URL" />
      <TextField source="path" />
      <TextField source="auth" />
      <EditButton />
    </Datagrid>
  </List>
);
