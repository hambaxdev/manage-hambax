import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { typography, shadows, shape, orange, brand } from './themePrimitives';

function AppTheme(props) {
  const { children, themeComponents } = props;

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: 'light',
        primary: {
          light: brand[200],
          main: brand[400], // ✅ Теперь основной цвет — оранжевый
          dark: brand[700],
          contrastText: '#fff',
        },
        warning: {
          light: brand[300],
          main: brand[400],
          dark: orange[800],
        },
      },
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    }),
  [themeComponents]);

  return <ThemeProvider theme={theme} disableTransitionOnChange>{children}</ThemeProvider>;
}

AppTheme.propTypes = {
  children: PropTypes.node,
  themeComponents: PropTypes.object,
};

export default AppTheme;
