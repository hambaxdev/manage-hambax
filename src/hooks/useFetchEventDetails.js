import { useState, useCallback } from 'react';
import axios from '../services/axiosInstance';

const useFetchEventDetails = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEventDetails = useCallback(async (eventId) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Пользователь не авторизован.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEventDetails(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при загрузке данных события');
        } finally {
            setLoading(false);
        }
    }, []);

    return { eventDetails, loading, error, fetchEventDetails };
};

export default useFetchEventDetails;
