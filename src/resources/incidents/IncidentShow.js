// @flow

import React from "react";
import {
  DateField,
  List,
  NumberField,
  ReferenceField,
  TabbedShowLayout,
  Tab,
  Show,
  TextField,
  FunctionField,
} from "react-admin";

import useRole from "../../helpers/useRole";
import SopField from "./fields/SopField";
import CommentField from "./fields/CommentField";
import Changelogs from "./fields/Changelogs";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
export default (props: List) => {
  //  const { role, loading: roleLoading } = useRole();
  //  if ( roleLoading ) return null;

  // const isEditable = role === 'supervisor';

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <NumberField label="No." source="id" />
          <ReferenceField link="" source="siteID" reference="sites">
            <TextField source="csid" />
          </ReferenceField>
          <ReferenceField
            link=""
            label="Type"
            source="incidentIncident_type_idId"
            reference="incidenttypes">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField link="" source="siteID" reference="sites">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="start_time" label="Date Time" showTime />
          <ReferenceField
            link=""
            label="Action Taken"
            source="incidentStatus_type_idId"
            reference="statustypes">
            <TextField source="name" />
          </ReferenceField>
        </Tab>
        <Tab label="Comment" path="comment">
          <FunctionField
            label=" "
            render={(record) => <CommentField incident_id={record.id} />}
          />
        </Tab>
        <Tab label="SOP" path="sop">
          <FunctionField
            label=" "
            render={(record) => (
              <SopField
                incident_id={record.id}
                incident_type_id={record.incident_type_id.id}
                site_id={record.site_id.id}
                clickable={true}
              />
            )}
          />
        </Tab>
        <Tab label="Changelogs" path="changelogs">
          <FunctionField
            label=" "
            render={(record) => <Changelogs incident_id={record.id} />}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
