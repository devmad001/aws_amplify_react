// @flow

import React from 'react';
import {
  List,
  ReferenceField,
  Show,
  SimpleShowLayout,
  FunctionField,
  TextField,
} from 'react-admin';

import Cameras from './Cameras';

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
      <TextField source="name" />
      <FunctionField
        addLabel={ false }
        render={ record => (
          <Cameras id={ record.id } site_id={ record.site_id } />
        ) }
      />
    </SimpleShowLayout>
  </Show>
);
