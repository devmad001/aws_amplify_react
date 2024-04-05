// @flow

import React, { useState } from "react";
import {
  makeStyles,
  Tooltip,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItem,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { useLogout, usePermissions } from "react-admin";
import { Link } from "react-router-dom";
import { titleCase } from "title-case";
import { useUser } from "ra-aws-amplify";
const VP_LINK = process.env.VP_LINK || "";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 300,
    padding: 0,
    "& >a": {
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.05)",
      },
    },
    "& .top-dropdown-menu--item": {
      padding: "20px 12px",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const ProfileBtn = () => {
  const { loaded, permissions } = usePermissions();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = !!anchorEl;
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = useLogout();
  const user = useUser();
  if (!user || !loaded) {
    return null;
  }
  console.log("user", user);
  const { photoURL, username } = user;
  // const role = permissions[ 'https://hasura.io/jwt/claims' ][ 'x-hasura-default-role' ];
  const role = permissions[0];
  return (
    <Box className="h-btn-user">
      {/* todo: i18n translate */}
      <Tooltip title={username} placement="bottom">
        <IconButton
          aria-describedby={open ? "simple-popper" : null}
          variant="contained"
          color="primary"
          style={{ padding: "6px" }}
          onClick={handleClick}>
          <Avatar alt="user-thumb" src={photoURL} />
        </IconButton>
      </Tooltip>
      <Popover
        id="user-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <List
          className={`${classes.root} top-dropdown-menu`}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <div className="dropdown-header user-info  text-center">
                <Avatar
                  alt="user-thumb"
                  className={classes.large}
                  src={photoURL}
                />
                <Typography variant="body2">{username}</Typography>
                <Typography variant="subtitle2">{titleCase(role)}</Typography>
                <Button
                  className="btn primary-bg-btn"
                  component={Link}
                  to="/profile"
                  variant="outlined"
                  color="primary">
                  Manage your account
                </Button>
              </div>
            </ListSubheader>
          }>
          <ListItem
            component="div"
            className="top-dropdown-menu--item d-block text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => logout()}>
              Sign out
            </Button>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

ProfileBtn.defaultProps = {};

export default ProfileBtn;
