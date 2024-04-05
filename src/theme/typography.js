import themeColors from './themeColors';

export default {
  htmlFontSize: 16,
  fontFamily: "'Lato', sans-serif",
  fontSize: 16,
  h1: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '2.75rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  h2: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '2.25rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  h3: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '2rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  h4: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '1.75rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  h5: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '1.5rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  h6: {
    color: themeColors.textPrimary,
    fontWeight: 500,
    fontSize: '1.25rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  subtitle1: {
    color: themeColors.textPrimary,
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: '1.5',
  },
  subtitle2: {
    color: themeColors.textSecondary,
    fontWeight: 400,
    fontSize: '0.875rem',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  body1: {
    color: themeColors.textSecondary,
    fontSize: '0.75rem',
    letterSpacing: '0',
    lineHeight: '1.5',

  },
  body2: {
    color: themeColors.textPrimary,
    fontSize: '1rem',
    letterSpacing: '0',
    lineHeight: '1.5',
    '@media (max-width:960px)': {
      fontSize: '0.9375rem',
    },
  },
  button: {
    color: themeColors.white,
    fontSize: '14px',
    textTransform: 'capitalize',
  },
  caption: {
    color: themeColors.textSecondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    lineHeight: '13px',
  },
  overline: {
    color: themeColors.textSecondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase',
  },
};
