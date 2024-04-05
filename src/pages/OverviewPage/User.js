/* eslint-disable camelcase */
// @flow

import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import UserNotFoundIcon from "~/components/UserNotFoundIcon";

type UserProps = {
  Attributes: any,
  Username: string,
};

const User = (props: { user?: UserProps, id: string }) => {
  const { user, id } = props;
  const { Username = "", Attributes = {} } = user;
  const email = Attributes.filter((att) => att.Name == "email")[0].Value;
  if (user) {
    return (
      <Tooltip title={email}>
        <span>{Username || email}</span>
      </Tooltip>
    );
  }

  return <UserNotFoundIcon id={id} />;
};

User.defaultProps = {
  user: undefined,
};

export default User;
