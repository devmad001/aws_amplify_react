// @flow

import themeColors from './themeColors';

export default {
  type: 'dark',
  common: {
    black: themeColors.black,
    white: themeColors.white,
  },
  primary: {
    contrastText: themeColors.white,
    dark: 'rgba(77, 125, 242, 0.8)',
    main: themeColors.primary,
    light: 'rgba(77, 125, 242, 0.4)',
  },
  secondary: {
    contrastText: themeColors.white,
    dark: themeColors.secondary,
    main: themeColors.secondary,
    light: themeColors.secondary,
  },
  success: {
    contrastText: themeColors.white,
    dark: themeColors.success,
    main: themeColors.success,
    light: themeColors.success,
  },
  info: {
    contrastText: themeColors.white,
    dark: themeColors.info,
    main: themeColors.info,
    light: themeColors.info,
  },
  warning: {
    contrastText: themeColors.white,
    dark: themeColors.warning,
    main: themeColors.warning,
    light: themeColors.warning,
  },
  error: {
    contrastText: themeColors.white,
    dark: themeColors.error,
    main: themeColors.error,
    light: themeColors.error,
  },
  text: {
    primary: themeColors.textPrimary,
    secondary: themeColors.textSecondary,
    link: themeColors.primary,
  },
  divider: themeColors.divider,
  icon: themeColors.icon,
  background: {
    paper: themeColors.bgPaper,
    default: themeColors.bgDefault,
  },
};
