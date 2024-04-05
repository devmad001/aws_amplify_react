/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSite = /* GraphQL */ `
  subscription OnCreateSite($filter: ModelSubscriptionSiteFilterInput) {
    onCreateSite(filter: $filter) {
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
export const onUpdateSite = /* GraphQL */ `
  subscription OnUpdateSite($filter: ModelSubscriptionSiteFilterInput) {
    onUpdateSite(filter: $filter) {
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
export const onDeleteSite = /* GraphQL */ `
  subscription OnDeleteSite($filter: ModelSubscriptionSiteFilterInput) {
    onDeleteSite(filter: $filter) {
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
export const onCreateIncident = /* GraphQL */ `
  subscription OnCreateIncident($filter: ModelSubscriptionIncidentFilterInput) {
    onCreateIncident(filter: $filter) {
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
export const onUpdateIncident = /* GraphQL */ `
  subscription OnUpdateIncident($filter: ModelSubscriptionIncidentFilterInput) {
    onUpdateIncident(filter: $filter) {
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
export const onDeleteIncident = /* GraphQL */ `
  subscription OnDeleteIncident($filter: ModelSubscriptionIncidentFilterInput) {
    onDeleteIncident(filter: $filter) {
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
export const onCreateSensor = /* GraphQL */ `
  subscription OnCreateSensor($filter: ModelSubscriptionSensorFilterInput) {
    onCreateSensor(filter: $filter) {
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
export const onUpdateSensor = /* GraphQL */ `
  subscription OnUpdateSensor($filter: ModelSubscriptionSensorFilterInput) {
    onUpdateSensor(filter: $filter) {
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
export const onDeleteSensor = /* GraphQL */ `
  subscription OnDeleteSensor($filter: ModelSubscriptionSensorFilterInput) {
    onDeleteSensor(filter: $filter) {
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
export const onCreateCamera = /* GraphQL */ `
  subscription OnCreateCamera($filter: ModelSubscriptionCameraFilterInput) {
    onCreateCamera(filter: $filter) {
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
export const onUpdateCamera = /* GraphQL */ `
  subscription OnUpdateCamera($filter: ModelSubscriptionCameraFilterInput) {
    onUpdateCamera(filter: $filter) {
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
export const onDeleteCamera = /* GraphQL */ `
  subscription OnDeleteCamera($filter: ModelSubscriptionCameraFilterInput) {
    onDeleteCamera(filter: $filter) {
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
export const onCreateBypass = /* GraphQL */ `
  subscription OnCreateBypass($filter: ModelSubscriptionBypassFilterInput) {
    onCreateBypass(filter: $filter) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBypass = /* GraphQL */ `
  subscription OnUpdateBypass($filter: ModelSubscriptionBypassFilterInput) {
    onUpdateBypass(filter: $filter) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBypass = /* GraphQL */ `
  subscription OnDeleteBypass($filter: ModelSubscriptionBypassFilterInput) {
    onDeleteBypass(filter: $filter) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
    onCreateContact(filter: $filter) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
    onUpdateContact(filter: $filter) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
    onDeleteContact(filter: $filter) {
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
export const onCreateNvr = /* GraphQL */ `
  subscription OnCreateNvr($filter: ModelSubscriptionNvrFilterInput) {
    onCreateNvr(filter: $filter) {
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
export const onUpdateNvr = /* GraphQL */ `
  subscription OnUpdateNvr($filter: ModelSubscriptionNvrFilterInput) {
    onUpdateNvr(filter: $filter) {
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
export const onDeleteNvr = /* GraphQL */ `
  subscription OnDeleteNvr($filter: ModelSubscriptionNvrFilterInput) {
    onDeleteNvr(filter: $filter) {
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
export const onCreateSopitem = /* GraphQL */ `
  subscription OnCreateSopitem($filter: ModelSubscriptionSopitemFilterInput) {
    onCreateSopitem(filter: $filter) {
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
export const onUpdateSopitem = /* GraphQL */ `
  subscription OnUpdateSopitem($filter: ModelSubscriptionSopitemFilterInput) {
    onUpdateSopitem(filter: $filter) {
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
export const onDeleteSopitem = /* GraphQL */ `
  subscription OnDeleteSopitem($filter: ModelSubscriptionSopitemFilterInput) {
    onDeleteSopitem(filter: $filter) {
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
export const onCreateSopcheckeditem = /* GraphQL */ `
  subscription OnCreateSopcheckeditem(
    $filter: ModelSubscriptionSopcheckeditemFilterInput
  ) {
    onCreateSopcheckeditem(filter: $filter) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSopcheckeditem = /* GraphQL */ `
  subscription OnUpdateSopcheckeditem(
    $filter: ModelSubscriptionSopcheckeditemFilterInput
  ) {
    onUpdateSopcheckeditem(filter: $filter) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSopcheckeditem = /* GraphQL */ `
  subscription OnDeleteSopcheckeditem(
    $filter: ModelSubscriptionSopcheckeditemFilterInput
  ) {
    onDeleteSopcheckeditem(filter: $filter) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCamerachecklist = /* GraphQL */ `
  subscription OnCreateCamerachecklist(
    $filter: ModelSubscriptionCamerachecklistFilterInput
  ) {
    onCreateCamerachecklist(filter: $filter) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCamerachecklist = /* GraphQL */ `
  subscription OnUpdateCamerachecklist(
    $filter: ModelSubscriptionCamerachecklistFilterInput
  ) {
    onUpdateCamerachecklist(filter: $filter) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCamerachecklist = /* GraphQL */ `
  subscription OnDeleteCamerachecklist(
    $filter: ModelSubscriptionCamerachecklistFilterInput
  ) {
    onDeleteCamerachecklist(filter: $filter) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateIncidenttype = /* GraphQL */ `
  subscription OnCreateIncidenttype(
    $filter: ModelSubscriptionIncidenttypeFilterInput
  ) {
    onCreateIncidenttype(filter: $filter) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateIncidenttype = /* GraphQL */ `
  subscription OnUpdateIncidenttype(
    $filter: ModelSubscriptionIncidenttypeFilterInput
  ) {
    onUpdateIncidenttype(filter: $filter) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteIncidenttype = /* GraphQL */ `
  subscription OnDeleteIncidenttype(
    $filter: ModelSubscriptionIncidenttypeFilterInput
  ) {
    onDeleteIncidenttype(filter: $filter) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSensortype = /* GraphQL */ `
  subscription OnCreateSensortype(
    $filter: ModelSubscriptionSensortypeFilterInput
  ) {
    onCreateSensortype(filter: $filter) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSensortype = /* GraphQL */ `
  subscription OnUpdateSensortype(
    $filter: ModelSubscriptionSensortypeFilterInput
  ) {
    onUpdateSensortype(filter: $filter) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSensortype = /* GraphQL */ `
  subscription OnDeleteSensortype(
    $filter: ModelSubscriptionSensortypeFilterInput
  ) {
    onDeleteSensortype(filter: $filter) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSeveritytype = /* GraphQL */ `
  subscription OnCreateSeveritytype(
    $filter: ModelSubscriptionSeveritytypeFilterInput
  ) {
    onCreateSeveritytype(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSeveritytype = /* GraphQL */ `
  subscription OnUpdateSeveritytype(
    $filter: ModelSubscriptionSeveritytypeFilterInput
  ) {
    onUpdateSeveritytype(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSeveritytype = /* GraphQL */ `
  subscription OnDeleteSeveritytype(
    $filter: ModelSubscriptionSeveritytypeFilterInput
  ) {
    onDeleteSeveritytype(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStatustype = /* GraphQL */ `
  subscription OnCreateStatustype(
    $filter: ModelSubscriptionStatustypeFilterInput
  ) {
    onCreateStatustype(filter: $filter) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatustype = /* GraphQL */ `
  subscription OnUpdateStatustype(
    $filter: ModelSubscriptionStatustypeFilterInput
  ) {
    onUpdateStatustype(filter: $filter) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatustype = /* GraphQL */ `
  subscription OnDeleteStatustype(
    $filter: ModelSubscriptionStatustypeFilterInput
  ) {
    onDeleteStatustype(filter: $filter) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const onCreateIncidentviewer = /* GraphQL */ `
  subscription OnCreateIncidentviewer(
    $filter: ModelSubscriptionIncidentviewerFilterInput
  ) {
    onCreateIncidentviewer(filter: $filter) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateIncidentviewer = /* GraphQL */ `
  subscription OnUpdateIncidentviewer(
    $filter: ModelSubscriptionIncidentviewerFilterInput
  ) {
    onUpdateIncidentviewer(filter: $filter) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteIncidentviewer = /* GraphQL */ `
  subscription OnDeleteIncidentviewer(
    $filter: ModelSubscriptionIncidentviewerFilterInput
  ) {
    onDeleteIncidentviewer(filter: $filter) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateIncidentchangelog = /* GraphQL */ `
  subscription OnCreateIncidentchangelog(
    $filter: ModelSubscriptionIncidentchangelogFilterInput
  ) {
    onCreateIncidentchangelog(filter: $filter) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateIncidentchangelog = /* GraphQL */ `
  subscription OnUpdateIncidentchangelog(
    $filter: ModelSubscriptionIncidentchangelogFilterInput
  ) {
    onUpdateIncidentchangelog(filter: $filter) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteIncidentchangelog = /* GraphQL */ `
  subscription OnDeleteIncidentchangelog(
    $filter: ModelSubscriptionIncidentchangelogFilterInput
  ) {
    onDeleteIncidentchangelog(filter: $filter) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNeatpatrolnotes = /* GraphQL */ `
  subscription OnCreateNeatpatrolnotes(
    $filter: ModelSubscriptionNeatpatrolnotesFilterInput
  ) {
    onCreateNeatpatrolnotes(filter: $filter) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNeatpatrolnotes = /* GraphQL */ `
  subscription OnUpdateNeatpatrolnotes(
    $filter: ModelSubscriptionNeatpatrolnotesFilterInput
  ) {
    onUpdateNeatpatrolnotes(filter: $filter) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNeatpatrolnotes = /* GraphQL */ `
  subscription OnDeleteNeatpatrolnotes(
    $filter: ModelSubscriptionNeatpatrolnotesFilterInput
  ) {
    onDeleteNeatpatrolnotes(filter: $filter) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCamSensors = /* GraphQL */ `
  subscription OnCreateCamSensors(
    $filter: ModelSubscriptionCamSensorsFilterInput
  ) {
    onCreateCamSensors(filter: $filter) {
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
export const onUpdateCamSensors = /* GraphQL */ `
  subscription OnUpdateCamSensors(
    $filter: ModelSubscriptionCamSensorsFilterInput
  ) {
    onUpdateCamSensors(filter: $filter) {
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
export const onDeleteCamSensors = /* GraphQL */ `
  subscription OnDeleteCamSensors(
    $filter: ModelSubscriptionCamSensorsFilterInput
  ) {
    onDeleteCamSensors(filter: $filter) {
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
