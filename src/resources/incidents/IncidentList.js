// @flow

import React from "react";
import {
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export default (props: List) => (
  <List
    bulkActionButtons={false}
    {...props}
    sort={{ field: "id", order: "DESC" }}>
    <Datagrid rowClick="show">
      <NumberField label="No." source="id" />

      <ReferenceField link="show" source="siteID" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="start_time" showTime />
      <ReferenceField
        link="show"
        source="incidentIncident_type_idId"
        reference="incidenttypes">
        <ChipField source="name" />
      </ReferenceField>
      <ReferenceField link="show" source="sensor_id" reference="sensors">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        link="show"
        label="Action Taken"
        source="incidentStatus_type_idId"
        reference="statustypes">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
