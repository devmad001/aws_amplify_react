/* eslint-disable camelcase */
// @flow

import React from 'react';
import {
  Create,
  List,
  ReferenceInput,
  SelectInput,
  CheckboxGroupInput,
  SimpleForm,
  FormDataConsumer,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';

import { RRule } from 'rrule';
import { makeStyles } from '@material-ui/core/styles';

import DateInput from '~/inputs/DateInput';

// === choices ===
const dayChoices = [];
for ( let i = 1; i <= 28; i += 1 ) {
  const id = i.toString();
  dayChoices.push( { id, name: id, value: i } );
}
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthChoices = months.map( ( name, index ) => ( {
  id: index + 1,
  name,
} ) );
const weekChoices = [
  { id: RRule.MO, name: 'Mon' },
  { id: RRule.TU, name: 'Tue' },
  { id: RRule.WE, name: 'Wed' },
  { id: RRule.TH, name: 'Thu' },
  { id: RRule.FR, name: 'Fri' },
  { id: RRule.SA, name: 'Sat' },
  { id: RRule.SU, name: 'Sun' },
];
const weekChoicesMap = {
  [ RRule.MO ]: RRule.MO,
  [ RRule.TU ]: RRule.TU,
  [ RRule.WE ]: RRule.WE,
  [ RRule.TH ]: RRule.TH,
  [ RRule.FR ]: RRule.FR,
  [ RRule.SA ]: RRule.SA,
  [ RRule.SU ]: RRule.SU,
};
// === choices ===

const RRuleYearlyString = RRule.YEARLY.toString();
const getRRule = values => {
  const { rrule } = values;
  let rule = new RRule();
  if ( !rrule ) return rule;
  const {
    freq, bymonth = [], bymonthday = [], byweekday = [],
  } = rrule;
  if ( freq === RRuleYearlyString ) {
    rule = new RRule( {
      freq: RRule.YEARLY,
      bymonth,
      bymonthday,
    } );
  } else if ( freq === RRule.MONTHLY ) {
    rule = new RRule( {
      freq,
      bymonthday,
    } );
  } else if ( freq === RRule.WEEKLY ) {
    rule = new RRule( {
      freq,
      byweekday: byweekday.map( dStr => weekChoicesMap[ dStr ] ),
    } );
  }
  return rule;
};

const useStyles = makeStyles( {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
} );

const transform = data => {
  const {
    // eslint-disable-next-line no-unused-vars
    rrule,
    ...rest
  } = data;
  const rule = getRRule( data );

  return {
    ...rest,
    recurrence_pattern: rule.toString(),
  };
};

const PostCreateToolbar = props => (
  <Toolbar { ...props } classes={ useStyles() }>
    <SaveButton redirect="list" transform={ transform } />
    <DeleteButton />
  </Toolbar>
);

export default ( props: List ) => (
  <Create { ...props }>
    <SimpleForm toolbar={ <PostCreateToolbar /> }>
      <ReferenceInput
        source="site_id"
        reference="sites"
        sort={ { field: 'name', order: 'ASC' } }
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <FormDataConsumer>
        {( { formData: { site_id } } ) => (
          <ReferenceInput
            source="route_id"
            reference="virtualpatrolroutes"
            sort={ { field: 'name', order: 'ASC' } }
            filter={ { site_id } }
            disabled={ !site_id }
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
      <DateInput
        options={ { format: 'DD/MM/YYYY' } }
        label="From"
        source="start_date"
        initialValue={ new Date() }
      />
      <DateInput
        label="Until"
        source="end_date"
        options={ {
          format: 'DD/MM/YYYY',
          clearable: 'true',
          disablePast: 'true',
        } }
      />
      <SelectInput
        label="Every"
        source="rrule.freq"
        initialValue={ RRule.MONTHLY }
        choices={ [
          { id: RRule.WEEKLY, name: 'Week' },
          { id: RRule.MONTHLY, name: 'Month' },
          { id: RRuleYearlyString, name: 'Year' },
        ] }
      />
      <FormDataConsumer>
        {( {
          formData: {
            rrule: { freq },
          },
        } ) => freq === RRuleYearlyString && (
        <CheckboxGroupInput
          label="Month"
          source="rrule.bymonth"
          style={ { paddingTop: '8px' } }
          fullWidth
          choices={ monthChoices }
        />
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {( {
          formData: {
            rrule: { freq },
          },
        } ) => ( freq === RRuleYearlyString || freq === RRule.MONTHLY ) && (
        <CheckboxGroupInput
          label="On Day"
          source="rrule.bymonthday"
          style={ { paddingTop: '8px' } }
          fullWidth
          choices={ dayChoices }
          optionValue="value"
        />
        )}
      </FormDataConsumer>
      <FormDataConsumer>
        {( {
          formData: {
            rrule: { freq },
          },
        } ) => freq === RRule.WEEKLY && (
        <CheckboxGroupInput
          label="On"
          source="rrule.byweekday"
          fullWidth
          style={ { paddingTop: '8px' } }
          choices={ weekChoices }
        />
        )}
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);
