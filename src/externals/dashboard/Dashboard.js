import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import AppTheme from '../shared-theme/AppTheme';
import { useMediaQuery } from '@mui/material';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const isMobile = useMediaQuery('(max-width: 768px)'); // ✅ Проверяем мобильность

  return (
    <AppTheme disableCustomTheme={false} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />      

        {/* ✅ Основной контент ограниченной ширины */}
        <Box
          component="main"
          sx={(theme) => ({
            display: isMobile ? "block" : "flex",
            justifyContent: isMobile ? "unset" : "center",
            width: "100vw",
            minWidth: 0,
            paddingRight: 5,
            marginLeft:  isMobile ? "unset" :"-60px"
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'stretch',
              mx: { xs: 2, md: 4 },
              pb: { xs: 3, md: 5 },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
    </AppTheme>
  );
}
