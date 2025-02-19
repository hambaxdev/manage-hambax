import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Html5QrcodeScanner } from "html5-qrcode";

const ScanQRPage = () => {
    const [qrResult, setQrResult] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: 250 }
        );

        scanner.render(
            (decodedText) => {
                setQrResult(decodedText);
                scanner.clear();
            },
            (errorMessage) => {
                console.log("QR Error: ", errorMessage);
            }
        );

        scannerRef.current = scanner;

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Scan QR Code</Typography>
            <Box id="qr-reader" sx={{ width: '300px', height: '300px' }} />
            {qrResult && <Typography color="green">Scanned: {qrResult}</Typography>}
        </Box>
    );
};

export default ScanQRPage;
