/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      csid
      npid
      name
      description
      longitude
      latitude
      address
      customer_name
      createdAt
      updatedAt
    }
  }
`;
export const listSites = /* GraphQL */ `
  query ListSites(
    $id: ID
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSites(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        csid
        npid
        name
        description
        longitude
        latitude
        address
        customer_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIncident = /* GraphQL */ `
  query GetIncident($id: ID!) {
    getIncident(id: $id) {
      id
      description
      sensor_id {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      severity_type_id {
        id
        name
        description
        createdAt
        updatedAt
      }
      incident_type_id {
        id
        name
        description
        icon
        createdAt
        updatedAt
      }
      status_type_id {
        id
        name
        description
        order
        createdAt
        updatedAt
      }
      start_time
      end_time
      operator_id
      viewers
      comment
      videos
      detail
      sop_checked_items {
        items {
          id
          name
          site_id
          incident_type_id
          order
          createdAt
          updatedAt
          incidentSop_checked_itemsId
        }
        nextToken
      }
      siteID
      site_id {
        id
        csid
        npid
        name
        description
        longitude
        latitude
        address
        customer_name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      incidentSensor_idId
      incidentSeverity_type_idId
      incidentIncident_type_idId
      incidentStatus_type_idId
    }
  }
`;
export const listIncidents = /* GraphQL */ `
  query ListIncidents(
    $id: ID
    $filter: ModelIncidentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIncidents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        description
        sensor_id {
          id
          name
          sensor_type_id
          severity_type_id
          incident_type_id
          channel
          site_id
          nvr_id
          latitude
          longitude
          createdAt
          updatedAt
        }
        severity_type_id {
          id
          name
          description
          createdAt
          updatedAt
        }
        incident_type_id {
          id
          name
          description
          icon
          createdAt
          updatedAt
        }
        status_type_id {
          id
          name
          description
          order
          createdAt
          updatedAt
        }
        start_time
        end_time
        operator_id
        viewers
        comment
        videos
        detail
        sop_checked_items {
          nextToken
        }
        siteID
        site_id {
          id
          csid
          npid
          name
          description
          longitude
          latitude
          address
          customer_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        incidentSensor_idId
        incidentSeverity_type_idId
        incidentIncident_type_idId
        incidentStatus_type_idId
      }
      nextToken
    }
  }
`;
export const getSensor = /* GraphQL */ `
  query GetSensor($id: ID!) {
    getSensor(id: $id) {
      id
      name
      sensor_type_id
      severity_type_id
      incident_type_id
      channel
      site_id
      nvr_id
      latitude
      longitude
      cameras {
        items {
          id
          sensorId
          cameraId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSensors = /* GraphQL */ `
  query ListSensors(
    $id: ID
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSensors(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCamera = /* GraphQL */ `
  query GetCamera($id: ID!) {
    getCamera(id: $id) {
      id
      aid
      name
      latitude
      longitude
      site_id
      rtsp_stream
      rtsp_params
      sensors {
        items {
          id
          sensorId
          cameraId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCameras = /* GraphQL */ `
  query ListCameras(
    $id: ID
    $filter: ModelCameraFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCameras(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        aid
        name
        latitude
        longitude
        site_id
        rtsp_stream
        rtsp_params
        sensors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBypass = /* GraphQL */ `
  query GetBypass($id: ID!) {
    getBypass(id: $id) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const listBypasses = /* GraphQL */ `
  query ListBypasses(
    $id: ID
    $filter: ModelBypassFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBypasses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        site_id
        start_time
        end_time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      name
      position
      handphone
      incident_type_ids
      site_id
      createdAt
      updatedAt
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $id: ID
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContacts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        position
        handphone
        incident_type_ids
        site_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNvr = /* GraphQL */ `
  query GetNvr($id: ID!) {
    getNvr(id: $id) {
      id
      site_id
      url
      path
      auth
      createdAt
      updatedAt
    }
  }
`;
export const listNvrs = /* GraphQL */ `
  query ListNvrs(
    $id: ID
    $filter: ModelNvrFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNvrs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        site_id
        url
        path
        auth
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSopitem = /* GraphQL */ `
  query GetSopitem($id: ID!) {
    getSopitem(id: $id) {
      id
      name
      site_id
      incident_type_id
      order
      createdAt
      updatedAt
      incidentSop_checked_itemsId
    }
  }
`;
export const listSopitems = /* GraphQL */ `
  query ListSopitems(
    $id: ID
    $filter: ModelSopitemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSopitems(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        site_id
        incident_type_id
        order
        createdAt
        updatedAt
        incidentSop_checked_itemsId
      }
      nextToken
    }
  }
`;
export const getSopcheckeditem = /* GraphQL */ `
  query GetSopcheckeditem($id: ID!) {
    getSopcheckeditem(id: $id) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const listSopcheckeditems = /* GraphQL */ `
  query ListSopcheckeditems(
    $id: ID
    $filter: ModelSopcheckeditemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSopcheckeditems(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        sop_item_id
        incident_id
        checked
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCamerachecklist = /* GraphQL */ `
  query GetCamerachecklist($id: ID!) {
    getCamerachecklist(id: $id) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const listCamerachecklists = /* GraphQL */ `
  query ListCamerachecklists(
    $id: ID
    $filter: ModelCamerachecklistFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCamerachecklists(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        order
        camera_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIncidenttype = /* GraphQL */ `
  query GetIncidenttype($id: ID!) {
    getIncidenttype(id: $id) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const listIncidenttypes = /* GraphQL */ `
  query ListIncidenttypes(
    $id: ID
    $filter: ModelIncidenttypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIncidenttypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        icon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSensortype = /* GraphQL */ `
  query GetSensortype($id: ID!) {
    getSensortype(id: $id) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const listSensortypes = /* GraphQL */ `
  query ListSensortypes(
    $id: ID
    $filter: ModelSensortypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSensortypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        incident_type_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeveritytype = /* GraphQL */ `
  query GetSeveritytype($id: ID!) {
    getSeveritytype(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listSeveritytypes = /* GraphQL */ `
  query ListSeveritytypes(
    $id: ID
    $filter: ModelSeveritytypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSeveritytypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStatustype = /* GraphQL */ `
  query GetStatustype($id: ID!) {
    getStatustype(id: $id) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const listStatustypes = /* GraphQL */ `
  query ListStatustypes(
    $id: ID
    $filter: ModelStatustypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStatustypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIncidentviewer = /* GraphQL */ `
  query GetIncidentviewer($id: ID!) {
    getIncidentviewer(id: $id) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const listIncidentviewers = /* GraphQL */ `
  query ListIncidentviewers(
    $id: ID
    $filter: ModelIncidentviewerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIncidentviewers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        incident_id
        viewer_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIncidentchangelog = /* GraphQL */ `
  query GetIncidentchangelog($id: ID!) {
    getIncidentchangelog(id: $id) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const listIncidentchangelogs = /* GraphQL */ `
  query ListIncidentchangelogs(
    $id: ID
    $filter: ModelIncidentchangelogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIncidentchangelogs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        incident_id
        user_id
        field
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNeatpatrolnotes = /* GraphQL */ `
  query GetNeatpatrolnotes($id: ID!) {
    getNeatpatrolnotes(id: $id) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const listNeatpatrolnotes = /* GraphQL */ `
  query ListNeatpatrolnotes(
    $id: ID
    $filter: ModelNeatpatrolnotesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNeatpatrolnotes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        incident_id
        timestamp
        details
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCamSensors = /* GraphQL */ `
  query GetCamSensors($id: ID!) {
    getCamSensors(id: $id) {
      id
      sensorId
      cameraId
      sensor {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      camera {
        id
        aid
        name
        latitude
        longitude
        site_id
        rtsp_stream
        rtsp_params
        sensors {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCamSensors = /* GraphQL */ `
  query ListCamSensors(
    $filter: ModelCamSensorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCamSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sensorId
        cameraId
        sensor {
          id
          name
          sensor_type_id
          severity_type_id
          incident_type_id
          channel
          site_id
          nvr_id
          latitude
          longitude
          createdAt
          updatedAt
        }
        camera {
          id
          aid
          name
          latitude
          longitude
          site_id
          rtsp_stream
          rtsp_params
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const incidentsBySite_id = /* GraphQL */ `
  query IncidentsBySite_id(
    $siteID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIncidentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    incidentsBySite_id(
      siteID: $siteID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        sensor_id {
          id
          name
          sensor_type_id
          severity_type_id
          incident_type_id
          channel
          site_id
          nvr_id
          latitude
          longitude
          createdAt
          updatedAt
        }
        severity_type_id {
          id
          name
          description
          createdAt
          updatedAt
        }
        incident_type_id {
          id
          name
          description
          icon
          createdAt
          updatedAt
        }
        status_type_id {
          id
          name
          description
          order
          createdAt
          updatedAt
        }
        start_time
        end_time
        operator_id
        viewers
        comment
        videos
        detail
        sop_checked_items {
          nextToken
        }
        siteID
        site_id {
          id
          csid
          npid
          name
          description
          longitude
          latitude
          address
          customer_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        incidentSensor_idId
        incidentSeverity_type_idId
        incidentIncident_type_idId
        incidentStatus_type_idId
      }
      nextToken
    }
  }
`;
export const sensorsByName = /* GraphQL */ `
  query SensorsByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sensorsByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const sensorsBySensor_type_id = /* GraphQL */ `
  query SensorsBySensor_type_id(
    $sensor_type_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sensorsBySensor_type_id(
      sensor_type_id: $sensor_type_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const sensorsBySite_id = /* GraphQL */ `
  query SensorsBySite_id(
    $site_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sensorsBySite_id(
      site_id: $site_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        sensor_type_id
        severity_type_id
        incident_type_id
        channel
        site_id
        nvr_id
        latitude
        longitude
        cameras {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const camerasByName = /* GraphQL */ `
  query CamerasByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCameraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    camerasByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aid
        name
        latitude
        longitude
        site_id
        rtsp_stream
        rtsp_params
        sensors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const camerasBySite_id = /* GraphQL */ `
  query CamerasBySite_id(
    $site_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCameraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    camerasBySite_id(
      site_id: $site_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aid
        name
        latitude
        longitude
        site_id
        rtsp_stream
        rtsp_params
        sensors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bypassBySite_id = /* GraphQL */ `
  query BypassBySite_id(
    $site_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBypassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bypassBySite_id(
      site_id: $site_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        site_id
        start_time
        end_time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const contactBySite_id = /* GraphQL */ `
  query ContactBySite_id(
    $site_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactBySite_id(
      site_id: $site_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        position
        handphone
        incident_type_ids
        site_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const sopitemsByName = /* GraphQL */ `
  query SopitemsByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSopitemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sopitemsByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        site_id
        incident_type_id
        order
        createdAt
        updatedAt
        incidentSop_checked_itemsId
      }
      nextToken
    }
  }
`;
export const sopitemsBySiteByIncident_type = /* GraphQL */ `
  query SopitemsBySiteByIncident_type(
    $site_id: ID!
    $incident_type_id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSopitemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sopitemsBySiteByIncident_type(
      site_id: $site_id
      incident_type_id: $incident_type_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        site_id
        incident_type_id
        order
        createdAt
        updatedAt
        incidentSop_checked_itemsId
      }
      nextToken
    }
  }
`;
export const sopcheckedItemsByIncident_id = /* GraphQL */ `
  query SopcheckedItemsByIncident_id(
    $incident_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSopcheckeditemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sopcheckedItemsByIncident_id(
      incident_id: $incident_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sop_item_id
        incident_id
        checked
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const viewersByIncident_id = /* GraphQL */ `
  query ViewersByIncident_id(
    $incident_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIncidentviewerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    viewersByIncident_id(
      incident_id: $incident_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        incident_id
        viewer_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const logsByIncident_id = /* GraphQL */ `
  query LogsByIncident_id(
    $incident_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIncidentchangelogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    logsByIncident_id(
      incident_id: $incident_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        incident_id
        user_id
        field
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const neatpatrolnotesByIncident_id = /* GraphQL */ `
  query NeatpatrolnotesByIncident_id(
    $incident_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNeatpatrolnotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    neatpatrolnotesByIncident_id(
      incident_id: $incident_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        incident_id
        timestamp
        details
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const camSensorsBySensorId = /* GraphQL */ `
  query CamSensorsBySensorId(
    $sensorId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCamSensorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    camSensorsBySensorId(
      sensorId: $sensorId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sensorId
        cameraId
        sensor {
          id
          name
          sensor_type_id
          severity_type_id
          incident_type_id
          channel
          site_id
          nvr_id
          latitude
          longitude
          createdAt
          updatedAt
        }
        camera {
          id
          aid
          name
          latitude
          longitude
          site_id
          rtsp_stream
          rtsp_params
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const camSensorsByCameraId = /* GraphQL */ `
  query CamSensorsByCameraId(
    $cameraId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCamSensorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    camSensorsByCameraId(
      cameraId: $cameraId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sensorId
        cameraId
        sensor {
          id
          name
          sensor_type_id
          severity_type_id
          incident_type_id
          channel
          site_id
          nvr_id
          latitude
          longitude
          createdAt
          updatedAt
        }
        camera {
          id
          aid
          name
          latitude
          longitude
          site_id
          rtsp_stream
          rtsp_params
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
