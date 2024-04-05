// @flow

import React from 'react';
import {
  Edit,
  List,
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

const PostEditToolbar = props => (
  <Toolbar { ...props } classes={ useStyles() }>
    <SaveButton redirect="show" />
    <DeleteButton />
  </Toolbar>
);

export default ( props: List ) => (
  <Edit { ...props }>
    <SimpleForm toolbar={ <PostEditToolbar /> }>
      <ReferenceInput
        source="site_id"
        reference="sites"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
