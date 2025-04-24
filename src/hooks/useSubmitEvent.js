import { useState } from 'react';
import axios from '../services/axiosInstance';

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
            setError('Пользователь не авторизован. JWT отсутствует.');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                if (typeof data[key] === 'object' && data[key] !== null) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            });

            if (imageFile) {
                formData.append('eventImage', imageFile);
            }

            console.log('📤 FormData перед отправкой:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await axios.post(endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess(true);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при создании события');
        } finally {
            setLoading(false);
        }
    };

    return { submitEvent, loading, error, success };
};

export default useSubmitEvent;
