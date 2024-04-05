// @flow

import React from 'react';
import {
  List,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
} from 'react-admin';

export default ( props: List ) => (
  <Show { ...props }>
    <SimpleShowLayout>
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <UrlField source="url" label="URL" />
      <TextField source="path" />
      <TextField source="auth" />
    </SimpleShowLayout>
  </Show>
);
