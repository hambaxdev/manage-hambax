import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import AppTheme from '../shared-theme/AppTheme';
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
  return (
    <AppTheme disableCustomTheme={false} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      
      {/* ✅ Исправленный контейнер */}
      <Box sx={{ flexGrow: 1, display: "flex", width: "100vw", maxWidth: "100%", overflowX: "hidden" }}>
        
        {/* ✅ Основной контент теперь адаптивный */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            width: "100%", // ✅ Полная ширина на всех экранах
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'stretch', // ✅ Теперь контент заполняет всю ширину
              mx: { xs: 2, md: 4 }, // ✅ Корректные отступы
              pb: { xs: 3, md: 5 },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
