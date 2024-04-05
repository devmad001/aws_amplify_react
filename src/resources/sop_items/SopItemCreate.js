// @flow

import React from 'react';
import {
  Create,
  List,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  NumberInput,
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
  <Create { ...props }>
    <SimpleForm toolbar={ <PostCreateToolbar /> }>
      <TextInput source="name" multiline fullWidth />
      <ReferenceInput source="site_id" reference="sites">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="incident_type_id" reference="incidenttypes">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="order" />
    </SimpleForm>
  </Create>
);
