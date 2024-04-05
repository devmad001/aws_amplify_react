// @flow

import React from 'react';
import {
  List,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export default ( props: List ) => (
  <Show { ...props }>
    <SimpleShowLayout>
      <TextField source="name" multiline component="pre" />
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
    </SimpleShowLayout>
  </Show>
);
