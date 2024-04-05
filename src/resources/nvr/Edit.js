// @flow

import React from 'react';
import {
  DeleteButton,
  Edit,
  List,
  ReferenceInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
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
      <ReferenceInput source="site_id" reference="sites">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="url" label="URL" />
      <TextInput source="path" helperText="/<path>" />
      <TextInput source="auth" helperText="<username>:<password>" />
    </SimpleForm>
  </Edit>
);
