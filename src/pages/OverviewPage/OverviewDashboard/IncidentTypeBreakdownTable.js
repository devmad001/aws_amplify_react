// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

type TableProps = {
  title: string,
  data: {
    attendNowCount: number,
    activeCount: number,
    pastCount: number,
  },
};

const useStyles = makeStyles( () => ( {
  title: {
    flex: '1 1 100%',
  },
  table: {
    minWidth: '33%',
  },
  cellBody: {
    height: '20px',
  },
} ) );

export default ( props: TableProps ) => {
  const { title, data } = props;
  const classes = useStyles();

  const columns = [
    {
      property: 'name',
      label: 'Incident Type',
    },
    {
      property: 'count',
      label: 'Count',
    },
  ];

  return (
    <div>
      <Paper className={ classes.paper }>
        <Toolbar>
          <Typography className={ classes.title } color="inherit" variant="tableTitle" component="div">
            { title }
          </Typography>
        </Toolbar>
        <Table className={ classes.table } size="small" aria-label={ title }>
          <TableHead>
            <TableRow elementType="tr">
              {
                columns.map( column => (
                  <TableCell className={ classes.cellBody }>{ column.label }</TableCell>
                ) )
              }
            </TableRow>
          </TableHead>
          <TableBody elementType="tbody">
            <TableRow elementType="tr">
              <TableCell className={ classes.cellBody }>Attend now</TableCell>
              <TableCell className={ classes.cellBody }>{ data.attendNowCount }</TableCell>
            </TableRow>
            <TableRow elementType="tr">
              <TableCell className={ classes.cellBody }>Active</TableCell>
              <TableCell className={ classes.cellBody }>{ data.activeCount }</TableCell>
            </TableRow>
            <TableRow elementType="tr">
              <TableCell className={ classes.cellBody }>Past</TableCell>
              <TableCell className={ classes.cellBody }>{ data.pastCount }</TableCell>
            </TableRow>
            <TableRow elementType="tr">
              <TableCell className={ classes.cellBody }>Total</TableCell>
              <TableCell className={ classes.cellBody }>
                { data.activeCount + data.pastCount }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};
