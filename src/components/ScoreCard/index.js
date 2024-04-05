// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( () => ( {
  container: {
    padding: 10,
    display: 'flex',
  },
  box: {
    margin: 'auto',
    textAlign: 'center',
  },
} ) );

function ScoreCard( { title, score, subtitle }: {title: string, score: number, subtitle: string} ) {
  const classes = useStyles();
  return (
    <Paper className={ classes.container }>
      <Box className={ classes.box }>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h3">
          {score}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Box>
    </Paper>
  );
}

export default ScoreCard;
