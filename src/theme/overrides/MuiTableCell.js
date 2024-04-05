// @flow

import themeColors from '../themeColors';

export default {
  root: {
    color: themeColors.textPrimary,
    fontSize: '1rem',
    letterSpacing: '0',
    lineHeight: '1.5',
    borderBottom: '1px solid rgba(255,255, 255, 0.12)',
  },
  head: {
    color: themeColors.textPrimary,
    fontSize: '0.875rem',
    height: '60px',
    fontWeight: 500,
    whiteSpace: 'nowrap',

    '& .MuiSvgIcon-root': {
      width: 22,
      height: 22,
    },
  },
  body: {
    fontSize: '0.875rem',
    height: '60px',
    color: themeColors.textPrimary,
    // whiteSpace: 'nowrap',
    '& .MuiSvgIcon-root': {
      width: 22,
      height: 22,
    },
  },
  footer: {
    borderBottom: 0,
  },
};
