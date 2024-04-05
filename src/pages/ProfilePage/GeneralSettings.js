// @flow

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  Avatar,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { useNotify, usePermissions } from "react-admin";
import firebase from "firebase";
import { titleCase } from "title-case";
import { useUser } from "ra-aws-amplify";
import { USER_ROLES } from "~/constants";

import ContentLayout from "../../components/ContentLayout";

const USERS_API = process.env.USERS_API || "";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  profileThumb: {
    "& >div": {
      "& >div": {
        "& >div:first-child": {
          alignSelf: "center",
        },
      },
    },
  },
  fileUpload: {
    "& input": {
      height: "auto",
    },
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

export default function GeneralSettingsWithAuth() {
  const { loaded, permissions } = usePermissions();
  const user = useUser();
  if (loaded && permissions && user) {
    return <GeneralSettings user={user} role={permissions[0]} />;
  }

  return null;
}

type Props = {
  user: {
    uid: string,
    email: string,
    username: string,
    updateProfile: Function,
    getIdToken: Function,
  },
  role: string,
};
const GeneralSettings = ({ user, role: originalRole }: Props) => {
  const classes = useStyles();
  const notify = useNotify();

  const [username, setUserName] = useState(user.username);
  const [photo, setPhotoFile] = useState(null);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [role, setRole] = useState(originalRole);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setLoading(true);

    const photoPromise = new Promise((resolve, reject) => {
      if (photoChanged) {
        try {
          if (photo) {
            profileRef.put(photo).then(() => {
              profileRef.getDownloadURL().then((url) => {
                resolve(url);
              });
            });
          } else {
            profileRef.delete().then(() => {
              resolve("");
            });
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(photoURL);
      }
    }).catch(({ message }) => {
      setLoading(false);
      notify(message, "error");
    });

    photoPromise.then((url) => {
      user.getIdToken().then((token) => {
        fetch(`${USERS_API}/${user.uid}`, {
          method: "PATCH",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            displayName,
            role,
            photoURL: url,
          }),
        })
          .then(() => {
            setLoading(false);
            notify(
              "Your profile has been updated. Sign in again to see the changes."
            );
          })
          .catch(({ message }) => {
            setLoading(false);
            notify(message, "error");
          });
      });
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <Box mb={3} className={classes.profileThumb}>
          <ContentLayout title="Your Profile Image">
            <Box width="100%" display="flex" alignItems="center">
              <Box pr={2} className="avatar-thumb">
                <Avatar
                  src={photoURL}
                  alt={displayName}
                  className={classes.large}
                />
              </Box>
              <Box width="100%">
                <TextField
                  fullWidth
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  className={classes.fileUpload}
                  onChange={(e) => {
                    setPhotoChanged(true);
                    if (e.target.files.length) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setPhotoURL(reader.result);
                      };
                      reader.readAsDataURL(file);
                      setPhotoFile(file);
                    } else {
                      setPhotoFile(null);
                      setPhotoURL("");
                    }
                  }}
                />
              </Box>
            </Box>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Display Name">
            <FormControl fullWidth>
              <TextField
                id="displayName"
                name="displayName"
                placeholder="Display Name"
                type="input"
                value={displayName || ""}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Email">
            <FormControl fullWidth>
              <TextField
                id="email"
                placeholder="Email"
                type="input"
                disabled
                value={user.attributes.email}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Role">
            <FormControl fullWidth disabled={role !== USER_ROLES.SUPERVISOR}>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <MenuItem value={USER_ROLES.SUPERVISOR}>
                  {titleCase(USER_ROLES.SUPERVISOR)}
                </MenuItem>
                <MenuItem value={USER_ROLES.OPERATOR}>
                  {titleCase(USER_ROLES.OPERATOR)}
                </MenuItem>
                <MenuItem value={USER_ROLES.CUSTOMER}>
                  {titleCase(USER_ROLES.CUSTOMER)}
                </MenuItem>
              </Select>
            </FormControl>
          </ContentLayout>
        </Box>
        <Box>
          <ContentLayout>
            <FormControl>
              <div className={classes.wrapper}>
                <Button
                  variant="outlined"
                  color="primary"
                  className="primary-bg-btn"
                  type="submit"
                  disabled={loading}>
                  Save
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </FormControl>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
};
