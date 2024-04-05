// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  TextField,
  useDataProvider,
} from 'react-admin';
import { useUser } from 'ra-aws-amplify';

export default ( props: List ) => (
  <List bulkActionButtons={ false } { ...props }>
    <Datagrid rowClick="show">
      <TextField source="csid" label="CSID" />
      <TextField source="name" />
      <TextField source="customer_name" />
      <EditButton />
    </Datagrid>
  </List>
);
