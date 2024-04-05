// @flow

import React from 'react';
import {
  Create,
  List,
  NumberInput,
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
  <Create { ...props }>
    <SimpleForm toolbar={ <PostCreateToolbar /> }>
      <TextInput source="csid" label="CSID" />
      <TextInput source="npid" label="NeatPatrol ID" />
      <TextInput source="name" />
      <TextInput source="customer_name" />
      <TextInput source="address" />
      <NumberInput source="latitude" min={ -90 } max={ 90 } />
      <NumberInput source="longitude" min={ -180 } max={ 180 } />
    </SimpleForm>
  </Create>
);
