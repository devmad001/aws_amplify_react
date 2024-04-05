/* eslint-disable react/jsx-props-no-spreading */
// @flow

import React, { useState } from 'react';
import { titleCase } from 'title-case';
import firebase from 'firebase';
import {
  usePermissions,
  List,
  Datagrid,
  TextField,
  FunctionField,
  TextInput,
  EditButton,
  SelectInput,
  useUpdate,
  useNotify,
} from 'react-admin';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import makeStyles from '@material-ui/core/styles/makeStyles';

import UnauthorizedPage from '~/pages/UnauthorizedPage';

import { USER_ROLES } from '~/constants';

import SearchFilter from '~/components/SearchFilter';

const useStyles = makeStyles( () => ( {
  button: {
    marginLeft: '0.3em',
  },
  incidentIcon: {
    height: '100%',
    padding: '3px',
  },
  gridContainer: {
    flexGrow: 1,
  },
  mBableToolbar: {
    flexGrow: 1,
  },
  createButton: {
    margin: '0 8px',
  },
} ) );

const roleOptions = [
  { id: USER_ROLES.SUPERVISOR, name: titleCase( USER_ROLES.SUPERVISOR ) },
  { id: USER_ROLES.OPERATOR, name: titleCase( USER_ROLES.OPERATOR ) },
  { id: USER_ROLES.CUSTOMER, name: titleCase( USER_ROLES.CUSTOMER ) },
];

const UserFilter = props => (
  <SearchFilter { ...props } searchSources={ [ 'displayName', 'role' ] }>
    <TextInput source="displayName" label="Name" alwaysOn />
    <SelectInput
      source="role"
      optionText="name"
      choices={ roleOptions }
      alwaysOn
    />
  </SearchFilter>
);

type RoleFieldProps = {
  record: any,
  edit: {
    uid: String,
    role: String,
  },
  setEdit: ( user: any ) => void,
};

const RoleField = ( { record, edit, setEdit }: RoleFieldProps ) => {
  const classes = useStyles();
  const notify = useNotify();
  const [ updateUser, { loading: editLoading } ] = useUpdate(
    'users',
    record.id,
    { ...record, role: edit?.role || '' },
    record,
    {
      onSuccess: () => {
        notify( 'Updated' );
        setEdit();
      },
      onFailure: message => {
        notify( message, 'error' );
        setEdit();
      },
    },
  );

  return (
    <>
      <Select
        id="role"
        value={ edit && edit.uid === record.uid ? edit.role : record.role }
        onChange={ e => setEdit( { uid: record.uid, role: e.target.value } ) }
        disabled={ edit && edit.uid !== record.uid }
      >
        {roleOptions.map( ( { id, name } ) => (
          <MenuItem value={ id }>{name}</MenuItem>
        ) )}
      </Select>
      {edit && edit.uid === record.uid ? (
        <>
          <Tooltip title="Confirm" aria-label="confirm">
            <IconButton className={ classes.button } onClick={ () => updateUser() }>
              {editLoading ? <CircularProgress size={ 20 } /> : <CheckIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel" aria-label="cancel">
            <IconButton className={ classes.button } onClick={ () => setEdit() }>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </>
  );
};

const UsersList = props => {
  const { loaded, permissions } = usePermissions();

  const [ edit, setEdit ] = useState();

  if ( !loaded || !userLogin ) return null;
  if (
    permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ]
    !== USER_ROLES.SUPERVISOR
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <List { ...props } bulkActionButtons={ false } filters={ <UserFilter /> }>
      <Datagrid>
        <FunctionField
          source="displayName"
          label="Name"
          render={ record => (
            <Box display="flex" alignItems="center">
              <Avatar
                alt="user-thumb"
                src={ record.photoURL }
                style={ { marginRight: '1em' } }
              />
              <span>{record.displayName}</span>
            </Box>
          ) }
        />
        <TextField source="email" />
        <FunctionField
          source="role"
          label="Role"
          render={ record => (
            <RoleField record={ record } edit={ edit } setEdit={ setEdit } />
          ) }
        />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UsersList;
