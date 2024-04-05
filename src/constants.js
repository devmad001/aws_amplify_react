module.exports = {
  STATUS_TYPES: {
    OPEN: {
      ID: 1,
      NAME: "Open",
      ORDER: 1,
      COLOR: "#ef5350",
    },
    NOT_DETECTED: {
      ID: 2,
      NAME: "Not Detected",
      ORDER: 2,
      COLOR: "#ffa726",
    },
    CLEARED: {
      ID: 3,
      NAME: "Cleared",
      ORDER: 4,
      COLOR: "#26a69a",
    },
    PENDING_AAR: {
      ID: 4,
      NAME: "Pending AAR",
      ORDER: 3,
      COLOR: "#F6366C",
    },
  },
  SEVERITY_TYPES: {
    LOW: {
      ID: "LOW",
      NAME: "Low",
      ORDER: 1,
      COLOR: "#06B0F1",
    },
    MID: {
      ID: "MID",
      NAME: "Mid",
      ORDER: 2,
      COLOR: "#7030A0",
    },
    HIGH: {
      ID: "HIGH",
      NAME: "High",
      ORDER: 3,
      COLOR: "#ED7D31",
    },
    PRIORITY: {
      ID: "PRIORITY",
      NAME: "Priority",
      ORDER: 4,
      COLOR: "#FE0100",
    },
    NORMAL: {
      ID: "NORMAL",
      NAME: "Normal",
      ORDER: 5,
      COLOR: "#71AD46",
    },
  },
  USER_ROLES: {
    SUPERVISOR: "superadmin",
    OPERATOR: "operator",
    CUSTOMER: "customer",
  },
  INCIDENT_TYPE: {
    FIRE: 2,
    VA: 3,
  },
};
