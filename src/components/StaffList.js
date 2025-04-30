import React from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';

const StaffList = ({ staff, loading }) => {
    if (loading) {
        return <CircularProgress />;
    }

    if (staff.length === 0) {
        return <Typography>No staff members found.</Typography>;
    }

    return (
        <List>
            {staff.map((user) => (
                <ListItem key={user._id}>
                    <ListItemText
                        primary={user.email}
                        secondary={
                            user.validFrom && user.validTo
                                ? `Valid from ${new Date(user.validFrom).toLocaleDateString()} to ${new Date(user.validTo).toLocaleDateString()}`
                                : 'No expiration'
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default StaffList;
