// @flow

import React from 'react';
import {
  FunctionField,
  List,
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
} from 'react-admin';

import Paper from '@material-ui/core/Paper';

import Map from '~/components/Map';
import LiveVideoPlayer from '~/components/LiveVideoPlayer';
import Checklists from './Checklists';
import Sensors from './Sensors';

const VIRTUAL_PATROL = String( process.env.VIRTUAL_PATROL ).toLowerCase() === 'true';

export default ( props: List ) => (
  <Show { ...props }>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField source="name" />
        <ReferenceField
          link="show"
          source="site_id"
          reference="sites"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField
          source="aid"
          label="Asset Id"
        />
        <UrlField
          source="rtsp_stream"
          label="RTSP Stream"
        />
        <TextField
          source="rtsp_params"
          label="RTSP Params"
        />
        <FunctionField
          label=" "
          render={ record => (
            <Paper style={ { width: 400, overflow: 'hidden' } }>
              <LiveVideoPlayer
                id={ record.id }
                name={ record.name }
                url={ record.rtsp_stream }
                params={ record.rtsp_params }
              />
            </Paper>
          ) }
        />
        <FunctionField
          label="Location"
          render={ record => (
            <Paper style={ { width: 400, overflow: 'hidden' } }>
              <Map latitude={ record.latitude } longitude={ record.longitude } />
            </Paper>
          ) }
        />
      </Tab>
      <Tab label="Sensors" path="sensors">
        <FunctionField
          label=" "
          render={ record => (
            <Sensors camera_id={ record.id } site_id={ record.site_id } />
          ) }
        />
      </Tab>
      {
        VIRTUAL_PATROL && (
        <Tab label="VP Checklists" path="vp_checklists">
          <FunctionField
            label=" "
            render={ record => (
              <Checklists camera_id={ record.id } />
            ) }
          />
        </Tab>
        )
      }
    </TabbedShowLayout>
  </Show>
);
