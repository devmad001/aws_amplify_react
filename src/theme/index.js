import { createTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import global from './global';

const theme = createTheme( {
  palette,
  direction: 'ltr',
  typography,
  overrides,
  '@global': global,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
} );

export default theme;
