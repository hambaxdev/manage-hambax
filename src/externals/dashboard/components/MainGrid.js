import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

const data = [
  {
    title: 'Tickets',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510],
  },
];

export default function MainGrid() {
  return (
    <Container 
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px", // ✅ Ограничение ширины
        px: { xs: 2, sm: 4, md: 6 },
        mx: "auto", // ✅ Центрируем контейнер
      }}
    >
      {/* Заголовок Overview */}
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Overview
      </Typography>

      {/* Карточки (StatCard) */}
      <Grid container spacing={2} justifyContent="center">
        {data.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <HighlightedCard />
        </Grid>
      </Grid>

      {/* Графики */}
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SessionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      {/* Таблица и сайдбар */}
      <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Details
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} lg={9}>
          <CustomizedDataGrid />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack gap={2} direction="column" alignItems="center">
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Container>
  );
}
