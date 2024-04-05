/* eslint-disable camelcase */
// @flow

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles( () => ( {
  container: {
    padding: 10,
    height: '100%',
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
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
    <Paper className={ classes.container }>
      <Typography variant="subtitle1">
        CONTACTS
      </Typography>
      <Divider className={ classes.divider } />
      <Grid container spacing={ 3 }>
        {
          items.map( ( { id, name, handphone } ) => (
            <Grid key={ id } className={ classes.listWrapper } xs={ 12 }>
              <ListItem
                className={ classes.listItem }
              >
                <ListItemText
                  primary={ name }
                  secondary={ handphone }
                  className={ classes.listItemText }
                />
              </ListItem>
            </Grid>
          ) )
        }
      </Grid>
    </Paper>
  );
}

export default ContactsTable;
