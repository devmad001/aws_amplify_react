// @flow

import englishMessages from 'ra-language-english';

const customEnglishMessages = {
  ...englishMessages, // extend english messages of react-admin
  resources: {
    incident: {
      name: 'Incident |||| Incidents',
    },
    site: {
      name: 'Site |||| Sites',
    },
    sensor: {
      name: 'Sensor |||| Sensors',
    },
  },
};

export default customEnglishMessages;
