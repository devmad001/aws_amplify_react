// @flow

import React from "react";
import { Create, List, SimpleForm, TextInput } from "react-admin";

export default (props: List) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="icon" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Create>
);
