// @flow

import { fetchUtils } from "react-admin";
import usersProvider from "./usersProvider";

const httpClient = (url, opt = {}) =>
  authProvider.getJWTToken().then((JWT) => {
    const options = {
      headers: new Headers({ Accept: "application/json" }),
      ...opt,
    };

    // add your own headers here
    options.headers.set("Authorization", `Bearer ${JWT}`);
    return fetchUtils.fetchJson(url, options);
  });

const dataProvider = (type, resource, params) => {
  if (resource === "users") {
    return usersProvider(type, resource, params);
  }
};

export default dataProvider;
