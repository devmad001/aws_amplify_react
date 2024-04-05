/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const BASE_URL = 'http://localhost:8007/api/v1';

export const getDashboardData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get( `${ BASE_URL }/dashboard`, config );
    return res?.data?.data;
  } catch ( err ) {
    console.log( err );
  }
};
