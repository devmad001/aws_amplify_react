// @flow

import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import {
  Topbar,
  NotificationsBtn,
  FullScreenBtn,
  ProfileBtn,
} from "~/components/Topbar";
import { useUser } from "ra-aws-amplify";
type Props = {
  sidebarOpen: boolean,
  toggleSidebar: () => void,
  toggleResponsiveSidebar: () => void,
};

const Header = (props: Props) => {
  const { sidebarOpen, toggleSidebar, toggleResponsiveSidebar } = props;
  const user = useUser();
  console.log(user);
  return (
    <Topbar
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      toggleResponsiveSidebar={toggleResponsiveSidebar}>
      <FullScreenBtn />
      {user?.username && (
        <Box mx={1}>
          <Typography variant="body2">{user.username}</Typography>
        </Box>
      )}

      <ProfileBtn />
    </Topbar>
  );
};

Header.defaultProps = {};

export default Header;
