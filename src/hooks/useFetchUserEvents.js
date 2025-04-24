import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

const useFetchUserEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const endpoint = `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events`;

    const fetchUserEvents = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');

        if (!token) {
            setError('Пользователь не авторизован. JWT отсутствует.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEvents(response.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при загрузке событий');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserEvents();
    }, []);

    return { events, loading, error, fetchUserEvents };
};

export default useFetchUserEvents;
