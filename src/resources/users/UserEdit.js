/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
// @flow

import React from 'react';
import { titleCase } from 'title-case';
import firebase from 'firebase';
import {
  TextInput,
  Toolbar,
  SaveButton,
  SimpleForm,
  SelectInput,
  PasswordInput,
  required,
  usePermissions,
  Edit,
  DeleteButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import UnauthorizedPage from '~/pages/UnauthorizedPage';

import { USER_ROLES } from '~/constants';

const useStyles = makeStyles( {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: '#e53935',
    '&:hover': {
      backgroundColor: 'rgba(229, 56, 53, 0.12)',
    },
  },
} );

const validate = values => {
  const errors = {};
  if ( !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test( values.email ) ) {
    errors.email = 'Invalid email format';
  }
  if ( values.password?.length > 0 && values.password?.length < 6 ) {
    errors.password = 'Password must have at least 6 characters or empty';
  }
  return errors;
};

const roleOptions = [
  { id: USER_ROLES.SUPERVISOR, name: titleCase( USER_ROLES.SUPERVISOR ) },
  { id: USER_ROLES.OPERATOR, name: titleCase( USER_ROLES.OPERATOR ) },
  { id: USER_ROLES.CUSTOMER, name: titleCase( USER_ROLES.CUSTOMER ) },
];

const CustomToolbar = props => {
  const classes = useStyles();
  return (
    <Toolbar { ...props } classes={ { toolbar: classes.toolbar } }>
      <SaveButton { ...props } />
      <DeleteButton />
    </Toolbar>
  );
};

export default props => {
  const { loaded, permissions } = usePermissions();

  if ( !loaded || !userLogin ) return null;
  if (
    permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ]
    !== USER_ROLES.SUPERVISOR
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <Edit { ...props }>
      <SimpleForm validate={ validate } toolbar={ <CustomToolbar /> }>
        <TextInput
          source="displayName"
          label="Display Name"
          validate={ required() }
        />
        <TextInput
          disabled
          source="email"
          label="Email"
          validate={ required() }
        />
        <SelectInput
          source="role"
          optionText="name"
          choices={ roleOptions }
          validate={ required() }
        />
        <PasswordInput source="password" label="Password" />
      </SimpleForm>
    </Edit>
  );
};
