import React from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StaffList = ({ staff, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return <CircularProgress />;
    }

    if (!Array.isArray(staff) || staff.length === 0) {
        return <Typography>No staff members found.</Typography>;
    }

    return (
        <List>
            {staff.map((user) => (
                <ListItem
                    button
                    key={user._id}
                    onClick={() => navigate(`/staff/${user._id}`)}
                >
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
