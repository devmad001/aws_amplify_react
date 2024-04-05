// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  TextField,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberField,
} from 'react-admin';

import { AmplifyFilter } from 'react-admin-amplify';

const SopFilter = props => (
  <AmplifyFilter { ...props } defaultQuery="listsops">
    <TextInput label="Name" source="sopitemsByName.name" alwaysOn />
    <ReferenceInput
      label="Site"
      source="sopitemsBySite_id.site_id"
      reference="sites"
      resettable
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Incident"
      source="sopitemsByIncident_type_id.incident_type_id"
      reference="incidenttypes"
      resettable
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </AmplifyFilter>
);

export default ( props: List ) => (
  <List { ...props } bulkActionButtons={ false } filters={ <SopFilter /> }>
    <Datagrid rowClick="show">
      <TextField source="name" multiline />
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        link="show"
        source="incident_type_id"
        reference="incidenttypes"
      >
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="order" />
      <EditButton />
    </Datagrid>
  </List>
);
