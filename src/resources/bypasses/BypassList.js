// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  DateField,
  ReferenceField,
  TextField,
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
      <DateField
        source="start_time"
        showTime
      />
      <DateField
        source="end_time"
        showTime
      />
      <EditButton />
    </Datagrid>
  </List>
);
