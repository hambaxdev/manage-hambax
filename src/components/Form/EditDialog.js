import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditDialog = ({ open, onClose, onSave, data, setData, title }) => {
    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Редактировать ${title}`}</DialogTitle>
            <DialogContent>
                {Object.keys(data).map((key) => (
                    <TextField
                        key={key}
                        label={key}
                        fullWidth
                        margin="normal"
                        value={data[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={onSave} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
