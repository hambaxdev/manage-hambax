import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ActionRestrictionModal = ({ open, onClose, message }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="restriction-dialog-title">
            <DialogTitle id="restriction-dialog-title">{t("restrictionModal.title")}</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {t("restrictionModal.okButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActionRestrictionModal;
