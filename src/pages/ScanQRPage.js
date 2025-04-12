import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import useValidateTicket from '../hooks/useValidateTicket';

const ScanQRPage = () => {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [statusColor, setStatusColor] = useState(null);
  const { validateTicket, status } = useValidateTicket();

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

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Камера на фоне */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'environment',
          width: 1280,
          height: 720,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Полупрозрачный оверлей результата */}
      {statusColor && (
        <div
          style={{
            backgroundColor: statusColor,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            transition: 'background-color 0.4s ease-in-out',
          }}
        />
      )}

      {/* UI-оверлей */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '0 20px',
          color: '#fff',
          textShadow: '0 0 10px rgba(0,0,0,0.8)',
        }}
      >
        <h2 style={{ marginBottom: 10 }}>Сканер билетов Hambax</h2>

        {qrResult && (
          <p style={{ fontSize: 18 }}>
            📦 Код билета: <strong>{qrResult}</strong>
          </p>
        )}

        {status === 'success' && <p style={{ fontSize: 20, color: '#0f0' }}>✅ Билет действителен</p>}
        {status === 'error' && <p style={{ fontSize: 20, color: '#f00' }}>❌ Билет недействителен</p>}

        {!scanning && (
          <button
            onClick={() => setScanning(true)}
            style={{
              marginTop: 20,
              background: '#000',
              color: '#fff',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
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
