export const sendCode = async (email) => {
    const response = await fetch('https://example.com/api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Ошибка при отправке кода');
  };
  
  export const verifyCode = async (email, code) => {
    const response = await fetch('https://example.com/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    if (!response.ok) throw new Error('Неверный код');
  };
  
  export const resetPassword = async (email, password) => {
    const response = await fetch('https://example.com/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Ошибка при сбросе пароля');
  };
  