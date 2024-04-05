/* eslint-disable camelcase */
// @flow

import React from 'react';
import { titleCase } from 'title-case';
import {
  TextInput,
  Toolbar,
  SaveButton,
  SimpleForm,
  SelectInput,
  PasswordInput,
  required,
  usePermissions,
  Create,
} from 'react-admin';

import UnauthorizedPage from '~/pages/UnauthorizedPage';

import { USER_ROLES } from '~/constants';

const validate = values => {
  const errors = {};
  if ( !( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test( values.email ) ) ) {
    errors.email = 'Invalid email format';
  }
  if ( values.password?.length < 6 ) {
    errors.password = 'Password must have at least 6 characters';
  }
  return errors;
};

const roleOptions = [
  { id: USER_ROLES.SUPERVISOR, name: titleCase( USER_ROLES.SUPERVISOR ) },
  { id: USER_ROLES.OPERATOR, name: titleCase( USER_ROLES.OPERATOR ) },
  { id: USER_ROLES.CUSTOMER, name: titleCase( USER_ROLES.CUSTOMER ) },
];

const CustomToolbar = props => (
  <Toolbar { ...props }>
    <SaveButton { ...props } />
  </Toolbar>
);

export default props => {
  const { loaded, permissions } = usePermissions();

  if ( !loaded ) return null;
  if ( permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ] !== USER_ROLES.SUPERVISOR ) {
    return <UnauthorizedPage />;
  }

  return (
    <Create { ...props }>
      <SimpleForm validate={ validate } toolbar={ <CustomToolbar /> }>
        <TextInput source="displayName" label="Display Name" validate={ required() } />
        <TextInput source="email" label="Email" validate={ required() } />
        <SelectInput source="role" optionText="name" choices={ roleOptions } validate={ required() } />
        <PasswordInput source="password" label="Password" validate={ required() } />
      </SimpleForm>
    </Create>
  );
};
