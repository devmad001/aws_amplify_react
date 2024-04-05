/* eslint-disable react/destructuring-assignment */
// @flow

import React, { useMemo } from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

type NoteDetailItemProps = {
  label: string,
  value: string,
  valueSpan: number,
}

type NoteProps = {
  id: string,
  timestamp: number,
  details: {
    siteId: number,
    status: number,
    description: string,
    actionDate: string,
    deviceId: number,
    firstInformation: string,
    guardId: number,
    incidentDateTime: string,
    incidentId: number,
    incidentType: string,
    location: string,
    peopleInvolved: {
      no: number,
      NRIC: string,
      mobileNo: string,
      name: string,
      remarks: string,
    }[],
    authoritiesInvolved: {
      no: number,
      authority: string,
      mobileNo: string,
      remarks: string,
      staffId: string,
      staffName: string,
      vehicle: string,
    }[],
  }
}[];

type Props = {
  loading: boolean,
  notes: NoteProps,
};

const useStyles = makeStyles( () => ( {
  label: {
    fontWeight: 700,
  },
} ) );

const tableOptions = {
  tableLayout: 'fixed',
  search: false,
  draggable: false,
  paging: false,
  toolbar: false,
  headerStyle: {
    textTransform: 'uppercase',
    fontWeight: 900,
    background: '#222335',
    color: 'rgba(255, 255, 255, 0.5)',
  },
};

const peopleInvolvedColumns = [
  {
    title: 'No.',
    field: 'no',
    sorting: false,
  },
  {
    title: 'Person Name',
    field: 'name',
    sorting: false,
  },
  {
    title: 'IC No.',
    field: 'NRIC',
    sorting: false,
  },
  {
    title: 'Mobile No.',
    field: 'mobileNo',
    sorting: false,
  },
  {
    title: 'Remarks',
    field: 'remarks',
    sorting: false,
  },
];

const authoritiesInvolvedColumns = [
  {
    title: 'No.',
    field: 'no',
    sorting: false,
  },
  {
    title: 'Authority',
    field: 'authority',
    sorting: false,
  },
  {
    title: 'Staff Name',
    field: 'staffName',
    sorting: false,
  },
  {
    title: 'Staff ID',
    field: 'staffId',
    sorting: false,
  },
  {
    title: 'Mobile No.',
    field: 'mobileNo',
    sorting: false,
  },
  {
    title: 'Vehicle No.',
    field: 'vehicle',
    sorting: false,
  },
  {
    title: 'Remarks',
    field: 'remarks',
    sorting: false,
  },
];

function NoteDetailItem( { label, value, valueSpan }: NoteDetailItemProps ) {
  const classes = useStyles();

  return (
    <>
      <Grid item md={ 2 }>
        <Typography variant="subtitle1" className={ classes.label }>{`${ label }:`}</Typography>
      </Grid>
      <Grid item md={ valueSpan }>
        <Box pt="calc(0.125rem * 1.5)">
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Grid>
    </>
  );
}

function NeatPatrolNote( { notes, loading }: Props ) {
  const classes = useStyles();

  const neatPatrolNotes = notes;

  const details = useMemo( () => [ ...neatPatrolNotes ]
    .sort( ( a, b ) => ( moment( a.timestamp ).unix() - moment( b.timestamp ).unix() ) )
    .map( note => note.details )
    .reduce( ( result, value ) => ( {
      incidentType: value.incidentType || result.incidentType,
      incidentDateTime: value.incidentDateTime || result.incidentDateTime,
      status: ( value.status || value.status === 0 ) ? value.status : result.status,
      location: value.location || result.location,
      firstInformation: value.firstInformation || result.firstInformation,
      description: value.description || result.description,
      peopleInvolved: (
        value.peopleInvolved.length ? value.peopleInvolved : result.peopleInvolved
      ),
      authoritiesInvolved: (
        value.authoritiesInvolved.length ? value.authoritiesInvolved : result.authoritiesInvolved
      ),
    } ), {} ), [ neatPatrolNotes ] );

  const peopleInvolvedData = useMemo( () => (
    details.peopleInvolved || []
  ).map( ( item, index ) => ( { ...item, no: index + 1 } ) ), [ details ] );

  const authoritiesInvolvedData = useMemo( () => (
    details.authoritiesInvolved || []
  ).map( ( item, index ) => ( { ...item, no: index + 1 } ) ), [ details ] );

  return (
    <Box mb={ 3 }>
      <Box p={ 2 }>
        <Typography variant="subtitle1" className={ classes.label }>
          NeatPatrol
        </Typography>
      </Box>
      <Box px={ 2 }>
        <Grid container spacing={ 1 }>
          <NoteDetailItem valueSpan={ 3 } label="Incident Type" value={ details.incidentType } />
          <Grid item md={ 2 } />
          <NoteDetailItem
            valueSpan={ 3 }
            label="Date & Time"
            value={ moment( details.incidentDateTime ).format( 'DD/MM/YYYY, HH:mm:ss' ) }
          />

          <NoteDetailItem valueSpan={ 3 } label="Fire Alarm Status" value={ details.status } />
          <Grid item md={ 7 } />

          <NoteDetailItem valueSpan={ 3 } label="Location" value={ details.location } />
          <Grid item md={ 7 } />

          <NoteDetailItem valueSpan={ 10 } label="First Information" value={ details.firstInformation } />

          <NoteDetailItem valueSpan={ 10 } label="Description" value={ details.description } />
        </Grid>
      </Box>
      <div className={ classes.tableNeatWrapper }>
        <Box p={ 2 }>
          <Typography variant="subtitle1" className={ classes.label }>
            People Involved:
          </Typography>
        </Box>

        {/* this class is using for override column widths */}
        <div className="neat-patrol-table-custom">
          <MaterialTable
            data={ peopleInvolvedData }
            columns={ peopleInvolvedColumns }
            isLoading={ loading }
            options={ tableOptions }
            style={ { background: 'transparent' } }
          />
        </div>

        <Box p={ 2 } mt={ 3 }>
          <Typography variant="subtitle1" className={ classes.label }>
            Authorities Involved:
          </Typography>
        </Box>

        {/* this class is using for override column widths */}
        <div className="neat-patrol-table-custom">
          <MaterialTable
            data={ authoritiesInvolvedData }
            columns={ authoritiesInvolvedColumns }
            isLoading={ loading }
            options={ tableOptions }
            style={ { background: 'transparent' } }
          />
        </div>
      </div>
    </Box>
  );
}

export default NeatPatrolNote;
