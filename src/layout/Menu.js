// @flow

import React from "react";
import { usePermissions } from "react-admin";

// import { useResources } from './helpers';
import { Sidebar, MenuItem } from "~/components/Sidebar";
import { USER_ROLES } from "~/constants";

type Props = {
  closeResponsiveSidebar?: ?() => void,
};

const VIRTUAL_PATROL =
  String(process.env.VIRTUAL_PATROL).toLowerCase() === "true";

const Menu = (props: Props) => {
  const { closeResponsiveSidebar } = props;
  const { loaded, permissions } = usePermissions();
  // const resources = useResources();

  return (
    <Sidebar closeResponsiveSidebar={closeResponsiveSidebar}>
      <MenuItem
        icon="dashboard"
        title="Overview"
        desc="Overview of realtime incidences"
        to="/overview"
      />
      {/* {VIRTUAL_PATROL && (
        <MenuItem
          icon="video_camera_front"
          title="Virtual Patrols"
          desc="Access surveillance system remotely"
          to="/virtual_patrols"
        />
      )} */}
      {/* <MenuItemsFromConfig
        config={ resources }
      /> */}
      {
        <>
          {/* <MenuItem
              icon="menu"
              title="Site Management"
              desc="Sites, Cameras, Sensors"
              to="/sites"
            >

            </MenuItem> */}
          {VIRTUAL_PATROL && (
            <MenuItem
              icon="video_camera_front"
              title="Virtual Patrol Schedules"
              desc="Set virtual patrol routes schedules"
              to="/virtual_patrol_schedules"
            />
          )}
          {VIRTUAL_PATROL && (
            <MenuItem
              icon="route"
              title="Virtual Patrol Routes"
              desc="Set virtual patrol routes"
              to="/virtual_patrol_routes"
            />
          )}
          <MenuItem
            icon="next_plan"
            title="Bypass"
            desc="Bypass sites & time"
            to="/bypasses"
          />
          <MenuItem
            icon="apartment"
            title="Sites"
            desc="Locations monitored"
            to="/sites"
          />
          <MenuItem
            icon="videocam"
            title="Cameras"
            desc="Visual feed of locations"
            to="/cameras"
          />
          <MenuItem
            icon="settings_remote"
            title="Sensors"
            desc="Sensing devices to trigger events"
            to="/sensors"
          />
          <MenuItem
            icon="movie"
            title="NVR"
            desc="Network video recorder"
            to="/nvrs"
          />
          <MenuItem
            icon="perm_contact_calendar"
            title="Contacts"
            desc="Contacts of key personnel on site"
            to="/contacts"
          />
          <MenuItem
            icon="list_alt"
            title="SOP Items"
            desc="Standard operating procedures"
            to="/sopitems"
          />
          <MenuItem
            icon="people"
            title="Users"
            desc="User management"
            to="/cognitoUsers"
          />
          <MenuItem
            icon="list_alt"
            title="System Health"
            desc="Statuses of the devices"
            to="/system_health"
          />
          <MenuItem
            icon="dashboard"
            title="Dashboard"
            desc="Dashboard management"
            to="/dashboard"
          />
        </>
      }
    </Sidebar>
  );
};

Menu.defaultProps = {
  closeResponsiveSidebar: null,
};

export default Menu;
