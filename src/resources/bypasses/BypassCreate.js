// @flow

import React from 'react';
import {
  Create,
  List,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
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
      <ReferenceInput
        source="site_id"
        reference="sites"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateTimeInput source="start_time" />
      <DateTimeInput source="end_time" />
    </SimpleForm>
  </Create>
);
