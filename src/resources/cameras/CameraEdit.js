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
        source="site_id"
        reference="sites"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput
        source="latitude"
        min={ -90 }
        max={ 90 }
      />
      <NumberInput
        source="longitude"
        min={ -180 }
        max={ 180 }
      />
      <TextInput
        source="aid"
        label="Asset Id"
      />
      <TextInput
        source="rtsp_stream"
        label="RTSP Stream"
      />
      <TextInput
        source="rtsp_params"
        label="RTSP Params"
      />
    </SimpleForm>
  </Edit>
);
