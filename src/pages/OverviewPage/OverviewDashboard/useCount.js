import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import {
  listIncidents,
  listStatustypes,
  listSeveritytypes,
} from "../../../graphql/queries";
import { STATUS_TYPES } from "../../../constants";
const countWithinToday = (list) => {
  const startDayUnix = moment().startOf("day").unix();
  const endDayUnix = moment().endOf("day").unix();

  const result = list.filter(({ start_time: startTime }) => {
    const startTimeUnix = moment(startTime).unix();
    return startDayUnix <= startTimeUnix && startTimeUnix <= endDayUnix;
  });

  return result.length;
};

export default () => {
  const [statustype, setStatustype] = useState("");
  const [severitytype, setSeveritytype] = useState("");
  const [pastIncidents, setPastIncidents] = useState([]);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [attendNowResult, setAttendNowResult] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const {
        data: { listStatustypes: { items = [] } = {} },
      } = await API.graphql({
        query: listStatustypes,
        variables: { filter: { name: { eq: STATUS_TYPES.OPEN.NAME } } },
      });

      if (!items.length) return null;
      setStatustype(items[0].id);

      const {
        data: { listSeveritytypes: { items: severitytypesitems = [] } = {} },
      } = await API.graphql({
        query: listSeveritytypes,
        variables: { filter: { name: { eq: "Attend Now" } } },
      });
      if (!severitytypesitems.length) setSeveritytype(severitytypesitems[0].id);

      const {
        data: { listIncidents: { items: listIncidentItems = [] } = {} },
      } = await API.graphql({
        query: listIncidents,
        variables: {
          filter: { incidentStatus_type_idId: { eq: items[0].id } },
        },
      });
      setActiveIncidents(listIncidentItems);
      const {
        data: { listIncidents: { items: listpastIncidentItems = [] } = {} },
      } = await API.graphql({
        query: listIncidents,
        variables: {
          filter: { incidentStatus_type_idId: { ne: items[0].id } },
        },
      });

      setPastIncidents(listpastIncidentItems);

      const {
        data: { listIncidents: { items: listattendIncidentItems = [] } = {} },
      } = await API.graphql({
        query: listIncidents,
        variables: {
          filter: {
            and: {
              incidentSeverity_type_idId: { eq: severitytypesitems[0].id },
              incidentStatus_type_idId: { eq: items[0].id },
            },
          },
        },
      });

      setAttendNowResult(listattendIncidentItems);
      setLoading(false);
    }
    fetchData();
  }, []);
  // const { data: attendNowResult, loading: attendNowLoading } = useSubscription(
  //   SUBSCRIPTION_ATTEND_NOW
  // );
  // const { data: activeResult, loading: activeLoading } =
  //   useSubscription(SUBSCRIPTION_ACTIVE);
  // const { data: pastResult, loading: pastLoading } =
  //   useSubscription(SUBSCRIPTION_PAST);

  if (loading) {
    return {
      attendNowCount: 0,
      activeCount: 0,
      pastCount: 0,
    };
  }

  return {
    attendNowCount: countWithinToday(attendNowResult),
    activeCount: countWithinToday(activeIncidents),
    pastCount: countWithinToday(pastIncidents),
  };
};
