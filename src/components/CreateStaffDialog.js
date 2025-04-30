import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Switch,
    FormControlLabel
} from '@mui/material';
import useStaffManagement from '../hooks/useStaffManagement';

const CreateStaffDialog = ({ open, onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [useValidityDates, setUseValidityDates] = useState(false);
    const [validFrom, setValidFrom] = useState('');
    const [validTo, setValidTo] = useState('');
    const { createStaff } = useStaffManagement();

    const handleCreate = async () => {
        await createStaff({ email, validFrom: useValidityDates ? validFrom : null, validTo: useValidityDates ? validTo : null });
        onSuccess();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Staff</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={useValidityDates}
                            onChange={(e) => setUseValidityDates(e.target.checked)}
                        />
                    }
                    label="Set validity dates"
                />
                {useValidityDates && (
                    <>
                        <TextField
                            margin="dense"
                            label="Valid From"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={validFrom}
                            onChange={(e) => setValidFrom(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Valid To"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={validTo}
                            onChange={(e) => setValidTo(e.target.value)}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} variant="contained">Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateStaffDialog;
