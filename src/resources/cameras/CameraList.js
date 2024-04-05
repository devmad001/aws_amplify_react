// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  TextInput,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
} from 'react-admin';
import { AmplifyFilter } from 'react-admin-amplify';

import SearchFilter from '~/components/SearchFilter';

const CameraFilter = props => (
  <AmplifyFilter { ...props } defaultQuery="listCameras">
    <TextInput label="Name" source="camerasByName.name" alwaysOn />
    <ReferenceInput
      label="Site"
      source="camerasBySite_id.site_id"
      reference="sites"
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </AmplifyFilter>
);

export default ( props: List ) => (
  <List { ...props } bulkActionButtons={ false } filters={ <CameraFilter /> }>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
