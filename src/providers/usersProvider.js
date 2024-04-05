/* eslint-disable no-underscore-dangle */

import _ from "lodash";
import { API } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";
const USERS_API = process.env.USERS_API || "";

const filterUsers = (users, filters) => {
  let result = [...users];

  Object.entries(filters).forEach(([field, filterOptions]) => {
    if (filterOptions._ilike) {
      const filterRegex = new RegExp(filterOptions._ilike.replace(/%/g, ".*"));
      result = users.filter((user) => filterRegex.test(user[field]));
    }
  });

  return result;
};

const getUserApiTypes = (params) => ({
  // 200
  GET_LIST: {
    urlPath: "/",
    method: "GET",
    onSuccess: (response) => {
      const { filter, sort, pagination } = params;
      const userList =
        response?.users?.map((user) => ({ ...user, id: user.uid })) || [];
      // filter
      const filteredUserList = filterUsers(userList, filter);
      // sort
      const sortedUserList = _.orderBy(
        filteredUserList,
        [sort.field],
        [sort.order.toLowerCase()]
      );
      // pagination
      const pageStartIndex = (pagination.page - 1) * pagination.perPage;
      const pageUserList = sortedUserList.slice(
        pageStartIndex,
        pageStartIndex + pagination.perPage
      );
      return { data: pageUserList, total: filteredUserList.length };
    },
  },
  // 200
  GET_ONE: {
    urlPath: `/${params.id}`,
    method: "GET",
    onSuccess: (response) => ({
      data: { ...response?.user, id: response?.user.uid },
    }),
  },
  // 201
  CREATE: {
    urlPath: "/",
    method: "POST",
    onSuccess: (response) => ({ data: { ...params.data, id: response.uid } }),
  },
  // 204
  UPDATE: {
    urlPath: `/${params.id}`,
    method: "PATCH",
    onSuccess: () => ({ data: params.data }),
  },
  // 204
  DELETE: {
    urlPath: `/${params.id}`,
    method: "DELETE",
    onSuccess: () => ({ data: { id: params.id } }),
  },
});
export const telegramProvider = async (path, params) => {
  const token = `${(await Auth.currentSession())
    .getAccessToken()
    .getJwtToken()}`;

  const init = {
    queryStringParameters: params,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return API.get("telegrambotapi", path, init).then((response) => {
    if (!response) throw new Error("Server failed");
    return response;
  });
};

const usersProvider = async (path, params) => {
  const token = `${(await Auth.currentSession())
    .getAccessToken()
    .getJwtToken()}`;
  if (path == "/changePassword") {
    params = { ...params, accessToken: token };
  }

  const init = {
    queryStringParameters: params,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return API.get("AdminQueries", path, init).then((response) => {
    if (!response) throw new Error("Server failed");
    return response;
  });
};

export default usersProvider;
