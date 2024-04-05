/* eslint-disable react/destructuring-assignment */
// @flow

import React from 'react';

import Scrollbars from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';

import NeatPatrolNote from './NeatPatrolNote';
import VirtualPatrolNote from './VirtualPatrolNote';

import './style.css';

const useStyles = makeStyles( () => ( {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    fontFamily: "'Lato', sans-serif",
  },
  tableNeatWrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  },
  tableCell: {
    background: 'transparent',
  },
  label: {
    fontWeight: 700,
  },
} ) );

type NeatPatrolNoteType = {
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
}

type Props = {
  loading: boolean,
  neatPatrolNotes: NeatPatrolNoteType[],
  comments: string,
}

function NotesTab( { loading, neatPatrolNotes, comments }: Props ) {
  const classes = useStyles();

  return (
    <Scrollbars
      className="hulk-scroll"
      autoHide
      autoHideDuration={ 100 }
      style={ { height: 'calc(100% - 104px)', background: '#14131C' } }
    >
      <div className={ classes.wrapper }>
        {
          comments && (
            <VirtualPatrolNote comments={ comments } />
          )
        }
        {
          neatPatrolNotes.length > 0 && (
            <NeatPatrolNote notes={ neatPatrolNotes } loading={ loading } />
          )
        }
      </div>
    </Scrollbars>
  );
}

export default NotesTab;
