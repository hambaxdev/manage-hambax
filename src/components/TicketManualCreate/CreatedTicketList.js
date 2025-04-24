import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Link,
    Grid
} from '@mui/material';

const CreatedTicketList = ({ tickets }) => {
    if (!tickets || tickets.length === 0) return null;

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Созданные билеты ({tickets.length})
            </Typography>

            <Grid container spacing={2}>
                {tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.ticketIdHash}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="subtitle2">Код билета:</Typography>
                                <Typography variant="body2" gutterBottom>
                                    {ticket.ticketIdHash}
                                </Typography>
                                <Link href={ticket.pdfUrl} target="_blank" rel="noopener">
                                    Скачать PDF
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CreatedTicketList;
