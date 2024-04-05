// @flow

import React from 'react';
import {
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

import Map from '~/components/Map';
import Cameras from './Cameras';
import IncidentTypeField from './IncidentTypeField';

type SensorDescFieldProps = {
  source: string,
  prefix?: string,
  record?: { [string]: any },
};

const SensorDescField = ( props: SensorDescFieldProps ) => {
  const { prefix, source, record = {} } = props;
  return <div style={ { paddingTop: '16px' } }>{prefix + record[ source ]}</div>;
};

SensorDescField.defaultProps = {
  prefix: '',
  record: {},
};

export default ( props: List ) => (
  <Show { ...props }>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="ID" source="id" />
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
          source="sensor_type_id"
          reference="sensortypes"
          label="Incident Type"
        >
          <IncidentTypeField source="incident_type_id" />
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
        <ReferenceField
          label="NVR"
          link="show"
          source="nvr_id"
          reference="nvrs"
        >
          <TextField source="url" />
        </ReferenceField>
        <FunctionField
          label="Location"
          render={ record => (
            <div style={ { width: 400 } }>
              <Map latitude={ record.latitude } longitude={ record.longitude } />
            </div>
          ) }
        />
      </Tab>
      <Tab label="Cameras" path="cameras">
        <FunctionField
          label=" "
          render={ record => (
            <Cameras sensor_id={ record.id } site_id={ record.site_id } />
          ) }
        />
      </Tab>
      <Tab label="incidents" path="incidents">
        <SensorDescField prefix="Incidents triggered by " source="name" />
        <ReferenceManyField
          reference="incidents"
          filter={ {} }
          target="incidentsBySite_id.site_id"
          label=""
        >
          <Datagrid rowClick="show">
            <NumberField label="No." source="id" />
            <TextField source="name" />
            <DateField source="start_time" showTime />
            <ReferenceField
              link="show"
              source="incident_type_id"
              reference="incidenttypes"
            >
              <ChipField source="name" />
            </ReferenceField>
            <ReferenceField link="show" source="sensor_id" reference="sensors">
              <TextField source="name" />
            </ReferenceField>
            <BooleanField source="resolved" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
