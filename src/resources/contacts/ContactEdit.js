// @flow

import React from 'react';
import {
  Edit,
  List,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';

export default ( props: List ) => (
  <Edit { ...props }>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="position" />
      <TextInput source="handphone" />
      <ReferenceArrayInput source="incident_type_ids" reference="incidenttypes">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceInput source="site_id" reference="sites">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
