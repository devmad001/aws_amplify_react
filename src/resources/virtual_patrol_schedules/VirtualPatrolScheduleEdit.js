/* eslint-disable camelcase */
// @flow

import React from 'react';
import {
  Edit,
  List,
  SimpleForm,
  ReferenceField,
  TextField,
  FunctionField,
  DateField,
} from 'react-admin';

import { rrulestr } from 'rrule';
import Typography from '@material-ui/core/Typography';

export default ( props: List ) => (
  <Edit { ...props }>
    <SimpleForm>
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        link="show"
        source="route_id"
        reference="virtualpatrolroutes"
      >
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
        label="Repeat"
        render={ record => {
          if ( !record.recurrence_pattern ) return null;
          const rrule = rrulestr( record.recurrence_pattern );
          return <Typography variant="caption">{rrule.toText()}</Typography>;
        } }
      />
      <DateField locales="en-GB" source="start_date" label="From" />
      <DateField
        locales="en-GB"
        source="end_date"
        label="Until"
        emptyText="Forever"
      />
    </SimpleForm>
  </Edit>
);
