// @flow

import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export default (props: List) => (
  <List bulkActionButtons={false} {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="icon" />
      <EditButton />
    </Datagrid>
  </List>
);
