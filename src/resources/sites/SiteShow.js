// @flow

import React from 'react';
import {
  ChipField,
  Datagrid,
  DateField,
  Filter,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  SelectInput,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  // UrlField,
} from 'react-admin';

import { AmplifyFilter } from 'react-admin-amplify';
import Map from '~/components/Map';

type SiteDescFieldProps = {
  source: string,
  prefix?: string,
  record?: { [string]: any },
};

const SiteDescField = ( props: SiteDescFieldProps ) => {
  const { prefix, source, record = {} } = props;
  return <div style={ { paddingTop: '16px' } }>{prefix + record[ source ]}</div>;
};

SiteDescField.defaultProps = {
  prefix: '',
  record: {},
};

const IncidentTypeFilter = props => (
  <AmplifyFilter { ...props } defaultQuery="listincidenttypes">
    <ReferenceInput
      label="Incident Type"
      source="sopitemsByIncident_type_id.incident_type_id"
      reference="incidenttypes"
      sort={ { field: 'name', order: 'ASC' } }
      allowEmpty
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </AmplifyFilter>
);

export default ( props: List ) => (
  <Show { ...props }>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField source="csid" label="CSID" />
        <TextField source="name" />
        <TextField source="customer_name" />
        <TextField source="address" />
        <FunctionField
          label="Location"
          render={ record => (
            <div style={ { width: 400 } }>
              <Map latitude={ record.latitude } longitude={ record.longitude } />
            </div>
          ) }
        />
      </Tab>
      <Tab label="incidents" path="incidents">
        <SiteDescField prefix="Incidents in " source="name" />
        <ReferenceManyField
          reference="incidents"
          target="incidentsBySite_id.site_id"
          filter={ {} }
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
            <ReferenceField
              link={ false }
              label="Action Taken"
              source="status_type_id"
              reference="statustypes"
            >
              <TextField source="name" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="sensors" path="sensors">
        <SiteDescField prefix="Sensors in " source="name" />
        <ReferenceManyField
          reference="sensors"
          target="sensorsBySite_id.site_id"
          filter={ {} }
          label=""
        >
          <Datagrid rowClick="show">
            <TextField source="name" />
            <NumberField source="latitude" />
            <NumberField source="longitude" />
            <ReferenceField
              link="show"
              source="sensor_type_id"
              reference="sensortypes"
            >
              <TextField source="name" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="cameras" path="cameras">
        <SiteDescField prefix="Cameras in " source="name" />
        <ReferenceManyField
          reference="cameras"
          target="camerasBySite_id.site_id"
          filter={ {} }
          label=""
        >
          <Datagrid rowClick="show">
            <TextField source="name" />
            <NumberField source="latitude" />
            <NumberField source="longitude" />
            {/* <UrlField source="stream_url" label="Stream URL" /> */}
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="SOP" path="sop">
        <SiteDescField prefix="SOP for " source="name" />
        <ReferenceManyField
          reference="sopitems"
          target="sopitemsBySite_id.site_id"
          filter={ {} }
          label=""
        >
          <List
            filters={ <IncidentTypeFilter /> }
            bulkActionButtons={ false }
            exporter={ false }
          >
            <Datagrid rowClick="show">
              <TextField label="Activity" source="name" />
              <ReferenceField
                link="show"
                source="incident_type_id"
                reference="incidenttypes"
              >
                <ChipField source="name" />
              </ReferenceField>
            </Datagrid>
          </List>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
