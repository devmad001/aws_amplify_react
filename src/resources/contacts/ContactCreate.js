// @flow

import React from 'react';
import {
  Create,
  List,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  ReferenceArrayInput,
  SelectArrayInput,
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
  <Create { ...props }>
    <SimpleForm toolbar={ <PostCreateToolbar /> }>
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
  </Create>
);
