import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import useValidateTicket from "../hooks/useValidateTicket";

const ZXingScanner = () => {
    const [qrResult, setQrResult] = useState(null);
    const [statusColor, setStatusColor] = useState(null); // Цвет экрана
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserQRCodeReader());
    const { validateTicket, status } = useValidateTicket();

    useEffect(() => {
        const startScanner = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === "videoinput");

                if (videoDevices.length === 0) {
                    console.error("No camera found!");
                    return;
                }

                const backCamera = videoDevices.find((device) => device.label.toLowerCase().includes("back"));
                const deviceId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;

                await codeReader.current.decodeFromVideoDevice(deviceId, videoRef.current, async (result, err) => {
                    if (result) {
                        setQrResult(result.getText());
                        codeReader.current.reset(); // Остановить камеру
                        validateTicket(result.getText()); // Отправить код на бэкенд
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

    useEffect(() => {
        if (status) {
            setStatusColor(status === "success" ? "green" : "red");

            setTimeout(() => {
                setQrResult(null);
                setStatusColor(null);
                codeReader.current.reset(); // Перезапустить сканирование
            }, 3000);
        }
    }, [status]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
                width: "100%",
                height: "100vh",
                backgroundColor: statusColor || "white", // Меняем цвет экрана
                transition: "background-color 0.5s ease-in-out",
            }}
        >
            <Typography variant="h5" gutterBottom>Scan QR Code</Typography>
            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px", height: "auto" }} />
            {qrResult && <Typography color="black">Scanned: {qrResult}</Typography>}
            {status === "success" && <Typography color="green">✅ Ticket is valid!</Typography>}
            {status === "error" && <Typography color="red">❌ Invalid ticket!</Typography>}
        </Box>
    );
};

export default ZXingScanner;
