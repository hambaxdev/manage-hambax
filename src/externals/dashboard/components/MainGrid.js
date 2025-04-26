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
import useTicketSales from '../../../hooks/useTicketSales';

export default function MainGrid() {
  const { salesData, isLoading, apiError } = useTicketSales();

  const getTrendInfo = (current, previous) => {
    const trend = current > previous ? 'up' : current < previous ? 'down' : 'neutral';
    const change = previous === 0 ? 100 : ((current - previous) / previous) * 100;
    return {
      trend,
      change: Math.round(change),
    };
  };

  const cardsData = React.useMemo(() => {
    if (!salesData.length) return [];

    const totalTickets = salesData.reduce((sum, day) => sum + day.ticketsSold, 0);
    const totalRevenue = salesData.reduce((sum, day) => sum + day.totalRevenue, 0);

    const last7Days = salesData.slice(-7);
    const prev7Days = salesData.slice(-14, -7);

    const last7Tickets = last7Days.reduce((sum, day) => sum + day.ticketsSold, 0);
    const prev7Tickets = prev7Days.reduce((sum, day) => sum + day.ticketsSold, 0);

    const last7Revenue = last7Days.reduce((sum, day) => sum + day.totalRevenue, 0);
    const prev7Revenue = prev7Days.reduce((sum, day) => sum + day.totalRevenue, 0);

    const ticketsInfo = getTrendInfo(last7Tickets, prev7Tickets);
    const revenueInfo = getTrendInfo(last7Revenue, prev7Revenue);

    return [
      {
        title: 'Tickets Sold',
        value: totalTickets.toLocaleString(),
        interval: 'Last 30 days',
        trend: ticketsInfo.trend,
        change: ticketsInfo.change,
        data: salesData.map(day => day.ticketsSold),
      },
      {
        title: 'Revenue',
        value: totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
        interval: 'Last 30 days',
        trend: revenueInfo.trend,
        change: revenueInfo.change,
        data: salesData.map(day => day.totalRevenue),
      },
    ];
  }, [salesData]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        px: { xs: 2, sm: 4, md: 6 },
        mx: "auto",
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Overview
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : apiError ? (
          <Typography color="error">Error loading statistics</Typography>
        ) : (
          <>
            {cardsData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <StatCard {...card} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <HighlightedCard />
            </Grid>
          </>
        )}
      </Grid>

      {/* Остальные графики */}
      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SessionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

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
