/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSite = /* GraphQL */ `
  mutation CreateSite(
    $input: CreateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    createSite(input: $input, condition: $condition) {
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
export const updateSite = /* GraphQL */ `
  mutation UpdateSite(
    $input: UpdateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    updateSite(input: $input, condition: $condition) {
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
export const deleteSite = /* GraphQL */ `
  mutation DeleteSite(
    $input: DeleteSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    deleteSite(input: $input, condition: $condition) {
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
export const createIncident = /* GraphQL */ `
  mutation CreateIncident(
    $input: CreateIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    createIncident(input: $input, condition: $condition) {
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
export const updateIncident = /* GraphQL */ `
  mutation UpdateIncident(
    $input: UpdateIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    updateIncident(input: $input, condition: $condition) {
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
export const deleteIncident = /* GraphQL */ `
  mutation DeleteIncident(
    $input: DeleteIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    deleteIncident(input: $input, condition: $condition) {
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
export const createSensor = /* GraphQL */ `
  mutation CreateSensor(
    $input: CreateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    createSensor(input: $input, condition: $condition) {
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
export const updateSensor = /* GraphQL */ `
  mutation UpdateSensor(
    $input: UpdateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    updateSensor(input: $input, condition: $condition) {
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
export const deleteSensor = /* GraphQL */ `
  mutation DeleteSensor(
    $input: DeleteSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    deleteSensor(input: $input, condition: $condition) {
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
export const createCamera = /* GraphQL */ `
  mutation CreateCamera(
    $input: CreateCameraInput!
    $condition: ModelCameraConditionInput
  ) {
    createCamera(input: $input, condition: $condition) {
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
export const updateCamera = /* GraphQL */ `
  mutation UpdateCamera(
    $input: UpdateCameraInput!
    $condition: ModelCameraConditionInput
  ) {
    updateCamera(input: $input, condition: $condition) {
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
export const deleteCamera = /* GraphQL */ `
  mutation DeleteCamera(
    $input: DeleteCameraInput!
    $condition: ModelCameraConditionInput
  ) {
    deleteCamera(input: $input, condition: $condition) {
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
export const createBypass = /* GraphQL */ `
  mutation CreateBypass(
    $input: CreateBypassInput!
    $condition: ModelBypassConditionInput
  ) {
    createBypass(input: $input, condition: $condition) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const updateBypass = /* GraphQL */ `
  mutation UpdateBypass(
    $input: UpdateBypassInput!
    $condition: ModelBypassConditionInput
  ) {
    updateBypass(input: $input, condition: $condition) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const deleteBypass = /* GraphQL */ `
  mutation DeleteBypass(
    $input: DeleteBypassInput!
    $condition: ModelBypassConditionInput
  ) {
    deleteBypass(input: $input, condition: $condition) {
      id
      site_id
      start_time
      end_time
      createdAt
      updatedAt
    }
  }
`;
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
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
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
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
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
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
export const createNvr = /* GraphQL */ `
  mutation CreateNvr(
    $input: CreateNvrInput!
    $condition: ModelNvrConditionInput
  ) {
    createNvr(input: $input, condition: $condition) {
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
export const updateNvr = /* GraphQL */ `
  mutation UpdateNvr(
    $input: UpdateNvrInput!
    $condition: ModelNvrConditionInput
  ) {
    updateNvr(input: $input, condition: $condition) {
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
export const deleteNvr = /* GraphQL */ `
  mutation DeleteNvr(
    $input: DeleteNvrInput!
    $condition: ModelNvrConditionInput
  ) {
    deleteNvr(input: $input, condition: $condition) {
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
export const createSopitem = /* GraphQL */ `
  mutation CreateSopitem(
    $input: CreateSopitemInput!
    $condition: ModelSopitemConditionInput
  ) {
    createSopitem(input: $input, condition: $condition) {
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
export const updateSopitem = /* GraphQL */ `
  mutation UpdateSopitem(
    $input: UpdateSopitemInput!
    $condition: ModelSopitemConditionInput
  ) {
    updateSopitem(input: $input, condition: $condition) {
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
export const deleteSopitem = /* GraphQL */ `
  mutation DeleteSopitem(
    $input: DeleteSopitemInput!
    $condition: ModelSopitemConditionInput
  ) {
    deleteSopitem(input: $input, condition: $condition) {
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
export const createSopcheckeditem = /* GraphQL */ `
  mutation CreateSopcheckeditem(
    $input: CreateSopcheckeditemInput!
    $condition: ModelSopcheckeditemConditionInput
  ) {
    createSopcheckeditem(input: $input, condition: $condition) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const updateSopcheckeditem = /* GraphQL */ `
  mutation UpdateSopcheckeditem(
    $input: UpdateSopcheckeditemInput!
    $condition: ModelSopcheckeditemConditionInput
  ) {
    updateSopcheckeditem(input: $input, condition: $condition) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const deleteSopcheckeditem = /* GraphQL */ `
  mutation DeleteSopcheckeditem(
    $input: DeleteSopcheckeditemInput!
    $condition: ModelSopcheckeditemConditionInput
  ) {
    deleteSopcheckeditem(input: $input, condition: $condition) {
      id
      sop_item_id
      incident_id
      checked
      createdAt
      updatedAt
    }
  }
`;
export const createCamerachecklist = /* GraphQL */ `
  mutation CreateCamerachecklist(
    $input: CreateCamerachecklistInput!
    $condition: ModelCamerachecklistConditionInput
  ) {
    createCamerachecklist(input: $input, condition: $condition) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const updateCamerachecklist = /* GraphQL */ `
  mutation UpdateCamerachecklist(
    $input: UpdateCamerachecklistInput!
    $condition: ModelCamerachecklistConditionInput
  ) {
    updateCamerachecklist(input: $input, condition: $condition) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteCamerachecklist = /* GraphQL */ `
  mutation DeleteCamerachecklist(
    $input: DeleteCamerachecklistInput!
    $condition: ModelCamerachecklistConditionInput
  ) {
    deleteCamerachecklist(input: $input, condition: $condition) {
      id
      name
      order
      camera_id
      createdAt
      updatedAt
    }
  }
`;
export const createIncidenttype = /* GraphQL */ `
  mutation CreateIncidenttype(
    $input: CreateIncidenttypeInput!
    $condition: ModelIncidenttypeConditionInput
  ) {
    createIncidenttype(input: $input, condition: $condition) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const updateIncidenttype = /* GraphQL */ `
  mutation UpdateIncidenttype(
    $input: UpdateIncidenttypeInput!
    $condition: ModelIncidenttypeConditionInput
  ) {
    updateIncidenttype(input: $input, condition: $condition) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const deleteIncidenttype = /* GraphQL */ `
  mutation DeleteIncidenttype(
    $input: DeleteIncidenttypeInput!
    $condition: ModelIncidenttypeConditionInput
  ) {
    deleteIncidenttype(input: $input, condition: $condition) {
      id
      name
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const createSensortype = /* GraphQL */ `
  mutation CreateSensortype(
    $input: CreateSensortypeInput!
    $condition: ModelSensortypeConditionInput
  ) {
    createSensortype(input: $input, condition: $condition) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const updateSensortype = /* GraphQL */ `
  mutation UpdateSensortype(
    $input: UpdateSensortypeInput!
    $condition: ModelSensortypeConditionInput
  ) {
    updateSensortype(input: $input, condition: $condition) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteSensortype = /* GraphQL */ `
  mutation DeleteSensortype(
    $input: DeleteSensortypeInput!
    $condition: ModelSensortypeConditionInput
  ) {
    deleteSensortype(input: $input, condition: $condition) {
      id
      name
      incident_type_id
      createdAt
      updatedAt
    }
  }
`;
export const createSeveritytype = /* GraphQL */ `
  mutation CreateSeveritytype(
    $input: CreateSeveritytypeInput!
    $condition: ModelSeveritytypeConditionInput
  ) {
    createSeveritytype(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateSeveritytype = /* GraphQL */ `
  mutation UpdateSeveritytype(
    $input: UpdateSeveritytypeInput!
    $condition: ModelSeveritytypeConditionInput
  ) {
    updateSeveritytype(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteSeveritytype = /* GraphQL */ `
  mutation DeleteSeveritytype(
    $input: DeleteSeveritytypeInput!
    $condition: ModelSeveritytypeConditionInput
  ) {
    deleteSeveritytype(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createStatustype = /* GraphQL */ `
  mutation CreateStatustype(
    $input: CreateStatustypeInput!
    $condition: ModelStatustypeConditionInput
  ) {
    createStatustype(input: $input, condition: $condition) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const updateStatustype = /* GraphQL */ `
  mutation UpdateStatustype(
    $input: UpdateStatustypeInput!
    $condition: ModelStatustypeConditionInput
  ) {
    updateStatustype(input: $input, condition: $condition) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const deleteStatustype = /* GraphQL */ `
  mutation DeleteStatustype(
    $input: DeleteStatustypeInput!
    $condition: ModelStatustypeConditionInput
  ) {
    deleteStatustype(input: $input, condition: $condition) {
      id
      name
      description
      order
      createdAt
      updatedAt
    }
  }
`;
export const createIncidentviewer = /* GraphQL */ `
  mutation CreateIncidentviewer(
    $input: CreateIncidentviewerInput!
    $condition: ModelIncidentviewerConditionInput
  ) {
    createIncidentviewer(input: $input, condition: $condition) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const updateIncidentviewer = /* GraphQL */ `
  mutation UpdateIncidentviewer(
    $input: UpdateIncidentviewerInput!
    $condition: ModelIncidentviewerConditionInput
  ) {
    updateIncidentviewer(input: $input, condition: $condition) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteIncidentviewer = /* GraphQL */ `
  mutation DeleteIncidentviewer(
    $input: DeleteIncidentviewerInput!
    $condition: ModelIncidentviewerConditionInput
  ) {
    deleteIncidentviewer(input: $input, condition: $condition) {
      id
      incident_id
      viewer_id
      createdAt
      updatedAt
    }
  }
`;
export const createIncidentchangelog = /* GraphQL */ `
  mutation CreateIncidentchangelog(
    $input: CreateIncidentchangelogInput!
    $condition: ModelIncidentchangelogConditionInput
  ) {
    createIncidentchangelog(input: $input, condition: $condition) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const updateIncidentchangelog = /* GraphQL */ `
  mutation UpdateIncidentchangelog(
    $input: UpdateIncidentchangelogInput!
    $condition: ModelIncidentchangelogConditionInput
  ) {
    updateIncidentchangelog(input: $input, condition: $condition) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const deleteIncidentchangelog = /* GraphQL */ `
  mutation DeleteIncidentchangelog(
    $input: DeleteIncidentchangelogInput!
    $condition: ModelIncidentchangelogConditionInput
  ) {
    deleteIncidentchangelog(input: $input, condition: $condition) {
      id
      incident_id
      user_id
      field
      createdAt
      updatedAt
    }
  }
`;
export const createNeatpatrolnotes = /* GraphQL */ `
  mutation CreateNeatpatrolnotes(
    $input: CreateNeatpatrolnotesInput!
    $condition: ModelNeatpatrolnotesConditionInput
  ) {
    createNeatpatrolnotes(input: $input, condition: $condition) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const updateNeatpatrolnotes = /* GraphQL */ `
  mutation UpdateNeatpatrolnotes(
    $input: UpdateNeatpatrolnotesInput!
    $condition: ModelNeatpatrolnotesConditionInput
  ) {
    updateNeatpatrolnotes(input: $input, condition: $condition) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const deleteNeatpatrolnotes = /* GraphQL */ `
  mutation DeleteNeatpatrolnotes(
    $input: DeleteNeatpatrolnotesInput!
    $condition: ModelNeatpatrolnotesConditionInput
  ) {
    deleteNeatpatrolnotes(input: $input, condition: $condition) {
      id
      incident_id
      timestamp
      details
      createdAt
      updatedAt
    }
  }
`;
export const createCamSensors = /* GraphQL */ `
  mutation CreateCamSensors(
    $input: CreateCamSensorsInput!
    $condition: ModelCamSensorsConditionInput
  ) {
    createCamSensors(input: $input, condition: $condition) {
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
export const updateCamSensors = /* GraphQL */ `
  mutation UpdateCamSensors(
    $input: UpdateCamSensorsInput!
    $condition: ModelCamSensorsConditionInput
  ) {
    updateCamSensors(input: $input, condition: $condition) {
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
export const deleteCamSensors = /* GraphQL */ `
  mutation DeleteCamSensors(
    $input: DeleteCamSensorsInput!
    $condition: ModelCamSensorsConditionInput
  ) {
    deleteCamSensors(input: $input, condition: $condition) {
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
