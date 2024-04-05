// @flow

import React from 'react';
import {
  Edit,
  List,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
} );

const PostCreateToolbar = props => (
  <Toolbar { ...props } classes={ useStyles() }>
    <SaveButton redirect="list" />
    <DeleteButton />
  </Toolbar>
);

export default ( props: List ) => (
  <Edit { ...props }>
    <SimpleForm toolbar={ <PostCreateToolbar /> }>
      <TextInput source="name" />
      <ReferenceInput
        label="Sensor Type"
        source="sensor_type_id"
        reference="sensortypes"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Severity"
        source="severity_type_id"
        reference="severitytypes"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="channel" />
      <ReferenceInput source="site_id" reference="sites">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="nvr_id" reference="nvrs" label="NVR">
        <SelectInput optionText="url" />
      </ReferenceInput>
      <NumberInput source="latitude" min={ -90 } max={ 90 } />
      <NumberInput source="longitude" min={ -180 } max={ 180 } />
    </SimpleForm>
  </Edit>
);
