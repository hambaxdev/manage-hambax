import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

const useEventStatistics = (eventId) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!eventId) return;

        const fetchStats = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Пользователь не авторизован. JWT отсутствует.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/tickets/stats/event/${eventId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStats(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Ошибка при загрузке статистики');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [eventId]);

    return { stats, loading, error };
};

export default useEventStatistics;
