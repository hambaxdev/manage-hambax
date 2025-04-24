import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Container,
    Chip,
} from '@mui/material';
import usePayouts from '../hooks/usePayouts';
import DataTable from '../components/DataTable';
import { useTranslation } from 'react-i18next';

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('de-DE'); // формат dd.mm.yyyy
};

const statusChip = (status) => {
    const styles = {
        fontWeight: 'bold',
        borderRadius: '999px',
        width: '110px',
        justifyContent: 'center',
        textTransform: 'capitalize',
    };

    if (status === 'in_transit') {
        return <Chip label="In transit" color="primary" variant="outlined" sx={styles} />;
    }

    if (status === 'paid') {
        return <Chip label="Paid" color="success" variant="outlined" sx={styles} />;
    }

    return <Chip label={status} variant="outlined" sx={styles} />;
};

const PayoutsPage = () => {
    const { t } = useTranslation();
    const { isLoading, apiError, summary, payouts } = usePayouts();

    const columns = [
        {
            key: 'arrival_date',
            label: t('payouts.table.date'),
            render: (row) => formatDate(row.arrival_date),
        },
        {
            key: 'amount',
            label: t('payouts.table.amount'),
            render: (row) => `€${(row.amount / 100).toFixed(2)}`,
        },
        {
            key: 'status',
            label: t('payouts.table.status'),
            render: (row) => statusChip(row.status),
        },
    ];

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (apiError) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <Typography color="error">{apiError}</Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                {t('payouts.title')}
            </Typography>

            {summary && (
                <Box mb={4}>
                    <Typography variant="h6">
                        {t('payouts.summary.upcomingAmount')}: €{(summary.upcomingAmount / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                        {t('payouts.summary.nextPayoutDate')}: {formatDate(new Date(summary.nextPayoutDate).getTime() / 1000)}
                    </Typography>
                </Box>
            )}

            <Typography variant="h6">{t('payouts.table.title')}</Typography>
            <DataTable
                columns={columns}
                rows={payouts}
                getRowId={(row) => row.id}
                emptyMessage={t('payouts.table.empty')}
            />
        </Container>
    );
};

export default PayoutsPage;
