/* eslint-disable camelcase */
// @flow

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( () => ( {
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItem: {
    alignItems: 'flex-start',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    cursor: 'default',
  },
  listItemHeader: {
    '& .MuiTypography-body1': {
      color: 'white',
      fontWeight: 600,
    },
  },
  listItemText: {
    marginTop: 0,
    marginBottom: 0,
    '& .MuiTypography-body1': {
      color: 'white',
      fontWeight: 300,
    },
  },
} ) );

type Contact = {id: number, name: string, handphone: string}
function ContactsTable( { items }: { items: Contact[] } ) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1">
        Contacts
      </Typography>
      <List className={ classes.list }>
        {
          items.map( ( { id, name, handphone } ) => (
            <span key={ id }>
              <ListItem
                className={ classes.listItem }
              >
                <ListItemText
                  primary={ name }
                  secondary={ handphone }
                  className={ classes.listItemText }
                />
              </ListItem>
            </span>
          ) )
        }
      </List>
    </>
  );
}

export default ContactsTable;
