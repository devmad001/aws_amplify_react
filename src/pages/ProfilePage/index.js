// @flow

import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import firebase from "firebase";

import CustomCard from "../../components/CustomCard";
import TabPanel from "../../components/TabPanel";

import GeneralSettings from "./GeneralSettings";
import PasswordSettings from "./PasswordSettings";
import { useUser } from "ra-aws-amplify";

const ProfilePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useUser();
  if (!user) {
    return null;
  }
  return (
    <Container>
      <CustomCard>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}>
          <Tab
            label={
              <>
                <Box
                  component="span"
                  fontSize="20px"
                  className="material-icons-outlined"
                  mr={1}>
                  settings
                </Box>
                General
              </>
            }
          />
          <Tab
            label={
              <>
                <Box
                  component="span"
                  fontSize="20px"
                  className="material-icons-outlined"
                  mr={1}>
                  lock
                </Box>
                Password
              </>
            }
          />
        </Tabs>
        <TabPanel value={value} index={0}></TabPanel>
        <TabPanel value={value} index={1}>
          <PasswordSettings />
        </TabPanel>
      </CustomCard>
    </Container>
  );
};

export default ProfilePage;
