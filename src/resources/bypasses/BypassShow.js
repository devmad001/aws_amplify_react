// @flow

import React from 'react';
import {
  List,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
} from 'react-admin';

export default ( props: List ) => (
  <Show { ...props }>
    <SimpleShowLayout>
      <ReferenceField
        link="show"
        source="site_id"
        reference="sites"
      >
        <TextField source="name" />
      </ReferenceField>
      <DateField
        source="start_time"
        showTime
      />
      <DateField
        source="end_time"
        showTime
      />
    </SimpleShowLayout>
  </Show>
);
