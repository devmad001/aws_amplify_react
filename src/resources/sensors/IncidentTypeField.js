// @flow

import React from 'react';
import { ReferenceField, TextField } from 'react-admin';

export default ( props: TextField ) => (
  <ReferenceField
    { ...props }
    source="incident_type_id"
    reference="incidenttypes"
    label="Incident Type"
    link=""
  >
    <TextField source="name" />
  </ReferenceField>
);
