/* eslint-disable camelcase */
// @flow

import React from "react";
import {
  Edit,
  List,
  SimpleForm,
  TextInput,
  FormDataConsumer,
  CheckboxGroupInput,
  SaveButton,
  Toolbar,
  NumberField,
} from "react-admin";

import SOP_ITEMS from "./queries/SOP_ITEMS.graphql";
import SubHeader from "~/components/SubHeader";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export default (props: List) => {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <NumberField label="No." source="id" />
        {/* <ReferenceField
          link=""
          label="Type"
          source="incident_type_id"
          reference="incidenttypes"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          link="show"
          source="site_id"
          reference="sites"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          link=""
          label="Severity"
          source="severity_type_id"
          reference="severity_types"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField
          source="start_time"
          showTime
        />
        <DateField
          source="end_time"
          showTime
        />
        <ReferenceField
          link=""
          label="Action Taken"
          source="status_type_id"
          reference="status_types"
        >
          <TextField source="name" />
        </ReferenceField> */}
        <TextInput source="comment" />
        <SubHeader style={{ marginTop: 20 }}>SOP</SubHeader>
        <FormDataConsumer>
          {({ formData: { site_id, incident_type_id } }) => {
            const hasSiteNType = site_id && incident_type_id;
            return (
              <CheckboxGroupInput
                source="sop"
                label=""
                row={false}
                optionText={(d) => `${d.index}    ${d.name}`}
                choices={
                  hasSiteNType
                    ? data.sop_items
                        .filter(
                          (s) =>
                            s.site_id === site_id &&
                            s.incident_type_id === incident_type_id
                        )
                        .map((s, index) => ({
                          ...s,
                          index: index + 1,
                        }))
                    : []
                }
              />
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
