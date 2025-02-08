import { useState } from 'react';

const useSubmitEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const endpoint = `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events`;

    const submitEvent = async (data, imageFile) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem('authToken');

        if (!token) {
            setError('User is not authenticated. JWT token is missing.');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();

            // 🔹 Добавляем все текстовые данные
            Object.keys(data).forEach((key) => {
                if (typeof data[key] === 'object' && data[key] !== null) {
                    formData.append(key, JSON.stringify(data[key])); // Конвертируем объекты в JSON
                } else {
                    formData.append(key, data[key]);
                }
            });

            // ✅ Добавляем файл, если он есть
            if (imageFile) {
                formData.append('eventImage', imageFile);
            }

            console.log('📤 FormData перед отправкой:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]); // Проверяем, что передаём и текст, и файл
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData, // НЕ указываем Content-Type, браузер сам добавит boundary
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            setSuccess(true);
            return await response.json();
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { submitEvent, loading, error, success };
};

export default useSubmitEvent;
