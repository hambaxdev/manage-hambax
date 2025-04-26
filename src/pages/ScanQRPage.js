import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import useValidateTicket from '../hooks/useValidateTicket';

const ScanQRPage = () => {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [statusColor, setStatusColor] = useState(null);
  const { validateTicket, status, errorReason } = useValidateTicket();

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      const screenshot = webcamRef.current?.getScreenshot();
      if (!screenshot) return;

      const img = new Image();
      img.src = screenshot;

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setScanning(false);
          const text = code.data;
          setQrResult(text);
          await validateTicket(text);

          setTimeout(() => {
            setQrResult(null);
            setStatusColor(null);
          }, 2000);
        }
      };
    }, 500);

    return () => clearInterval(interval);
  }, [scanning, validateTicket]);

  useEffect(() => {
    if (status === 'success') {
      setStatusColor('rgba(0, 255, 0, 0.3)');
    } else if (status === 'error') {
      setStatusColor('rgba(255, 0, 0, 0.3)');
    }
  }, [status]);

  // Дополнительное отображение причины ошибки
  const getErrorMessage = () => {
    if (errorReason === 'not_found') {
      return ' — билет не найден';
    } else if (errorReason === 'already_scanned') {
      return ' — билет уже использован';
    } else if (errorReason) {
      return ` — ошибка (${errorReason})`;
    }
    return '';
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
        touchAction: 'none',
        WebkitOverflowScrolling: 'none',
        zIndex: 0,
      }}
    >
      {/* Камера */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Оверлей состояния */}
      {statusColor && (
        <div
          style={{
            backgroundColor: statusColor,
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'background-color 0.4s ease-in-out',
          }}
        />
      )}

      {/* UI поверх камеры */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100px + env(safe-area-inset-bottom, 20px))',
          left: 0,
          width: '100%',
          textAlign: 'center',
          color: '#fff',
          zIndex: 3,
          padding: '0 16px',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: 8 }}>Сканер билетов Hambax</h2>

        {status === 'success' && (
          <p style={{ fontSize: 18, color: '#0f0' }}>✅ Билет действителен</p>
        )}

        {status === 'error' && (
          <p style={{ fontSize: 18, color: '#f00' }}>
            ❌ Билет недействителен{getErrorMessage()}
          </p>
        )}

        {!scanning && (
          <button
            onClick={() => setScanning(true)}
            style={{
              marginTop: 12,
              background: '#000',
              color: '#fff',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            📷 Начать сканирование
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQRPage;
