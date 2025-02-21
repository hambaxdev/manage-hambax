import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import useValidateTicket from "../hooks/useValidateTicket";

const ZXingScanner = () => {
    const [qrResult, setQrResult] = useState(null);
    const [statusColor, setStatusColor] = useState(null);
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserQRCodeReader());
    const streamRef = useRef(null);
    const scannerControls = useRef(null);
    const { validateTicket, status } = useValidateTicket();

    // Функция для запуска сканера, предотвращает ошибку `no-undef`
    const startScanner = useCallback(async () => {
        try {
            console.log("Инициализация сканера...");
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");

            if (videoDevices.length === 0) {
                console.error("Камера не найдена!");
                return;
            }

            const backCamera = videoDevices.find((device) => device.label.toLowerCase().includes("back"));
            const deviceId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;

            scannerControls.current = await codeReader.current.decodeFromVideoDevice(deviceId, videoRef.current, async (result, err) => {
                if (result) {
                    console.log("QR-код:", result.getText());
                    setQrResult(result.getText());

                    stopScanner(); // Остановка сканера
                    validateTicket(result.getText());
                }
            });

            // Сохраняем видеопоток для принудительной остановки
            streamRef.current = videoRef.current.srcObject;
        } catch (error) {
            console.error("Ошибка при инициализации сканера:", error);
        }
    }, [validateTicket]);

    useEffect(() => {
        startScanner();
        return () => stopScanner();
    }, [startScanner]);

    useEffect(() => {
        if (status) {
            setStatusColor(status === "success" ? "green" : "red");

            setTimeout(() => {
                setQrResult(null);
                setStatusColor(null);
                startScanner(); // Перезапуск сканера
            }, 3000);
        }
    }, [status, startScanner]);

    const stopScanner = () => {
        console.log("Остановка сканера...");
        if (scannerControls.current) {
            scannerControls.current.stop(); // Остановка `decodeFromVideoDevice`
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop()); // Остановка видеопотока
        }
        if (codeReader.current) {
            codeReader.current.reset(); // Очистка код-ридера
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
                width: "100%",
                height: "100vh",
                backgroundColor: statusColor || "white",
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
