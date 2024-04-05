/* eslint-disable camelcase */
// @flow

import React, { useCallback, useEffect, useState } from "react";
import {
  Create,
  DateTimeInput,
  List,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  FormTab,
  TextInput,
  FormDataConsumer,
  CheckboxGroupInput,
  FileInput,
  FileField,
  required,
  Toolbar,
  SaveButton,
  useRedirect,
  useNotify,
} from "react-admin";
import { API, graphqlOperation } from "aws-amplify";
// import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";

// import useUsers from "../../helpers/useUsers";
// import INSERT_INCIDENT from "./mutations/INSERT_INCIDENT.graphql";
// import CREATE_STATUS_TYPES from "./queries/CREATE_STATUS_TYPES.graphql";
// import MAX_INCIDENT_ID from "./subscriptions/MAX_INCIDENT_ID.graphql";
// import SOP_ITEMS from "./queries/SOP_ITEMS.graphql";
import SubHeader from "~/components/SubHeader";
import { listSopitems } from "../../graphql/queries";
import {
  createIncident,
  createSopcheckeditem,
  createIncidentviewer,
} from "../../graphql/mutations";

const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || "";

const VIRTUAL_PATROL =
  String(process.env.VIRTUAL_PATROL).toLowerCase() === "true";

const uploadVideo = (incidentId, file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("incidentId", String(incidentId));

    fetch(`${VIDEO_DOWNLOAD_ADDRESS}/video`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        resolve(result.filename);
      })
      .catch(reject);
  });

const insertIncident = async (object, notify, redirect) => {
  let viewers = [];
  viewers.push(object.operator_id);

  const { sop_checked_items, ...rest } = object;

  API.graphql(
    graphqlOperation(createIncident, {
      input: { ...rest, viewers },
    })
  )
    .then(async ({ data }) => {
      const incident_id = data.createIncident.id;

      redirect("/");
      sop_checked_items.map(async (item) => {
        await API.graphql(
          graphqlOperation(createSopcheckeditem, {
            input: { incident_id, sop_item_id: item.id, checked: true },
          })
        );
      });
      notify("Changes saved", "success");
      window.open(
        `/#/incident/${incident_id}/report`,
        "Incident Report",
        "toolbar=0,menubar=0"
      );
    })
    .catch((e) => {
      console.log("error", e);
      notify("Could not save report", "warning");
    });
};

const validate = (values) => {
  const errors = {};
  if (values.start_time && values.end_time) {
    const start = new Date(values.start_time).getTime();
    const end = new Date(values.end_time).getTime();
    if (start > end) errors.end_time = "This should be later than Start Time";
  }
  return errors;
};

export default (props: List) => {
  // const { data, loading } = useQuery(SOP_ITEMS);
  // const { data: statusData, loading: statusLoading } =
  //   useQuery(CREATE_STATUS_TYPES);
  // const [{ data: usersData, loading: usersLoading }] = useUsers();

  // if (loading || usersLoading || statusLoading) return null;

  const [sopitems, setSopitems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, loading } = await API.graphql(
        graphqlOperation(listSopitems)
      );
      if (data.listSopitems) setSopitems(data.listSopitems.items);
    }
    fetchData();
  }, []);
  const CustomSaveButton = (props) => {
    const redirect = useRedirect();
    const notify = useNotify();

    const handleSave = useCallback(
      (values) => {
        const { sop = [], raw_videos, ...rest } = values;
        let sop_checked_items = [];
        if (sop.length) {
          sop_checked_items = sopitems.filter((item) => sop.includes(item.id));
        }

        const data = {
          ...rest,
          sop_checked_items,
        };

        if (Array.isArray(raw_videos) && raw_videos.length) {
          const vidPromises = raw_videos.map((v) => uploadVideo(id, v.rawFile));
          Promise.all(vidPromises).then((videos) => {
            insertIncident({ ...data, videos }, notify, redirect);
          });
        } else {
          insertIncident(data, notify, redirect);
        }
      },
      [notify, redirect]
    );

    return <SaveButton {...props} onSave={handleSave} />;
  };

  const PostCreateToolbar = (props) => (
    <Toolbar {...props}>
      <CustomSaveButton />
    </Toolbar>
  );

  return (
    <Create {...props}>
      <TabbedForm validate={validate} toolbar={<PostCreateToolbar />}>
        <FormTab label="Incident">
          <ReferenceInput
            source="siteID"
            reference="sites"
            sort={{ field: "name", order: "ASC" }}
            validate={required()}>
            <SelectInput optionText="name" />
          </ReferenceInput>
          <ReferenceInput
            label="Incident Type"
            source="incidentIncident_type_idId"
            reference="incidenttypes"
            sort={{ field: "name", order: "ASC" }}
            validate={required()}>
            <SelectInput optionText="name" />
          </ReferenceInput>
          <FormDataConsumer>
            {({ formData: { siteID, incidentIncident_type_idId } }) => (
              <ReferenceInput
                source="sensor_id"
                reference="sensors"
                sort={{ field: "name", order: "ASC" }}
                disabled={!siteID || !incidentIncident_type_idId}
                filter={{}}
                style={{ width: 256 }}
                validate={required()}>
                <SelectInput optionText="name" />
              </ReferenceInput>
            )}
          </FormDataConsumer>
          <ReferenceInput
            label="Severity"
            source="incidentSeverity_type_idId"
            reference="severitytypes"
            sort={{ field: "order", order: "ASC" }}
            validate={required()}>
            <SelectInput optionText="name" />
          </ReferenceInput>
          <DateTimeInput label="Start Time" source="start_time" />
          <DateTimeInput label="End Time" source="end_time" />
        </FormTab>
        <FormTab label="Videos">
          <FileInput source="raw_videos" label="" accept="video/*" multiple>
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>
        <FormTab label="Action">
          <ReferenceInput
            label="Operator"
            source="operator_id"
            reference="cognitoUsers"
            validate={required()}>
            <SelectInput optionText="id" />
          </ReferenceInput>
          <ReferenceInput
            label="Action Taken"
            source="incidentStatus_type_idId"
            reference="statustypes"
            validate={required()}>
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="comment" multiline />
          <SubHeader style={{ marginTop: 20 }}>SOP</SubHeader>
          <FormDataConsumer>
            {({ formData: { siteID, incidentIncident_type_idId } }) => {
              const hasSiteNType = siteID && incidentIncident_type_idId;
              return (
                <CheckboxGroupInput
                  source="sop"
                  label=" "
                  row={false}
                  optionText={({ index, name }) => `${index + 1} \t ${name}`}
                  choices={
                    hasSiteNType
                      ? sopitems
                          .filter(
                            (s) =>
                              s.site_id === siteID &&
                              s.incident_type_id === incidentIncident_type_idId
                          )
                          .map((s, index) => ({
                            ...s,
                            index,
                          }))
                      : []
                  }
                />
              );
            }}
          </FormDataConsumer>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
