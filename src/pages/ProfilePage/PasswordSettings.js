// @flow

/**
 * Accounts settings
 */
import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Box,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { useNotify } from "react-admin";
import userProvider, { telegramProvider } from "../../providers/usersProvider";
// layouts
import ContentLayout from "../../components/ContentLayout";

const useStyles = makeStyles((theme) => ({
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

export default function AccountSettings() {
  const notify = useNotify();
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmationPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notify("Password confirmation doesn't match Password", "error");
      return;
    }

    setLoading(true);
    telegramProvider("/items", {}).then((res) => {
      console.log(res);
    });
    // userProvider("/changePassword", {
    //   previousPassword: oldPassword,
    //   proposedPassword: newPassword,
    // })
    //   .then(() => {
    //     setLoading(false);
    //     notify("Your password has been reset");
    //   })
    //   .catch(({ message }) => {
    //     setLoading(false);
    //     notify(message, "error");
    //   });
  };

  return (
    <ContentLayout title="Password">
      <form onSubmit={submit}>
        <Box mb={3}>
          <FormControl fullWidth className="mb-2">
            <TextField
              id="old-password"
              placeholder="Old password"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mb={3}>
          <FormControl fullWidth className="mb-2">
            <TextField
              id="new-password"
              placeholder="New password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mb={3}>
          <FormControl fullWidth className="mb-2">
            <TextField
              id="retype-password"
              placeholder="Password confirmation"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box pt={1}>
          <FormControl>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="outlined"
                className="primary-bg-btn"
                color="primary"
                disabled={loading}>
                Update
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </FormControl>
        </Box>
      </form>
    </ContentLayout>
  );
}
