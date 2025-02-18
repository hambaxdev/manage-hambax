import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchEventStatistics = (eventId) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!eventId) return;

        const fetchStatistics = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                setError("Пользователь не авторизован");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/event/${eventId}/statistics`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStats(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Ошибка загрузки статистики');
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [eventId]);

    return { stats, loading, error };
};

export default useFetchEventStatistics;
