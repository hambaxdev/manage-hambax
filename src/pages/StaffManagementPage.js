import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import StaffList from '../components/StaffList';
import CreateStaffDialog from '../components/CreateStaffDialog';
import useStaffManagement from '../hooks/useStaffManagement';

const StaffManagementPage = () => {
    const {
        staff,
        isLoading,
        openCreateDialog,
        setOpenCreateDialog,
        fetchStaff
    } = useStaffManagement();

    return (
        <Container maxWidth="md">
            <Stack spacing={3} sx={{ mt: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Manage Staff</Typography>
                    <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>
                        + Add Staff
                    </Button>
                </Stack>

                <StaffList staff={staff} loading={isLoading} />

                <CreateStaffDialog
                    open={openCreateDialog}
                    onClose={() => setOpenCreateDialog(false)}
                    onSuccess={fetchStaff}
                />
            </Stack>
        </Container>
    );
};

export default StaffManagementPage;
