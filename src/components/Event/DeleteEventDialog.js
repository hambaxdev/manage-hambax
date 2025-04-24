import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteEventDialog = ({ open, onClose, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('deleteEventDialog.title')}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    {t('deleteEventDialog.message')}
                </Typography>
                <Typography color="warning.main">
                    {t('deleteEventDialog.suggestion')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('deleteEventDialog.cancel')}</Button>
                <Button color="error" onClick={onConfirm}>{t('deleteEventDialog.confirm')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteEventDialog;
