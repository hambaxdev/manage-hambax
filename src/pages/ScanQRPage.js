import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { BrowserQRCodeReader } from "@zxing/browser";
import useValidateTicket from "../hooks/useValidateTicket";

const ZXingScanner = () => {
    const [qrResult, setQrResult] = useState(null);
    const [statusColor, setStatusColor] = useState("white"); // Цвет экрана
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserQRCodeReader());
    const scanningRef = useRef(false); // Флаг, чтобы предотвратить повторное сканирование
    const { validateTicket, status } = useValidateTicket();

    // Функция запуска сканера
    const startScanner = useCallback(async () => {
        if (!videoRef.current || scanningRef.current) return; // Не запускаем повторно

        try {
            console.log("🔍 Инициализация сканера...");
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");

            if (videoDevices.length === 0) {
                console.error("🚨 Камера не найдена!");
                return;
            }

            const backCamera = videoDevices.find((device) => device.label.toLowerCase().includes("back"));
            const deviceId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;

            await codeReader.current.decodeFromVideoDevice(deviceId, videoRef.current, async (result, err) => {
                if (result && !scanningRef.current) {
                    scanningRef.current = true; // Блокируем повторное сканирование
                    console.log("✅ QR-код:", result.getText());
                    setQrResult(result.getText());

                    // Отправляем запрос на проверку билета
                    await validateTicket(result.getText());

                    // Ждем 2 секунды для отображения результата
                    setTimeout(() => {
                        scanningRef.current = false; // Разблокируем сканирование
                        setQrResult(null);
                        setStatusColor("white");
                    }, 2000);
                }
            });

        } catch (error) {
            console.error("❌ Ошибка при инициализации сканера:", error);
        }
    }, [validateTicket]);

    useEffect(() => {
        startScanner();
    }, [startScanner]);

    useEffect(() => {
        if (status) {
            setStatusColor(status === "success" ? "green" : "red");
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
                backgroundColor: statusColor,
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
