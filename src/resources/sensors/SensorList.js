// @flow

import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput,
} from 'react-admin';

import { AmplifyFilter } from 'react-admin-amplify';
import SearchFilter from '~/components/SearchFilter';
import IncidentTypeField from './IncidentTypeField';

const SensorFilter = props => (
  <AmplifyFilter { ...props } defaultQuery="listSensors">
    <TextInput label="Name" source="sensorsByName.name" alwaysOn resettable />
    <ReferenceInput
      label="Type"
      source="sensorsBySensor_type_id.sensor_type_id"
      reference="sensortypes"
      resettable
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput
      label="Site"
      source="sensorsBySite_id.site_id"
      reference="sites"
      resettable
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </AmplifyFilter>
);

export default ( props: List ) => (
  <List { ...props } bulkActionButtons={ false } filters={ <SensorFilter /> }>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <ReferenceField
        link="show"
        source="sensor_type_id"
        reference="sensortypes"
        label="Sensor Type"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        link=""
        source="incident_type_id"
        reference="incidenttypes"
        label="Incident Type"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        link=""
        source="severity_type_id"
        reference="severitytypes"
        label="Severity"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="channel" />
      <ReferenceField link="show" source="site_id" reference="sites">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
