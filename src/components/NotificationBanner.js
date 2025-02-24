import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationBanner = ({ message, type = "info", open, onClose, autoHideDuration = 3000 }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationBanner;
