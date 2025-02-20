import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { BrowserQRCodeReader } from '@zxing/browser';

const ZXingScanner = () => {
    const [qrResult, setQrResult] = useState(null);
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserQRCodeReader());

    useEffect(() => {
        const startScanner = async () => {
            try {
                // Получаем список видеоустройств (камер)
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === "videoinput");

                if (videoDevices.length === 0) {
                    console.error("No camera found!");
                    return;
                }

                // Выбираем заднюю камеру, если есть
                const backCamera = videoDevices.find(device => device.label.toLowerCase().includes("back"));
                const deviceId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;

                // Запускаем сканирование
                await codeReader.current.decodeFromVideoDevice(deviceId, videoRef.current, (result, err) => {
                    if (result) {
                        setQrResult(result.getText());
                        codeReader.current.reset(); // Останавливаем сканирование после первого успешного считывания
                    }
                });
            } catch (error) {
                console.error("Error initializing scanner:", error);
            }
        };

        startScanner();

        return () => {
            codeReader.current.reset();
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, width: '100%' }}>
            <Typography variant="h5" gutterBottom>Scan QR Code</Typography>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
            {qrResult && <Typography color="green">Scanned: {qrResult}</Typography>}
        </Box>
    );
};

export default ZXingScanner;
