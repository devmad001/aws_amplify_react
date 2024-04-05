// @flow

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
} from 'react-admin';

export default ( props: List ) => (
  <List bulkActionButtons={ false } { ...props }>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="position" />
      <TextField source="handphone" />
      <ReferenceArrayField
        label="Incident Types"
        source="incident_type_ids"
        reference="incidenttypes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
