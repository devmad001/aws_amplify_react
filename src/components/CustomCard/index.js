// @flow

import React from 'react';
import type { Node } from 'react';

import {
  Card, CardContent, Typography, makeStyles, Divider,
} from '@material-ui/core';

const useStyles = makeStyles( theme => ( {
  card: {
    padding: '1.25rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: 4,
  },
  cardContent: {
    padding: '0 !important',
  },
  divider: {
    marginTop: '0.625rem',
  },
} ) );

type Props = {
  cardClasses?: string,
  title?: string,
  showDivider?: boolean,
  children: Node,
}

function CustomCard( props: Props ) {
  const classes = useStyles();
  const {
    cardClasses = '', title = '', showDivider = false, children,
  } = props;
  return (
    <Card className={ `${ classes.card } ${ cardClasses }` }>
      <>
        {title
          ? (
            <Typography variant="h6">
              {title}
            </Typography>
          )
          : null}
      </>
      {showDivider
        ? <Divider className={ classes.divider } />
        : null}
      <CardContent className={ classes.cardContent }>
        {children}
      </CardContent>
    </Card>
  );
}

CustomCard.defaultProps = {
  cardClasses: '',
  title: '',
  showDivider: false,
};

export default CustomCard;
