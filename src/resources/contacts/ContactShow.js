// @flow

import React from 'react';
import {
  List,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from 'react-admin';

export default ( props: List ) => (
  <Show { ...props }>
    <SimpleShowLayout>
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
    </SimpleShowLayout>
  </Show>
);
